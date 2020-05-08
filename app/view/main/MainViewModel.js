Ext.define('wkf.view.main.MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main-mainview',
    data: {
        name: 'wkf'
    },

    stores: {
        stNavigationTree: {
            type: 'tree',
            
            fields: [
                { name: "text" },
                { name: "cTpAcceso" },
                { name: "leaf", type:'boolean' },
                { name: "viewType" },
                { name: "cCodArbol" },
                { name: "iconCls" }
            ], 

            clearOnLoad: true, 

            root: {
                expanded: true
            },

            proxy: {
                url : GLOBAL_HOST+'/do/menuFull',
                cors: true, withCredentials: true, useDefaultXhrHeader: false,
                method : 'GET', 
                type : 'ajax',
                reader : {
                    type : 'json',
                    rootProperty : 'children',
                    successProperty : 'success'
                }
            }, 
            
            // listeners: {
            //     load: 'onNavigationTreeLoad' 
            // }
        }
    }

});
