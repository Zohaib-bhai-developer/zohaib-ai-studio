async function generate() {
  const prompt = document.getElementById("prompt").value;
  const output = document.getElementById("output");

  output.innerHTML = "⏳ Generating...";

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();

  if (data.error) {
    output.innerHTML = "❌ Error: " + data.error;
    return;
  }

  output.innerHTML = `<img src="${data.image}" width="500">`;
}
