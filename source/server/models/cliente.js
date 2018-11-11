var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "agropec.admin",
  password: "admin",
  database: "Agropec"
});

con.connect(function(err) {
  if (err) throw err;  
  console.log("Connected!");
  
  var sql = "INSERT INTO Clientes (CPF, Nome) VALUES ('48491201808', 'Matheus Batistelas')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted", result);
  });

  // var sql = "UPDATE Clientes SET Nome = 'Matheus Henrique' WHERE CPF = '48491201807'";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log(result.affectedRows + " record(s) updated", result);
  // });

//   var sql = "DELETE FROM Clientes WHERE CPF = '41199288888'";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Number of records deleted: " + result.affectedRows);
//   });

});