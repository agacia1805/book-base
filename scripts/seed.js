const { db } = require('@vercel/postgres');

async function seedBooks(client) {
  try {
    // Create the "books" table if it doesn't exist
    await client.sql`
        CREATE TABLE IF NOT EXISTS books (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            image_url TEXT,
            status VARCHAR(255) NOT NULL,
            rating INTEGER NOT NULL,
            genre TEXT NOT NULL,
            date DATE NOT NULL
            );
    `;
    console.log(`Created "books" table`);
  } catch (error) {
    console.error('Error creating books table:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedBooks(client);
  // Include other seed functions as needed

  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while setting up the database:', err);
});
