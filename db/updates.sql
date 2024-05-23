CREATE UNIQUE INDEX tb_atividade_economica_codigo_IDX USING BTREE ON soteriasoft.tb_atividade_economica (codigo);
ALTER TABLE soteriasoft.tb_atividade_economica MODIFY COLUMN codigo int auto_increment NOT NULL;

CREATE UNIQUE INDEX tb_atividade_economica_setor_codigo_IDX USING BTREE ON soteriasoft.tb_atividade_economica_setor (codigo);
ALTER TABLE soteriasoft.tb_atividade_economica_setor MODIFY COLUMN codigo int auto_increment NOT NULL;

CREATE UNIQUE INDEX tb_atividade_economica_subsetor_codigo_IDX USING BTREE ON soteriasoft.tb_atividade_economica_subsetor (codigo);
ALTER TABLE soteriasoft.tb_atividade_economica_subsetor MODIFY COLUMN codigo int auto_increment NOT NULL;

CREATE INDEX tb_bairro_Nome_IDX USING BTREE ON soteriasoft.tb_bairro (Nome);

ALTER TABLE soteriasoft.tb_cbo MODIFY COLUMN CBO varchar(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL;
CREATE UNIQUE INDEX tb_cbo_CBO_IDX USING BTREE ON soteriasoft.tb_cbo (CBO);
CREATE INDEX tb_cbo_Descricao_IDX USING BTREE ON soteriasoft.tb_cbo (Descricao);

CREATE INDEX tb_endereco_Nome_IDX USING BTREE ON soteriasoft.tb_endereco (Nome);

ALTER TABLE soteriasoft.tb_cep CHANGE complemento complemento varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL AFTER endereco;
ALTER TABLE soteriasoft.tb_cep CHANGE estado estado int NULL AFTER cep;
ALTER TABLE soteriasoft.tb_cep CHANGE cidade cidade int NULL AFTER estado;
ALTER TABLE soteriasoft.tb_cep CHANGE bairro bairro int NULL AFTER cidade;

drop table tb_pessoa;
drop table tb_pessoa_fisica;
drop table tb_pessoa_juridica;
drop table tb_pessoa_email;
drop table tb_pessoa_fone;
drop table tb_usuario;

-- soteriasoft.tb_pessoa_endereco_eletronico definition
CREATE TABLE `tb_pessoa_endereco_eletronico` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `pessoa` int NOT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `tipo` int DEFAULT NULL,
  `descricao` varchar(30) DEFAULT NULL,
  UNIQUE KEY `tb_pessoa_endereco_eletronico_codigo_IDX` (`codigo`) USING BTREE,
  KEY `tb_pessoa_endereco_eletronico_pessoa_IDX` (`pessoa`) USING BTREE,
  KEY `tb_pessoa_endereco_eletronico_endereco_IDX` (`endereco`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- soteriasoft.tb_pessoa_telefone definition
CREATE TABLE `tb_pessoa_telefone` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `pessoa` int NOT NULL,
  `tipo` tinyint NOT NULL,
  `telefone` bigint DEFAULT NULL,
  `descricao` varchar(45) DEFAULT NULL,
  UNIQUE KEY `tb_pessoa_telefone_codigo_IDX` (`codigo`) USING BTREE,
  KEY `tb_pessoa_telefone_pessoa_IDX` (`pessoa`) USING BTREE,
  KEY `tb_pessoa_telefone_telefone_IDX` (`telefone`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- soteriasoft.tb_pessoa definition
CREATE TABLE `tb_pessoa` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `tipo` char(1) DEFAULT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `cep` varchar(8) DEFAULT NULL,
  `estado` int DEFAULT NULL,
  `cidade` int DEFAULT NULL,
  `bairro` int DEFAULT NULL,
  `endereco` int DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  `obs` varchar(45) DEFAULT NULL,
  `cadastro` datetime DEFAULT NULL,
  UNIQUE KEY `tb_pessoa_codigo_IDX` (`codigo`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- soteriasoft.tb_pessoa_fisica definition
CREATE TABLE `tb_pessoa_fisica` (
  `pessoa` int NOT NULL,
  `nascimento` datetime DEFAULT NULL,
  `nacionalidade` int DEFAULT NULL,
  `cidadenasc` int DEFAULT NULL,
  `ufnasc` int DEFAULT NULL,
  `sexo` char(1) DEFAULT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `identidade` varchar(15) DEFAULT NULL,
  `orgaoidentidade` varchar(10) DEFAULT NULL,
  `ufidentidade` int DEFAULT NULL,
  `estadocivil` int DEFAULT NULL,
  `conjuge` int DEFAULT NULL,
  `profissao` int DEFAULT NULL,
  `ctps` varchar(15) DEFAULT NULL,
  `pis` varchar(11) DEFAULT NULL,
  UNIQUE KEY `tb_pessoa_fisica_pessoa_IDX` (`pessoa`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- soteriasoft.tb_pessoa_juridica definition
CREATE TABLE `tb_pessoa_juridica` (
  `Pessoa` int NOT NULL,
  `razaosocial` varchar(60) DEFAULT NULL,
  `cnpj` varchar(14) DEFAULT NULL,
  `incricaoestadual` varchar(20) DEFAULT NULL,
  `atividade` int DEFAULT NULL,
  `representante` int DEFAULT NULL,
  UNIQUE KEY `tb_pessoa_juridica_Pessoa_IDX` (`Pessoa`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- soteriasoft.tb_usuario definition
CREATE TABLE `tb_usuario` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(45) DEFAULT NULL,
  `senha` varchar(45) DEFAULT NULL,
  `tipo` int DEFAULT NULL,
  `pessoa` int DEFAULT NULL,
  `cadastro` datetime DEFAULT NULL,
  UNIQUE KEY `tb_usuario_codigo_IDX` (`codigo`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=latin1;