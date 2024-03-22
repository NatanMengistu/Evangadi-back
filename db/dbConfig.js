const mysql2 = require("mysql2");
const dbConnection = mysql2.createPool({
  user: "sql3693051",
  database: "sql3693051",
  password: "u9aAQXJhKu",
  host: "sql3.freesqldatabase.com",
  connectionLimit: 10,
});

// console.log(process.env.DATABASE)
// dbConnection.execute("select 'test'", (err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });
module.exports = dbConnection.promise();
