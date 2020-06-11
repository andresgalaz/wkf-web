Ext.define('wkf.view.main.Routes', {
    extend: 'Ext.Mixin',

    lastView: null,
    activeNode: null,

    init: function () {
        var me = this;
        me.titulo = 'Compustrom';
    },

    beforeRoute: function (node, action) {
        // Tipicamente controla el acceso del usuario a la ruta
        var me = this,
            vm = me.getViewModel(),
            refs = me.getReferences(),
            stNavigationTree = vm.getStore('stNavigationTree'),
            token, newToken;
        
        if (node == 'pass_recupera') {
            action.resume();
            return;
        }

        Ext.Ajax.request({
            url: GLOBAL_HOST+'/do/estadoSesion',
            cors: true, withCredentials: true, useDefaultXhrHeader: false,
            method: 'POST',
            extraParams: {
                st: stNavigationTree
            },
            success: function (response, opts) {
                var rta = Ext.decode(response.responseText);
                if (!rta.bConectado || rta.cUsuario == 'automata') {
                    // Si no esta conectado => fuerza pantalla login
                    if (refs.wndLogin) {
                        refs.wndLogin.show();
                    } else {
                        var pnLogin = refs.wndLogin ? refs.wndLogin : Ext.create({
                            xtype: 'login',
                            reference: 'wndLogin',
                            listeners: {
                                close: 'onLoginOk',
                            }
                        });
                        pnLogin.show();
                    }
                    // me.redirectTo('login');

                } else if (rta.bPasswordCaducada) {
                    // Debe cambiar la password antes de continuar                    
                    me.onLoginCambioPass();
                    // me.redirectTo('pass_cambiar');

                } else {
                    // Control de acceso al modulo destino
                    newToken = action.getUrlParams().input;
                    var node = opts.extraParams.st.findNode('viewType', newToken);

                    if (node && node.data.cTpAcceso == 'DENEGAR') {
                        Ext.Msg.show({
                            title: me.titulo,
                            message: 'Usted no tiene permisos al módulo que intenta acceder',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                        return;
                    }

                    action.resume();
                }
            },
            failure: function (response, opts) {
                console.error('Falla del lado del servidor, código respuesta: ' + response.responseText);
                Ext.Msg.show({
                    title: me.titulo,
                    message: 'Error inesperado del servidor',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        });
    },

    beforeRouteDeep: function (node, id, action) {
        action.resume();
    },

    filterNodes: function () {
        var me = this,
            store = me.getViewModel().getStore('stNavigationTree'),
            nodeMsj = store.findNode('viewType', 'pe-mensajes-inbox');

        if (nodeMsj) {
            store.filterBy(function (rec) {
                return rec != nodeMsj;
            });
        }
    },

    getActiveNode: function () {
        return this.activeNode;
    },

    setCurrentView: function (hashTag, callback) {
        hashTag = (hashTag || '').toLowerCase();

        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationList,
            store = navigationList.getStore(),
            node = store.findNode('routeId', hashTag) ||
                store.findNode('viewType', hashTag),
            view = (node && node.get('viewType')), // || 'page404',
            lastView = me.lastView,
            existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
            newView;

        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();

        if (!existingItem) {

            if (!view) {
                // A veces sucede que no llega a levantar el viewType al iniciar el sistema
                // Vuelve a llamar onRoteChange

                console.warn('[setCurrentView] No existe view, vuelve a cargar onRouteChange', node);
                this.onRouteChange(hashTag);
                return;

            } else {
                newView = Ext.create({
                    xtype: view,
                    routeId: hashTag,  // for existingItem search later
                    hideMode: 'offsets'
                });
            }
        }

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.

            // Asigno el node aca para que el listener activate pueda tomar el nodo activo y asi determinar los permisos sobre el 
            me.activeNode = node;

            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        navigationList.setSelection(node);

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        me.lastView = newView;
        me.activeNode = node;

        if (callback) {
            callback();
        }
    },

    onNoRoute: function (node, evento_id) {
        console.error('No existe el nodo', node);
    },

    onRouteChange: function (node, evento_id) {
        // IMPORTANTE: El parametro evento_id corresponde a la PK de wkf_evento que la vista espera para poder 
        // cargar datos. Dicha vista debe tener el listener 'cargadatos' direccionado a una funcion u otro evento.
        // Ejemplo this.redirectTo('pe-ingreso-solicitud/1234'); carga la vista pe-ingreso-solicitud cuyo wkf_evento_id=1234

        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            cxnCtrl = Ext.getApplication().getController('Conexion'),
            stNavigationTree = me.getViewModel().getStore('stNavigationTree'),
            activeView;

        view.mask('Cargando Sistema');

        if (stNavigationTree.getCount() == 0) {
            // Primera carga del sistema requiere sincronismo con el store del mainTree
            // Fuerza espera 3s para volver a intentar
            setTimeout(function () {
                if (stNavigationTree.getCount() == 0) {

                    stNavigationTree.load({
                        params: {
                            prm_cCodArbol: cxnCtrl.getSistemaId()
                        },
                        callback: function (records, operation, success) {
                            if (success && records.length > 0) {

                                me.setCurrentView(node, function () {
                                    // Funcion callback que carga datos en la vista
                                    if (id) {
                                        activeView = me.lastView;
                                        activeView.fireEvent('cargadatos', evento_id);
                                    }
                                    view.unmask();
                                });
                            } else {
                                if (node == 'pass_recupera') {
                                    var pnRecuperaPass =  Ext.create({
                                            xtype: 'pass_recupera',
                                            reference: 'wndRecuperaPass',
                                        });
                                    
                                    if (refs.wndLogin)
                                        refs.wndLogin.destroy();

                                } else {
                                    Ext.Msg.show({
                                        title: me.titulo,
                                        message: 'El usuario logeado no tiene permisos para utilizar este sistema',
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.ERROR,
                                        fn: function (btn) {
                                            if (btn === 'ok') {
                                                view.unmask();
                                                me.onLogout();
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                } else {
                    me.setCurrentView(node, function () {
                        // Funcion callback que carga datos en la vista
                        if (id) {
                            activeView = me.lastView;
                            activeView.fireEvent('cargadatos', evento_id);
                        }
                        view.unmask();
                    });
                }
            }, 2000);
        } else {
            me.setCurrentView(node, function () {
                // Funcion callback que carga datos en la vista
                if (id) {
                    activeView = me.lastView;
                    activeView.fireEvent('cargadatos', evento_id);
                }
                view.unmask();
            });
        }
    },

    getHash: function () {
        var hash = window.location.hash;
        
        return hash.substring(1, hash.length);
    }
});