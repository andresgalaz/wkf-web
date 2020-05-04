Ext.define('wkf.view.flujo.principal.GrillaEtapaFuncion',{
    extend: 'Ext.grid.Panel',
    xtype: 'flujo-principal-grillaetapa-funcion',
    requires: ['Ext.grid.plugin.RowEditing'],
    emptyText: 'No existen funciones de I/O/L',
    scrollable: true,
    selModel: 'rowmodel',
    plugins: {rowediting: { clicksToEdit: 1 }},

    tbar: [
        '->',
        {
            text: 'Nueva Funcion',
            handler: 'onGrillaEtapaFuncionNueva'
        }
    ],
    columns: [
        {
            xtype: 'numbercolumn',
            text: 'Secuencia',
            dataIndex: 'pSecuencia',
            format: '0',
            width: 75,
            editor: {
                xtype: 'numberfield',
                minValue: 1,
                allowBlank: false
            }
        }, {
            text: 'Funcion',
            dataIndex: 'cFuncion',
            flex: 1,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            text: 'Tipo Ejecucion',
            dataIndex: 'cTpEjecucion',
            width: 150,
            editor: {
                xtype: 'combobox',
                forceSelection: true,
                editable: false,
                triggerAction: 'all',
                allowBlank: false,
                displayField: 'tpEjecucion',
                valueField: 'tpEjecucion',
                bind: { store: '{stTpEjecucion}' }
            }
        }, {
            text: 'Tipo Funcion',
            dataIndex: 'cTpFuncion',
            width: 150,
            editor: {
                xtype: 'combobox',
                forceSelection: true,
                editable: false,
                triggerAction: 'all',
                allowBlank: false,
                displayField: 'titulo',
                valueField: 'tpFuncion',
                bind: { store: '{stTpFuncion}' }
            }
        }, {
            xtype: 'actioncolumn',
            width: 70,
            items: [
                {
                    iconCls: 'x-fa fa-minus-circle',
                    margin: '0 5 0 0',
                    handler: 'onGrillaEtapaFuncionEliminar',
                    tooltip: 'Eliminar funcion',
                }
            ]
        }
    ]
});