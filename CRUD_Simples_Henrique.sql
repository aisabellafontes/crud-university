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

SELECT *
FROM Categoria C
WHERE C.Nome LIKE '%Rações%';



-- PRODUTOS

INSERT 
INTO Produtos(Codigo, Nome, Preco, Descricao, ID_categoria, ID_fornecedor)
VALUES (5028, 'Ração Doguinho', 15, 'Ração para cachorros pequenos de 10Kg', 5026, 26);

UPDATE Produtos
SET Nome = 'Ração Dogão', Preco = 25, Descricao = 'Ração Para cachorros grande de 10kg', ID_Categoria = 5026, ID_Fornecedor = 26
WHERE Codigo = 5028;

DELETE 
FROM Produtos
WHERE Codigo = 5029;

SELECT *
FROM Produtos P
WHERE P.Nome LIKE 'Ração%';

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

SELECT *
FROM fornecedor F
WHERE F.nome LIKE '%Master%';

-- VENDAS

INSERT
INTO vendas(ID, CPF_cliente, CPF_atendente, CPF_freteiro, Tel_cliente)
VALUES (12, 41199288888, )