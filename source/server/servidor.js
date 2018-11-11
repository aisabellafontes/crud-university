var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');

var http_port = 8000;

/*Configurar os HTML template Engine*/
app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

/*MySql connection*/
var connection  = require('express-myconnection')
var mysql = require('mysql');

app.use(
    connection(mysql,{
        host: 'localhost',
        user: 'agropec.admin',
        password : 'admin',
        port : 3306, 
        database:'Agropec'	
    },'request')

);

app.get('/',function(req,res){
    res.send('Welcome');
});


//RESTful route
var router = express.Router();
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

var cliente = router.route('/cliente');
/* LIST CLIENTE */
cliente.get(function(req,res,next){


    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM Clientes', function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.render('cliente',{title:"RESTful Crud Example",data:rows});

         });

    });

});

/* ADD CLIENTE */
cliente.post(function(req, res, next){

    //validation    
    req.assert('nome','Nome is required').notEmpty();
    req.assert('cpf','A valid CPF is required').notEmpty();

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
    var data = {
        nome:req.body.nome,
        cpf:req.body.cpf
     };

    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("INSERT INTO Clientes set ? ", data, function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.sendStatus(200);

        });

     });

});

var cliente_edit = router.route('/cliente/:cpf');

/* EDIT CLIENTE */
cliente_edit.put(function(req,res,next){
    var user_id = req.params.cpf;

    //validation
    req.assert('nome','Name is required').notEmpty();
    req.assert('cpf','A valid cpf is required').notEmpty();

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
    var data = {
        nome:req.body.nome,
        cpf:req.body.cpf
     };

    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE Clientes set ? WHERE cpf = ? ",[data,cpf], function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.sendStatus(200);

        });

     });

});

/* DELETE CLIENTE */
cliente_edit.delete(function(req,res,next){

    var cpf = req.params.cpf;

     req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("DELETE FROM Clientes  WHERE cpf = ? ",[cpf], function(err, rows){

             if(err){
                console.log(err);
                return next("Mysql error, check your query");
             }

             res.sendStatus(200);

        });
        //console.log(query.sql);

     });
});

//now we need to apply our router here
app.use('/api', router);

//start Server
var server = app.listen(http_port,function(){
   console.log("Listening to port %s",server.address().port);

});
