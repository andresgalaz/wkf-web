Ext.define('wkf.view.flujo.detalle.Flujo',{
    extend: 'wkf.view.flujo.detalle.FormBase',
    xtype: 'detalle-flujo',

    title: 'Detalle Flujo',

    bbar: [
        '->',
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
            name: 'idFlujo',
            bind: {
                value: '{flujoSeleccionado.idFlujo}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Título',
            name: 'titulo',  
            allowBlank: false,
            bind: {
                value: '{flujoSeleccionado.titulo}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            name: 'nombre',  
            allowBlank: false,
            bind: {
                value: '{flujoSeleccionado.nombre}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Url',
            name: 'url',
            bind: {
                value: '{flujoSeleccionado.url}'
            }
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Duración Límite',
            name: 'duracion',
            bind: {
                value: '{flujoSeleccionado.duracion}'
            }
        },
    ]
});