const mysql = require('mysql');

// TODO: fill out details
connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'mydatabase'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});

module.exports = connection;