const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authentMiddleware");
const dbconnection = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

// Middleware for authentication, you need to define this
router.use(authMiddleware);

// Get all questions
router.get("/all-questions", async (req, res) => {
  try {
    const result = await dbconnection.query(
      "SELECT questionid, userid, title, description FROM questions"
    );

    const rows = result[0]; // Access the first element of the result array

    //  console.log("Questions:", rows);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new question
router.post("/createQuestion", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Please provide title and description for the question" });
  }

  const questionId = uuidv4(); // Generate UUID for questionid
  const userId = req.user.userid;

  try {
    await dbconnection.query(
      "INSERT INTO questions (questionid, userid, title, description) VALUES (?, ?, ?, ?)",
      [questionId, userId, title, description]
    );

    return res.status(201).json({
      questionId,
      message: "Question posted successfully",
    });
  } catch (error) {
    console.error(error);
    // Check if the error is due to duplicate entry
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ error: "Question with this ID already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
