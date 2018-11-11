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
  
  var sql = "INSERT INTO Freteiro (CPF_Freteiro,Nro_Entregas) VALUES (41199288889, 12)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted", result);
  });

  var sql = "UPDATE Freteiro SET Nro_Entregas = 10 WHERE CPF_Freteiro = 41199288889";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated", result);
  });

});