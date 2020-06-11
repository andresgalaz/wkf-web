Ext.define('wkf.view.flujo.detalle.Flujo',{
    extend: 'wkf.view.flujo.detalle.FormBase',
    xtype: 'detalle-flujo',
    title: 'Detalle Flujo',
    bbar: [
        '->',
        {
            text: 'Cancelar',
            iconCls : 'x-fa fa-undo',
            handler : 'onFrmFlujoLimpiar'
        }, {
            text: 'Grabar',
        	iconCls : 'x-fa fa-save',
        	handler : 'onFrmFlujoGrabar'
        }
    ],
    items: [ {
         	xtype: 'hidden',
	        name: 'fSistema',
	        bind: { value: '{flujoSeleccionado.fSistema}' }
	    }, {
	        xtype: 'hidden',
	        name: 'pFlujo',
	        bind: { value: '{flujoSeleccionado.pFlujo}' }
	    }, {
            xtype: 'textfield',
            fieldLabel: 'Título',
            name: 'cTitulo',  
            allowBlank: false,
            bind: { value: '{flujoSeleccionado.cTitulo}' }
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            name: 'cNombre',  
            allowBlank: false,
            bind: { value: '{flujoSeleccionado.cNombre}' }
        }, {
            xtype: 'textfield',
            fieldLabel: 'URL',
            name: 'cURL',
            bind: { value: '{flujoSeleccionado.cURL}' }
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Duración Límite',
            name: 'nDuracionLimite',
            bind: { value: '{flujoSeleccionado.nDuracionLimite}' }
        }]
});