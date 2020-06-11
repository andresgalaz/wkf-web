DROP VIEW wkf_vEvento_original ;
CREATE VIEW wkf_vEvento_original AS
    SELECT 
        ev.PEVENTO AS pEvento,
        ev.PSECUENCIA AS pSecuencia,
        ev.TCREACION AS tCreacion,
        ev.TACTIVA AS tActiva,
        ev.TESTIMADAFIN AS tEstimadaFin,
        ev.NDURACIONORIGINAL AS nDuracionOriginal,
        ev.NDURACIONFINAL AS nDuracionFinal,
        ev.FETAPA AS fEtapa,
        et.cTitulo AS cEtapaTitulo,
        et.bFin AS bEtapaFin,
        et.cNombre AS cEtapa,
        et.fFlujo AS fFlujo,
        f.CNOMBRE AS cFlujo,
        ev.FUSUARIO AS fUsuario,
        IFNULL(u.CUSUARIO, ev.CUSUARIO) AS cUsuario,
        u.CNOMBRE AS cUsuarioNombre,
        u.CEMAIL AS cUsuarioEmail,
        ev.FACCION AS fAccion,
        a.cTitulo AS cAccionTitulo,
        a.cNombre AS cAccionNombre,
        a.cJsonData AS cJsonData,
        a.FETAPAORIGEN AS pEtapaAnterior,
        ea.CTITULO AS cEtapaAnteriorTitulo,
        ea.BINICIO AS bInicio,
        ea.BFIN AS bFin,
        ea.CNOMBRE AS cEtapaAnterior
    FROM
        wkf_evento ev
        JOIN wkf_etapa et ON et.PETAPA = ev.FETAPA
        JOIN wkf_flujo f ON f.PFLUJO = et.FFLUJO
        LEFT JOIN wkf_accion a ON a.PACCION = ev.FACCION
        LEFT JOIN wkf_etapa ea ON ea.PETAPA = a.FETAPAORIGEN
        LEFT JOIN tUsuario u ON u.PUSUARIO = ev.FUSUARIO
    WHERE
        ev.PSECUENCIA = (SELECT  MAX(evm.PSECUENCIA)
            FROM wkf_evento evm
            WHERE evm.PEVENTO = ev.PEVENTO)
    ORDER BY ev.PEVENTO , ev.PSECUENCIA DESC
