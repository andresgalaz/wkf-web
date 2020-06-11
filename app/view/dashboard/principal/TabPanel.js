Ext.define('wkf.view.dashboard.principal.TabPanel',{
    extend: 'Ext.tab.Panel',
    xtype: 'dashboard-principal-tabpanel',

    requires: [
        'wkf.view.dashboard.principal.TareasPendientes'
    ],

    defaults: {
        layout: {
            type: 'vbox',
            align: 'stretch'
        }
    },

    items: [
        {
            title: 'Tareas Pendientes',
            itemId: 'tabTareas',
            items: [
                {
                    xtype: 'dashboard-tareas-pendientes',
                    flex: 1
                }
            ]
        },
    ]
});