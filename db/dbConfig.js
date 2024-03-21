const mysql2 = require("mysql2");
const dbConnection = mysql2.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
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
