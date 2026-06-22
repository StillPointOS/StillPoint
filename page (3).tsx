import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { DEMAND_NARRATIVE_SYSTEM_PROMPT } from "@/lib/prompts";
import { normalizeAnswer, buildResult } from "@/lib/scoring";
import type { DemandAnswer } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rawAnswers, ideaContext } = body as {
      rawAnswers: { questionId: string; value: number | string }[];
      ideaContext?: string;
    };

    if (!rawAnswers || !Array.isArray(rawAnswers)) {
      return NextResponse.json({ error: "rawAnswers array is required." }, { status: 400 });
    }

    // Normalize answers
    const answers: DemandAnswer[] = rawAnswers.map((a) => ({
      questionId: a.questionId,
      value: a.value,
      normalizedScore: normalizeAnswer(a.questionId, a.value),
    }));

    // Build the scored result
    const result = buildResult(answers);

    // Generate AI narrative (optional enhancement — graceful fallback)
    try {
      const narrativePrompt = `DEMAND SCORE: ${result.score}/100
TIER: ${result.tier}
CATEGORY BREAKDOWN: ${JSON.stringify(result.categoryBreakdown)}
STRENGTHS: ${JSON.stringify(result.strengths)}
CRITICAL GAPS: ${JSON.stringify(result.criticalGaps)}
IDEA CONTEXT: ${ideaContext || "Not provided"}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: DEMAND_NARRATIVE_SYSTEM_PROMPT },
          { role: "user", content: narrativePrompt },
        ],
        temperature: 0.65,
        max_tokens: 600,
        response_format: { type: "json_object" },
      });

      const narrativeRaw = completion.choices[0].message.content;
      if (narrativeRaw) {
        const { narrative, urgentNextSteps } = JSON.parse(narrativeRaw);
        result.aiNarrative = narrative;
        if (urgentNextSteps?.length) {
          result.nextSteps = urgentNextSteps;
        }
      }
    } catch (narrativeErr) {
      console.warn("[demand-test] AI narrative failed, using static content:", narrativeErr);
    }

    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("[demand-test] error:", err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

