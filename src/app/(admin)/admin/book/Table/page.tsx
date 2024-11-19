import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import BookTable from "@/app/(admin)/admin/book/Table/BookTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookSearchPage from "./BookSearch";



export default async function BooksPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const page = Number(searchParams.page) || 1;
  const pageSize = 12;

  const books = await prisma.book.findMany({
    where: {
      userId: user.id,
      OR: searchParams.search
        ? [
            { title: { contains: searchParams.search, mode: "insensitive" } },
            { author: { contains: searchParams.search, mode: "insensitive" } },
            { description: { contains: searchParams.search, mode: "insensitive" } },
          ]
        : undefined,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <BookSearchPage />
      <BookTable books={books}  />
      <div className="mb-3">
      <Link href="/admin/book/Table/create">
          <Button className="bg-primary hover:bg-primary/90 ">Add Book</Button>
      </Link>
      </div>
    </div>
  );
}