const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    // Create the "users" table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `);

    console.log(`Created "users" table`);
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedBooks(client) {
  try {
    // Create the "books" table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS books (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      )
    `);

    console.log(`Created "books" table`);
  } catch (error) {
    console.error('Error seeding books:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  try {
    await seedUsers(client);
    await seedBooks(client);
  } catch (error) {
    console.error('An error occurred while seeding the database:', error);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err
  );
});
