Ext.define('wkf.view.flujo.FlujoViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.flujo-flujoview',
    requires: [
        'wkf.model.Etapa',
        'wkf.model.EtapaFuncion',
        'wkf.model.Accion',
    ],

    stores: {
        stAcceso: {
            fields: ['idAcceso', 'titulo'],

            proxy: {
                type : 'jsoncall',
                extraParams : {            
                    prm_funcion : 'xformgen4.consultaTpAccesos',
                }
            },

            autoLoad: true
        },

        stAcciones: {
            model: 'wkf.model.Accion',
            sorters: [
                {
                    property: 'orden',
                    direction: 'ASC'
                }
            ],
            autoLoad: false
        },

        stAccionFuncion: {
            fields: [
                { name: 'idAccion', type: 'int' },
                { name: 'sec', type: 'int' },
                { name: 'funcion', type: 'auto' },
                { name: 'tpEjecucion', type: 'auto' },
                { name: 'alias', type: 'auto' },
                { name: 'nuevo', type: 'boolean', defaultValue: false }
            ],
        
            proxy: {
                type : 'jsoncall',
                extraParams : {            
                    prm_funcion : 'xformgen4.consultaAccionFunciones',
                }
            },

            sorters: [
                {
                    property: 'sec',
                    direction: 'ASC'
                }
            ],

            autoLoad: false
        },

        stEtapas: {
            model: 'wkf.model.Etapa',

            sorters: [
                {
                    property: 'orden',
                    direction: 'ASC'
                },
                {
                    property: 'titulo',
                    direction: 'ASC'
                },
            ],

            autoLoad: false
        },

        stEtapaFuncion: {
            // model: 'wkf.model.EtapaFuncion',
            // fields: ['idEtapa', 'sec', 'funcion', 'tpEjecucion', 'alias', 'tpFuncion'],
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

            sorters: [
                {
                    property: 'sec',
                    direction: 'ASC'
                }
            ],

            autoLoad: false
        },

        stFlujos: {
            idProperty: 'idFlujo',
            fields: ['idFlujo','nombre','titulo','url','duracion'],
            
            proxy: {
                type : 'jsoncall',
                extraParams : {            
                    prm_funcion : 'xformgen4.consultaFlujo',
                }
            },

            sorters: [
                {
                    property: 'titulo',
                    direction: 'ASC'
                }
            ],

            autoLoad: false
        },
        
        stRol: {
            idProperty: 'id',
            fields: ['idRol','nombre','titulo'],
            
            proxy: {
                type : 'jsoncall',
                extraParams : {            
                    prm_funcion : 'xformgen4.consultaRol',
                    prm_sistema : 4 // TODO: Modificar 
                }
            },

            sorters: [
                {
                    property: 'titulo',
                    direction: 'ASC'
                }
            ],

            autoLoad: true
        },

        stSistemas: {
            idProperty: 'idSistema',
            fields: ['idSistema','nombre','titulo'],
            
            proxy: {
                type : 'jsoncall',
                extraParams : {            
                    prm_funcion : 'xformgen4.consultaSistema',
                }
            },

            sorters: [
                {
                    property: 'titulo',
                    direction: 'ASC'
                }
            ],

            autoLoad: true
        },

        stTpEjecucion: {
            fields: ['tpEjecucion'],
            data: [
                { tpEjecucion: 'BSH' },
                { tpEjecucion: 'SQL' },
            ],

            autoLoad: true
        },

        stTpFuncion: {
            fields: ['tpFuncion', 'titulo'],
            data: [
                { tpFuncion: 'L', titulo: 'Lectura' },
                { tpFuncion: 'I', titulo: 'In'  },
                { tpFuncion: 'O', titulo: 'Out'  }
            ]
        }
    }

});
