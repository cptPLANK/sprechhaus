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
  } catch (err) {
    console.error("Message error:", err);
    return NextResponse.json(
      {error: "Fehler beim Speichern der Nachricht"},
      {status: 500}
    );
  }
}
