import type { NextApiRequest, NextApiResponse } from "next";
import { searchBooks } from "../(admin)/admin/book/actions";
 // Adjust the path to your actions.ts file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { q } = req.query;

  if (!q || typeof q !== "string") {
    return res.status(400).json({ error: "Invalid query" });
  }

  try {
    const books = await searchBooks(q);
    res.status(200).json(books);
  } catch (error) {
    console.error("Error in search handler:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
