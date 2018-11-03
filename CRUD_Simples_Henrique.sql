-- CATEGORIA

INSERT 
INTO Categoria(ID, Nome, Descricao)
VALUES (5026, 'Rações', 'Ração para animais');

UPDATE Categoria
SET Nome = 'Rações Pedigree', Descricao = 'Ração apenas para animais Pedigree'
WHERE ID = 5025;

DELETE 
FROM Categoria
WHERE ID = 5025;

DELETE 
FROM Categoria
WHERE Nome LIKE '%Rações%';

SELECT *
FROM Categoria C
WHERE C.ID = 5026;

-- FORNECEDOR

INSERT
INTO fornecedor(ID, Nome, Tel)
VALUES (26, 'Master Rações', 17992156480);

UPDATE Fornecedor
SET Nome = 'Rações Master', Tel = 1899152468
WHERE ID = 25;

DELETE 
FROM Fornecedor
WHERE ID = 25;

DELETE 
FROM Fornecedor
WHERE Nome LIKE '%Master%';

DELETE 
FROM Fornecedor
WHERE Tel = ??;

SELECT *
FROM fornecedor F
WHERE F.nome LIKE '%Master%';

SELECT *
FROM fornecedor F
WHERE F.ID = 25;

SELECT *
FROM fornecedor F
WHERE F.Tel = ??;


-- PRODUTOS

INSERT 
INTO Produtos(Codigo, Nome, Preco, Descricao, ID_categoria, ID_fornecedor)
VALUES (5028, 'Ração Doguinho', 15, 'Ração para cachorros pequenos de 10Kg', 5026, 26);

UPDATE Produtos
SET Nome = 'Ração Dogão', Preco = 25, Descricao = 'Ração Para cachorros grande de 10kg', ID_Categoria = 5026, ID_Fornecedor = 26
WHERE Codigo = 5028;

DELETE 
FROM Produtos
WHERE Nome LIKE '%Ração%';

DELETE 
FROM Produtos
WHERE ID_categoria = 5026;

DELETE 
FROM Produtos
WHERE ID_fornecedor = 26;

DELETE 
FROM Produtos
WHERE Codigo = 5029;

SELECT *
FROM Produtos P
WHERE P.Nome LIKE 'Ração%';

SELECT *
FROM Produtos P
WHERE P.Codigo = 5028;

SELECT *
FROM Produtos P
WHERE P.ID_categoria = 5026;

SELECT *
FROM Produtos P
WHERE P.ID_fornecedor = 26;



-- VENDAS

INSERT
INTO Vendas(Codigo, CPF_cliente, CPF_atendente, CPF_freteiro, Tel_cliente)
VALUES (12, 41199288888, );

UPDATE Vendas
SET CPF_atendente = ???, CPF_freteiro = ??
WHERE Codigo = 12;

DELETE
FROM Vendas
WHERE CPF_cliente = ??;

DELETE
FROM Vendas
WHERE CPF_atendente = ??;

DELETE
FROM Vendas
WHERE CPF_freteiro = ??;

DELETE
FROM Vendas
WHERE Codigo = ??;

SELECT *
FROM Vendas V
WHERE V.CPF_cliente = ??;

SELECT *
FROM Vendas V
WHERE V.CPF_atendente = ??;

SELECT *
FROM Vendas V
WHERE V.CPF_freteiro = ??;

SELECT *
FROM Vendas V
WHERE Codigo = ??;

-- QTD VENDIDA

INSERT
INTO QTDE_Vendida(Cod_produto, Cod_venda, Dia_venda, Qtde)
VALUES (26, null, 2018-03-10, 18);

UPDATE QTDE_Vendida
SET Dia_venda = 2018-04-11, Qtde = 20
WHERE Cod_produto = 26;

UPDATE QTDE_Vendida
SET Dia_venda = 2018-04-11, Qtde = 20
WHERE Cod_venda = 26;

DELETE
FROM QTDE_Vendida
WHERE Cod_produto = 26;

DELETE
FROM QTDE_Vendida
WHERE Cod_venda = ??;

SELECT *
FROM QTDE_Vendida QV
WHERE QV.Cod_produto = 26;

SELECT *
FROM QTDE_Vendida QV
WHERE QV.Cod_venda = ??;