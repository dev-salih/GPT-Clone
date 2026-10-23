import "dotenv/config";
import express from "express";
import db from "./db/db.config.js";

const app = express();


app.post("/api/chat/conversations", async (req, res) => {
  res.send('post method')
});

app.get("/api/chat/conversations", async (req, res) => {
  res.send('get method')
});


async function startServer() {
  try {
    const connection = await db.getConnection();
    connection.release(); // Release the connection back to the pool
    console.log("Connected to the database successfully.");

    app.listen(3000, () => {
      console.log("Server is running on port http://localhost:3000");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

startServer();
