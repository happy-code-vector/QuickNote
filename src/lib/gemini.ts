import { GoogleGenerativeAI } from '@google/generative-ai';
import { NoteResponse, QuizItem } from '@/types';

function getGenAI(): GoogleGenerativeAI {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  console.log('API Key check:', apiKey ? `Found (${apiKey.substring(0, 10)}...)` : 'Missing');

  if (!apiKey || apiKey === 'YOUR_ACTUAL_API_KEY_HERE' || apiKey === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key is missing. Please set NEXT_PUBLIC_GEMINI_API_KEY in your .env.local file');
  }
  return new GoogleGenerativeAI(apiKey);
}

export async function generateNotes(content: string): Promise<NoteResponse> {
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });

  const prompt = `Analyze the following content and provide:
1. A concise summary
2. Key points (3-5 bullet points)

Content: ${content}

Format your response as JSON with this structure:
{
  "summary": "...",
  "keyPoints": ["...", "..."]
}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    return JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
  } catch {
    return {
      summary: text,
      keyPoints: []
    };
  }
}

export async function generateFlashcards(content: string): Promise<Array<{ question: string; answer: string }>> {
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });

  const prompt = `Create 5 flashcards from this content. Each flashcard should have a question and answer.

Content: ${content}

Format as JSON array:
[
  {"question": "...", "answer": "..."},
  ...
]`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    return JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
  } catch {
    return [];
  }
}

export async function generateQuiz(content: string): Promise<QuizItem[]> {
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });

  const prompt = `Create 5 multiple choice quiz questions from this content.

Content: ${content}

Format as JSON array:
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "A"
  },
  ...
]`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    return JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
  } catch {
    return [];
  }
}
