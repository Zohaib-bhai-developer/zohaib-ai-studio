export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    const { prompt } = await req.json();

    const response = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
        body: JSON.stringify({
          version: "black-forest-labs/flux-schnell",
          input: { prompt },
        }),
      }
    );

    const prediction = await response.json();

    return new Response(JSON.stringify(prediction), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
