
Ext.define('wkf.view.flujo.FlujoView',{
    extend: 'Ext.panel.Panel',
    xtype: 'wkf-flujos',

    requires: [
        'wkf.view.flujo.FlujoViewController',
        'wkf.view.flujo.FlujoViewModel',

        'wkf.view.flujo.principal.Principal',
        'wkf.view.flujo.detalle.Detalle'
    ],

    controller: 'flujo-flujoview',
    viewModel: {
        type: 'flujo-flujoview'
    },

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'flujo-principal',
            flex: 1
        },
        {
            xtype: 'flujo-detalle',
            reference: 'detallePanel',
            itemId: 'detallePanel',     
            width: 300
        }
    ]
});
