Ext.define('wkf.view.dashboard.DashboardViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard-dashboardview',
    data: {
        name: 'wkf'
    },

    stores: {
        stTareasPendientes: {
            fields: ['tarea', 'cant', 'porc' ],
            data: [
                { tarea: 'Tarea 1', porc: 68.3, cant: 105 },
                { tarea: 'Tarea 2', porc: 1.7, cant: 290 },
                { tarea: 'Tarea 3', porc: 17.9, cant: 18 },
                { tarea: 'Tarea 4', porc: 10.2, cant: 10 },
                { tarea: 'Tarea 5', porc: 1.9, cant: 2 }
            ]
        }
    }
});
