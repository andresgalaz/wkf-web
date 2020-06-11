Ext.define('wkf.view.flujo.FlujoToolbar', {
	extend : 'Ext.toolbar.Toolbar',
	xtype : 'flujo-toolbar',

	items : [ {
		xtype : 'combobox',
		labelAlign : 'top',
		reference : 'cbSistemas',
		fieldLabel : 'Sistema',
		editable : false,
		displayField : 'cTitulo',
		valueField : 'pSistema',
		bind : {
			store : '{stSistema}'
		},
		listeners : {
			select : 'onCbSistemaSelect'
		},
		width : 300
	}, {
		xtype : 'combobox',
		labelAlign : 'top',
		reference : 'cbFlujo',
		fieldLabel : 'Flujo',
		editable : false,
		displayField : 'cTitulo',
		valueField : 'pFlujo',
		disabled : true,
		queryMode : 'local',
		bind : {
			store : '{stFlujo}',
			disabled : '{!cbSistemas.selection}',
			selection : '{flujoSeleccionado}'
		},
		listeners : {
			select : 'onCbFlujoSelect'
		},
		width : 300
	}, {
		text : 'Ver detalle',
		iconCls : 'x-fa fa-info-circle',
		margin : '20 5 0 0',
		handler : 'onFlujoVerDetalle'
	}, {
		text : 'Crear Nuevo',
		iconCls : 'x-fa fa-plus-circle',
		margin : '5 0 0 0',
		handler : 'onFrmFlujoNuevo'
	}, {
		text : 'Re-dibujar',
		iconCls : 'x-fa fa-cog',
		margin : '5 0 0 0',
		handler : 'onFrmFlujoRedibujar'
	} ]
});