import Replicate from "replicate";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN
    });

    // MODEL CALL
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: { prompt }
      }
    );

    // EXTRACT URL SAFELY
    const imageUrl =
      output?.[0] ||
      output?.image?.[0] ||
      output?.images?.[0] ||
      output;

    if (!imageUrl) {
      return Response.json({ error: "No image generated" }, { status: 500 });
    }

    return Response.json({ image: imageUrl });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
