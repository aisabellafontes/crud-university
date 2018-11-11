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
  
  var sql = "INSERT INTO Produtos (Codigo,Nome,Preco,Descricao,ID_categoria,ID_fornecedor,QTD_Estoque) VALUES (456, 'VacinaB13',50,'Vacina para calcificar',23,3,40)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted", result);
  });

  var sql = "UPDATE Produtos SET Nome = 'VacinaB12' WHERE Codigo = 456";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated", result);
  });

//   var sql = "DELETE FROM Produtos WHERE Codigo = 456 ";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Number of records deleted: " + result.affectedRows);
//   });

});