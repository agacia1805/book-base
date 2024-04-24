'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: 'Please provide a title' }),
  author: z.string().min(1, { message: 'Please provide an author' }),
  description: z.string().min(1, { message: 'Please provide a description' }),
  rating: z.string().min(1, { message: 'Please provide a rating' }),
  genre: z.array(z.string()).min(1, { message: 'Please provide genre(s)' }),
  date: z.string(),
});

const CreateBook = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    title?: string[];
    author?: string[];
    description?: string[];
    rating?: string[];
    genre?: string[];
  };
  message?: string | null;
};

export async function createBook(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CreateBook.safeParse({
    title: formData.get('title'),
    author: formData.get('author'),
    description: formData.get('description'),
    rating: formData.get('rating'),
    genre: formData.getAll('genre'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create book.',
    };
  }

  const { title, author, description, rating, genre } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  const genreString = [genre].join(',');
  const ratingNumber = Number(rating);

  try {
    await sql`
            INSERT INTO books (title, author, description, rating, genre, date)
            VALUES (${title}, ${author}, ${description}, ${rating}, ${genreString}, ${date})
        `;
  } catch (error) {
    console.error('Database Error:', error);

    return {
      message: 'Database Error: Failed to create book.',
    };
  }
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE
                  FROM books
                  WHERE id = ${id}`;
    revalidatePath('/dashboard');
    return { message: 'Deleted book.' };
  } catch (error) {
    return { message: 'Database Error: Failed to delete book.' };
  }
}
