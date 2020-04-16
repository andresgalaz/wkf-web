Ext.define('wkf.model.Accion', {
    extend: 'Ext.data.Model',

    requires: [
        'wkf.proxy.JsonCall'
    ],

    idProperty: 'idAccion',

    fields: [
        { name: 'idAccion', type: 'int' },
        { name: 'titulo', type: 'auto' },
        { name: 'nombre', type: 'auto' },
        { name: 'idEtapaOrigen', type: 'int' },
        { name: 'etapaOrigen', type: 'auto' },
        { name: 'idEtapaDestino', type: 'int' },
        { name: 'etapaDestino', type: 'auto' },
        { name: 'orden', type: 'int' },
        { name: 'extjs_ui', mapping: 'estilo.["ui"]' },
    ],

    proxy: {
        type : 'jsoncall',
        url : GLOBAL_HOST + '/do/jsonCall',
        extraParams : {            
            prm_funcion : 'xformgen4.consultaAcciones',
        }
    },
});