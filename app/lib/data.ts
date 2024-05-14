import { sql } from '@vercel/postgres';
import { list } from '@vercel/blob';
import { Book } from './definitions';

export async function fetchBooks() {
  try {
    const data = await sql<Book>`
      SELECT
        id,
        title, 
        author,
        description,
        image_url,
        status,
        rating, 
        genre
      FROM books
    `;

    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all books.');
  }
}

export async function fetchBlobs() {
  try {
    const { blobs } = await list();

    return blobs;
  } catch (err) {
    console.error('Blob Error:', err);
    throw new Error('Failed to list all blobs.');
  }
}
