'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  title: z.string({
    invalid_type_error: 'Please provide a title',
  }),
  author: z.string({
    invalid_type_error: 'Please provide an author',
  }),
  description: z.string({
    invalid_type_error: 'Please provide a description',
  }),
  rating: z.number({
    invalid_type_error: 'Please provide a rating',
  }),
  genre: z.string({
    invalid_type_error: 'Please provide genre(s)',
  }),
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

export async function createBook(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateBook.safeParse({
    title: formData.get('title'),
    author: formData.get('author'),
    description: formData.get('description'),
    rating: formData.get('rating'),
    genre: formData.get('genre'),
  });

  console.log(formData);
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create book.',
    };
  }

  // Prepare data for insertion into the database
  const { title, author, description, rating, genre } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  const genreString = [genre].join(',');

  // Insert data into the database
  try {
    await sql`
            INSERT INTO books (title, author, description, rating, genre, date)
            VALUES (${title}, ${author}, ${description}, ${rating}, ${genreString}, ${date})
        `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.error('Database Error:', error);

    return {
      message: 'Database Error: Failed to create book.',
    };
  }
  // Revalidate the cache for the dashboard page and redirect the user.
  revalidatePath('/dashboard');
  redirect('/dashboard');
}
