/*
* @author 
*
*/

var http = require('http'); //add funcoes para requisicoes da web
var fs = require('fs'); //add funcoes de filesystem - para carregar arquivos html
var url = require('url'); //add funcoes para abrir urls e acessar conteudos
var port = 8000;
var html_dir = "../views";
var assets_dir = "../assets";

http.createServer(function (req, res) {
    console.log("Ouvindo servidor na porta 8000");
    var q = url.parse(req.url, true);
    filename = assets_dir + q.pathname;
    
    if (q.pathname.endsWith(".html")){
        filename = html_dir + q.pathname;
    }

    fs.readFile(filename, function(erros, data) {
      if (erros) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("Pagina nao encontrada");
      }  
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }).listen(port);