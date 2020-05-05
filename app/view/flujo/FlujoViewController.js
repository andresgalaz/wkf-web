Ext.define('wkf.view.flujo.FlujoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.flujo-flujoview',
    requires: ['wkf.model.EtapaFuncion'],

    seleccionarFlujo: function() {
        var me = this,
            vm = me.getViewModel(),
            flujo = vm.get('flujoSeleccionado'),
            stEtapa = vm.getStore('stEtapa'),
            refs = me.getReferences(),
            detallePanel = refs.detallePanel,
            frmFlujo = refs.frmFlujo,
            tab = refs.tabFlujo;

        if (flujo && flujo.pFlujo > 0) {
            detallePanel.setActiveItem(frmFlujo);
            frmFlujo.setTitle(flujo.cTitulo);

            // Muestras tabs especificos de la etapa seleccionada
            tab.child('#tabEtapas').tab.show();
            tab.child('#tabFuncionesEtapa').tab.hide();
            tab.child('#tabAcciones').tab.hide();
            tab.child('#tabFuncionesAccion').tab.hide();
    
            tab.setActiveTab(tab.child('#tabEtapas'));

            stEtapa.load({
                params: {
                    prm_flujo: flujo.pFlujo
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
            stFlujo = vm.getStore('stFlujo'),
            stEtapa = vm.getStore('stEtapa'),
            pSistema = record.get('pSistema'),
            detallePanel = refs.detallePanel,
            frmFlujo = refs.frmFlujo,
            tab = refs.tabFlujo;;

        refs.cbFlujo.clearValue();

        frmFlujo.setTitle('Detalle Flujo');
        frmFlujo.reset();
        
        stEtapa.removeAll();

        detallePanel.setActiveItem(frmFlujo);

        tab.child('#tabEtapas').tab.show();
        tab.child('#tabFuncionesEtapa').tab.hide();
        tab.child('#tabAcciones').tab.hide();
        tab.child('#tabFuncionesAccion').tab.hide();

        tab.setActiveTab(tab.child('#tabEtapas'));

        if (pSistema) {
            stFlujo.load({
                params: {
                    prm_sistema: pSistema
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

    onFrmAccionGrabar: function() {
        var me = this,
            frmAccion = me.getReferences().frmAccion,
            stAccionFn = me.getViewModel().getStore('stAccionFuncion')
            ;
            

    	var objData = stAccionFn.getData().items;
    	var arrData = [];
    	// Copia Registros Modificados
    	for (var i = 0; i < objData.length; i++)
    		arrData[arrData.length] = objData[i].data;
    	console.log(arrData);
	        
        frmAccion.submit({
        	params: { 
        		prm_funcion: 'jStore.wkf.admin.accion.Graba',
        		prm_accionFuncion: Ext.encode(arrData)
        	},
            paramDataProperty: 'prm_cJsonData', 
            success:function(response, opts){
				var resp = Ext.decode(response.responseText);
				if (resp.success) {
			        stAccionFn.commitChanges();
					
			        me.onFrmAccionVolver();
					return;
				}
    			Ext.Msg.show({
    				title : 'Formulario Accion',
    				message : resp.message,
    				buttons : Ext.Msg.OK,
    				icon : Ext.Msg.ERROR
    			});                        	
            }
        });
        
    },

    onFrmAccionVolver: function() {
        var me = this,
            refs = me.getReferences(),
            detallePanel = refs.detallePanel,
            stAccion = me.getViewModel().getStore('stAccion'),
            frmEtapa = refs.frmEtapa,
            tab = refs.tabFlujo;

        detallePanel.setActiveItem(frmEtapa);

        // Muestras tabs especificos de la etapa seleccionada
        tab.child('#tabEtapas').tab.hide();
        tab.child('#tabFuncionesEtapa').tab.show();
        tab.child('#tabAcciones').tab.show();
        tab.child('#tabFuncionesAccion').tab.hide();

        tab.setActiveTab(tab.child('#tabAcciones'));
        stAccion.reload();
    },

    onFrmEtapaGrabar: function() {
        var me = this,
            frmEtapa = me.getReferences().frmEtapa,
            stEtapaFn = me.getViewModel().getStore('stEtapaFuncion')
            ;
            

    	var objData = stEtapaFn.getData().items;
    	var arrData = [];
    	// Copia Registros Modificados
    	for (var i = 0; i < objData.length; i++)
    		arrData[arrData.length] = objData[i].data;
    	console.log(arrData);
	        
        frmEtapa.submit({
        	params: { 
        		prm_funcion: 'jStore.wkf.admin.etapa.Graba',
        		prm_etapaFuncion: Ext.encode(arrData)
        	},
            paramDataProperty: 'prm_cJsonData', 
            success:function(response, opts){
				var resp = Ext.decode(response.responseText);
				if (resp.success) {
			        stEtapaFn.commitChanges();
					
			        me.onFrmEtapaVolver();
					return;
				}
    			Ext.Msg.show({
    				title : 'Formulario Etapa',
    				message : resp.message,
    				buttons : Ext.Msg.OK,
    				icon : Ext.Msg.ERROR
    			});                        	
            }
        });
        
    },

    onFrmEtapaVolver: function() {
        var me = this,
            refs = me.getReferences(),
            detallePanel = refs.detallePanel,
            stEtapa = me.getViewModel().getStore('stEtapa');
            frmFlujo = refs.frmFlujo,
            tab = refs.tabFlujo;

        detallePanel.setActiveItem(frmFlujo);

        // Muestras tabs especificos de la etapa seleccionada
        tab.child('#tabEtapas').tab.show();
        tab.child('#tabFuncionesEtapa').tab.hide();
        tab.child('#tabAcciones').tab.hide();
        tab.child('#tabFuncionesAccion').tab.hide();

        tab.setActiveTab(tab.child('#tabEtapas'));
        stEtapa.reload();
    },

    onGrillaAccionesNueva: function() {
        var me = this,
            refs = me.getReferences(),
            detallePanel = refs.detallePanel,
            frmAccion = refs.frmAccion,
        	vm = me.getViewModel(),
            etapaOrigen = vm.get('etapaSeleccionada')
            nOrden = 0
            ;

        
        // Busca el máximo nOrden
        {
	        var stAccion = refs.gpAccion.getStore(),
	        	items = stAccion.getData().items;
	        for(i = 0; i < items.length ; i++){
	        	if(nOrden < items[i].get('nOrden')  )
	        		nOrden = items[i].get('nOrden') ;
	        }
        }
        // Se incrementa en 10 el máximo nOrden
        nOrden += 10;

        // Valores pòr defecto
        vm.set('accionSeleccionada', 
    		Ext.create('wkf.model.Accion', {
    			fEtapaOrigen: etapaOrigen.get('pEtapa'),
    			nOrden: nOrden,
                nuevo: true
            })
        );       
        frmAccion.reset();
        frmAccion.setTitle('Nueva Accion');
        detallePanel.setActiveItem(frmAccion);
        
    },

    onGrillaAccionesEliminar: function(grid, rowIndex, colIndex) {
        var me = this,
	        rec = grid.getStore().getAt(rowIndex),
	        pAccion = rec.get('pAccion');
	        
        Ext.Msg.confirm('Acciones', '¿Está seguro de eliminar?',
            function (choice) {
                if (choice !== 'yes') 
                	return;
                wkf.Helper.jsonCall({
                	params:{
                		prm_funcion: 'jStore.wkf.admin.accion.Elimina',
                		prm_pAccion: pAccion
                	},
                	callback: function(response, opts){
                		me.onFrmAccionVolver();
                	}
                });
            }
        );
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
            // estilo = Ext.decode(rec.get('cJsonData')),
            pAccion = rec.get('pAccion');

        detallePanel.setActiveItem(frmAccion);

        vm.set('accionSeleccionada', rec);
        // vm.set('accionSeleccionadaEstilo', estilo);

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
                prm_accion: pAccion
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
                pAccion: accionSeleccionada.get('pAccion') > 0 ? accionSeleccionada.get('pAccion') : 0,
                nuevo: true
            });
        
        st.insert(0, rec);
        pluginEdit.startEdit(rec);
    },

    onGrillaAccionFuncionEliminar: function(grid, rowIndex, colIndex) {
        var me = this,
        rec = grid.getStore().getAt(rowIndex),
        pAccion = rec.get('pAccion')
        pSecuencia = rec.get('pSecuencia')
        ;

	    Ext.Msg.confirm('Funcion en Acciones', '¿Está seguro de eliminar?',
	        function (choice) {
	            if (choice !== 'yes') 
	            	return;
	            wkf.Helper.jsonCall({
	            	params:{
	            		prm_funcion: 'jStore.wkf.admin.accion.EliminaFuncion',
	            		prm_pAccion: pAccion,
	            		prm_pSecuencia: pSecuencia
	            	},
	            	callback: function(response, opts){
	            		me.onFrmAccionVolver();
	            	}
	            });
	        }
	    );
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

    onGrillaEtapaEliminar: function(grid, rowIndex, colIndex) {
        var me = this,
        rec = grid.getStore().getAt(rowIndex),
        pEtapa = rec.get('pEtapa');
        
	    Ext.Msg.confirm('Etapas', '¿Está seguro de eliminar?',
	        function (choice) {
	            if (choice !== 'yes') 
	            	return;
	            wkf.Helper.jsonCall({
	            	params:{
	            		prm_funcion: 'jStore.wkf.admin.etapa.Elimina',
	            		prm_pEtapa: pEtapa
	            	},
	            	callback: function(response, opts){
	            		me.onFrmEtapaVolver();
	            	}
	            });
	        }
	    );
	},

    onGrillaEtapaNueva: function() {
        var me = this,
        	vm = me.getViewModel(),
            refs = me.getReferences(),
            detallePanel = refs.detallePanel,
            frmEtapa = refs.frmEtapa,
            flujo = vm.get('flujoSeleccionado')
            ;
        // Valores pòr defecto
        vm.set('etapaSeleccionada', 
    		Ext.create('wkf.model.Etapa', {
    			tpEtapa: 'M',
    			fFlujo: flujo.pFlujo,
    			nDuracion: 8,
                nuevo: true
            })
        );       
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
            stAccion = vm.getStore('stAccion'),
            rec = grid.getStore().getAt(rowIndex),
            pEtapa = rec.get('pEtapa');

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
                prm_etapa: pEtapa
            }
        });

        stAccion.load({
            params: {
                prm_etapaOrigen: pEtapa
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
                pEtapa: etapaSeleccionada.get('pEtapa') > 0 ? etapaSeleccionada.get('pEtapa') : 0,
                nuevo: true
            });
        
        st.insert(0, rec);
        pluginEdit.startEdit(rec);
    },

    onGrillaEtapaFuncionEliminar: function(grid, rowIndex, colIndex) {
        var me = this,
        rec = grid.getStore().getAt(rowIndex),
        pEtapa = rec.get('pEtapa')
        pSecuencia = rec.get('pSecuencia')
        ;

	    Ext.Msg.confirm('Funcion en Acciones', '¿Está seguro de eliminar?',
	        function (choice) {
	            if (choice !== 'yes') 
	            	return;
	            wkf.Helper.jsonCall({
	            	params:{
	            		prm_funcion: 'jStore.wkf.admin.etapa.EliminaFuncion',
	            		prm_pEtapa: pEtapa,
	            		prm_pSecuencia: pSecuencia
	            	},
	            	callback: function(response, opts){
	            		me.onFrmEtapaVolver();
	            	}
	            });
	        }
	    );
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