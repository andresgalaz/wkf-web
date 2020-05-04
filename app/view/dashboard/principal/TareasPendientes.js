Ext.define('wkf.view.dashboard.principal.TareasPendientes',{
    extend: 'Ext.container.Container',
    xtype: 'dashboard-tareas-pendientes',

    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Series',
        'Ext.chart.series.Pie',
        'Ext.chart.series.Bar',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.plugin.ItemEvents',
        'Ext.chart.interactions.*'
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'polar',
            plugins: {
                chartitemevents: {
                    moveEvents: true
                }
            },
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
                docked: 'right'
            },
            interactions: ['rotate'],
            bind: { store: '{stTareasPendientes}' },
            series: [
                {
                    type: 'pie',
                    angleField: 'nCount',
                    label: {
                        field: 'cEtapaTitulo',
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
                }
            ],
            listeners: {
                itemClick: 'onGraficoTareasPendientesItemClick'
            },
            flex: 1
        },
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'cartesian',
                    reference: 'gfTareasPendientesUsr',
                    legend: {
                        docked: 'right'
                    },
                    bind: {
                        store: '{stTareasPendientesUsr}'
                    },
                    captions: {
                        title: {
                            text: 'Tarea 1'
                        }
                    },
                    flipXY: true,
                    axes: [
                        {
                            type: 'numeric',
                            position: 'bottom',
                            adjustByMajorUnit: true,
                            grid: true,
                            minimum: 0
                        }, {
                            type: 'category',
                            position: 'left',
                            grid: true
                        }
                    ],
                    series: [
                        {
                            type: 'bar',
                            axis: 'bottom',
                            title: [ 'Vencidas', 'Por vencer', 'Recientes'],
                            xField: 'usr',
                            yField: [ 'vencidas', 'normal', 'nuevas' ],
                            stacked: true,
                            marker: {
                                type: 'diamond'
                            },
                            style: {
                                opacity: 0.80
                            },
                            highlight: {
                                fillStyle: 'yellow'
                            },
                            // tooltip: {
                            //     trackMouse: true,
                            //     renderer: 'onSeriesTooltipRender'
                            // }
                        }
                    ],
                    flex: 1
                }, 
                {
                    html: 'Aca grilla',
                    flex: 1
                }
            ],
            flex: 1
        }
    ]
});