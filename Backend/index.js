import "dotenv/config";
import express from "express";
import db from "./db/db.config.js";
import cors from 'cors';
import mainRouter from "./src/api/main.routes.js";
import { errorHandler } from "./src/middleware/error.handler.js";

const app = express();
app.use(cors({
  origin: `http://localhost:5173`,
}));
app.use(express.json());

app.use("/api", mainRouter);

// Final middleware for error handling
app.use(errorHandler)


async function startServer() {
  try {
    const connection = await db.getConnection();
    connection.release(); // Release the connection back to the pool
    console.log("Connected to the database successfully.");

    app.listen(5000, err => {
      if (err) {
        throw err;
      }
      console.log("Server is running on port http://localhost:5000");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

startServer();
