export async function POST(req) {
  const { query } = await req.json();

  // later: OpenAI / Gemini
  return Response.json({
    text: "LLM response placeholder 🤖",
  });
}
