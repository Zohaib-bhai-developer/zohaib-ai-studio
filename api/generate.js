const Replicate = require("replicate");

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY
    });

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      { input: { prompt } }
    );

    res.status(200).json({ image: output[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

