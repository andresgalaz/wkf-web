Ext.define('wkf.view.flujo.detalle.Etapa',{
    extend: 'wkf.view.flujo.detalle.FormBase',
    xtype: 'detalle-etapa',
    title: 'Detalles Etapa',
    bbar: [
        { text: 'Volver', handler: 'onFrmEtapaVolver', iconCls: 'x-fa fa-chevron-circle-left' },
        '->',
        { text: 'Cancelar', handler: 'onFrmEtapaVolver', iconCls: 'x-fa fa-undo' },
        { text: 'Grabar', handler: 'onFrmEtapaGrabar', iconCls: 'x-fa fa-save' }
    ],

    items: [{
        xtype: 'hidden',
        name: 'fFlujo',
        bind: {
            value: '{etapaSeleccionada.fFlujo}'
        }
    }, {
        xtype: 'hidden',
        name: 'pEtapa',
        bind: {
            value: '{etapaSeleccionada.pEtapa}'
        }
    }, {
        xtype: 'textfield',
        fieldLabel: 'Nombre',
        name: 'cNombre',
        allowBlank: false,
        bind: { value: '{etapaSeleccionada.cNombre}' }
    }, {
        xtype: 'textfield',
        fieldLabel: 'Título',
        name: 'cTitulo',
        allowBlank: false,
        bind: { value: '{etapaSeleccionada.cTitulo}' }
    }, {
        xtype      : 'fieldcontainer',
        fieldLabel : 'Tipo Etapa',
        defaultType: 'radiofield',
        defaults: {
            flex: 1
        },
        layout: 'hbox',
        items: [{
                boxLabel  : 'Inicial',
                name      : 'tpEtapa',
                inputValue: 'Inicial',
                bind: { value: '{etapaSeleccionada.tpEtapa}' }
            }, {
                boxLabel  : 'Intermedia',
                name      : 'tpEtapa',
                inputValue: 'Intermedia',
                bind: { value: '{etapaSeleccionada.tpEtapa}' }
            }, {
                boxLabel  : 'Final',
                name      : 'tpEtapa',
                inputValue: 'Final',
                bind: { value: '{etapaSeleccionada.tpEtapa}' }
            }]
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Duración Límite (hr)',
        name: 'nDuracion',
        allowBlank: false,
        bind: { value: '{etapaSeleccionada.nDuracion}' }
    }, {
        xtype: 'combobox',
        fieldLabel: 'Rol Asignado',
        name: 'fRolFuncion',
        editable: false,
        displayField: 'cRol',
        valueField: 'pRol',
        queryMode: 'local',
        bind: {
            store: '{stRol}',
            value: '{etapaSeleccionada.fRolFuncion}'
        }
    }, {
        xtype: 'checkbox',
        boxLabel: 'Tarea',
        name: 'bTarea',
        bind: { value: '{etapaSeleccionada.bTarea}' }
    }, {
        xtype: 'checkbox',
        boxLabel: 'Autorización',
        name: 'bAutorizacion',
        bind: { value: '{etapaSeleccionada.bAutorizacion}' }
    }, {
        xtype: 'textfield',
        fieldLabel: 'Url',
        name: 'cURL',
        allowBlank: false,
        bind: { value: '{etapaSeleccionada.cURL}' }
    }]
});