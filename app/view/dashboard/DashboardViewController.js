Ext.define('wkf.view.dashboard.DashboardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard-dashboardview',
    requires: [
        'wkf.Helper'
    ],

    actualizaTotales: function(cSistema) {
        var me = this,
            vm = me.getViewModel();
        
        wkf.Helper.jsonCall({
            params:{
                prm_funcion: 'jStore.wkf.dashboard.ConsultaTotales',
                prm_cSistemaNombre: cSistema
            },
            callback: function(response, opts){
                var data = Ext.decode(response.responseText);
                // console.log('[onActivate] data', data);
                if (data.success) {
                    vm.set('totales', data.records[0]);
                }
            }
        });
    },

    onActivate: function() {
        var me = this,
            refs = me.getReferences(),
            vm = me.getViewModel(),
            stTareasPendientes = vm.getStore('stTareasPendientes'),
            stTareasPendientesUsr = vm.getStore('stTareasPendientesUsr'),
            cxnCtrl = Ext.getApplication().getController('Conexion');
        
        me.actualizaTotales('VYL');

        if (!refs.cbSistemas.getSelection()) {
            refs.cbSistemas.setValue(4);
            
            stTareasPendientes.load({
                params: {
                    prm_pSistema : 4
                }
            });

            stTareasPendientesUsr.load({
                params: {
                    prm_cSistemaNombre: 'VYL'
                }
            });
        }
    },

    onCbSistemaSelect: function(cb, record, eOpts) {
        var me = this,
            vm = me.getViewModel(),
            refs = me.getReferences(),
            stFlujo = vm.getStore('stFlujo'),
            stTareasPendientes = vm.getStore('stTareasPendientes'),
            stTareasPendientesUsr = vm.getStore('stTareasPendientesUsr'),
            pSistema = record.get('pSistema'),
            cSistema = record.get('cNombre');

        refs.cbFlujo.clearValue();

        if (pSistema) {
            stFlujo.load({
                params: {
                    prm_sistema: pSistema
                }
            });

            stTareasPendientes.load({
                params: {
                    prm_pSistema: pSistema
                }
            });
        }

        if (cSistema) {
            stTareasPendientesUsr.load({
                params: {
                    prm_cSistemaNombre: cSistema
                }
            });
        }
    },

    onGraficoTareasPendientesItemClick: function(chart, item, event, eOpts) {
        var me = this,
            refs = me.getReferences(),
            cTitulo = item.record.get('cEtapa');

        refs.gfTareasPendientesUsr.setCaptions({
            title: { text: cTitulo }
        });
    },

    onGraficoTareasPendientesTooltip: function(tooltip, record, item) {
        tooltip.setHtml(record.get('cEtapaTitulo') + ': ' + record.get('nCount') + (record.get('nCount') > 1 ? ' tareas' : ' tarea'));
    }

});
