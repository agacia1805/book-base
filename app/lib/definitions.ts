export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  image_url: string;
  status: 'finished' | 'to read';
  rating: number;
  genre: string;
};

export interface IBookCardProps {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  status: 'finished' | 'to read';
  rating: number;
  genre: string;
}
