'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob';

import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: 'Please provide a title' }),
  author: z.string().min(1, { message: 'Please provide an author' }),
  description: z.string().min(1, { message: 'Please provide a description' }),
  image: z.any(),
  status: z.enum(['finished', 'to read'], {
    invalid_type_error: 'Please select a status.',
  }),
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
    image?: string[];
    status?: string[];
    rating?: string[];
    genre?: string[];
  };
  message?: string | null;
  resetKey?: string | null;
};

export async function createBook(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CreateBook.safeParse({
    title: formData.get('title'),
    author: formData.get('author'),
    description: formData.get('description'),
    image: formData.get('image'),
    status: formData.get('status'),
    rating: formData.get('rating'),
    genre: formData.getAll('genre'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create book.',
      resetKey: prevState.resetKey,
    };
  }

  const { title, author, description, image, status, rating, genre } =
    validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  const genreString = [genre].join(',');
  const ratingNumber = Number(rating);
  let imageUrl;

  if (image) {
    try {
      const uploadResult = await put(title, image, { access: 'public' });
      imageUrl = uploadResult.url;
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  } else {
    imageUrl = null;
  }

  try {
    await sql`
            INSERT INTO books (title, author, description, image_url, status, rating, genre, date)
            VALUES (${title}, ${author}, ${description}, ${imageUrl}, ${status}, ${rating}, ${genreString}, ${date})
        `;

    revalidatePath('/dashboard');

    return {
      resetKey: Date.now().toString(),
    };
  } catch (error) {
    console.error('Database Error:', error);

    return {
      message: 'Database Error: Failed to create book.',
    };
  }
}
