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
            cors: true, withCredentials: true, useDefaultXhrHeader: false,
            method: 'POST',
            
            success: function (response) {
                var sesion = Ext.decode(response.responseText),
                    oUsr = {};

                if (!sesion.bConectado) {
                    mainCtrl.doLogin();
                } else {                    
                    oUsr['pUsuario'] = sesion.pUsuario;
                    oUsr['cUsuario'] = sesion.cUsuario;
                    oUsr['cNombre'] = sesion.cNombre;
                    oUsr['cEmail'] = sesion.cEmail;
                    oUsr['bLDAP'] = sesion.bLDAP;

                    cnxCtrl.setUsuario(oUsr);
                    mainCtrl.onLoginOk();
                }
            }
        });
    }
});
