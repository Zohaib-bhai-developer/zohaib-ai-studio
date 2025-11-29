import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { prompt } = req.body;

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      "black-forest-labs/flux-1.1-pro",
      { input: { prompt } }
    );

    res.status(200).json({ image: output[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
