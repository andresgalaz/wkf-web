
Ext.define('wkf.view.main.MainView',{
    extend: 'Ext.panel.Panel',
    xtype: 'main',

    requires: [
        'Ext.plugin.Viewport',

        'wkf.view.main.MainViewController',
        'wkf.view.main.MainViewModel',
        'wkf.view.main.MainToolbar',
        'wkf.view.main.MainContainerWrap',

        'wkf.view.flujo.FlujoView',
        'wkf.view.dashboard.DashboardView'
    ],

    controller: 'main-mainview',
    viewModel: {
        type: 'main-mainview'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'maintoolbar',
            height: 64,
            cls: 'main-headerbar',
        },
        {
            xtype: 'maincontainerwrap',
            reference: 'mainContainerWrap',
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationList',
                    itemId: 'navigationList',
                    ui: 'main-navigation',
                    html: 'Navigation Main',
                    bind: {
                        store: '{stNavigationTree}'
                    },
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    },
                    width: 250,
                },
                {
                    xtype: 'container',
                    reference: 'mainCardPanel',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    },
                    flex: 1,
                }
            ],
            flex: 1
        }
    ]

});
