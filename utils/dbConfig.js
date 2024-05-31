import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

/* functionality for MongoDB Database connection */
export default async function dbConnection() {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}`);

    console.log(`Database Connected !! DB Host: ${conn.connection.host} `);
  } catch (error) {
    console.log("Database connection error", error);
    process.exit(1);
  }
}
