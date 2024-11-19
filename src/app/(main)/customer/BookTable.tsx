/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import { Book } from "@prisma/client";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from '@/components/ui/button';

interface BookGridProps {
  books: Book[];
}

export default function BookGrid({ books }: BookGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10; // Adjusted for grid layout

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const paginate = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-2xl font-serif font-bold text-primary">Latest books</p>
      
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentBooks.map((book) => (
          <Card key={book.id} className="flex flex-col h-full">
            <CardHeader className="space-y-2">
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                {book.mediaUrl ? (
                  <img
                    src={book.mediaUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
              <p className="text-sm text-gray-500">by {book.author}</p>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Year:</span> {book.publishYear}
                </p>
                <p className="text-lg font-bold text-orange-600">
                  R{book.price.toFixed(2)}
                </p>
              </div>
            </CardContent>

            <CardFooter className="border-t pt-4">
              <div className="flex justify-between w-full">
                <Button>
                  <Link 
                    href={`/customer/view/${book.id}`}
                    className="p-2"
                  >
                    <Eye className="w-4 h-4 text-white" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button
          onClick={() => paginate("prev")}
          disabled={currentPage === 1}
          className="flex items-center gap-2"
        >
          <ChevronLeft />
          Prev
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => paginate("next")}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
