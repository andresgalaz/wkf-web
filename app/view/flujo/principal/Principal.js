Ext.define('wkf.view.flujo.principal.Principal',{
    extend: 'Ext.panel.Panel',
    xtype: 'flujo-principal',

    requires: [
        'wkf.view.flujo.FlujoToolbar',
        'wkf.view.flujo.principal.TabPanel',
        'mxgraph.mxGraph'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    dockedItems: [
        {
            dock: 'top',
            xtype: 'flujo-toolbar'
        },
    ],

    items: [
        {
            xtype: 'mxgraph',
            reference: 'mxGraficoFlujo',
            listeners: {
                render: 'onMxGraficoFlujoRender'
            },
            flex: 1
        },
        {
            xtype: 'flujo-principal-tabpanel',
            reference: 'tabFlujo',
            flex: 1
        },
        
    ]
});