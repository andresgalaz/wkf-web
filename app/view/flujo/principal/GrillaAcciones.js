Ext.define('wkf.view.flujo.principal.GrillaAcciones',{
    extend: 'Ext.grid.Panel',
    xtype: 'flujo-principal-grillaacciones',

    selModel: 'rowmodel',

    emptyText: 'No existen acciones establecidas',
    scrollable: true,

    tbar: [
        '->',
        {
            text: 'Nueva Accion',
            handler: 'onGrillaAccionesNueva'
        }
    ],


    columns: [
        {
            xtype: 'numbercolumn',
            text: 'Orden',
            dataIndex: 'orden',
            format: '0',
            width: 50
        },
        {
            text: 'Accion',
            dataIndex: 'titulo',
            flex: 2
        },
        {
            text: 'Origen',
            dataIndex: 'etapaOrigen',
            flex: 1
        },
        {
            text: 'Destino',
            dataIndex: 'etapaDestino',
            flex: 1
        },
        {
            xtype: 'actioncolumn',
            width: 70,
            items: [
                {
                    iconCls: 'x-fa fa-info-circle',
                    handler: 'onGrillaAccionesVerDetalle',
                    tooltip: 'Ver detalles accion',
                },
                {
                    iconCls: 'x-fa fa-minus-circle',
                    margin: '0 5 0 0',
                    handler: 'onGrillaAccionesEliminar',
                    tooltip: 'Eliminar accion',
                }
            ]
        }
    ]
});