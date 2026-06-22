import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { CLARITY_SYSTEM_PROMPT } from "@/lib/prompts";
import type { ClarityInput, ClarityResult } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body: ClarityInput = await req.json();

    if (!body.situation || !body.challenge || !body.desiredOutcome) {
      return NextResponse.json(
        { error: "situation, challenge, and desiredOutcome are required." },
        { status: 400 }
      );
    }

    const userMessage = `SITUATION: ${body.situation}

CHALLENGE: ${body.challenge}

DESIRED OUTCOME: ${body.desiredOutcome}

ADDITIONAL CONTEXT: ${body.context || "None provided"}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: CLARITY_SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0].message.content;
    if (!raw) {
      return NextResponse.json({ error: "Empty response from AI." }, { status: 500 });
    }

    const result: ClarityResult = JSON.parse(raw);
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("[clarity] error:", err);
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: "Failed to parse AI response." }, { status: 500 });
    }
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

