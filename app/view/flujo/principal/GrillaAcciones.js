Ext.define('wkf.view.flujo.principal.GrillaAccion',{
    extend: 'Ext.grid.Panel',
    xtype: 'flujo-principal-grillaacciones',

    selModel: 'rowmodel',

    emptyText: 'No existen acciones establecidas',
    scrollable: true,

    tbar: [
        '->',
        {
            text: 'Nueva Accion',
            handler: 'onGrillaAccionNueva'
        }
    ],


    columns: [
        {
            xtype: 'numbercolumn',
            text: 'Orden',
            dataIndex: 'nOrden',
            format: '0',
            width: 50
        },
        {
            text: 'Accion',
            dataIndex: 'cTitulo',
            flex: 2
        },
        {
            text: 'Origen',
            dataIndex: 'cEtapaOrigen',
            flex: 1
        },
        {
            text: 'Destino',
            dataIndex: 'cEtapaDestino',
            flex: 1
        },
        {
            xtype: 'actioncolumn',
            width: 70,
            items: [
                {
                    iconCls: 'x-fa fa-info-circle',
                    handler: 'onGrillaAccionVerDetalle',
                    tooltip: 'Ver detalles accion',
                },
                {
                    iconCls: 'x-fa fa-minus-circle',
                    margin: '0 5 0 0',
                    handler: 'onGrillaAccionEliminar',
                    tooltip: 'Eliminar accion',
                }
            ]
        }
    ]
});