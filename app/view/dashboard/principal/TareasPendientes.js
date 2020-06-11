Ext.define('wkf.view.dashboard.principal.TareasPendientes',{
    // extend: 'Ext.container.Container',
    extend: 'Ext.panel.Panel',
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

    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'combobox',
                    labelAlign: 'top',
                    reference: 'cbSistemas',
                    fieldLabel: 'Sistema',
                    editable: false,
                    displayField: 'cTitulo',
                    valueField: 'pSistema',
                    bind: {
                        store: '{stSistema}'
                    },
                    listeners: {
                        select: 'onCbSistemaSelect'
                    },
                    width: 300
                },
                {
                    xtype: 'combobox',
                    labelAlign: 'top',
                    reference: 'cbFlujo',
                    fieldLabel: 'Flujo',
                    editable: false,
                    displayField: 'cTitulo',
                    valueField: 'pFlujo',
                    disabled: true,
                    queryMode: 'local',
                    bind: {
                        store: '{stFlujo}',
                        disabled: '{!cbSistemas.selection}',
                        selection: '{flujoSeleccionado}'
                    },
                    listeners: {
                        select: 'onCbFlujoSelect'
                    },
                    width: 300
                },
            ]
        },
    ],

    items: [
        {
            xtype: 'polar',
            plugins: {
                chartitemevents: {
                    moveEvents: true
                }
            },
            reference: 'chart',


            // captions: {
            //     title: 'Tareas Pendientes'
            // },
            // theme: 'default-gradients',
            width: '100%',
            height: 500,
            innerPadding: 60,
            legend: {
                docked: 'right'
            },
            interactions: ['rotate', 'itemhighlight'],
            bind: { store: '{stTareasPendientes}' },
            series: [
                {
                    type: 'pie',
                    angleField: 'nCount',
                    donut: 50,
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
                    // bind: {
                    //     store: '{stTareasPendientesUsr}'
                    // },
                    // store: {
                    //     fields: [
                    //         { name: 'pUsuario', type: 'int' },
                    //         { name: 'cUsuarioNombre', type: 'string' },
                    //         { name: 'nVencidas', type: 'int' },
                    //         { name: 'nNormal', type: 'int' },
                    //         { name: 'nNuevas', type: 'int' }
                    //     ],

                    //     data: [
                    //         { pUsuario: 1, cUsuarioNombre: 'Maxi', nVencidas: 130, nNormal: 32, nNuevas: 86 },
                    //         { pUsuario: 2, cUsuarioNombre: 'Mar', nVencidas: 0, nNormal: 54, nNuevas: 120 }
                    //     ],
                    // },
                    // // legend: {
                    // //     type: 'sprite',
                    // //     docked: 'bottom',
                    // //     marker: {
                    // //         type: 'square'
                    // //     },
                    // //     border: {
                    // //         radius: 0
                    // //     }
                    // // },
                    // legend: {
                    //     position: 'right'
                    // },
                    // flipXY: true,
                    // axes: [
                    //     {
                    //         type: 'numeric',
                    //         position: 'bottom',
                    //         fields: [ 'nVencidas', 'nNormal', 'nNuevas' ],
                            
                    //         title: {
                    //             text: 'Cantidad',
                    //             fontSize: 12
                    //         },
                    //         minimum: 0,
                    //         grid: true
                    //     },
                    //     {
                    //         type: 'category',
                    //         position: 'left',
                    //         fields: ['cUsuarioNombre'],
                    //         title: {
                    //             text: 'Usuario',
                    //             fontSize: 12
                    //         }
                    //         // label: {
                    //         //     fontSize: 11,
                    //         //     rotate: {
                    //         //         degrees: -45
                    //         //     },
                    //         // }
                    //     }
                    // ],
                    // series: [
                    //     {
                    //         type: 'bar',
                    //         stacked: true,
                    //         axis: 'left',

                    //         title: [ 'Vencidas', 'Por vencer', 'Recientes'],
                    //         colors: ['red', 'orange', 'green'],
                    //         xField: 'cNombreUsuario',
                    //         yField: [ 'nVencidas', 'nNormal', 'nNuevas' ],
                            
                    //         // style: {
                    //         //     opacity: 0.80,
                    //         // },
                    //         // highlight: {
                    //         //     fillStyle: 'yellow'
                    //         // }
                    //         // tooltip: {
                    //         //     trackMouse: true,
                    //         //     renderer: 'onSeriesTooltipRender'
                    //         // }
                    //     }
                    // ],
                    // width: 600,
                    // height: 400,
                    bind: {
                        store: '{stTareasPendientesUsr}'
                    },
                    legend: {
                        // position: 'right'
                        docked: 'right'
                    },
                    flipXY: true,
                    axes: [
                        {
                            type: 'numeric',
                            position: 'bottom',
                            fields: ['nVencidas','nNormal','nNuevas'],
                            grid: true,
                            minimum: 0,
                            hidden: true
                        },
                        {
                            type: 'category',
                            position: 'left',
                            fields: ['cUsuarioNombre'],
                        }
                    ],
                    series: {
                        type: 'bar',
                        axis: 'left',
                        stacked:true,
                        
                        xField: 'cUsuarioNombre',
                        yField: ['nVencidas','nNormal','nNuevas'],
                        
                        title: [ 'Vencidas', 'Por vencer', 'Recientes'],
                        colors: ['#a61c20', '#f5d03f', '#94ae0a'],

                        label: {
                            display: 'insideEnd',
                            field: ['nVencidas','nNormal','nNuevas'],
                            orientation: 'horizontal',
                            textAlign: 'middle'
                        },
                        style: {
                            opacity: 0.80,
                        }
                    },
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