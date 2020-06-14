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

    listeners: {
        activate: 'onActivate'
    },

    scrollable: 'y',

    items: [
        {
            xtype: 'component',
            cls: 'dash-tiles',
            height: 100,
    
            tpl: [
                '<div class="dash-meta">',
                    '<span><div>{nTotal}</div>Tareas Pendientes</span>',
                    '<span><div>{nVencidas}</div>Vencidas</span>',
                    '<span><div>{nNormal}</div>Por vencer</span>',
                    '<span><div>{nNuevas}</div>Recientes</span>',
                '</div>'
            ],
            bind: {
                data: '{totales}'
            }
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
