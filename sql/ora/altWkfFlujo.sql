-- Add/modify columns 
alter table WKF_FLUJO add fsistema number(11);
alter table WKF_FLUJO add mxgraph clob;
create unique index IU_FLUJO_NOMBRE on WKF_FLUJO (cnombre);
