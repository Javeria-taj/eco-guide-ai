import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensures server execution

export async function POST(req) {
  try {
    const body = await req.json();

    const { imageBase64 } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    // 🔐 Read env vars INSIDE handler (safe)
    const apiKey = process.env.GOOGLE_VISION_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Vision API key not configured" },
        { status: 500 }
      );
    }

    // 🧠 MOCK VISION RESPONSE (BUILD SAFE)
    // Replace later with real Vision / Gemini call
    const mockResult = {
      item: "Plastic Bottle",
      category: "Dry Waste",
      bin: "Blue Bin",
      warning: "Rinse before disposal",
      confidence: 0.91,
    };

    return NextResponse.json(mockResult);

  } catch (err) {
    console.error("Vision API Error:", err);

    return NextResponse.json(
      { error: "Vision analysis failed" },
      { status: 500 }
    );
  }
}
