-- soteriasoft.tb_pessoa_endereco_eletronico definition

CREATE TABLE `tb_pessoa_endereco_eletronico` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `pessoa` int NOT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `tipo` int DEFAULT NULL,
  `descricao` varchar(30) DEFAULT NULL,
  UNIQUE KEY `tb_pessoa_endereco_eletronico_codigo_IDX` (`codigo`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=latin1;