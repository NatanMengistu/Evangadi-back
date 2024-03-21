const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authentMiddleware = async (req, res, next) => {
  const authoHeader = req.headers.authorization;
  if (!authoHeader || !authoHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Authentication invalid" });
  }
  const token = authoHeader.split(" ")[1];
  console.log(authoHeader);
  console.log(token);
  try {
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username, userid };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Authentication invalid" });
  }
};

module.exports = authentMiddleware;
