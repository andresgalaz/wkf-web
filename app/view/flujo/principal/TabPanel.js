Ext.define('wkf.view.flujo.principal.TabPanel',{
    extend: 'Ext.tab.Panel',
    xtype: 'flujo-principal-tabpanel',

    requires: [
        'wkf.view.flujo.principal.GrillaEtapas',
        'wkf.view.flujo.principal.GrillaEtapaFuncion',
        'wkf.view.flujo.principal.GrillaAccion',
        'wkf.view.flujo.principal.GrillaAccionFuncion'
    ],

    defaults: {
        hidden: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        }
    },

    items: [
        {
            title: 'Etapas',
            itemId: 'tabEtapas',
            hidden: false,
            items: [
                {
                    xtype: 'flujo-principal-grillaetapas',
                    reference: 'gpEtapa',
                    bind: {
                        store: '{stEtapa}'
                    },
                    flex: 1
                }
            ]
        },
        {
            title: 'Funciones I/O/L', 
            itemId: 'tabFuncionesEtapa',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'flujo-principal-grillaetapa-funcion',
                    reference: 'gpEtapaFuncion',
                    bind: {
                        store: '{stEtapaFuncion}'
                    },
                    listeners: {
                        canceledit: 'onGrillaEtapaFuncionNuevaCancel',
                        edit: 'onGrillaEtapaFuncionNuevaGrabar'
                    },
                    flex: 1
                }
            ]
        },
        {
            title: 'Acciones',
            itemId: 'tabAcciones',
            items: [
                {
                    xtype: 'flujo-principal-grillaacciones',
                    reference: 'gpAccion',
                    bind: {
                        store: '{stAccion}'
                    },
                    flex: 1
                }
            ]
        },
        {
            title: 'Funciones',
            itemId: 'tabFuncionesAccion',
            items: [
                {
                    xtype: 'flujo-principal-grillaaccion-funcion',
                    reference: 'gpAccionFuncion',
                    bind: {
                        store: '{stAccionFuncion}'
                    },
                    listeners: {
                        canceledit: 'onGrillaAccionFuncionNuevaCancel',
                        edit: 'onGrillaAccionFuncionNuevaGrabar'
                    },
                    flex: 1
                }
            ]
        }
    ]
});