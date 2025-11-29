import Replicate from "replicate";

export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt missing" });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    // FREE MODEL (guaranteed working)
    const output = await replicate.run(
      "lucataco/flux-free:af660b1db4fa2175b8d90388a5f3df2747fb55d1f7a8ad96e1aaf48d4f2697fc",
      {
        input: { prompt }
      }
    );

    res.status(200).json({ image: output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
