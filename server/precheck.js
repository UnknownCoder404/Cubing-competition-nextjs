/*
File for checking if everything is configured correctly
*/
// precheck.js

import mongoose from "mongoose";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
config();

console.log(`Running ${import.meta.url}`);

// List of required environment variables
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];

// List of optional environment variables
const optionalEnvVars = ["PORT"];

// Function to check if all required env vars are defined
const checkEnvVars = () => {
  let allVarsDefined = true;
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      console.warn(`Warning: Environment variable ${varName} is not defined.`);
      allVarsDefined = false;
    }
  });
  optionalEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      console.log(
        `Environment variable ${varName} is undefined, but is optional so continuing.`,
      );
    }
  });
  return allVarsDefined;
};

// Function to check if the database connection is available
const checkDbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection successful.");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

// Main function to perform prechecks
const precheck = async () => {
  console.time("Precheck");
  checkIfPublicDirExists();
  if (!checkEnvVars()) {
    console.warn(
      "Some environment variables are missing. Please check your .env file.",
    );
    process.exit(1); // Exit the process with failure
  }
  await checkDbConnection();
  console.log("Precheck successful.");
  console.timeEnd("Precheck");
  process.exit(0); // Exit the process with success
};
function checkIfPublicDirExists() {
  const publicDir = path.join(__dirname, "public");
  if (!fs.existsSync(publicDir)) {
    console.log("Public directory does not exist. Creating...");
    fs.mkdirSync(publicDir);
    fs.mkdirSync(path.join(publicDir, "profile-pictures"));
    console.log("Public directory created successfully.");
  }
  return;
}
// Execute precheck
precheck();
