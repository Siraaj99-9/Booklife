import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateRequest } from '@/auth';

export async function POST(request: Request) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      console.error('Unauthorized request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    console.log('Received book creation payload:', data);

    const priceInCents = Math.round(data.price * 100);
    console.log('Converted price to cents:', priceInCents);

    const book = await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        description: data.description || null,
        publishYear: data.publishYear,
        price: priceInCents,
        mediaUrl: data.mediaUrl || null,
        userId: user.id,
      },
    });

    console.log('Book created successfully:', book);
    return NextResponse.json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}
