Ext.define('wkf.view.flujo.detalle.Etapa',{
    extend: 'wkf.view.flujo.detalle.FormBase',
    xtype: 'detalle-etapa',

    title: 'Detalles Etapa',

    bbar: [
        {
            text: 'Volver',
            iconCls: 'x-fa fa-chevron-circle-left',
            handler: 'onFrmEtapaVolver'
        },'->',
        {
            text: 'Cancelar'
        },
        {
            text: 'Grabar'
        }
    ],

    items: [
        {
            xtype: 'hidden',
            name: 'idEtapa',
            bind: {
                value: '{etapaSeleccionada.idEtapa}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Título',
            name: 'titulo',
            allowBlank: false,
            bind: {
                value: '{etapaSeleccionada.titulo}'
            }
        },
        {
            xtype      : 'fieldcontainer',
            fieldLabel : 'Tipo Etapa',
            defaultType: 'radiofield',
            defaults: {
                flex: 1
            },
            layout: 'hbox',
            items: [
                {
                    boxLabel  : 'Inicial',
                    name      : 'tpEtapa',
                    inputValue: 'Inicial',
                    bind: {
                        value: '{etapaSeleccionada.tpEtapa}'
                    }
                }, 
                {
                    boxLabel  : 'Intermedia',
                    name      : 'tpEtapa',
                    inputValue: 'Intermedia',
                    bind: {
                        value: '{etapaSeleccionada.tpEtapa}'
                    }
                }, 
                {
                    boxLabel  : 'Final',
                    name      : 'tpEtapa',
                    inputValue: 'Final',
                    bind: {
                        value: '{etapaSeleccionada.tpEtapa}'
                    }
                }
            ]
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Duración Límite',
            name: 'duracion',
            allowBlank: false,
            bind: {
                value: '{etapaSeleccionada.duracion}'
            }
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Rol Asignado',
            name: 'rol',
            editable: false,
            displayField: 'titulo',
            valueField: 'idRol',
            queryMode: 'local',
            bind: {
                store: '{stRol}',
                selection: '{etapaSeleccionada.idRol}'
            }
        },
        {
            xtype: 'checkbox',
            boxLabel: 'Tarea',
            name: 'btarea',
            bind: {
                value: '{etapaSeleccionada.btarea}'
            }
        },
        {
            xtype: 'checkbox',
            boxLabel: 'Autorización',
            name: 'bautorizacion',
            bind: {
                value: '{etapaSeleccionada.bautorizacion}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Url',
            name: 'url',
            allowBlank: false,
            bind: {
                value: '{etapaSeleccionada.url}'
            }
        }
    ]
});