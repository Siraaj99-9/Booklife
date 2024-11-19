/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageIcon, TrendingUp, BookOpen } from 'lucide-react';

// Import or define the Book type
export type Book = {
  id: string;
  title: string;
  author: string;
  publishYear: number;
  description: string;
  price: number;
  mediaUrl?: string;
};

interface TrendingSidebarProps {
  books: Book[];
}

const TrendingSidebar: React.FC<TrendingSidebarProps> = ({ books = [] }) => {
  return (
    <Card className="w-72">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-orange-600" />
          <CardTitle className="text-lg font-semibold">Trending Books</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 overflow-y-auto h-[calc(100%-3rem)]">
        {books.map((book) => (
          <div
            key={book.id}
            className="group flex items-start space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-100"
          >
            <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-md">
              {book.mediaUrl ? (
                <img
                  src={book.mediaUrl}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                  <ImageIcon className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-1">
              <h3 className="font-medium leading-snug text-gray-900 group-hover:text-blue-600">
                {book.title}
              </h3>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <BookOpen className="h-4 w-4" />
                <span>{book.author}</span>
              </div>
              
              <div className="text-sm font-medium text-blue-600">
                R{book.price.toFixed(2)}
              </div>
            </div>
          </div>
        ))}

        {books.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6 text-center text-gray-500">
            <BookOpen className="h-12 w-12 mb-2" />
            <p className="text-sm">No trending books available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendingSidebar;