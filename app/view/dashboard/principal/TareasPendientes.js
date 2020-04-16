Ext.define('wkf.view.dashboard.principal.TareasPendientes',{
    extend: 'Ext.container.Container',
    xtype: 'dashboard-tareas-pendientes',

    requires: [
        'Ext.chart.PolarChart'
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'polar',
            reference: 'chart',
            captions: {
                title: 'Tareas Pendientes'
            },
            // theme: 'default-gradients',
            width: '100%',
            height: 500,
            insetPadding: 40,
            innerPadding: 20,
            legend: {
                docked: 'bottom'
            },
            interactions: ['rotate'],
            bind: {
                store: '{stTareasPendientes}'
            },
            series: [{
                type: 'pie',
                angleField: 'cant',
                label: {
                    field: 'tarea',
                    calloutLine: {
                        length: 60,
                        width: 3
                    }
                },
                highlight: true,
                tooltip: {
                    trackMouse: true,
                    renderer: 'onGraficoTareasPendientesTooltip'
                }
            }],
            flex: 1
        },
        {
            xtype: 'panel',
            reference: 'pnTareasPendientesDetalle',
            title: 'Detalle',
            width: 300
        }
    ]
});