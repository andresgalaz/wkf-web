ALTER TABLE `xformgen4`.`wkf_etapa` 
   DROP FOREIGN KEY `FKETAPA_FLUJO`,
   DROP FOREIGN KEY `FKETAPA_ROLFUNCION`;
ALTER TABLE `wkf_accion` 
DROP FOREIGN KEY  `FKACCIONETAPA_ORIGEN` ;

ALTER TABLE `wkf_evento` 
  DROP FOREIGN KEY  `FKEVENTO_ETAPA`;
ALTER TABLE `wkf_accionDestino` 
  DROP FOREIGN KEY  `FK_ACCIONDESTINO_ETAPA`;
ALTER TABLE `wkf_etapaFuncion` 
  DROP FOREIGN KEY  `FK_WKFETAPAFUNCION_ETAPA`;
   
ALTER TABLE `xformgen4`.`wkf_etapa` 
ADD COLUMN `cJsonData` JSON NULL AFTER `bAutorizacion`,
CHANGE COLUMN `PETAPA` `pEtapa` INT(11) NOT NULL ,
CHANGE COLUMN `CTITULO` `cTitulo` VARCHAR(50) NOT NULL COMMENT 'Etiqueta para usar en los formularios' ,
CHANGE COLUMN `BINICIO` `bInicio` CHAR(1) NOT NULL DEFAULT '0' COMMENT 'Indica si la etapa es de Inicio (solo puede haber una)' ,
CHANGE COLUMN `BFIN` `bFin` CHAR(1) NOT NULL DEFAULT '0' COMMENT 'Indica si la etapa es de Fin (pueden haber varias)' ,
CHANGE COLUMN `FFLUJO` `fFlujo` INT(11) NOT NULL ,
CHANGE COLUMN `CNOMBRE` `cNombre` VARCHAR(50) NULL DEFAULT NULL COMMENT 'Nombre unico de la etapa dentro del flujo' ,
CHANGE COLUMN `BOR` `bOR` CHAR(1) NOT NULL DEFAULT '0' COMMENT 'Indica si es una etapa OR o AND, por defecto todas son AND' ,
CHANGE COLUMN `NDURACION` `nDuracion` INT(11) NOT NULL DEFAULT '480' COMMENT 'Duracion en minutos, por defecto 8 horas' ,
CHANGE COLUMN `FROLFUNCION` `fRolFuncion` INT(11) NULL DEFAULT '1' COMMENT 'Rol Funcion que debe realzar la tarea' ,
CHANGE COLUMN `BTAREA` `bTarea` CHAR(1) NULL DEFAULT '0' COMMENT 'Indica si la etapa corresponde a una tarea' ,
CHANGE COLUMN `CURL` `cURL` VARCHAR(50) NULL DEFAULT NULL COMMENT 'URL dentro de la aplicacion especifica vinculada a la tarea (por encima de la vinculada al flujo)' ,
CHANGE COLUMN `BAUTORIZACION` `bAutorizacion` CHAR(1) NULL DEFAULT '0' ;

ALTER TABLE `xformgen4`.`wkf_etapa` 
ADD CONSTRAINT `FKETAPA_FLUJO`
  FOREIGN KEY (`fFlujo`)
  REFERENCES `xformgen4`.`wkf_flujo` (`PFLUJO`),
ADD CONSTRAINT `FKETAPA_ROLFUNCION`
  FOREIGN KEY (`fRolFuncion`)
  REFERENCES `xformgen4`.`wkf_rolFuncion` (`PROL`);

ALTER TABLE `wkf_accion` 
ADD CONSTRAINT `FKACCIONETAPA_ORIGEN` FOREIGN KEY (`fEtapaOrigen`) REFERENCES `wkf_etapa` (`pEtapa`);

ALTER TABLE `wkf_evento` 
  ADD CONSTRAINT `FKEVENTO_ETAPA` FOREIGN KEY (`FETAPA`) REFERENCES `wkf_etapa` (`pEtapa`);

ALTER TABLE `wkf_accionDestino` 
  ADD CONSTRAINT `FK_ACCIONDESTINO_ETAPA` FOREIGN KEY (`pEtapaDestino`) REFERENCES `wkf_etapa` (`pEtapa`);

ALTER TABLE `wkf_etapaFuncion` 
ADD CONSTRAINT `FK_WKFETAPAFUNCION_ETAPA` FOREIGN KEY (`pEtapa`) REFERENCES `wkf_etapa` (`pEtapa`);
