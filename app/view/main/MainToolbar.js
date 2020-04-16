Ext.define('wkf.view.main.MainToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'maintoolbar',
    
    items: [
        {
            xtype: 'component',
            reference: 'logo',
            cls: 'main-logo',
            // html: '<div class="main-logo"><img src="resources/images/logo.png" style="width:70%; height:70%;"><b style="position:absolute; left:50px; top:50px;">Ventas y Leasing<b></div>',
            html: '<div class="main-logo"><img src="resources/images/logo_compustrom.png"/></div>',
        },
        {
            iconCls: 'x-fa fa-navicon',
            ui: 'header',
            handler: 'onToggleNavigationSize',
            margin: '0 0 0 8'
        },
        '->',
        {
            xtype: 'tbtext',
            reference: 'usrConectado',
            cls: 'top-user-name'
        },
        {
            xtype: 'image',
            reference: 'usrImagen',
            cls: 'header-right-profile-image',
            height: 35,
            width: 35,
            alt: 'Imagen del Usuario Conectado',
            src: 'resources/images/sin_foto.png'
        },'-',
        {
            iconCls:'x-fa fa-power-off',
            ui: 'header',
            handler: 'onLogout',
            tooltip: 'Salir del sistema'
        },
    ]
});