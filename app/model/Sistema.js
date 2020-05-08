Ext.define('wkf.model.Sistema', {
    extend: 'Ext.data.Model',
    requires: ['wkf.proxy.JsonCall'],
    
    idProperty: 'pSistema',
    fields: ['pSistema','cNombre','cTitulo'],             

    proxy: {
        type: 'jsoncall',
        url : GLOBAL_HOST + '/do/jsonCall',
        extraParams : {            
            prm_funcion : 'paGlobal.sistema'
        }
    }
});