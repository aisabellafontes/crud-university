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
  
  var sql = "INSERT INTO Vendas (Codigo,CPF_cliente,CPF_atendente,CPF_freteiro,Data_venda,Tel_cliente) VALUES (321,48491201808,41199288871,41199288872,20120101,17983746300 )";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted", result);
  });

  var sql = "UPDATE Vendas SET Tel_Cliente = 17981234599 WHERE Codigo = 321";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated", result);
  });

//   var sql = "DELETE FROM Vendas WHERE Codigo = 321 ";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Number of records deleted: " + result.affectedRows);
//   });

});