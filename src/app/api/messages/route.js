import {NextResponse} from "next/server";

// Speichere messages außerhalb der Handler-Funktionen
let messages = [];

export async function GET() {
  return NextResponse.json(messages);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const message = {
      id: Date.now(),
      text: body.text,
      username: body.username,
      timestamp: new Date().toISOString(),
    };

    messages.push(message);
    return NextResponse.json(message, {status: 201});
  } catch (error) {
    return NextResponse.json(
      {error: "Failed to process message"},
      {status: 500}
    );
  }
}
