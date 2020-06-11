-- Add/modify columns 
alter table WKF_ACCION rename column cestilo to CJSONDATA;
-- Add comments to the columns 
comment on column WKF_ACCION.cjsondata
  is 'Data no estructurada: Configuracion del boton para el front';
