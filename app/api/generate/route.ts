import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";

const PROMPTS = {
  note: `You are QuicNotes, an AI that extracts study notes from the given content.

TASK:
Analyze the provided content and return a structured summary in JSON format with the following keys:
- title: string (concise title of the content)
- key_findings: array of strings (as many key facts or statistics as possible)
- important_notes: array of strings (all relevant cautions, limitations, or extra details you can find)
- quick_summary: string (a detailed 15–25 sentence overall summary)

RULES:
- Capture all meaningful information, no artificial limits on list sizes.
- Keep language clear and concise.
- No extra commentary or formatting outside of JSON.

RESPONSE FORMAT (JSON only):
{
  "title": "string",
  "key_findings": ["point 1", "point 2", "..."],
  "important_notes": ["point 1", "point 2", "..."],
  "quick_summary": "string"
}`,

  flashcard: `You are QuicNotes, an AI that generates study flashcards from the provided content.

TASK:
Generate the maximum number of high-quality flashcards possible from the content.
- No word count or time limit restrictions.
- Each flashcard should cover a unique and important concept.

Each flashcard must include:
- question: string (clear, concise; preferably under 20 words)
- answer: string (short, precise, factual)

RULES:
- No duplicate or trivial flashcards.
- Answers must be based only on the provided content.
- The assistant must return only valid JSON matching the schema below.

RESPONSE FORMAT (JSON only):
{
  "flashcards": [
    { "question": "string", "answer": "string" }
  ]
}`,

  quiz: `You are QuicNotes, an AI that generates multiple-choice quiz questions from the given content.

TASK:
Generate the maximum possible number of high-quality MCQs from the content.
- Cover all important concepts with diverse, non-overlapping questions.

Each quiz must have:
- question: string (under 25 words)
- options: array of 4 distinct strings
- correct_answer: string (must exactly match one option)
- explanation: string (1–2 sentences)

RULES:
- Only one correct answer per question.
- Distractors must be plausible but clearly wrong.
- No duplicates.

RESPONSE FORMAT (JSON only):
{
  "quizzes": [
    {
      "question": "string",
      "options": ["string","string","string","string"],
      "correct_answer": "string",
      "explanation": "string"
    }
  ]
}`,
};

function cleanJSONString(jsonString: string): string {
  let str = jsonString.trim();

  // Remove markdown fences
  if (str.startsWith("```json")) {
    str = str.substring(7);
  } else if (str.startsWith("```")) {
    str = str.substring(3);
  }

  if (str.endsWith("```")) {
    str = str.substring(0, str.length - 3);
  }

  return str.trim();
}

export async function POST(request: NextRequest) {
  try {
    const { type, content } = await request.json();

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    if (!type || !content) {
      return NextResponse.json(
        { error: "Missing type or content" },
        { status: 400 }
      );
    }

    const prompt = PROMPTS[type as keyof typeof PROMPTS];
    if (!prompt) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const fullPrompt = `${prompt}\n\nCONTENT:\n${content}`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: fullPrompt }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini API error:", error);
      return NextResponse.json(
        { error: "Failed to generate content" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const output =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!output) {
      return NextResponse.json(
        { error: "No output from Gemini" },
        { status: 500 }
      );
    }

    // Clean and parse JSON
    const cleanOutput = cleanJSONString(output);

    try {
      const parsed = JSON.parse(cleanOutput);
      return NextResponse.json({ success: true, data: parsed });
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw output:", output);
      return NextResponse.json(
        { error: "Invalid JSON response from AI", raw: output },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
