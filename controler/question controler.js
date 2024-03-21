const { v4: uuidv4 } = require("uuid");
const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");

// Create a new question
const createQuestion = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all question properties" });
  }

  const questionId = uuidv4();
  const userId = req.user.userid;

  try {
    await dbConnection.query(
      "INSERT INTO questions (questionid, userid, title, description) VALUES (?, ?, ?, ?)",
      [questionId, userId, title, description]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question posted successfully", questionId });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

// Get all questions
const allQuestions = async (req, res) => {
  try {
    const [questions] = await dbConnection.query("SELECT * FROM questions");
    return res.status(StatusCodes.OK).json({ questions });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

// Get question by ID
const questionById = async (req, res) => {
  const { id } = req.params;
  try {
    const [question] = await dbConnection.query(
      "SELECT * FROM questions WHERE questionid = ?",
      [id]
    );
    if (question.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found" });
    }
    return res.status(StatusCodes.OK).json({ question: question[0] });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

module.exports = { createQuestion, allQuestions, questionById };
