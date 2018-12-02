const fs = require('fs');
const titulo = 'Estancia';
const subtitulo = 'Gerenciamento das estâncias dos clientes da loja';
const icone = 'fas fa-warehouse';
const url_add = '/estancias/adicionar/';
const url_update = '/estancias/editar/';
const url_list = '/estancias/';

const dadosParaPagina = {
    subtitulo: subtitulo,
    titulo: titulo,
    message_erro: '',
    message_sucesso: '',
    icone: icone,
    estancias: [],
    estancia: null,
    action: url_add
}

module.exports = {
    listarEstancia: (req, res) => {
        console.log("Executar açao de listar todos as estancias");

        dadosParaPagina.action = url_add;
        dadosParaPagina.message_sucesso = '';
        dadosParaPagina.message_erro = '';

        let query = "SELECT * FROM Estancia";
        db.query(query, function (erro, resultado) {
            if (erro) {
                var message = "Não foi possivel listar estancias. Erro:" + erro;
                dadosParaPagina.message_erro = message;
            }

            dadosParaPagina.estancias = resultado;
            dadosParaPagina.estancia = null;
            res.render('estancias.ejs', dadosParaPagina);
        });
    },

    adicionarEstancia: (req, res) => {
        console.log("Executar açao de adicionar nova estância");

        // receber as variaveis do template ejs (html)
        var message = '';
        var nome = req.body.nome_estancia;
        var cpfpropietario = req.body.cpf_propietario;
        var referencia = req.body.referencia_estancia;

        //set data
        var data = {
            Nome_Estancia: nome,
            CPF_Propietario: cpfpropietario,
            Referencia: referencia
        };

        var insert = "INSERT INTO Estancia set ? ";
        db.query(insert, data, function (erro, resultado) {
            if (erro) {
                var message = "Não foi possivel adicionar a estancia";
                dadosParaPagina.message_erro = message;
                dadosParaPagina.action = url_add;
                res.render('estancias.ejs', dadosParaPagina);
            }
            res.redirect(url_list);
        });

    },

    atualizarEstancia: (req, res) => {
        console.log("Executar açao de editar estancia");

        // receber as variaveis do template ejs (html)
        let cpf = req.body.cpf_propietario;
        var message = '';
        var nome = req.body.nome_estancia;
        var referencia = req.body.referencia_estancia;

        //set data
        var data = {
            Nome_Estancia: nome,
            CPF_Propietario: cpf,
            Referencia: referencia
        };
        // console.log(data, id);
        // res.redirect(url);

        var insert = "UPDATE Estancia set ? WHERE CPF_propietario = ? ";
        db.query(insert, [data, id], function (erro, resultado) {
            if (erro) {
                dadosParaPagina.message_erro = "Não foi possivel atualizar a estancia.Erro:" + erro;
                dadosParaPagina.action = url_update;
                res.render('estancias.ejs', dadosParaPagina);
            }
            res.redirect(url_list);
        });
    },

    detalharEstancia: (req, res) => {
        console.log("Executar açao de listar a estancia cpf = ", req.params.cpf);
        let cpf = req.params.cpf;

        var query = "SELECT * FROM Estancia WHERE CPF_propietario = " + cpf;
        db.query(query, function (erro, resultado) {
            if (erro) {
                dadosParaPagina.message_erro = "Não foi possivel encontrar estancia.Erro:" + erro;
                dadosParaPagina.action = url_add;
                res.render('estancias.ejs', dadosParaPagina);
            }
            dadosParaPagina.estancia = resultado[0];
            dadosParaPagina.action = url_update;
            res.render('estancias.ejs', dadosParaPagina);
        });
    },

    removerEstancia: (req, res) => {        
        console.log("Executar açao de remover estancia cpf=", req.params.cpf);
        let cpf = req.params.cpf;

        var delete_data = "DELETE FROM Estancia WHERE CPF_propietario = " + cpf;
        db.query(delete_data, [id], function (erro, resultado) {
            if (erro) {
                dadosParaPagina.message_erro = "Não foi possivel remover estancia.Erro:" + erro;
                res.render('estancias.ejs', dadosParaPagina);
            }
            console.log("Apagado categoria");
            res.redirect(url_list);
        });
    }
};