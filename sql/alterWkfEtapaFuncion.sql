ALTER TABLE `xformgen4`.`wkf_etapaFuncion` 
	DROP FOREIGN KEY `FK_WKFETAPAFUNCION_ETAPA`
;

ALTER TABLE `xformgen4`.`wkf_etapaFuncion` 
	CHANGE COLUMN `PETAPA` `pEtapa` INT(11) NOT NULL ,
	CHANGE COLUMN `PSECUENCIA` `pSecuencia` SMALLINT(5) NOT NULL ,
	CHANGE COLUMN `CFUNCION` `cFuncion` VARCHAR(100) NOT NULL ,
	CHANGE COLUMN `CALIAS` `cAlias` VARCHAR(30) NULL DEFAULT NULL ,
	CHANGE COLUMN `CTPFUNCION` `cTpFuncion` CHAR(1) NOT NULL DEFAULT 'I' COMMENT 'Cuando se ejecuta \'I\' a la entrada, \'O\' a la salida o \'L\' solo lectura' ,
	CHANGE COLUMN `CTPEJECUCION` `cTpEjecucion` VARCHAR(10) NOT NULL DEFAULT 'SQL' COMMENT 'Indica tipo de ejecucion' 
;

ALTER TABLE `xformgen4`.`wkf_etapaFuncion` 
	ADD CONSTRAINT `FK_WKFETAPAFUNCION_ETAPA`
	  FOREIGN KEY (`pEtapa`)
	  REFERENCES `xformgen4`.`wkf_etapa` (`pEtapa`)
;
