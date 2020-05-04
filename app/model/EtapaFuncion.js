Ext.define('wkf.model.EtapaFuncion', {
    extend: 'Ext.data.Model',
    requires: [ 'wkf.proxy.JsonCall' ],
    fields: [
        { name: 'pEtapa', type: 'int' },
        { name: 'pSecuencia', type: 'int' },
        { name: 'cFuncion', type: 'auto' },
        { name: 'cAlias', type: 'auto' },
        { name: 'cTpFuncion', type: 'auto' },
        { name: 'cTpEjecucion', type: 'auto' },
        { name: 'nuevo', type: 'boolean', defaultValue: false }
    ],
    proxy: {
        type : 'jsoncall',
        extraParams : {            
            prm_funcion : 'jStore.wkf.admin.etapa.ConsultaFuncion',
        }
    },
});