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
  
//   var sql = "INSERT INTO Supervisor (CPF_Supervisor, CPF_Supervisionado) VALUES ('41199288888', '41188299999')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted", result);
//   });

//   var sql = "UPDATE Supervisor SET CPF_Supervisor = '41188299999' WHERE CPF_Supervisionado = '41188299999'";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result.affectedRows + " record(s) updated", result);
//   });

  var sql = "DELETE FROM Supervisor WHERE CPF_Supervisor = '41188299999'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });

//   var sql = "DELETE FROM Supervisor WHERE CPF_Supervisionado = '41199288888'";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Number of records deleted: " + result.affectedRows);
//   });


});