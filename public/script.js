async function generate() {
  const prompt = document.getElementById("prompt").value;
  const outputDiv = document.getElementById("output");

  outputDiv.innerHTML = "Generating...";

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();

  if (data.error) {
    outputDiv.innerHTML = `❌ Error: ${data.error}`;
    return;
  }

  outputDiv.innerHTML = `<img src="${data.image}" width="512">`;
}
