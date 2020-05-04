Ext.define('wkf.view.flujo.detalle.FormBase', {
	extend : 'Ext.form.Panel',
	requires : [ 'Ext.form.field.*' ],
	url : GLOBAL_HOST + '/do/jsonCall',
	// Estos parámetros no están implementados para Submit y Load de Forms
	// NO se puede hacer CROSS DOMAIN
	// cors: true, withCredentials: true, useDefaultXhrHeader: false,
	fieldDefaults : {
		labelAlign : 'top',
		labelWidth : 90,
		margin : '0 0 5 6'
	},
	jsonSubmit : true,
	frame : false,
	scrollable : 'y',
	bodyPadding : 5,
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	submit : function(opcs) {
		var me = this, // view = me.getView(),
		opcs = opcs || {}, cJsonData = JSON.stringify(me.getForm().getFieldValues());

		opcs.url = opcs.url || me.url;
		opcs.params = opcs.params || {};
		opcs.paramDataProperty = opcs.paramDataProperty || 'cJsonData';
		opcs.params[opcs.paramDataProperty] = cJsonData;

		// Como no se puede hacer CROSS DOMAIN, se implementa una llamada AYAX
		// que reemplaza al SUBMIT
		Ext.Ajax.request({
			url : opcs.url,
			cors : true,
			withCredentials : true,
			useDefaultXhrHeader : false,
			method : 'POST',
			params : opcs.params,
			success : function(response, opts) {
				// Si se indicó una función para SUCCESS
				if (opcs.success && typeof opcs.success === 'function') {
					opcs.success(response, opts);
					return true;
				}
				// Si no hay función para SUCCESS, pero hay error en la respuesta
				var resp = Ext.decode(response.responseText);
				if (!resp.success) {
					console.error('[FormBase]', resp);
					Ext.Msg.show({
						title : 'Form Base Submit',
						message : resp.message,
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.ERROR
					});
					return true;
				}
			},
			failure : function(response, opts) {
				// view.unmask();

				console.error('[FormBase] Error inesperado: ' + response.status);
				Ext.Msg.show({
					title : 'Error Inesperado',
					message : response.responseText,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.ERROR
				});
			}
		});
	}
});