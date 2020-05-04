Ext.define('wkf.model.Accion', {
    extend: 'Ext.data.Model',
    requires: [ 'wkf.proxy.JsonCall' ],
    idProperty: 'pAccion',
    fields: [
        { name: 'pAccion', type: 'int' },
        { name: 'cTitulo', type: 'auto' },
        { name: 'cNombre', type: 'auto' },
        { name: 'fEtapaOrigen', type: 'int' },
        { name: 'cEtapaOrigen', type: 'auto' },
        { name: 'fEtapaDestino', type: 'int' },
        { name: 'cEtapaDestino', type: 'auto' },
        { name: 'nOrden', type: 'int' },
        // { name: 'extjs_ui', mapping: 'cJsonData.["ui"]' },
        { name: 'ui', mapping: 'cJsonData.["ui"]' },
        { name: 'habilita_form', mapping: 'cJsonData.["habilita_form"]' },
       	{ name: 'btn_rechazo', mapping: 'cJsonData.["btn_rechazo"]' },
        { name: 'oculto', mapping: 'cJsonData.["oculto"]' },
        { name: 'icono', mapping: 'cJsonData.["icono"]' },
        { name: 'separador', mapping: 'cJsonData.["separador"]' },
        { name: 'tpAcceso', mapping: 'cJsonData.["tpAcceso"]' }
    ],

    proxy: {
        type : 'jsoncall',
        url : GLOBAL_HOST + '/do/jsonCall',
        extraParams : {            
            prm_funcion : 'jStore.wkf.admin.accion.Consulta',
        },
        reader:{
        	type:'json',
        	transform:{
        		fn:function(data){
        			// Convierte la información cJsonData de String a JSON
        			for(i = 0; i < data.records.length; i++)
        				data.records[i].cJsonData = Ext.decode(data.records[i].cJsonData);
        			console.log('DEBUG data:',data);
        			return data;
        		}	
        	}
        }
    }
});