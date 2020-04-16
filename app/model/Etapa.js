Ext.define('wkf.model.Etapa', {
    extend: 'Ext.data.Model',

    requires: [
        'wkf.proxy.JsonCall'
    ],

    idProperty: 'idEtapa',

    fields: [
        { name: 'idEtapa', type: 'int' },
        { name: 'titulo', type: 'auto' },
        { name: 'nombre', type: 'auto' },
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
        { name: 'duracion', type: 'number' },
        { name: 'rol', type: 'auto' },
        { name: 'idRol', type: 'int' },
        { name: 'btarea', type: 'boolean' },
        { name: 'bautorizacion', type: 'boolean' },
        { name: 'url', type: 'auto' },
        { name: 'orden', type: 'int' },  //TODO: Mejorar
    ],

    proxy: {
        type : 'jsoncall',
        url : GLOBAL_HOST + '/do/jsonCall',
        extraParams : {            
            prm_funcion : 'xformgen4.consultaEtapa',
        }
    },
});
