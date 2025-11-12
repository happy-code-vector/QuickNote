import { GoogleGenerativeAI } from '@google/generative-ai';
import { NoteResponse, QuizItem } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function generateNotes(content: string): Promise<NoteResponse> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
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
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
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
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
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
