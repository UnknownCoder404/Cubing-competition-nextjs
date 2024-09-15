import { config } from "dotenv";
import mongoose from "mongoose";
import { writeFile, mkdir } from "fs/promises";
import { exit } from "process";
import { join } from "path";

config();

async function connectToDatabase() {
  console.time("Connect to mongodb");
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.timeEnd("Connect to mongodb");
    console.log("Connected to mongodb");
  } catch (error) {
    console.error("Failed to connect to MongoDB: \n" + error);
    process.exit(1);
  }
}

async function backupCollections() {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  const collections = await db.db.listCollections().toArray();
  const backupDir = "backups";

  await mkdir(backupDir, { recursive: true });

  for (const { name: collectionName } of collections) {
    const collection = db.collection(collectionName);
    const data = JSON.stringify(await collection.find({}).toArray());

    try {
      const filePath = join(backupDir, `${collectionName}-backup.json`);
      await writeFile(filePath, data);
      console.log(
        `Backup of the '${collectionName}' collection saved successfully.`,
      );
    } catch (err) {
      console.error(
        `Error writing to file for collection '${collectionName}':`,
        err,
      );
    }
  }
}

async function main() {
  await connectToDatabase();
  console.time("Backup");
  await backupCollections();
  console.timeEnd("Backup");
  console.log("DONE...");
  exit();
}

console.log(`Running ${import.meta.file}`);
main();
