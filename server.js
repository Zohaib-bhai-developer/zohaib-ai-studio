import express from "express";
import Replicate from "replicate";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY });
    const output = await replicate.run("black-forest-labs/flux-schnell", { input: { prompt } });

    res.json({ image: output[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
