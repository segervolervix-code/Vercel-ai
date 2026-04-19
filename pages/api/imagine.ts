// pages/api/imagine.ts
import type { NextApiRequest, NextApiResponse } from "next";

const CHAT_URL = "https://segervolervix.space/api/chat";
const IMAGE_URL = "https://segervolervix.space/api/imagine";
const API_KEY = process.env.SEGERVOLERVIX_API_KEY || "YOUR_API_KEY";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    const upstream = await fetch(IMAGE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      return res
        .status(upstream.status)
        .json({ error: "Upstream error", details: text });
    }

    const data = await upstream.json();
    return res.status(200).json({ result: data.result ?? data });
  } catch (err: any) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
