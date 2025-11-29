const btn = document.getElementById("generateBtn");
const promptInput = document.getElementById("prompt");
const result = document.getElementById("result");
const meta = document.getElementById("meta");

btn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    meta.innerText = "Please enter a prompt.";
    return;
  }
  result.innerHTML = "⏳ Generating...";
  meta.innerText = "";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const j = await res.json();
    if (!res.ok) {
      result.innerHTML = "❌ " + (j?.error || "Generation failed");
      meta.innerText = j?.error || "";
      return;
    }

    // show image
    const url = j.image || (Array.isArray(j.output) ? j.output[0] : j.output);
    if (!url) {
      result.innerHTML = "❌ No image URL returned.";
      meta.innerText = JSON.stringify(j).slice(0, 200);
      return;
    }

    result.innerHTML = `<img src="${url}" alt="AI result" />`;
    meta.innerText = "Model: " + (j.model || "unknown");
  } catch (err) {
    result.innerHTML = "❌ Request failed: " + err.message;
    meta.innerText = "";
  }
});
