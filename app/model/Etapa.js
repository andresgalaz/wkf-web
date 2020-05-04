Ext.define('wkf.model.Etapa', {
    extend: 'Ext.data.Model',
    requires: [ 'wkf.proxy.JsonCall' ],
    idProperty: 'pEtapa',
    fields: [
        { name: 'pEtapa', type: 'int' },
        { name: 'cTitulo', type: 'auto' },
        { name: 'cNombre', type: 'auto' },
        { name: 'fFlujo', type: 'int' },
        { name: 'tpEtapa', type: 'auto', convert: function(val) {
            switch (val) {
                case 'I':
                    return 'Inicial'

                case 'M':
                    return 'Intermedia'
                
                case 'F':
                    return 'Final'

                default:
                    return 'Sin determinar';
            }
        }},
        { name: 'nDuracion', type: 'number' },
        { name: 'cRol', type: 'auto' },
        { name: 'fRolFuncion', type: 'int' },
        { name: 'bTarea', type: 'boolean' },
        { name: 'bAutorizacion', type: 'boolean' },
        { name: 'cURL', type: 'auto' },
        { name: 'orden', type: 'int' },  //TODO: Mejorar
    ],
    proxy: {
        type : 'jsoncall',
        url : GLOBAL_HOST + '/do/jsonCall',
        extraParams : {            
            prm_funcion : 'jStore.wkf.admin.etapa.Consulta',
        }
    },
});
