create or replace view vrecursopermiso as
select perm.PUSUARIO
      ,perm.FGRUPO
      ,perm.CUSUARIO
      ,perm.CNOMBREUSUARIO
      ,perm.CCODARBOL
      ,perm.CACCION
      ,perm.CICONCLS
      ,perm.CNOMBRERECURSO
      ,perm.FRECURSOPADRE
      ,perm.BESHOJA
      ,perm.FTPACCESO
      ,perm.FSISTEMA AS FSISTEMA
      ,perm.PRECURSO AS PRECURSO
      ,acc.CDESCRIPCION AS CTPACCESO
  from (select usr.pusuario
             , usr.fgrupo
             , usr.cusuario
             , usr.cnombre cnombreusuario
             , rechijo.ccodarbol
             , rechijo.caccion
             , rechijo.ciconcls
             , rechijo.cnombre cnombrerecurso
             , rechijo.fpadre frecursopadre
             , rechijo.beshoja
             , max(per.ftpacceso) fTpAcceso
             , rechijo.fSistema
             , rechijo.pRecurso
          from tUsuario usr
         inner join tUsuarioPerfil usp
            on usp.pusuario = usr.pusuario
         inner join tPermiso per
            on per.fperfil = usp.pperfil
         inner join tRecurso rec
            on rec.precurso = per.frecurso, tRecurso rechijo
         where rechijo.ccodarbol like rec.ccodarbol || '%'
         group by usr.pusuario
                , usr.fgrupo
                , usr.cusuario
                , usr.cnombre
                , rechijo.ccodarbol
                , rechijo.caccion
                , rechijo.ciconcls
                , rechijo.cnombre
                , rechijo.fpadre
                , rechijo.beshoja
                , rechijo.fSistema
                , rechijo.pRecurso

         order by rechijo.ccodarbol) perm
 inner join tTpAcceso acc
    on acc.ptpacceso = perm.ftpacceso;
