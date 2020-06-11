Ext.application({
    extend: 'wkf.Application',

    requires: [
        'wkf.view.main.MainView',
        'wkf.controller.Conexion',
        'wkf.proxy.JsonCall'
    ],

    mainView: 'wkf.view.main.MainView',

    launch: function () {
        var app = this,
            mainCtrl = app.getMainView().getController(),
            cnxCtrl = app.getController('Conexion');

        Ext.Ajax.request({
            url: GLOBAL_HOST + '/do/estadoSesion',
            cors: true, useDefaultXhrHeader: false,
            method: 'POST',
            
            success: function (response) {
                var sesion = Ext.decode(response.responseText),
                    oUsr = {};

                console.log('[lauch] estadoSesion', sesion);
                
                // setTimeout(function() {
                if (!sesion.bConectado) {
                    console.log('[launch] Usuario no conectado');
                    mainCtrl.doLogin();

                } else {
                    console.log('[launch] Usuario conectado');   
                    
                    oUsr['pUsuario'] = sesion.pUsuario;
                    oUsr['cUsuario'] = sesion.cUsuario;
                    oUsr['cNombre'] = sesion.cNombre;
                    oUsr['cEmail'] = sesion.cEmail;
                    oUsr['bLDAP'] = sesion.bLDAP;

                    cnxCtrl.setUsuario(oUsr);
                    mainCtrl.onLoginOk();
                }
                // }, 1000);
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status, response);
            }
        });
    }
});
