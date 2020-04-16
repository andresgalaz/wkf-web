Ext.define('wkf.view.flujo.detalle.Detalle',{
    extend: 'Ext.container.Container',
    xtype: 'flujo-detalle',

    requires: [
        'wkf.view.flujo.detalle.Flujo',
        'wkf.view.flujo.detalle.Etapa',
        'wkf.view.flujo.detalle.Accion',
    ],

    layout: {
        type: 'card',
        anchor: '100%'
    },

    // html: 'Detalle',

    items: [
        {
            xtype: 'detalle-flujo',
            reference: 'frmFlujo'
        },
        {
            xtype: 'detalle-etapa',
            reference: 'frmEtapa'
        },
        {
            xtype: 'detalle-accion',
            reference: 'frmAccion'
        }
    ]
});