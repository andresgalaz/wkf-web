Ext.define('wkf.controller.Conexion', {
    extend: 'Ext.app.Controller',

    init: function() {
        var me = this;

        me.usuario = {};
        me.appId = '05'; // ID del sistema, corresponde a la PK de xformgen4.tSistema, se utiliza en permisos y carga del menu
        me.appNombre = '';
        me.defaultDataSource = "xgenJNDI";
    },

    getDefaultDS: function() {
        return this.defaultDataSource;
    },

    getUsuario: function() {
        return this.usuario;
    },

    getUsuarioId: function() {
        var me = this,
            usr = me.usuario;
        
        if (usr) {
            return usr.pUsuario;

        } else {
            console.warn('[getUsuarioId] No existe usuario');
        }
    },

    getUsuarioNombre: function() {
        var me = this,
            usr = me.usuario;
        
        if (usr) {
            return usr.cNombre;

        } else {
            console.warn('[getUsuarioNombre] No existe usuario');
        }
    },

    getCUsuario: function() {
        var me = this,
            usr = me.usuario;
        
        if (usr) {
            return usr.cUsuario;

        } else {
            console.warn('[getCUsuario] No existe usuario');
        }
    },

    getSistemaId: function() {
        return this.appId;
    },

    getSistemaNombre: function() {
        return this.appNombre;
    },

    setUsuario: function(usr) {
        var me = this;

        me.usuario = usr;
    }
});
