const Replicate = require("replicate");

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST requests allowed" });
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
      {
        input: { prompt }
      }
    );

    return res.status(200).json({ image: output[0] });

  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: err.message });
  }
};
