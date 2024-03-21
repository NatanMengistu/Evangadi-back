// controler/answerControler.js
const { v4: uuidv4 } = require("uuid");
const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");

// Get top question from the database
const getTopQuestion = async (req, res) => {
  try {
    const [question] = await dbConnection.query(
      "SELECT * FROM questions ORDER BY id DESC LIMIT 1"
    );
    if (question.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No questions found" });
    }
    return res.status(StatusCodes.OK).json({ question: question[0] });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong while fetching the top question" });
  }
};

// Create a new answer
const createAnswer = async (req, res) => {
  const { answer } = req.body;
  const { questionId } = req.params;

  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide an answer" });
  }

  const userId = req.user.userid;
  const answerId = uuidv4();

  try {
    await dbConnection.query(
      "INSERT INTO answers (answerid, userid, questionid, answer) VALUES (?, ?, ?, ?)",
      [answerId, userId, questionId, answer]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Answer posted successfully." });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong while creating the answer" });
  }
};

// Get all answers
const allAnswers = async (req, res) => {
  try {
    const [answers] = await dbConnection.query("SELECT * FROM answers");
    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong while fetching answers" });
  }
};

module.exports = { createAnswer, allAnswers, getTopQuestion };
