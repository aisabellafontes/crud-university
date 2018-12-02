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
    action: url_add
}

module.exports = {
    listarFuncionario: (req, res) => {
        console.log("Executar açao de listar todos os funcionários");

        dadosParaPagina.action = url_add;
        dadosParaPagina.message_sucesso = '';
        dadosParaPagina.message_erro = '';

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

        //set data
        var data = {           
            CPF: cpf,
            Nome: nome,
            Tipo: cargo,
            CPF_Supervisor: cpf_supervisor
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
        
        if(cargo === "Atendente"){
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

                    dadosParaPagina.message = message;                    
                    res.render('funcionarios.ejs', dadosParaPagina);
                    console.log("Deu erro, apagou!");
                }
                console.log(resultado);
            });
        }
        else if(cargo === "Freteiro"){
            var query = "INSERT INTO Freteiro SET ? "; 
            var dados_freteiro = {
                Nro_Entregas: 0,
                CPF_Freteiro: cpf
            }    
            db.query(query, dados_freteiro, (err, resultado) =>{
                if (err) {
                    message = "Não foi possivel adicionar o Freteiro"; 
                    
                    var delete_query = "DELETE FROM Funcionarios WHERE CPF ? ";
                    db.query(delete_query, [cpf]); 

                    dadosParaPagina.message = message;
                    res.render('funcionarios.ejs', dadosParaPagina);
                }
                console.log(resultado);
            });
        }
        else if(cargo === "Supervisor"){
            var query = "INSERT INTO Supervisor SET ? "; 
            var dados_freteiro = {
                CPF_Supervisor: cpf_supervisor,
                CPF_Supervisionado: cpf
            }    
            db.query(query, dados_freteiro, (err, resultado) =>{
                if (err) {
                    message = "Não foi possivel adicionar o Supervisor"; 
                    
                    var delete_query = "DELETE FROM Funcionarios WHERE CPF ? ";
                    db.query(delete_query, [cpf]);

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
        
        var insert = "UPDATE Funcionarios set ? WHERE CPF = ? "; 
        db.query(insert, [data, cpf], function (erro, resultado) {  
            if (erro) {
                dadosParaPagina.message_erro = "Não foi possivel atualizar o funcionário.Erro:" + erro;
                dadosParaPagina.action = url_update;
                res.render('fornecedores.ejs', dadosParaPagina);
            }
            res.redirect(url_list);
        });
    },

    detalharFuncionario: (req, res) => {        
        console.log("Executar açao de listar fornecedor id = ", req.params.cpf);
        let cpf = req.params.cpf;
        
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
       

       var cargo = null;
       var query_busca_funcionario = "SELECT F1.Tipo FROM Funcionarios F1 WHERE F1.CPF = "+ cpf; 
       db.query(query_busca_funcionario, [cpf], function (erro, resultado){
            if (erro) {
                message = "Não foi possivel achar o cargo do Funcionario";    
                dadosParaPagina.message_erro = message;                    
                res.render('funcionarios.ejs', dadosParaPagina);
            }            
            cargo = resultado[0].Tipo;
            console.log("Identificado o Funcionario com Cargo =", cargo);

            /* Remover de acordo com o cargo */
            if(cargo === "atendente"){
                var query = "DELETE FROM Atendente WHERE CPF_Atendente= ? "; 
                db.query(query, [cpf], function (erro, resultado){
                    if (erro) {
                        message = "Não foi possivel remover o Atendente"  + erro;    
                        dadosParaPagina.message_erro = message;                    
                        res.render('funcionarios.ejs', dadosParaPagina);
                    }    
                    console.log("Removido o atendente com sucesso.");
                });
            }
            else if(cargo === "freteiro"){
                var query = "DELETE FROM Freteiro WHERE CPF_Freteiro = ? ";
                db.query(query, [cpf], function (erro, resultado){
                    if (erro) {
                        message = "Não foi possivel remover o Freteiro"  + erro;                    
                        dadosParaPagina.message_erro = message;
                        res.render('funcionarios.ejs', dadosParaPagina);
                    }                    
                    console.log("Removido o atendente com sucesso.");
                });
            }
            else if(cargo === "supervisor"){
                var query = "DELETE FROM Supervisor WHERE CPF_Supervisor = ? or CPF_Supervisonado = ? ";   
                db.query(query, [cpf, cpf], function (erro, resultado){
                    if (erro) {
                        message = "Não foi possivel remover o Supervisor" + erro;                        
                        dadosParaPagina.message_erro = message;
                        res.render('funcionarios.ejs', dadosParaPagina);
                    }                    
                    console.log("Removido o atendente com sucesso.");
                });
            }

            /* Se nao houve erro, remover o funcionario finalmente */
            var query_delete_funcionario = "DELETE FROM Funcionarios  WHERE CPF = ?"; 
            db.query(query_delete_funcionario, [cpf], function (erro, resultado){            
                if (erro) {
                    message = "Não foi possivel remover o funcionário" + erro;    
                    dadosParaPagina.message_erro = message;   
                    res.render('funcionarios.ejs', dadosParaPagina);            

                }
                console.log("Removido o funcionario com sucesso.");          
                res.redirect(url_list);           
            });

        });


    }
};