Ext.define('wkf.view.dashboard.DashboardViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard-dashboardview',
    
    requires: [
        'wkf.model.Flujo',
        'wkf.model.Sistema'
    ],

    data: {
        totales: {
            nTotal: 0,
            nVencidas: 0,
            nNormal: 0,
            nNuevas: 0
        }
    },

    stores: {
        stFlujo: {
            model: 'wkf.model.Flujo',
            sorters: [ { property: 'cTitulo', direction: 'ASC' } ],
            autoLoad: false
        },

        stSistema: {
            model: 'wkf.model.Sistema',
            sorters: [{ property: 'cTitulo', direction: 'ASC' }],
            autoLoad: true
        },

        stTareasPendientes: {
            fields: ['cFlujoTitulo','cEtapaTitulo','cEtapa', 'nCount'],
            proxy: {
                type : 'jsoncall',
                extraParams : {            
                    prm_funcion : 'jStore.wkf.dashboard.ConsultaTareasPendientes',
                }
            },
            autoLoad: false
        },

        stTareasPendientesUsr: {
            fields: [
                { name: 'pUsuario', type: 'int' },
                { name: 'cUsuarioNombre', type: 'string' },
                { name: 'nVencidas', type: 'int' },
                { name: 'nNormal', type: 'int' },
                { name: 'nNuevas', type: 'int' }
            ],
            // proxy: {
            //     type : 'jsoncall',
            //     extraParams : {            
            //         prm_funcion : 'jStore.wkf.dashboard.ConsultaTotalesPorUsuario',
            //         prm_cSistemaNombre: 'VYL'
            //     }
            // },
            data: [
                { pUsuario: 1, cUsuarioNombre: 'Maxi', nVencidas: 130, nNormal: 32, nNuevas: 86 },
                { pUsuario: 2, cUsuarioNombre: 'Mar', nVencidas: 23, nNormal: 54, nNuevas: 120 },
                { pUsuario: 3, cUsuarioNombre: 'Anibal', nVencidas: 3, nNormal: 0, nNuevas: 8 },
                { pUsuario: 4, cUsuarioNombre: 'Jose', nVencidas: 123, nNormal: 43, nNuevas: 70 }
            ],
            autoLoad: false
        }
    }
});
