//require("dotenv").config();

const express = require("express");
const app = express();
const port = 4400;
const cors = require("cors");
const dbConnection = require("./db/dbConfig");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
const authentMiddleware = require("./middleware/authentMiddleware");

// json middleware
app.use(express.json());

// user routes middleware file
const userRoutes = require("./Routes/userRoutes");
app.use("/api/users", userRoutes);

// question routes middleware file
const questionRoutes = require("./Routes/questionRoutes");
app.use("/api/question", authentMiddleware, questionRoutes);

// answer routes middleware file
const answerRoutes = require("./Routes/answerRoutes");
app.use("/api/answer", authentMiddleware, answerRoutes);

async function start() {
  try {
    const result = await dbConnection.execute("SELECT 'test'");
    await app.listen(port);
    console.log("Database connection established");
    console.log(`Listening on ${port}`);
  } catch (error) {
    console.error(error.message);
  }
}

// Handle pre-flight OPTIONS requests
app.options("*", cors());

start();
