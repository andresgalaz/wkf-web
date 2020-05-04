ALTER TABLE `xformgen4`.`wkf_accion` 
DROP FOREIGN KEY `FKACCIONETAPA_ORIGEN`;

ALTER TABLE `xformgen4`.`wkf_accionDestino` 
  DROP FOREIGN KEY  `FK_ACCIONDESTINO_ACCION`;

ALTER TABLE `xformgen4`.`wkf_accionFuncion` 
  DROP FOREIGN KEY `FK_WKFACCIONFUNCION_ACCION`;

ALTER TABLE `xformgen4`.`wkf_accion` 
CHANGE COLUMN `PACCION` `pAccion` INT(11) NOT NULL ,
CHANGE COLUMN `FETAPAORIGEN` `fEtapaOrigen` INT(11) NOT NULL ,
CHANGE COLUMN `FSUBFLUJO` `fSubFlujo` INT(11) NULL DEFAULT NULL COMMENT 'Apunta a un nuevo flujo' ,
CHANGE COLUMN `CTITULO` `cTitulo` VARCHAR(40) NULL DEFAULT NULL COMMENT 'Titulo en el boton del frontend' ,
CHANGE COLUMN `CNOMBRE` `cNombre` VARCHAR(40) NOT NULL COMMENT 'Nombre propio de la accion' ,
CHANGE COLUMN `NORDEN` `nOrden` SMALLINT(4) NULL DEFAULT NULL COMMENT 'Orden en que se coloca el boton' ,
CHANGE COLUMN `CESTILO` `cJsonData` TEXT NULL DEFAULT NULL COMMENT 'Configuracion del boton para el front' ;

ALTER TABLE `xformgen4`.`wkf_accion` 
CHANGE COLUMN `cJsonData` `cJsonData` JSON NULL DEFAULT NULL COMMENT 'Data no estructurada: Configuracion del boton para el front' ;

ALTER TABLE `xformgen4`.`wkf_accion` 
CHANGE COLUMN `pAccion` `pAccion` INT(11) NOT NULL AUTO_INCREMENT ;

ALTER TABLE `xformgen4`.`wkf_accion` 
ADD CONSTRAINT `FKACCIONETAPA_ORIGEN`
  FOREIGN KEY (`fEtapaOrigen`)
  REFERENCES `xformgen4`.`wkf_etapa` (`pEtapa`);

ALTER TABLE `xformgen4`.`wkf_accionDestino` 
  ADD CONSTRAINT `FK_ACCIONDESTINO_ACCION` FOREIGN KEY (`PACCION`) REFERENCES `wkf_accion` (`PACCION`);

ALTER TABLE `xformgen4`.`wkf_accionFuncion` 
  ADD CONSTRAINT `FK_WKFACCIONFUNCION_ACCION` FOREIGN KEY (`PACCION`) REFERENCES `wkf_accion` (`PACCION`);
