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
    message_erro: '',
    message_sucesso: '',
    icone: icone,
    funcionarios: [],
    funcionario: null,
    action: url_add,
    supervisores: []
}

module.exports = {
    listarFuncionario: (req, res) => {
        console.log("Executar açao de listar todos os funcionários");

        dadosParaPagina.action = url_add;
        dadosParaPagina.message_sucesso = '';
        dadosParaPagina.message_erro = '';

        var query_supervisor = "select  f.* " + 
                                "from  funcionarios f " + 
                                "where f.Tipo = 'supervisor'";
        db.query(query_supervisor, function(erro, resultado){
            if(resultado){
                dadosParaPagina.supervisores = resultado;
               // console.log("resultado: ", resultado);
            }
        });
        let query = " select distinct f1.CPF, f1.Nome, f1.Tipo, f2.Nome as Supervisor, a.Nro_Vendas as Qtde" +
                    " from funcionarios f1, atendente a, funcionarios f2 " +
                    " where f1.CPF = a.CPF_Atendente and f1.CPF_Supervisor = f2.CPF " +                    
                    " UNION " +                    
                    " select distinct f1.CPF, f1.Nome, f1.Tipo, f2.Nome as Supervisor, ft.Nro_Entregas as Qtde " +
                    " from funcionarios f1, freteiro ft, funcionarios f2 " +
                    " where f1.CPF = ft.CPF_FRETEIRO and f1.CPF_Supervisor = f2.CPF  " +
                    " UNION " +                    
                    " select distinct f1.CPF, f1.Nome, f1.Tipo, f2.Nome as Supervisor, 0 as Qtde " +
                    " from funcionarios f1, funcionarios f2 " +
                    " where f1.Tipo = 'supervisor'  and f2.CPF = f1.CPF_Supervisor " +
                    "UNION " +
                    "select f1.CPF, f1.Nome, f1.Tipo, '' as Supervisor, 0 as Qtde " +
                    "from funcionarios f1 where f1.Tipo = 'supervisor' and f1.CPF_Supervisor IS NULL";
                   // console.log(query); 
        db.query(query, function (erro, resultado) {
            if (erro){
                var message = "Não foi possivel listar funcionários. Erro:" + erro;
                dadosParaPagina.message_erro = message;
            }
            
            dadosParaPagina.funcionarios = resultado;
            dadosParaPagina.funcionario = null;
            res.render('funcionarios.ejs', dadosParaPagina);
        });
    },

    adicionarFuncionario: (req, res) => {
        console.log("Executar açao de adicionar novo funcionário");

        // receber as variaveis do template ejs (html)
        var message = '';
        var nome = req.body.nome_funcionario;
        var cpf = req.body.cpf_funcionario;
        var cargo = req.body.cargos_funcionario;
        var cpf_supervisor = req.body.supervisor_funcionario;
        var cpf_supervisor2 = cpf_supervisor;

        console.log("cpf_supervisor: ", cpf_supervisor);
        if(cpf_supervisor === undefined || cpf_supervisor == null || cpf_supervisor == ''){
            cpf_supervisor = cpf;
            cpf_supervisor2 = null;
        }

        //set data
        var data = {           
            CPF: cpf,
            Nome: nome,
            Tipo: cargo,
            CPF_Supervisor: cpf_supervisor2
        };        
        
        var insert = "INSERT INTO Funcionarios SET ? ";
        db.query(insert, data, function(erro, resultado){            
            if (erro) {
                var message = "Não foi possivel adicionar o funcionario";    
                dadosParaPagina.message_erro = message;
                dadosParaPagina.action = url_add;
                res.render('funcionarios.ejs', dadosParaPagina);
            }       
            
        });
        console.log("Adicionou o funcionario");
        
        if(cargo == "supervisor"){
            var query = "INSERT INTO Supervisor SET ? "; 
            var dados_freteiro = {
                CPF_Supervisor: cpf_supervisor,
                CPF_Supervisionado: cpf
            }    
            db.query(query, dados_freteiro, (erro, resultado) =>{
                if (erro) {
                    message = "Não foi possivel adicionar o Supervisor: " + erro; 
                    
                   var delete_query = "DELETE FROM Funcionarios WHERE CPF ? ";
                    db.query(delete_query, [cpf]);

                    dadosParaPagina.message_erro = message;
                    dadosParaPagina.action = url_add;
                    res.render('funcionarios.ejs', dadosParaPagina);
                }
                else{
                    res.redirect(url_list);
                }
            });
        }
        else if(cargo === "atendente"){
            console.log(" ENTRA AQUI!!!!");
            var query = "INSERT INTO Atendente SET ? "; 
            var dados_atendente = {               
                CPF_Atendente: cpf,
                Nro_Vendas: 0
            }    
            db.query(query, dados_atendente, function(erro, resultado){
                if (erro) {
                    var message = "Não foi possivel adicionar o Atendente"; 
                   
                    var delete_query = "DELETE FROM Funcionarios WHERE CPF ? ";
                    db.query(delete_query, [cpf]);     

                    dadosParaPagina.message_erro = message;                    
                    res.render('funcionarios.ejs', dadosParaPagina);
                }
                else{
                    res.redirect(url_list);
                }
            });
        }
        else if(cargo === "freteiro"){
            var query = "INSERT INTO Freteiro SET ? "; 
            var dados_freteiro = {
                Nro_Entregas: 0,
                CPF_Freteiro: cpf
            }    
            db.query(query, dados_freteiro, (erro, resultado) =>{
                if (erro) {
                    message = "Não foi possivel adicionar o Freteiro"; 
                    
                    var delete_query = "DELETE FROM Funcionarios WHERE CPF ? ";
                    db.query(delete_query, [cpf]); 

                    dadosParaPagina.message_erro = message;
                    res.render('funcionarios.ejs', dadosParaPagina);
                }
                else{
                    res.redirect(url_list);
                }
            });
        }
        
    },

    atualizarFuncionario: (req, res) => {
        console.log("Executar açao de editar funcionário");

        // receber as variaveis do template ejs (html)
        var nome = req.body.nome_funcionario;
        var cpf = req.body.cpf_funcionario;
        var cargo = req.body.cargos_funcionario;
        var cpf_supervisor = req.body.supervisor_funcionario;
        
        //set data
        var data = {
            CPF: cpf,
            Nome: nome,
            Tipo: cargo,
            CPF_Supervisor: cpf_supervisor
        };
        
        console.log(data);

        res.redirect(url_list);
    },

    detalharFuncionario: (req, res) => {        
        console.log("Executar açao de listar fornecedor id = ", req.params.cpf);
        let cpf = req.params.cpf;
        
        var query_supervisor = "select  f.*, s.* " + 
                                "from Supervisor s, funcionarios f " + 
                                "where f.CPF = s.CPF_Supervisor group by f.cpf";
        db.query(query_supervisor, function(erro, resultado){
            if(resultado){
                dadosParaPagina.supervisores = resultado;
                //console.log("resultado: ", resultado);
            }
        });

        var query = "SELECT * FROM Funcionarios WHERE CPF = "+ cpf;
        db.query(query, function (erro, resultado) {
            if (erro) {
                dadosParaPagina.message_erro = "Não foi possivel encontrar fornecedor.Erro:" + erro;
                dadosParaPagina.action = url_add;
                res.render('funcionarios.ejs', dadosParaPagina);
            }
            dadosParaPagina.funcionario = resultado[0];
            dadosParaPagina.action = url_update;
            res.render('funcionarios.ejs', dadosParaPagina);
        });
    },
    
    removerFuncionario: (req, res) => {
        /*
        ATENÇÃO: AS CONSULTAS DEVEM SER FEITAS DENTRO DE DB.QUERY nesse caso.
        Para remover o funcionario é necessario buscar todas as informacoes do mesmo
        Após encontrar os dados do funcionarios:
        - Armazenar o Tipo do Funcionario (Cargo)
        - verificar em qual tabela precisa ser removido (de acordo com o cargo)
        */
       console.log("Executar açao de remover funcionário por CPF =", req.params.cpf);
       let cpf = req.params.cpf;    
       
       var query_verifica_venda = "select count(*) as venda from vendas where CPF_atendente = ? OR CPF_freteiro = ?";
       db.query(query_verifica_venda, [cpf, cpf], function (erro, resultado){
           if(resultado){
               var venda = resultado[0].venda;
               console.log("venda = ", venda);

               if(parseInt(venda) == 0){
                   dadosParaPagina.message_erro = "Esse funcionário possui vendas e não pode ser apagado!";
                   res.render('funcionarios.ejs', dadosParaPagina);
               }
           }
       });

    }
};