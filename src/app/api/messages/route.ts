import {NextResponse} from "next/server";
import {Message} from "../../../types";

let messages: Message[] = [];

export async function GET() {
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message: Message = {
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
