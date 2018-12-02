const fs = require('fs');
const titulo = 'Vendas';
const subtitulo = 'Gerenciamento de vendas de produtos da loja';
const icone = 'fas fa-money-check-alt';
const url_add = '/vendas/adicionar/';
const url_update = '/vendas/editar/';
const url_list = '/vendas/';

const dadosParaPagina = {
    subtitulo: subtitulo,
    titulo: titulo,
    message_erro: '',
    message_sucesso: '',
    icone: icone,
    vendas: [],
    venda: null,
    clientes: [],
    atendentes: [],
    freteiros: [],
    produtos: [],
    action: url_add
}

module.exports = {
    listarVenda: (req, res) => {
        console.log("Executar açao de listar todos as vendas da loja");

        dadosParaPagina.action = url_add;
        dadosParaPagina.message_sucesso = '';
        dadosParaPagina.message_erro = '';

        let query_clientes = "SELECT * FROM Clientes";
        db.query(query_clientes, function (err, resultado) {
            if (!err) {
                // console.log("Clientes: ", resultado);
                dadosParaPagina.clientes = resultado;
            }
        });

        let query_atendentes = "select f.*, a.* from funcionarios f , atendente a "+ 
                                " where f.CPF = a.CPF_Atendente ";
        db.query(query_atendentes, function (err, resultado) {
            if (!err) {
                // console.log("Atendetes: ", resultado);
                dadosParaPagina.atendentes = resultado;
            }
        });

        let query_freteiros = "select f.*, ft.* from funcionarios f , freteiro ft "+ 
                                " where f.CPF = ft.CPF_Freteiro ";
        db.query(query_freteiros, function (err, resultado) {
            if (!err) {
                // console.log("Freteiros: ", resultado);
                dadosParaPagina.freteiros = resultado;
            }
        });

        let query_produtos = "select p.*, f.Nome as Nome_Fornecedor, c.Nome as Nome_Categoria " +
            "from produtos p, fornecedor f, categoria c " +
            "where p.ID_categoria = c.ID and p.ID_fornecedor = f.ID";
        db.query(query_produtos, function (err, resultado) {
            if (!err) {
                dadosParaPagina.produtos = resultado;
                dadosParaPagina.action = url_add;
                res.render('vendas.ejs', dadosParaPagina);
            }
        });

    },

    adicionarVenda: (req, res) => {
        console.log("Executar açao de adicionar novo produto");
        var message = '';

        /* parametros */
        var nome = req.body.nome_produto;
        var descricao = req.body.descricao_produto;
        var categorias = req.body.categorias;
        var fornecedores = req.body.fornecedores;
        var preco = req.body.preco;
        var qtd_estoque = req.body.qtd_estoque;

        //get data
        var data = {
            Nome: nome,
            Preco: parseFloat(preco),
            Descricao: descricao,
            ID_categoria: parseInt(categorias),
            ID_fornecedor: parseInt(fornecedores),
            QTD_Estoque: parseInt(qtd_estoque)
        };

        var query_insert = "INSERT INTO Produtos set ? ";
        db.query(query_insert, data, function (err, result) {
            if (!err) {
                res.redirect(url_list);
            }

            message = "Não foi possivel adicionar produto";
            dadosParaPagina.message_erro = message;
            res.render('vendas.ejs', dadosParaPagina);
        });

    },

    atualizarVenda: (req, res) => {
        console.log("Executar açao de editar produto ", req.body.codigo_produto);

        /* parametros */
        var codigo = req.body.codigo_produto;
        var nome = req.body.nome_produto;
        var descricao = req.body.descricao_produto;
        var categorias = req.body.categorias;
        var fornecedores = req.body.fornecedores;
        var preco = req.body.preco;
        var qtd_estoque = req.body.qtd_estoque;

        //get data
        var data = {
            Nome: nome,
            Preco: parseFloat(preco),
            Descricao: descricao,
            ID_categoria: parseInt(categorias),
            ID_fornecedor: parseInt(fornecedores),
            QTD_Estoque: parseInt(qtd_estoque)
        };

        var insert = "UPDATE Produtos set ? WHERE Codigo = ? ";
        db.query(insert, [data, codigo], (err, result) => {
            if (err) {
                message = "Não foi possivel atualizar produto";
                dadosParaPagina.message_erro = message + err;
                res.render('vendas.ejs', dadosParaPagina);

            }
            dadosParaPagina.action = url_add;
            dadosParaPagina.message_erro = '';
            dadosParaPagina.message_sucesso = "Produto atualizado com sucesso";
            res.redirect(url_list);
        });
    },

    detalharVenda: (req, res) => {
        console.log("Executar açao de listar o produto selecionado");
        let codigo = req.params.codigo;

        console.log("Codigo=", codigo);
        let query_categorias = "SELECT * FROM Categoria";
        db.query(query_categorias, function (err, resultado) {
            if (!err) {
                dadosParaPagina.categorias = resultado;
            }
        });

        let query_fornecedores = "SELECT * FROM Fornecedor";
        db.query(query_fornecedores, function (err, resultado) {
            if (!err) {
                dadosParaPagina.fornecedores = resultado;
            }
        });

        let query_produtos = "select p.*, f.Nome as Nome_Fornecedor, c.Nome as Nome_Categoria " +
            "from produtos p, fornecedor f, categoria c " +
            "where p.ID_categoria = c.ID and p.ID_fornecedor = f.ID";
        db.query(query_produtos, function (err, resultado) {
            if (!err) {
                dadosParaPagina.vendas = resultado;
            }
        });

        var query_produto = "SELECT * FROM Produtos WHERE Codigo = " + codigo;
        db.query(query_produto, function (err, resultado) {
            if (!err) {
                dadosParaPagina.produto = resultado[0];
                dadosParaPagina.action = url_update;
                res.render('vendas.ejs', dadosParaPagina);
            }
        });

    },

    removerVenda: (req, res) => {
        console.log("Remover o produto ", req.params.codigo);

        let codigo = req.params.codigo;

        /*
          TODO: verificar dependencia de produtos
          - QTDE_Vendida        
          - Venda
        */

        var query_vendas = "SELECT COUNT(*) as Total_Vendas FROM QTDE_Vendida WHERE Cod_produto = " + codigo;
        db.query(query_vendas, function (err, resultado) {
            if (resultado) {
                dadosParaPagina.message_erro = "Não será possivel porque foi encontrado "
                    + resultado[0].Total_Vendas;
                + " vendas relacionadas";
            }

            if (err) {
                message = "Não foi possivel remover o produto " + codigo;
                dadosParaPagina.message_erro = message + err;
                res.render('vendas.ejs', dadosParaPagina);
            }

        });


        var query_produto = "DELETE FROM Produtos WHERE Codigo = " + codigo;
        db.query(query_produto, function (err, resultado) {
            if (err) {
                message = "Não foi possivel remover o produto " + codigo;
                dadosParaPagina.message_erro = message + err;
                res.render('vendas.ejs', dadosParaPagina);
            } else {
                dadosParaPagina.message_sucesso = "Produto removido com sucesso";
                res.redirect(url_list);
            }
        });

    }
};