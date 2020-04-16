Ext.define('wkf.model.EtapaFuncion', {
    extend: 'Ext.data.Model',

    requires: [
        'wkf.proxy.JsonCall'
    ],

    fields: [
        { name: 'idEtapa', type: 'int' },
        { name: 'sec', type: 'int' },
        { name: 'funcion', type: 'auto' },
        { name: 'tpEjecucion', type: 'auto' },
        { name: 'alias', type: 'auto' },
        { name: 'tpFuncion', type: 'auto' },
        { name: 'nuevo', type: 'boolean', defaultValue: false }
    ],
        
    proxy: {
        type : 'jsoncall',
        extraParams : {            
            prm_funcion : 'xformgen4.consultaEtapaFunciones',
        }
    },
});