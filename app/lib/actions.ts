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
  messageType?: 'success' | 'error';
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
      messageType: 'error',
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
      return {
        message: 'Failed to upload image.',
        messageType: 'error',
      };
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
      message: 'Book successfully created!',
      messageType: 'success',
    };
  } catch (error) {
    console.error('Database Error:', error);

    return {
      message: 'Failed to create book.',
      messageType: 'error',
    };
  }
}

export async function deleteBook(id: string) {
  try {
    await sql`DELETE
                  FROM books
                  WHERE id = ${id}`;

    revalidatePath('/dashboard');

    return { message: 'Deleted book.' };
  } catch (error) {
    return { message: 'Failed to delete book.' };
  }
}

const UpdateBook = FormSchema.omit({ id: true, date: true });

export async function updateBook(
  id: string,
  prevState: State,
  formData: FormData
) {
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
      messageType: 'error',
      resetKey: prevState.resetKey,
    };
  }

  const { title, author, description, image, status, rating, genre } =
    validatedFields.data;
  const genreString = genre.join(',');
  const ratingNumber = Number(rating);
  let imageUrl = null;

  if (image instanceof File && image?.size !== 0) {
    try {
      const uploadResult = await put(title, image, { access: 'public' });
      imageUrl = uploadResult.url;
    } catch (error) {
      console.error('Failed to upload image:', error);
      return {
        message: 'Failed to upload image.',
        messageType: 'error',
      };
    }
  }

  try {
    if (imageUrl) {
      await sql`
        UPDATE books
        SET title = ${title}, author = ${author}, description = ${description}, image_url = ${imageUrl}, status = ${status}, rating = ${ratingNumber}, genre = ${genreString}
        WHERE id = ${id}
      `;
    } else {
      await sql`
        UPDATE books
        SET title = ${title}, author = ${author}, description = ${description}, status = ${status}, rating = ${ratingNumber}, genre = ${genreString}
        WHERE id = ${id}
      `;
    }

    revalidatePath('/dashboard');

    return {
      resetKey: Date.now().toString(),
      message: 'Book successfully edited!',
      messageType: 'success',
    };
  } catch (error) {
    console.log(error);
    return {
      message: 'Failed to edit book.',
      messageType: 'error',
    };
  }
}
