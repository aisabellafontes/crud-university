const fs = require('fs');
const titulo = 'Funcionários';
const subtitulo = 'Gerenciamento dos Funcionários da loja';
const icone = 'fas fa-user-cog';
const url_add = '/funcionarios/adicionar/';
const url_update = '/funcionarios/editar/';
const url_list = '/funcionarios/';

const dadosParaPagina = {
    subtitulo: subtitulo,
    titulo: titulo,
    message: '',
    icone: icone,
    funcionarios: [],
    funcionario: null,
    action: url_add
}

module.exports = {
    listarFuncionario: (req, res) => {
        console.log("Executar açao de listar todos os funcionários");
        let query = " select f1.CPF, f1.Nome, f1.Tipo, f2.Nome as Supervisor, a.Nro_Vendas as Qtde" +
                    " from funcionarios f1, atendente a, funcionarios f2 " +
                    " where f1.CPF = a.CPF_Atendente and f1.CPF_Supervisor = f2.CPF " +                    
                    " UNION " +                    
                    " select f1.CPF, f1.Nome, f1.Tipo, f2.Nome as Supervisor, ft.Nro_Entregas as Qtde " +
                    " from funcionarios f1, freteiro ft, funcionarios f2 " +
                    " where f1.CPF = ft.CPF_FRETEIRO and f1.CPF_Supervisor = f2.CPF " +
                    " UNION " +                    
                    " select f1.CPF, f1.Nome, f1.Tipo, f2.Nome as Supervisor, 0 as Qtde " +
                    " from funcionarios f1, funcionarios f2 " +
                    " where f1.Tipo = 'supervisor' and f1.CPF_Supervisor = f2.CPF ";
        db.query(query, (sql_erro, sql_resultado) => {
            if (sql_erro){
                dadosParaPagina.message = sql_erro;
            }
            
            dadosParaPagina.funcionarios = sql_resultado;
            dadosParaPagina.action = url_add;
            dadosParaPagina.message = '';
            dadosParaPagina.funcionario = null;
            res.render('funcionarios.ejs', dadosParaPagina);
        });
    },

    adicionarFuncionario: (req, res) => {
        console.log("Executar açao de adicionar novo funcionário");
        var message = '';
        var nome = req.body.nome_funcionario;
        var cpf = req.body.cpf_funcionario;
        var cargo = req.body.cargos_funcionario;
        var cpf_supervisor = req.body.supervisor_funcionario;

        //get data
        var data = {           
            CPF: cpf,
            Nome: nome,
            Tipo: cargo,
            CPF_Supervisor: cpf_supervisor
        };        
        
        var insert = "INSERT INTO Funcionarios SET ? ";
        db.query(insert, data, (err, result) => {            
            if (err) {
                message = "Não foi possivel adicionar o funcionario";    
                dadosParaPagina.message = message;
                console.log("fudeu!", err)
                res.render('funcionarios.ejs', dadosParaPagina);
            }         
            console.log(result);
        });
        console.log("Adicionou o funcionario");
        
        if(cargo === "atendente"){
            console.log(" ENTRA AQUI!!!!");
            var query = "INSERT INTO Atendente SET ? "; 
            var dados_atendente = {               
                CPF_Atendente: cpf,
                Nro_Vendas: 0
            }    
            db.query(query, dados_atendente, (err, resultado) =>{
                if (err) {
                    message = "Não foi possivel adicionar o Atendente"; 
                    // TODO: REMOVER O FUNCIONARIO    
                    dadosParaPagina.message = message;                    
                    res.render('funcionarios.ejs', dadosParaPagina);
                }
                console.log(resultado);
            });
        }
        else if(cargo === "freteiro"){
            var query = "INSERT INTO Freteiro SET ? "; 
            var dados_freteiro = {
                Nro_Entregas: 0,
                CPF_Freteiro: cpf
            }    
            db.query(query, dados_freteiro, (err, resultado) =>{
                if (err) {
                    message = "Não foi possivel adicionar o Freteiro"; 
                    // TODO: REMOVER O FUNCIONARIO                        
                    dadosParaPagina.message = message;
                    res.render('funcionarios.ejs', dadosParaPagina);
                }
                console.log(resultado);
            });
        }
        res.redirect(url_list);
    },

    atualizarFuncionario: (req, res) => {
        console.log("Executar açao de editar funcionário");
        var message = '';
        var nome = req.body.nome_funcionario;
        var cpf = req.body.cpf_funcionario;
        var cargo = req.body.cargos_funcionario;
        var cpf_supervisor = req.body.supervisor_funcionario;
        
        //get data
        var data = {
            Nome: nome,
            CPF: cpf
        };
        // console.log(data, id);
        // res.redirect(url);
        
        var insert = "UPDATE Funcionarios set ? WHERE CPF = ? "; 
        db.query(insert, [data, id], (err, result) => {            
            if (err) {
                console.log("XIiiiiiii");
                message = "Não foi possivel atualizar o funcionário";    
                dadosParaPagina.message = message;
                res.render('funcionarios.ejs', dadosParaPagina);            

            }
            console.log("deu bom!");
            dadosParaPagina.action = url_add;
            dadosParaPagina.message = '';            
            res.redirect(url_list);           
        });
    },

    detalharFuncionario: (req, res) => {        
        console.log("Executar açao de listar a categoria selecionada!!!");
        let id = req.params.id;
        
        var query = "SELECT * FROM Categoria WHERE ID = "+ id;
        db.query(query, (err, resultado) => {
            if (err) {
                return res.status(500).send(err);
            }            
            dadosParaPagina.categoria = resultado[0];
            dadosParaPagina.action = url_update;       
            // console.log(dadosParaPagina);
            res.render('categorias.ejs', dadosParaPagina);
        });
    },
    
    removerFuncionario: (req, res) => {
        /*
            Para remover a categoria é necessario
            1 - Remover a categoria do Produto
            2 - Remover a categoria
        */
       let id = req.params.id;        
       console.log("Executar açao de remover categoria por ID =", id);

     //TODO: Remover relacoes dos produtos e categorias
    //    var select_produtos = "SELECT Codigo FROM produtos WHERE ID_Categoria =";
    //    db.query(select_cliente, [cpf], function(err, resultado){
    //        if(!err){
    //            telefone = resultado[0];
    //        }
    //    });
       
       var delete_data = "DELETE FROM Categoria  WHERE ID = ?"; 
       db.query(delete_data, [id], (err, result) => {            
           if (err) {
               message = "Não foi possivel remover a categoria";    
               dadosParaPagina.message = message;               
               res.render('categorias.ejs', dadosParaPagina);            

           }
           console.log("Apagado categoria");            
           res.redirect(url_list);           
       });
    }
};