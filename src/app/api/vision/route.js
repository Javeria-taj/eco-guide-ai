import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return Response.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    // Convert image to base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");

    // Call OpenAI Vision
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
You are an expert municipal waste management AI for India.

Analyze the image and return ONLY valid JSON in this exact format:

{
  "item": "",
  "category": "Dry Waste | Wet Waste | E-Waste | Hazardous Waste",
  "bin": "",
  "warning": "",
  "confidence": "Low | Medium | High"
}

Rules:
- Be conservative if unsure
- Follow Indian waste segregation rules
- If hazardous or e-waste, warn strongly
- No explanations outside JSON
              `,
            },
            {
              type: "input_image",
              image_base64: base64Image,
            },
          ],
        },
      ],
    });

    // Parse model output
    const text = response.output_text;

    const parsed = JSON.parse(text);

    return Response.json(parsed);
  } catch (error) {
    console.error("Vision error:", error);

    return Response.json({
      item: "Unknown item",
      category: "Uncertain",
      bin: "Do not dispose yet",
      warning: "AI could not confidently analyze the image",
      confidence: "Low",
    });
  }
}
