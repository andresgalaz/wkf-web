Ext.define('wkf.Helper', {
	singleton : true,

	jsonCall : function(opcs) {
		var opcs = opcs || {};

		opcs.params = opcs.params || {};

		// Acepta 2 funciones: success y callback.
		// Si hay función success, se ejecuta siempre, pero no el callback.
		// Si no hay funcion success, se ejecuta calbback si todo va bien.
		// NO se requiere failure, dado que esta ocurre cuando hay problemas con el sevidor, asi
		// es que con un mensaje genérico basta.
		Ext.Ajax.request({
			url : GLOBAL_HOST + '/do/jsonCall',
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
				// Si no hay función para SUCCESS
				var resp = Ext.decode(response.responseText);
				if (resp.success) {
					// Hay un callback para realizar si todo va OK
					if (opcs.callback && typeof opcs.callback === 'function') {
						opcs.callback(response, opts);
						return true;
					}
				} else {
					console.error('[Helper.jsonCall]', resp);
					Ext.Msg.show({
						title : 'Llamada al Servidor',
						message : resp.message,
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.ERROR
					});
					return true;
				}
			},
			failure : function(response, opts) {
				// Error de comunicaciones o en el servidor
				console.error('[Helper.jsonCall] Error inesperado: ' + response.status);
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