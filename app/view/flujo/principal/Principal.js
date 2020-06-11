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
            html: '<div id="contenedorGrafico"'
                + ' style="position:relative;overflow:hidden;width:1300px;height:500px;background:url(\'vendor/mxgraph/src/images/grid.gif\');cursor:default;">'
                + '</div>',
            flex: 1
        },
        {
            xtype: 'flujo-principal-tabpanel',
            reference: 'tabFlujo',
            flex: 1
        },
        
    ]
});