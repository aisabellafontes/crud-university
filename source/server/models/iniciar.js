var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

// carregar configuracoes do servidor
var port = 8000;
var host = "localhost",
var user = "agropec.admin",
var password = "admin"

var app = express();
var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'assets')));

// development only
app.use(express.errorHandler());

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'mysql://localhost:3306/',
        user: user,
        password : password,
        port : port,
        database: database

    },'pool') //or single

);


//caregar as rotas dos modelos
var cliente = require('./routes/cliente'); 
app.get('/', routes.index);
app.get('/customers', cliente.list);
app.get('/customers/add', cliente.add);
app.post('/customers/add', cliente.save);
app.get('/customers/delete/:id', cliente.delete_customer);
app.get('/customers/edit/:id', cliente.edit);
app.post('/customers/edit/:id',cliente.save_edit);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Ouvindo servidor na porta 8000 ' + app.get('port'));
});