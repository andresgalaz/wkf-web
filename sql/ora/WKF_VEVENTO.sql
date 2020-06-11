CREATE OR REPLACE VIEW WKF_VEVENTO AS
SELECT -- Evento
       ev.pEvento,
       ev.pSecuencia,
       ev.tCreacion,
       ev.tActiva,
       ev.tEstimadaFin,
       ev.nDuracionOriginal,
       ev.nDuracionFinal
       -- Etapa Actual
      ,
       ev.fEtapa,
       et.cTitulo                   as cEtapaTitulo,
       et.bFin                      as bEtapaFin,
       et.cNombre                   as cEtapa,
       et.fFlujo,
       f.cNombre                    as cFlujo,
       f.cTitulo                    as cFlujoTitulo
       -- Usuario Actual (creador del evento)
       ,
       ev.fUsuario,
       NVL(u.cUsuario, ev.cUsuario) as cUsuario,
       u.cNombre                    as cUsuarioNombre,
       u.cEmail                     as cUsuarioEmail
       -- Usuario Asignado
       ,
       ev.fUsuarioAsignado                   as pUsuarioAsignado,
       nvl(ua.cUsuario, ev.cusuarioasignado) as cUsuarioAsignado,
       ua.cNombre                            as cUsuarioAsignadoNombre,
       ua.cEmail                             as cUsuarioAsignadoEmail,
       jm.fUsuarioPadre                      as pUsuarioAsignadoPadre
       -- Accion Ejecutada
       ,
       ev.fAccion,
       a.cTitulo                    as cAccionTitulo,
       a.cNombre                    as cAccionNombre,
       a.cJsonData                  as cEstiloAccion
       -- Etapa Anterior
       ,
       a.fEtapaOrigen               as pEtapaAnterior,
       ea.cTitulo                   as cEtapaAnteriorTitulo,
       ea.cNombre                   as cEtapaAnterior,
       ea.bInicio,
       ea.bFin
       -- Rol
       ,
       ev.fRolFuncion,
       rf.cNombre                   as cRolFuncion,
       rf.cTitulo                   as cRolFuncionTitulo

  FROM wkf_evento ev
 INNER JOIN wkf_etapa et
    ON et.pEtapa = ev.fEtapa
 INNER JOIN wkf_flujo f
    ON f.pFlujo = et.fFlujo
  LEFT OUTER JOIN wkf_accion a
    ON a.pAccion = ev.fAccion
-- Etapa Anterior
  LEFT OUTER JOIN wkf_etapa ea
    ON ea.pEtapa = a.fEtapaOrigen
-- Usuario Actual
  LEFT OUTER JOIN tUsuario u
    ON u.pUsuario = ev.fUsuario
-- Usuario Asignado
  LEFT OUTER JOIN tUsuario ua
    ON ua.pUsuario = ev.fUsuarioAsignado
  LEFT OUTER JOIN wkf_jerarqMiembro jm
    ON jm.fUsuario = ev.fUsuarioAsignado
-- Rol
  LEFT OUTER JOIN wkf_rolFuncion rf
    ON rf.pRol = ev.fRolFuncion

 WHERE ev.bActiva = '1'
   AND et.btarea = '1';
