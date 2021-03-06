Ext.define('wkf.view.flujo.principal.GrillaEtapas',{
    extend: 'Ext.grid.Panel',
    xtype: 'flujo-principal-grillaetapas',
    selModel: 'rowmodel',
    emptyText: 'No existen etapas ingresadas',
    scrollable: true,
    tbar: [
        '->',
        {
            text: 'Nueva Etapa',
            handler: 'onGrillaEtapaNueva'
        }
    ],
    columns: [ {
            text: 'Titulo',
            dataIndex: 'cTitulo',
            flex: 2
        }, {
            text: 'Nombre',
            dataIndex: 'cNombre',
            flex: 1
        }, {
            text: 'Tipo',
            dataIndex: 'tpEtapa',
            flex: 1
        }, {
            xtype: 'numbercolumn',
            text: 'Duracion',
            dataIndex: 'nDuracion'
        }, {
            text: 'Rol Asignado',
            dataIndex: 'cRol',
            flex: 1
        }, {
            xtype: 'actioncolumn',
            width: 70,
            items: [ {
                    iconCls: 'x-fa fa-info-circle',
                    margin: '0 5 0 0',
                    handler: 'onGrillaEtapaVerDetalle',
                    tooltip: 'Ver detalles etapa',
                }, {
                    iconCls: 'x-fa fa-minus-circle',
                    margin: '0 5 0 0',
                    handler: 'onGrillaEtapaEliminar',
                    tooltip: 'Eliminar etapa',
                } ]
        } ]
});
