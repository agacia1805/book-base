import { sql } from '@vercel/postgres';
import { Book } from './definitions';

export async function fetchBooks() {
  try {
    const data = await sql<Book>`
      SELECT
        id,
        title, 
        author,
        description,
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
