import { Metadata } from 'next/types';
import BookViewPage from '../../_components/ViewBookPage';

export const metadata: Metadata = {
  title: 'View Book Details',
  description: 'Detailed view of a specific book in your library'
};

export default function BookViewRoute() {
  return <BookViewPage />;
}