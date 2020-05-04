Ext.define('wkf.view.flujo.detalle.Flujo',{
    extend: 'wkf.view.flujo.detalle.FormBase',
    xtype: 'detalle-flujo',
    title: 'Detalle Flujo',
    bbar: [
        '->',
        {
            text: 'Cancelar'
        }, {
            text: 'Grabar'
        }
    ],
    items: [ {
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