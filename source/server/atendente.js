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
  
  var sql = "INSERT INTO Atendente (CPF_Atendente,Nro_Vendas) VALUES (41199288871,9)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted", result);
  });

  var sql = "UPDATE Atendente SET Nro_Vendas = 10 WHERE CPF_Atendente = 41199288871";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated", result);
  });

//   var sql = "DELETE FROM Atendente WHERE CPF_Atendente = 8494847494";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Number of records deleted: " + result.affectedRows);
//   });

});