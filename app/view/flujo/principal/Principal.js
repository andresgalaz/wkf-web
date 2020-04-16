Ext.define('wkf.view.flujo.principal.Principal',{
    extend: 'Ext.panel.Panel',
    xtype: 'flujo-principal',

    requires: [
        'wkf.view.flujo.FlujoToolbar',
        'wkf.view.flujo.principal.TabPanel'
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
            xtype: 'container',
            html: 'Dibujo Flujo',
            flex: 1
        },
        {
            xtype: 'flujo-principal-tabpanel',
            reference: 'tabFlujo',
            flex: 1
        },
        
    ]
});