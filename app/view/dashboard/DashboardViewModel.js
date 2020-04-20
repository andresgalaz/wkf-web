Ext.define('wkf.view.dashboard.DashboardViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard-dashboardview',
    data: {
        name: 'wkf'
    },

    stores: {
        stTareasPendientes: {
            fields: ['flujo','etapa','idEtapa', 'cant'],
            
            proxy: {
                type : 'jsoncall',
                extraParams : {            
                    prm_funcion : 'xformgen4.consultaTareasPendientes',
                }
            },

            autoLoad: true
        },

        stTareasPendientesUsr: {
            fields: ['usr', 'vencidas', 'normal', 'nuevas'],
            data: [
                { usr: 'Juan', vencidas: 8, normal: 12, nuevas: 18 },
                { usr: 'Andres', vencidas: 5, normal: 4, nuevas: 9 },
                { usr: 'Pablo', vencidas: 9, normal: 3, nuevas: 1 },
                { usr: 'Laura', vencidas: 10, normal: 29, nuevas: 0 },
                { usr: 'Cecilia', vencidas: 2, normal: 13, nuevas: 3 }
            ]

        }
    }
});
