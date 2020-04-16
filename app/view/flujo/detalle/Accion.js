Ext.define('wkf.view.flujo.detalle.Accion',{
    extend: 'wkf.view.flujo.detalle.FormBase',
    xtype: 'detalle-accion',

    requires: [
        'Ext.form.FieldSet'
    ],

    title: 'Detalle Acción',

    bbar: [
        {
            text: 'Volver',
            iconCls: 'x-fa fa-chevron-circle-left',
            handler: 'onFrmAccionVolver'
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
            name: 'idAccion',
            bind: {
                value: '{accionSeleccionada.idAccion}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Título',
            name: 'titulo',
            allowBlank: false,
            bind: {
                value: '{accionSeleccionada.titulo}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            name: 'nombre',
            allowBlank: false,
            bind: {
                value: '{accionSeleccionada.nombre}'
            }
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Origen',
            name: 'idEtapaOrigen',
            editable: false,
            displayField: 'titulo',
            valueField: 'idEtapa',
            queryMode: 'local',
            bind: {
                store: '{stEtapas}',
                value: '{accionSeleccionada.idEtapaOrigen}'
            }
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Destino',
            name: 'idEtapaDestino',
            editable: false,
            displayField: 'titulo',
            valueField: 'idEtapa',
            queryMode: 'local',
            bind: {
                store: '{stEtapas}',
                value: '{accionSeleccionada.idEtapaDestino}'
            }
        },
        {
            xtype: 'fieldset',
            title: 'Estilado Ext Js',
            collapsible: true,
            items: [
                {
                    xtype: 'container',
                    defaultType: 'checkbox',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {   
                            xtype: 'checkbox',
                            boxLabel: 'Habilita Form',
                            name: 'extjs_habilita_form',
                            bind: {
                                value: '{accionSeleccionadaEstilo.habilita_form}'
                            }
                        },
                        {   
                            xtype: 'checkbox',
                            boxLabel: 'Rechazo',
                            name: 'extjs_btn_rechazo',
                            bind: {
                                value: '{accionSeleccionadaEstilo.btn_rechazo}'
                            }
                        },
                        {   
                            xtype: 'checkbox',
                            boxLabel: 'Oculto',
                            name: 'extjs_oculto',
                            bind: {
                                value: '{accionSeleccionadaEstilo.oculto}'
                            }
                        },
                    ]
                },
                {
                    xtype: 'container',
                    defaultType: 'textfield',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            fieldLabel: 'UI',
                            name: 'extjs_ui',
                            bind: {
                                value: '{accionSeleccionadaEstilo.ui}'
                            }
                        },
                        {
                            fieldLabel: 'Icono',
                            name: 'extjs_icono',
                            bind: {
                                value: '{accionSeleccionadaEstilo.icono}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaultType: 'textfield',
                    layout: 'hbox',
                    items: [
                        {
                            fieldLabel: 'Separador',
                            name: 'extjs_separador',
                            width: 70,
                            bind: {
                                value: '{accionSeleccionadaEstilo.separador}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Tipo Acceso',
                            name: 'extjs_tpAcceso',
                            editable: false,
                            displayField: 'titulo',
                            valueField: 'idAcceso',
                            queryMode: 'local',
                            bind: {
                                store: '{stAcceso}',
                                value: '{accionSeleccionadaEstilo.pTpAcceso}'
                            },
                            flex: 1
                        },
                    ]
                }
            ]
        }
    ]
});