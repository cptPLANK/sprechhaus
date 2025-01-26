import OpenAI from "openai";
import {NextResponse} from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const {text} = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Du bist ein mittelalterlicher Barde, der moderne Sprache in eine fantasievolle, mittelalterliche Ausdrucksweise umwandelt. Verwende altertümliche Begriffe, mittelalterliche Redewendungen und füge passende Metaphern ein. Die Antwort soll nur den übersetzten Text enthalten, ohne weitere Erklärungen.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    return NextResponse.json({
      text: completion.choices[0].message.content.trim(),
    });
  } catch (err) {
    console.error("Translation error:", err);
    return NextResponse.json(
      {error: "Fehler bei der Übersetzung"},
      {status: 500}
    );
  }
}
