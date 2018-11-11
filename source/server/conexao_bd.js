/*
*
*
*/
var mysql = require('mysql');
var host = "localhost";
var user_db = "";
var password_db = "";

var con = mysql.createConnection({
    host: host,
    user: user_db,
    password: password_db
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Atencao! Conexao com banco ativa.");
  });


  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  });