Ext.define('wkf.view.dashboard.DashboardViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard-dashboardview',
    data: {
        name: 'wkf'
    },

    stores: {
        stTareasPendientes: {
            fields: ['cFlujoTitulo','cEtapaTitulo','cEtapa', 'nCount'],
            proxy: {
                type : 'jsoncall',
                extraParams : {            
                    prm_funcion : 'jStore.wkf.dashboard.ConsultaTotalesPendientes',
                }
            },
            autoLoad: true
        },

        stTareasPendientesUsr: {
            fields: ['pUsuario', 'cUsuarioNombre', 'nVencidas', 'nNormal', 'nNuevas'],
            proxy: {
                type : 'jsoncall',
                extraParams : {            
                    prm_funcion : 'jStore.wkf.dashboard.ConsultaTotalesPorUsuario',
                    prm_cFlujo : 'VENTA_CIERRE' //TODO: Modificar 
                }
            },
            autoLoad: true
        }
    }
});
