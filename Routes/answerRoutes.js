// routes/answerRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authentMiddleware");

// Import the controller functions
const {
  createAnswer,
  allAnswers,
  getTopQuestion,
} = require("../controler/answercontroler");

// Route for creating an answer
router.post("/createAnswer/:questionId", authMiddleware, createAnswer);

// Route for fetching all answers
router.get("/allAnswers", authMiddleware, allAnswers);

// Route for fetching the top question
router.get("/getTopQuestion", authMiddleware, getTopQuestion);

module.exports = router;
