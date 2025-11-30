import Replicate from "replicate";

export default async function handler(req, res) {
  try {
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY
    });

    const { prompt } = req.body;

    const output = await replicate.run(
      "black-forest-labs/flux-1.1-pro",
      {
        input: {
          prompt: prompt
        }
      }
    );

    res.status(200).json({ image: output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
