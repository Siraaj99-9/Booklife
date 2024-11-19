import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TrendingSidebar from "./customer/_components/TrendingSideBar";
import BookTable from "./customer/BookTable";


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
    <div className="w-full min-w-0 flex gap-5 ">
      <BookTable books={books}  />
      <TrendingSidebar books={books}/>
    </div>
  );
}