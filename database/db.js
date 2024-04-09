const mysql = require('mysql');

function connectToDatabase() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'one_thread'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database: ', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

  return {
    query: (sql, params, callback) => {
      return connection.query(sql, params, callback);
    }
  };
}

module.exports = connectToDatabase();
