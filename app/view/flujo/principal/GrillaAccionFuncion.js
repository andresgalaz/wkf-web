Ext.define('wkf.view.flujo.principal.GrillaAccionFuncion',{
    extend: 'Ext.grid.Panel',
    xtype: 'flujo-principal-grillaaccion-funcion',

    requires: [
        'Ext.grid.plugin.RowEditing'
    ],

    emptyText: 'No existen funciones establecidas',
    scrollable: true,

    selModel: 'rowmodel',
    plugins: {
        rowediting: {
            clicksToEdit: 1
        }
    },

    tbar: [
        '->',
        {
            text: 'Nueva Funcion',
            handler: 'onGrillaAccionFuncionNueva'
        }
    ],
    columns: [
        {
            xtype: 'numbercolumn',
            text: 'Secuencia',
            dataIndex: 'sec',
            format: '0',
            width: 75,
            editor: {
                xtype: 'numberfield',
                minValue: 1,
                allowBlank: false
            }
        },
        {
            text: 'Funcion',
            dataIndex: 'funcion',
            flex: 2,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },
        {
            text: 'Tipo Ejecucion',
            dataIndex: 'tpEjecucion',
            width: 150,
            editor: {
                xtype: 'combobox',
                forceSelection: true,
                editable: false,
                triggerAction: 'all',
                allowBlank: false,
                displayField: 'tpEjecucion',
                valueField: 'tpEjecucion',
                bind: {
                    store: '{stTpEjecucion}'
                }
            }
        },
        {
            text: 'Alias',
            dataIndex: 'alias',
            flex: 1,
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'actioncolumn',
            width: 70,
            items: [
                {
                    iconCls: 'x-fa fa-minus-circle',
                    margin: '0 5 0 0',
                    handler: 'onGrillaAccionFuncionEliminar',
                    tooltip: 'Eliminar funcion',
                }
            ]
        }
    ]
});