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
  
  var sql = "INSERT INTO QTDE_Vendida (Cod_produto, Cod_venda, Dia_venda, Qtde) VALUES ('456', '321', '1999-12-06', '15')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted", result);
  });

//   var sql = "UPDATE QTDE_Vendida SET Qtde = '20' WHERE Cod_venda = '321'";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result.affectedRows + " record(s) updated", result);
//   });

//   var sql = "DELETE FROM QTDE_Vendida WHERE Cod_venda = '321'";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Number of records deleted: " + result.affectedRows);
//   });


});