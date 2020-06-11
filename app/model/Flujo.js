Ext.define('wkf.model.Flujo', {
    extend: 'Ext.data.Model',
    requires: ['wkf.proxy.JsonCall'],

    idProperty: 'pAccion',
    fields: ['pFlujo','cNombre','cTitulo','cURL','nDuracionLimite', 'fSistema'],          
    
    proxy: {
        type: 'jsoncall',
        url : GLOBAL_HOST + '/do/jsonCall',
        extraParams : {
            prm_funcion : 'jStore.wkf.admin.flujo.Consulta',
        }
    }
});