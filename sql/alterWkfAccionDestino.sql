ALTER TABLE `xformgen4`.`wkf_accionDestino` 
	DROP FOREIGN KEY `FK_ACCIONDESTINO_ACCION`,
	DROP FOREIGN KEY `FK_ACCIONDESTINO_ETAPA`,
	DROP FOREIGN KEY `FK_ACCIONDESTINO_FLUJO`
;

ALTER TABLE `xformgen4`.`wkf_accionDestino` 
	CHANGE COLUMN `PACCION` `pAccion` INT(11) NOT NULL ,
	CHANGE COLUMN `PETAPADESTINO` `pEtapaDestino` INT(11) NOT NULL ,
	CHANGE COLUMN `FSUBFLUJO` `fSubFlujo` INT(11) NULL DEFAULT NULL COMMENT 'Apunta al Inicio de un nuevo flujo'
;

ALTER TABLE `xformgen4`.`wkf_accionDestino` 
	ADD CONSTRAINT `FK_ACCIONDESTINO_ACCION`
	  FOREIGN KEY (`pAccion`)
	  REFERENCES `xformgen4`.`wkf_accion` (`pAccion`),
	ADD CONSTRAINT `FK_ACCIONDESTINO_ETAPA`
	  FOREIGN KEY (`pEtapaDestino`)
	  REFERENCES `xformgen4`.`wkf_etapa` (`pEtapa`),
	ADD CONSTRAINT `FK_ACCIONDESTINO_FLUJO`
	  FOREIGN KEY (`fSubFlujo`)
	  REFERENCES `xformgen4`.`wkf_flujo` (`PFLUJO`)
;