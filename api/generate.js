import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY
});

// List of candidate models (try in order). Versions included when available.
const MODELS = [
  // preferred Flux with known version id
  "black-forest-labs/flux-schnell:62294d7c-0f3e-49f1-ae0d-235ca7e6c52b",
  // fallbacks - more generic Stable Diffusion variants (may vary by availability)
  "stability-ai/sdxl:latest",
  "stability-ai/stable-diffusion-2-1:latest"
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { prompt } = req.body ?? {};
    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      return res.status(400).json({ error: "Please provide a prompt (3+ chars)." });
    }

    // Try models in order until one works
    let lastError = null;
    for (const model of MODELS) {
      try {
        const output = await replicate.run(model, {
          input: { prompt }
        });

        // output can be array or single URL; normalize to string or first element
        const url = Array.isArray(output) ? output[0] : output;
        if (!url) throw new Error("Model returned no URL");

        return res.status(200).json({ success: true, image: url, model });
      } catch (err) {
        // keep the last error and try next model
        lastError = err;
      }
    }

    // if none worked, return the last error message (safe)
    console.error("All model attempts failed:", lastError);
    return res.status(500).json({
      success: false,
      error: lastError?.message || "All model attempts failed"
    });

  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ success: false, error: err.message || String(err) });
  }
}
