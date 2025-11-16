import sqlite3 from "sqlite3";
import { open } from "sqlite";

const openDB = async () => {
  return open({
    filename: "./database.sqlite",
    driver: sqlite3.Database
  });
};

const main = async () => {
  const db = await openDB();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      attempts INTEGER DEFAULT 0
    );
  `);

  console.log("Base de datos creada 😊");
};

main();
