const fs = require('fs');
const titulo = 'Categorias';
const subtitulo = 'Gerenciamento de categorias para produtos da loja';
const icone = 'fas fa-tags';
const url_add = '/categorias/adicionar/';
const url_update = '/categorias/editar/';
const url = '/categorias/';

const dadosParaPagina = {
    subtitulo: subtitulo,
    titulo: titulo,
    message: '',
    icone: icone,
    categorias: [],
    categoria: null,
    action: url_add
}

module.exports = {
    listarCategoria: (req, res) => {

        console.log("Executar açao de listar todos as categorias");
        let query = "SELECT * FROM Categoria";
        db.query(query, (sql_erro, sql_resultado) => {
            if (sql_erro){
                dadosParaPagina.message = sql_erro;
            }
            
            dadosParaPagina.categorias = sql_resultado;
            dadosParaPagina.action = url_add;
            res.render('categorias.ejs', dadosParaPagina);
        });
    },

    adicionarCategoria: (req, res) => {
        console.log("Executar açao de adicionar nova categoria");
        var message = '';
        var nome = req.body.nome_categoria;
        var descricao = req.body.descricao_categoria;
        
        //get data
        var data = {
            Nome: nome,
            Descricao: descricao
        };

        var insert = "INSERT INTO Categoria set ? "; 
        db.query(insert, data, (err, result) => {            
            if (err) {
                message = "Não foi possivel adicionar a categoria";    
                dadosParaPagina.message = message;
                res.render('clientes.ejs', dadosParaPagina);            

            }
            
            res.redirect(url);           
        });

    },

    atualizarCategoria: (req, res) => {
        console.log("Executar açao de editar categoria");
        let id = req.params.id;
        var message = '';
        var nome = req.body.nome_categoria;
        var descricao = req.body.descricao_categoria;
        
        //get data
        var data = {
            Nome: nome,
            Descricao: descricao
        };
        console.log(data, id);
        res.redirect(url);
        
        // var insert = "UPDATE Categoria set ? WHERE ID = ? "; 
        // db.query(insert, [data,cpf], (err, result) => {            
        //     if (err) {
        //         message = "Não foi possivel atualizar a categoria";    
        //         res.render('clientes.ejs', dadosParaPagina);            

        //     }
            
        //     res.redirect('/clientes/');           
        // });
    },

    detalharCategoria: (req, res) => {        
        console.log("Executar açao de editar categoria");
        let id = req.params.id;
        // var message = '';
        // var nome = req.body.nome_categoria;
        // var descricao = req.body.descricao_categoria;
        
        // //get data
        // var data = {
        //     Nome: nome,
        //     Descricao: descricao
        // };
        // console.log(data, id);

        var query = "SELECT * FROM Categoria WHERE ID = ?";
        db.query(query, [id], (err, result) => {
            dadosParaPagina.categoria = result;
        });
        dadosParaPagina.action = url_update;
        res.render('categorias.ejs', dadosParaPagina);
        // let cpf = req.params.cpf;        
        // var clientes = [];
        // console.log("Executar açao de editar  usuario CPF=", cpf);

        // var query = "SELECT * FROM Clientes";
        // db.query(query, (err, result) => {
        //     clientes = result;
        // });

        // query = "SELECT * FROM Clientes WHERE CPF="+cpf;
        // db.query(query, (err, result) => {
        //     if (err) {
        //         return res.status(500).send(err);
        //     }            
        //     res.render('clientes.ejs', {
        //         subtitulo: subtitulo,
        //         titulo: titulo,
        //         message: '',
        //         icone: icone,
        //         clientes: clientes,
        //         cliente: result[0],
        //         action: update
        //     });
        // });
    },
    
    removerCategoria: (req, res) => {
        let cpf = req.params.cpf;        
        var clientes = [];
        var message = '';
        console.log("Executar açao de remover  usuario CPF=", cpf);
        var insert = "DELETE FROM Clientes  WHERE cpf = ? "; 
        db.query(insert, [cpf], (err, result) => {            
            if (err) {
                message = "Não foi possivel remover o cliente";    
                res.render('clientes.ejs', {
                    subtitulo: subtitulo,
                    titulo: titulo,
                    message: message,
                    icone: icone,
                    clientes: [],
                    cliente: null,
                });            

            }
            
            res.redirect(url);           
        });
    }
};