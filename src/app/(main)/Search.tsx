/* eslint-disable react/no-unescaped-entities */
"use client";

import { useSearchParams } from "next/navigation"; // For reading query parameters
import { useEffect, useState } from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  publishYear: number;
  description: string;
  price: number;
  mediaUrl?: string;
};

export default function SearchPage() {
  const searchParams = useSearchParams(); // Use this to get query parameters
  const query = searchParams.get("q") || ""; // Get the "q" parameter
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      fetchBooks(query);
    }
  }, [query]);

  async function fetchBooks(q: string) {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Year: {book.publishYear}</p>
              <p>{book.description}</p>
              <p>Price: ${book.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}