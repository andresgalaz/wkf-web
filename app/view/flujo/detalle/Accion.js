Ext.define('wkf.view.flujo.detalle.Accion', {
	extend : 'wkf.view.flujo.detalle.FormBase',
	xtype : 'detalle-accion',
	requires : [ 'Ext.form.FieldSet' ],
	title : 'Detalle Acción',

	bbar : [ {
		text : 'Volver',
		iconCls : 'x-fa fa-chevron-circle-left',
		handler : 'onFrmAccionVolver'
	}, '->', {
		text : 'Cancelar',
		iconCls : 'x-fa fa-undo',
		handler : 'onFrmAccionVolver'
	}, {
		text : 'Grabar',
		iconCls : 'x-fa fa-save',
		handler : 'onFrmAccionGrabar'
	} ],

	items : [ {
		xtype : 'hidden',
		name : 'pAccion',
		bind : {
			value : '{accionSeleccionada.pAccion}'
		}
	}, {
		xtype : 'numberfield',
		fieldLabel : 'Orden',
		name : 'nOrden',
		allowBlank : false,
		bind : {
			value : '{accionSeleccionada.nOrden}'
		}
	}, {
		xtype : 'textfield',
		fieldLabel : 'Título',
		name : 'cTitulo',
		allowBlank : false,
		bind : {
			value : '{accionSeleccionada.cTitulo}'
		}
	}, {
		xtype : 'textfield',
		fieldLabel : 'Nombre',
		name : 'cNombre',
		allowBlank : false,
		bind : {
			value : '{accionSeleccionada.cNombre}'
		}
	}, {
		xtype : 'combobox',
		fieldLabel : 'Origen',
		name : 'fEtapaOrigen',
		editable : false,
		displayField : 'cTitulo',
		valueField : 'pEtapa',
		queryMode : 'local',
		bind : {
			store : '{stEtapa}',
			value : '{accionSeleccionada.fEtapaOrigen}'
		}
	}, {
		xtype : 'combobox',
		fieldLabel : 'Destino',
		name : 'fEtapaDestino',
		editable : false,
		displayField : 'cTitulo',
		valueField : 'pEtapa',
		queryMode : 'local',
		bind : {
			store : '{stEtapa}',
			value : '{accionSeleccionada.fEtapaDestino}'
		}
	}, {
		xtype : 'fieldset',
		title : 'Estilado Ext Js',
		collapsible : true,
		items : [ {
			xtype : 'container',
			defaultType : 'checkbox',
			defaults : {
				flex : 1
			},
			layout : 'hbox',
			items : [ {
				xtype : 'checkbox',
				boxLabel : 'Habilita Form',
				// name: 'extjs_habilita_form',
				name : 'habilita_form',
				bind : {
					// value : '{accionSeleccionadaEstilo.habilita_form}'
					value : '{accionSeleccionada.habilita_form}'						
				}
			}, {
				xtype : 'checkbox',
				boxLabel : 'Rechazo',
				// name : 'extjs_btn_rechazo',
				name : 'btn_rechazo',
				bind : {
					// value : '{accionSeleccionadaEstilo.btn_rechazo}'
					value : '{accionSeleccionada.btn_rechazo}'
				}
			}, {
				xtype : 'checkbox',
				boxLabel : 'Oculto',
				// name : 'extjs_oculto',
				name : 'oculto',
				bind : {
					// value : '{accionSeleccionadaEstilo.oculto}'
					value : '{accionSeleccionada.oculto}'
				}
			}, ]
		}, {
			xtype : 'container',
			defaultType : 'textfield',
			defaults : {
				flex : 1
			},
			layout : 'hbox',
			items : [ {
				fieldLabel : 'UI',
				// name : 'extjs_ui',
				name : 'ui',
				bind : {
					// value : '{accionSeleccionadaEstilo.ui}'
					value : '{accionSeleccionada.ui}'
				}
			}, {
				fieldLabel : 'Icono',
				// name : 'extjs_icono',
				name : 'icono',
				bind : {
					// value : '{accionSeleccionadaEstilo.icono}'
					value : '{accionSeleccionada.icono}'
				}
			} ]
		}, {
			xtype : 'container',
			defaultType : 'textfield',
			layout : 'hbox',
			items : [ {
				fieldLabel : 'Separador',
				// name : 'extjs_separador',
				name : 'separador',
				width : 70,
				bind : {
					// value : '{accionSeleccionadaEstilo.separador}'
					value : '{accionSeleccionada.separador}'
				}
			}, {
				xtype : 'combobox',
				fieldLabel : 'Tipo Acceso',
				// name : 'extjs_tpAcceso',
				name : 'tpAcceso',
				editable : false,
				displayField : 'cDescripcion',
				valueField : 'pTpAcceso',
				queryMode : 'local',
				bind : {
					store : '{stTpAcceso}',
					// value : '{accionSeleccionadaEstilo.pTpAcceso}'
					value : '{accionSeleccionada.pTpAcceso}'
				},
				flex : 1
			}, ]
		} ]
	} ]
});