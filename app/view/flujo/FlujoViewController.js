Ext.define('wkf.view.flujo.FlujoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.flujo-flujoview',

    requires: [
        'wkf.model.EtapaFuncion'
    ],

    seleccionarFlujo: function() {
        var me = this,
            vm = me.getViewModel(),
            flujo = vm.get('flujoSeleccionado'),
            stEtapas = vm.getStore('stEtapas'),
            refs = me.getReferences(),
            detallePanel = refs.detallePanel,
            frmFlujo = refs.frmFlujo,
            tab = refs.tabFlujo;

        if (flujo && flujo.idFlujo > 0) {
            detallePanel.setActiveItem(frmFlujo);
            frmFlujo.setTitle(flujo.titulo);

            // Muestras tabs especificos de la etapa seleccionada
            tab.child('#tabEtapas').tab.show();
            tab.child('#tabFuncionesEtapa').tab.hide();
            tab.child('#tabAcciones').tab.hide();
            tab.child('#tabFuncionesAccion').tab.hide();
    
            tab.setActiveTab(tab.child('#tabEtapas'));

            stEtapas.load({
                params: {
                    prm_flujo: flujo.idFlujo
                }
            });
        }
    },

    onCbFlujoSelect: function(cb, record, eOpts) {
        var me = this,
            vm = me.getViewModel(),
            flujo = record.getData();

        vm.set('flujoSeleccionado', flujo);
        me.seleccionarFlujo();
    },

    onCbSistemaSelect: function(cb, record, eOpts) {
        var me = this,
            vm = me.getViewModel(),
            refs = me.getReferences(),
            stFlujos = vm.getStore('stFlujos'),
            stEtapas = vm.getStore('stEtapas'),
            idSistema = record.get('idSistema'),
            detallePanel = refs.detallePanel,
            frmFlujo = refs.frmFlujo,
            tab = refs.tabFlujo;;

        refs.cbFlujo.clearValue();

        frmFlujo.setTitle('Detalle Flujo');
        frmFlujo.reset();
        
        stEtapas.removeAll();

        detallePanel.setActiveItem(frmFlujo);

        tab.child('#tabEtapas').tab.show();
        tab.child('#tabFuncionesEtapa').tab.hide();
        tab.child('#tabAcciones').tab.hide();
        tab.child('#tabFuncionesAccion').tab.hide();

        tab.setActiveTab(tab.child('#tabEtapas'));

        if (idSistema) {
            stFlujos.load({
                params: {
                    prm_sistema: idSistema
                }
            });
        }
    },

    onFlujoVerDetalle: function() {
        var me = this,
            refs = me.getReferences(),
            vm = me.getViewModel(),
            recFlujo = refs.cbFlujo.getSelection();

        if (recFlujo && recFlujo.getData()) {
            vm.set('flujoSeleccionado', recFlujo.getData());
            me.seleccionarFlujo();
        }
    },

    onFrmAccionVolver: function() {
        var me = this,
            refs = me.getReferences(),
            detallePanel = refs.detallePanel,
            stAcciones = me.getViewModel().getStore('stAcciones'),
            frmEtapa = refs.frmEtapa,
            tab = refs.tabFlujo;

        detallePanel.setActiveItem(frmEtapa);

        // Muestras tabs especificos de la etapa seleccionada
        tab.child('#tabEtapas').tab.hide();
        tab.child('#tabFuncionesEtapa').tab.show();
        tab.child('#tabAcciones').tab.show();
        tab.child('#tabFuncionesAccion').tab.hide();

        tab.setActiveTab(tab.child('#tabAcciones'));
        stAcciones.reload();
    },

    onFrmEtapaVolver: function() {
        var me = this,
            refs = me.getReferences(),
            detallePanel = refs.detallePanel,
            stEtapas = me.getViewModel().getStore('stEtapas');
            frmFlujo = refs.frmFlujo,
            tab = refs.tabFlujo;

        detallePanel.setActiveItem(frmFlujo);

        // Muestras tabs especificos de la etapa seleccionada
        tab.child('#tabEtapas').tab.show();
        tab.child('#tabFuncionesEtapa').tab.hide();
        tab.child('#tabAcciones').tab.hide();
        tab.child('#tabFuncionesAccion').tab.hide();

        tab.setActiveTab(tab.child('#tabEtapas'));
        stEtapas.reload();
    },

    onGrillaAccionesNueva: function() {
        var me = this,
            refs = me.getReferences(),
            detallePanel = refs.detallePanel,
            frmAccion = refs.frmAccion;

        detallePanel.setActiveItem(frmAccion);

        frmAccion.reset();
        frmAccion.setTitle('Nueva Accion');
    },

    onGrillaAccionesEliminar: function() {
        console.log('[onGrillaAccionesEliminar]');
    },

    onGrillaAccionesVerDetalle: function(grid, rowIndex, colIndex) {
        var me = this,
            refs = me.getReferences(),
            vm = me.getViewModel(),
            detallePanel = refs.detallePanel,
            frmAccion = refs.frmAccion,
            tab = refs.tabFlujo,
            stAccionFuncion = vm.getStore('stAccionFuncion'),
            rec = grid.getStore().getAt(rowIndex),
            estilo = Ext.decode(rec.get('estilo')),
            idAccion = rec.get('idAccion');

        detallePanel.setActiveItem(frmAccion);

        vm.set('accionSeleccionada', rec);
        vm.set('accionSeleccionadaEstilo', estilo);

        frmAccion.loadRecord(rec);

        // Muestras tabs especificos de la etapa seleccionada
        tab.child('#tabEtapas').tab.hide();
        tab.child('#tabFuncionesEtapa').tab.hide();
        tab.child('#tabAcciones').tab.hide();
        tab.child('#tabFuncionesAccion').tab.show();

        tab.setActiveTab(tab.child('#tabFuncionesAccion'));

        // Carga store
        stAccionFuncion.load({
            params: {
                prm_accion: idAccion
            }
        });
    },

    onGrillaAccionFuncionNueva: function() {
        var me = this,
            refs = me.getReferences(),
            vm = me.getViewModel(),
            accionSeleccionada = vm.get('accionSeleccionada'),
            st = refs.gpAccionFuncion.getStore(),
            pluginEdit = refs.gpAccionFuncion.findPlugin('rowediting'),
            rec = Ext.create('wkf.model.EtapaFuncion', {
                idAccion: accionSeleccionada.get('idAccion') > 0 ? accionSeleccionada.get('idAccion') : 0,
                nuevo: true
            });
        
        st.insert(0, rec);
        pluginEdit.startEdit(rec);
    },

    onGrillaAccionFuncionEliminar: function() {
        console.log('[onGrillaAccionFuncionEliminar]');
    },

    onGrillaAccionFuncionNuevaCancel: function(editor, context, eOpts) {
        var me = this,
            refs = me.getReferences(),
            st = refs.gpAccionFuncion.getStore(),
            rec = context.record;
        
        if (rec.get('nuevo')) {
            st.remove(rec);

        } else {
            // TODO
        }
    },

    onGrillaAccionFuncionNuevaGrabar: function(editor, context, eOpts) {
        var me = this,
            rec = context.record;
        
        console.log('[onGrillaAccionFuncionNuevaGrabar]', context);
    },

    onGrillaEtapaEliminar: function() {
        console.log('[onGrillaEtapaEliminar]');
    },

    onGrillaEtapaNueva: function() {
        var me = this,
            refs = me.getReferences(),
            detallePanel = refs.detallePanel,
            frmEtapa = refs.frmEtapa;

        detallePanel.setActiveItem(frmEtapa);

        frmEtapa.reset();
        frmEtapa.setTitle('Nueva Etapa');
    },

    onGrillaEtapaVerDetalle: function(grid, rowIndex, colIndex) {
        var me = this,
            refs = me.getReferences(),
            vm = me.getViewModel(),
            detallePanel = refs.detallePanel,
            frmEtapa = refs.frmEtapa,
            tab = refs.tabFlujo,
            stEtapaFuncion = vm.getStore('stEtapaFuncion'),
            stAcciones = vm.getStore('stAcciones'),
            rec = grid.getStore().getAt(rowIndex),
            idEtapa = rec.get('idEtapa');

        detallePanel.setActiveItem(frmEtapa);

        vm.set('etapaSeleccionada', rec);
        // frmEtapa.loadRecord(rec);
        frmEtapa.setTitle(rec.get('titulo'));

        // Muestras tabs especificos de la etapa seleccionada
        tab.child('#tabEtapas').tab.hide();
        tab.child('#tabFuncionesEtapa').tab.show();
        tab.child('#tabAcciones').tab.show();
        tab.child('#tabFuncionesAccion').tab.hide();

        tab.setActiveTab(tab.child('#tabFuncionesEtapa'));
        
        // Cargar stores
        stEtapaFuncion.load({
            params: {
                prm_etapa: idEtapa
            }
        });

        stAcciones.load({
            params: {
                prm_etapa_origen: idEtapa
            }
        });
    },

    onGrillaEtapaFuncionNueva: function() {
        var me = this,
            refs = me.getReferences(),
            vm = me.getViewModel(),
            etapaSeleccionada = vm.get('etapaSeleccionada'),
            st = refs.gpEtapaFuncion.getStore(),
            pluginEdit = refs.gpEtapaFuncion.findPlugin('rowediting'),
            rec = Ext.create('wkf.model.EtapaFuncion', {
                idEtapa: etapaSeleccionada.get('idEtapa') > 0 ? etapaSeleccionada.get('idEtapa') : 0,
                nuevo: true
            });
        
        st.insert(0, rec);
        pluginEdit.startEdit(rec);
    },

    onGrillaEtapaFuncionNuevaCancel: function(editor, context, eOpts) {
        var me = this,
            refs = me.getReferences(),
            st = refs.gpEtapaFuncion.getStore(),
            rec = context.record;
        
        console.log('[onGrillaEtapaFuncionNuevaCancel]', context);
        if (rec.get('nuevo')) {
            st.remove(rec);

        } else {
            // TODO
        }
    },

    onGrillaEtapaFuncionNuevaGrabar: function(editor, context, eOpts) {
        var me = this,
            rec = context.record;
        
        console.log('[onGrillaEtapaFuncionNuevaGrabar]', context);
    },

});