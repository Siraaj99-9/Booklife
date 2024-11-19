/* eslint-disable @next/next/no-img-element */
"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Book, getBook } from '@/app/(admin)/admin/book/actions';
import { useParams } from 'next/navigation';

const BookDetails = () => {
  const [book, setBook] = React.useState<Book | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>('');
  const params = useParams();
  const bookId = Array.isArray(params.id) ? params.id[0] : params.id;

  React.useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        if (!bookId) {
          setError('Invalid book ID');
          return;
        }
        const data = await getBook(bookId);
        setBook(data);
        if (!data) {
          setError('Book not found');
        }
      } catch (err) {
        setError('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-4 w-1/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>This book could not be found.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{book.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            {book.mediaUrl && (
              <div className="w-full md:w-1/3">
                <img
                  src={book.mediaUrl}
                  alt={book.title}
                  className="w-full h-auto rounded-lg shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = "/api/placeholder/300/400";
                    e.currentTarget.alt = "Book cover placeholder";
                  }}
                />
              </div>
            )}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Author</h3>
                <p className="text-gray-600">{book.author}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Published</h3>
                <p className="text-gray-600">{book.publishYear}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Price</h3>
                <p className="text-gray-600">
                  ${book.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{book.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetails;