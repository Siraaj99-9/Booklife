"use client"

/* eslint-disable @next/next/no-img-element */
import { Book, getBook } from "@/app/(admin)/admin/book/actions";
import React, { useEffect, useState } from "react";
 // Adjust import path based on your file structure

type BookViewPageProps = {
  bookId: string;
};

const BookViewPage: React.FC<BookViewPageProps> = ({ bookId }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const fetchedBook = await getBook(bookId);
        if (!fetchedBook) {
          setError("Book not found or unauthorized access.");
        } else {
          setBook(fetchedBook);
        }
      } catch (err) {
        setError("An error occurred while fetching the book.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!book) {
    return <p>No book details available.</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Published Year:</strong> {book.publishYear}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Price:</strong> ${book.price.toFixed(2)}</p>
      {book.mediaUrl && (
        <img
          src={book.mediaUrl}
          alt={`${book.title} cover`}
          style={{ maxWidth: "100%", borderRadius: "8px", marginTop: "1rem" }}
        />
      )}
    </div>
  );
};

export default BookViewPage;
