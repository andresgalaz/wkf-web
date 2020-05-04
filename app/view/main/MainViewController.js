Ext.define('wkf.view.main.MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-mainview',
    mixins: ['wkf.view.main.Routes'],

    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onNoRoute'
            }
        }
    },

    routes: {
        ':node': {
            action: 'onRouteChange',
            before: 'beforeRoute'
        },

        ':node/:id': {
            action: 'onRouteChange',
            before: 'beforeRouteDeep'
        }
    },

    doLogin: function () {
        // var me = this,
        //     refs = me.getReferences(),
        //     pnLogin = refs.wndLogin ? refs.wndLogin : Ext.create({
        //         xtype: 'login',
        //         reference: 'wndLogin',
        //         listeners: {
        //             close: 'onLoginOk',
        //         }
        //     });

        // console.log('[doLogin] login', pnLogin);
        // pnLogin.show();
        // this.redirectTo('login');
    },

    onLoginOk: function (pnl, opts) {
        var me = this,
            refs = me.getReferences(),
            app =  Ext.getApplication(),
            stNavigationTree = refs.navigationList.getStore(),
            cxnCtrl = app.getController('Conexion'),
            usrNombre = cxnCtrl.getUsuarioNombre(),
            hash = me.getHash() ? me.getHash() : app.getDefaultToken();

        if (usrNombre)
            refs.usrConectado.setData(usrNombre);

        // Carga el menu lateral con los permisos para el usuario logueado
        if (stNavigationTree.getRoot().childNodes.length > 0) {
            stNavigationTree.getRoot().removeAll();
        }

        console.log('[onLoginOk] usuario', cxnCtrl.getUsuario());
        stNavigationTree.load({
            params: {
                prm_cCodArbol: cxnCtrl.getSistemaId()
            },
            callback: function (records, operation, success) {
                if (hash)
                    me.setCurrentView(hash);
            
                // var app = Ext.getApplication(),
                //     defaultToken = app.getDefaultToken();

                // // IMPORTANTE: Modificar aca si se quiere usar otro view predeterminado segun perfil usuario
                // // me.setCurrentView(defaultToken);

                // // Modifica el defaultToken en caso que el perfil requiera otro que el dashboard de tareas
                // Ext.Ajax.request({
                //     url: GLOBAL_HOST+'/do/vyl/bsh/main/menuPerfiles.bsh',
                //     cors: true, withCredentials: true, useDefaultXhrHeader: false,
                //     method: 'POST',
                //     params: {
                //         prm_dataSource: cxnCtrl.getDefaultDS(),
                //     },
                //     success: function (response, opts) {
                //         var obj = Ext.decode(response.responseText);
                //         if (obj.success) {
                //             var data = obj.response,
                //                 importancia = 0;

                //             data.forEach(function (pf) {
                //                 switch (pf) {
                //                     // Perfiles con el mismo nivel de importancia son incompatibles
                //                 }
                //             });

                //             if (app.getDefaultToken()) {
                //                 app.redirectTo(app.getDefaultToken());
                //             }
                //         }
                //     }
                // });
            }
        });
    },

    onLoginCambioPass: function (pnl, opts) {
        // var me = this,
        //     pnCambioPass = Ext.create({
        //         xtype: 'pass_cambiar',
        //         reference: 'wndCambioPass',
        //     });

        // Ext.Msg.show({
        //     title: 'Compustrom - Login',
        //     message: 'Su password ha caducado. Ingrese una nueva.',
        //     buttons: Ext.Msg.OK,
        //     icon: Ext.Msg.WARN
        // });

        // pnCambioPass.show();
    },

    onLogout: function () {
        // var me = this,
        //     refs = me.getReferences(),
        //     pnLogin = refs.wndLogin ? refs.wndLogin : Ext.create({
        //         xtype: 'login',
        //         reference: 'wndLogin',
        //         listeners: {
        //             close: 'onLoginOk',
        //         }
        //     });

        // Ext.Ajax.request({
        //     url: GLOBAL_HOST+'/do/salir',
        //     cors: true, withCredentials: true, useDefaultXhrHeader: false,
        //     method: 'POST',
        //     success: function (response, opts) {
        //         if (response.status == 200) {
        //             console.log('[onLogout] login', pnLogin);
        //             pnLogin.show();

        //         } else
        //             console.error(response.responseText);
        //     },
        //     failure: function (response, opts) {
        //         console.error('Falla del lado del servidor, código respuesta: ' + response.status);
        //     }
        // });
    },

    onNavigationTreeLoad: function (tree, records, successful, operation, node, eOpts) {
        // Filtra nodo mensajes que debe existir en el treeStore pero no mostrarse
        if (successful) {
            this.filterNodes();
        }
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));

        if (to) {
            this.redirectTo(to);
        }
    },

    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationList,
            stNavigationTree = me.getViewModel().getStore('stNavigationTree'),
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 45 : 250;

        // Quito filtro para que no de errores 
        stNavigationTree.clearFilter();

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.cntLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);

                refs.logo.removeCls('main-logo-micro');
                refs.logo.addCls('ha-logo');

                me.filterNodes();
            }

            navigationList.canMeasure = false;

            // Start this layout first since it does not require a layout
            refs.logo.animate({ dynamic: true, to: { width: new_width } });

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({ isRoot: true });
            navigationList.el.addCls('nav-tree-animating');

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                        navigationList.canMeasure = true;
                    },
                    single: true,
                });

                refs.logo.removeCls('ha-logo');
                refs.logo.addCls('main-logo-micro');
            }
        }
    },
});
