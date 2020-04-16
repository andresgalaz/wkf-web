Ext.define('wkf.view.dashboard.DashboardView',{
    extend: 'Ext.panel.Panel',
    xtype: 'wkf-dashboard',

    cls: 'dash-main',

    requires: [
        'wkf.view.dashboard.DashboardViewController',
        'wkf.view.dashboard.DashboardViewModel',

        'wkf.view.dashboard.principal.TabPanel',
    ],

    controller: 'dashboard-dashboardview',
    viewModel: {
        type: 'dashboard-dashboardview'
    },


    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    scrollable: 'y',

    items: [
        {
            xtype: 'component',
            cls: 'dash-tiles',
            height: 100,
    
            tpl: [
                '<div class="dash-meta">',
                    '<tpl for=".">',
                        '<span>',
                            '<div>{estadistica}</div> {descripcion}',
                        '</span>',
                    '</tpl>',
                '</div>'
            ],
    
            data: [{
                descripcion: 'Tareas Pendientes',
                estadistica: 10
            },{
                descripcion: 'Vencidas',
                estadistica: 7
            },{
                descripcion: 'Por vencer',
                estadistica: 2
            },{
                descripcion: 'Recientes',
                estadistica: 1
            },{
                descripcion: 'Cumplidas en termino',
                estadistica: '73%'
            }]
        },
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'dashboard-principal-tabpanel',
                    flex: 1
                }
            ],
            flex: 1
        }
    ]
});
