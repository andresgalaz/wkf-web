Ext.define('wkf.view.flujo.FlujoViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.flujo-flujoview',
    requires: [
        'wkf.model.Etapa',
        'wkf.model.EtapaFuncion',
        'wkf.model.Accion',
    ],

    stores: {
        stAccion: {
            model: 'wkf.model.Accion',
            sorters: [{ property: 'nOrden', direction: 'ASC' }],
            autoLoad: false
        },

        stAccionFuncion: {
            fields: [
                { name: 'pAccion', type: 'int' },
                { name: 'pSecuencia', type: 'int' },
                { name: 'cFuncion', type: 'auto' },
                { name: 'cTpEjecucion', type: 'auto' },
                { name: 'cAlias', type: 'auto' },
                { name: 'nuevo', type: 'boolean', defaultValue: false }
            ],
            proxy: {
                type : 'jsoncall',
                extraParams : {            
                    prm_funcion : 'jStore.wkf.admin.accion.ConsultaFuncion',
                }
            },
            sorters: [ { property: 'pSecuencia', direction: 'ASC' } ],
            autoLoad: false
        },

        stEtapa: {
            model: 'wkf.model.Etapa',
            sorters: [
                { property: 'orden', direction: 'ASC' },
                { property: 'cTitulo', direction: 'ASC' }
            ],
            autoLoad: false
        },

        stEtapaFuncion: {
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
            sorters: [ { property: 'pSecuencia', direction: 'ASC' } ],
            autoLoad: false
        },

        stFlujo: {
            idProperty: 'pFlujo',
            fields: ['pFlujo','cNombre','cTitulo','cURL','nDuracionLimite'],          
            proxy: {
                type : 'jsoncall',
                extraParams : {
                    prm_funcion : 'jStore.wkf.admin.flujo.Consulta',
                }
            },
            sorters: [ { property: 'cTitulo', direction: 'ASC' } ],
            autoLoad: false
        },
        
        stRol: {
            idProperty: 'pRol',
            fields: ['pRol', 'cRol', 'cRolTitulo', 'fSistema'],
//            fields: [
//                { name: 'pRol', type: 'int' },
//                { name: 'cRol', type: 'string' },
//                { name: 'cRolTitulo', type: 'string' },
//                { name: 'fSistema', type: 'int' }
//            ],
            proxy: {
                url : GLOBAL_HOST+'/do/wkfListaRol',
                method : 'POST',
                type : 'ajax',
                cors: true, withCredentials: true, useDefaultXhrHeader: false,
                reader : {
                    type : 'json',
                    rootProperty : 'response',
                    successProperty : 'success'
                },
                extraParams : {            
                    prm_sistema : 4 // TODO: Modificar 
                }
            },
            sorters: [{ property: 'cRol', direction: 'ASC' }],
            autoLoad: true
        },        

        stSistema: {
            idProperty: 'pSistema',
            fields: ['pSistema','cNombre','cTitulo'],            
            proxy: {
                type : 'jsoncall',
                extraParams : {            
                    prm_funcion : 'paGlobal.sistema',
                }
            },
            sorters: [{ property: 'cTitulo', direction: 'ASC' }],
            autoLoad: true
        },

        stTpAcceso: {
            fields: ['pTpAcceso', 'cDescripcion'],
            proxy: {
                type : 'jsoncall',
                extraParams : {            
                    prm_funcion : 'paGlobal.tpAcceso',
                }
            },
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
