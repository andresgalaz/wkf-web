Ext.define('wkf.proxy.JsonCall', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.jsoncall',
    
    method: 'POST',
    url : GLOBAL_HOST+'/do/jsonCall',
    // url: 'https://app.compustrom.com/d/do/jsonCall',
    cors: true, withCredentials: true, useDefaultXhrHeader: false,
    
    reader : {
        type : 'json',
        rootProperty : 'records',
        totalProperty : 'count',
        successProperty: 'success',
        // transform: {
        //     fn:function(data){
        //         // Convierte la información cJsonData de String a JSON
        //         for(i = 0; i < data.records.length; i++)
        //             data.records[i].cJsonData = Ext.decode(data.records[i].cJsonData);
        //         return data;
        //     }	
        // }
    },
    
    listeners: {
        exception: function(read, res, err, eOpts) {
            var me = this;

            if(!err.success) {
                var jsonRes = Ext.decode(res.responseText);

                // if (jsonRes.message == 'No está conectado, o la sesión está vencida por tiempo') {
                //     Ext.Msg.show({
                //         title: 'OdontAr - Sistema Gestión Odontológica',
                //         message: 'No está conectado, o la sesión está vencida por tiempo.<br>Debe volver a loguearse para continuar',
                //         buttons: Ext.Msg.OK,
                //         icon: Ext.Msg.INFO,
                //         fn: function(btn) {
                //             if (btn === 'ok') {
                //                 me.pnLogin = Ext.create({
                //                     xtype : 'login',
                //                     listeners: {
                //                         close: 'onLoginOk'
                //                     }
                //                 }).show();
                //             }
                //         }
                //     });
                // } else {
                    console.error('Error inesperado JsonCall:', jsonRes.message);
                    Ext.Msg.show({
                        title: 'Error Inesperado',
                        message: jsonRes.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                // }
            }
        }
    }   
});