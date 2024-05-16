export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  image_url: string;
  status: string;
  rating: number;
  genre: string;
};

export interface IBookCardProps {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  status: string;
  rating: number;
  genre: string;
}
