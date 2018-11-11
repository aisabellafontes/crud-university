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
  
//   var sql = "INSERT INTO Telefone_Cliente (Num_Telefone, CPF_Cliente) VALUES ('17981844399', '41199288888')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted", result);
//   });

//   var sql = "UPDATE Telefone_Cliente SET Num_Telefone = '17991524608' WHERE CPF_Cliente = '41199288888'";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result.affectedRows + " record(s) updated", result);
//   });

  var sql = "DELETE FROM Telefone_Cliente WHERE CPF_Cliente = '41199288888'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });


});