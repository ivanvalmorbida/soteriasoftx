
CREATE UNIQUE INDEX tb_atividade_economica_codigo_IDX USING BTREE ON soteriasoft.tb_atividade_economica (codigo);
ALTER TABLE soteriasoft.tb_atividade_economica MODIFY COLUMN codigo int auto_increment NOT NULL;

CREATE UNIQUE INDEX tb_atividade_economica_setor_codigo_IDX USING BTREE ON soteriasoft.tb_atividade_economica_setor (codigo);
ALTER TABLE soteriasoft.tb_atividade_economica_setor MODIFY COLUMN codigo int auto_increment NOT NULL;


CREATE UNIQUE INDEX tb_atividade_economica_subsetor_codigo_IDX USING BTREE ON soteriasoft.tb_atividade_economica_subsetor (codigo);
ALTER TABLE soteriasoft.tb_atividade_economica_subsetor MODIFY COLUMN codigo int auto_increment NOT NULL;
