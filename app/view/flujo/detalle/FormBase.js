Ext.define('wkf.view.flujo.detalle.FormBase',{
    extend: 'Ext.form.Panel',

    requires: [
        // 'Ext.form.field.Text',
        // 'Ext.form.field.Number',
        'Ext.form.field.*'
    ],

    url: GLOBAL_HOST+'/do/jsonCall',
    cors: true, withCredentials: true, useDefaultXhrHeader: false,

    fieldDefaults: {
        labelAlign: 'top',
        labelWidth: 90,
        margin: '0 0 5 6'
    },

    jsonSubmit: true,
    frame: false,
    scrollable: 'y',
    bodyPadding: 5,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
      
});