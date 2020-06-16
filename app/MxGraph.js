Ext.define('wkf.MxGraph', {
	singleton : true,
	graph : null,
	undoManager : null,
	viewController : null,

	getGraph : function(opcs) {
		if (this.graph != null)
			return this.graph;

		// this.iniciar();
		var me = this, container = document.getElementById('contenedorGrafico'), graph = new mxGraph(container);

		mxEvent.disableContextMenu(container);
		graph.setTooltips(true);
		// graph.setConnectable(true);
		// Hablita seleccionar un rectangulo
		new mxRubberband(graph);

		// Sobre-escribe el manejo del doble clic
		var mxGraphDblClick = mxGraph.prototype.dblClick;
		mxGraph.prototype.dblClick = function(evt, cell) {
			// Deshablita
			// mxGraphDblClick.call(this, evt, cell);
		};

		// var style = graph.getStylesheet().getDefaultEdgeStyle();
		// style[mxConstants.STYLE_ROUNDED] = true;
		// style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
		// graph.alternateEdgeStyle = 'elbow=vertical';

		// Creates the default style for vertices
		var style = [];
		style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
		style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
		style[mxConstants.STYLE_STROKECOLOR] = 'gray';
		style[mxConstants.STYLE_ROUNDED] = true;
		style[mxConstants.STYLE_FILLCOLOR] = '#EEEEEE';
		style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
		style[mxConstants.STYLE_FONTCOLOR] = '#774400';
		style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
		style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
		style[mxConstants.STYLE_FONTSIZE] = '12';
		style[mxConstants.STYLE_FONTSTYLE] = 1;
		graph.getStylesheet().putDefaultVertexStyle(style);

		// Creates the default style for edges
		style = [];
		style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
		style[mxConstants.STYLE_STROKECOLOR] = '#6482B9';
		style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
		style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
		style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
		style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;
		style[mxConstants.STYLE_FONTSIZE] = '10';
		graph.getStylesheet().putDefaultEdgeStyle(style);

		var undoManager = new mxUndoManager();
		var listener = function(sender, evt) {
			undoManager.undoableEditHappened(evt.getProperty('edit'));
		};
		graph.getModel().addListener(mxEvent.UNDO, listener);
		graph.getView().addListener(mxEvent.UNDO, listener);

		// Handles keystroke events
		var keyHandler = new mxKeyHandler(graph);
		keyHandler.bindControlKey(90, function() {
			// ctrl + 90: z
			undoManager.undo();
		});
		this.undoManager = undoManager;

		// TODO: Para Maxito, este es el punto para enchanchar algún listener
		// de Sencha, el siguiente handler detecta si se selccionó una Etapa o Accion
		graph.createVertexHandler = function(state) {
			if (state != null) {
				console.log("createVertexHandler:", state.cell);
				me.viewController.seleccionarEtapa(state.cell.getId().substring(4));
			}
			return mxGraph.prototype.createVertexHandler.apply(this, arguments);
		};
		graph.createEdgeHandler = function(state, edgeStyle) {
			if (state != null) {
				console.log("createEdgeHandler:", state.cell);
				var cEtapaOrigen = state.cell.source.getId().substring(4), cAccion = state.cell.getId().substring(4);
				me.viewController.seleccionarAccion(cEtapaOrigen, cAccion);
			}
			return mxGraph.prototype.createEdgeHandler.apply(this, arguments);
		};

		return this.graph = graph;
	},

	grabar : function(opcs) {
		var graph = this.getGraph()
		encoder = new mxCodec(), node = encoder.encode(graph.getModel());

		opcs = opcs || {};

		// Si no viene xml base 64 en los datos de flujo, se genera a partir de la información del flujo
		wkf.Helper.jsonCall({
			params : {
				prm_funcion : 'jStore.wkf.graph.Graba',
				prm_flujo : opcs.pFlujo,
				prm_xml : mxUtils.getPrettyXml(node)
			},
			callback : function(res, opts) {
				var jsonRes = Ext.decode(res.responseText), flujoData = jsonRes.records[0];
				if (flujoData.mxGraph) {
					me.loadFromXml(flujoData.mxGraph);
					return true;
				}
				me.loadFromData(flujoData);
				return true;
			}
		});

	},

	iniciar : function(opcs) {
		this.loadFromXml('<mxGraphModel>' //
				+ '<root>'//
				+ '    <Workflow label="Workflow" description="" id="0"/>' //
				+ '    <Layer label="Default Layer" description="">' //
				+ '        <mxCell parent="0"/>' //
				+ '    </Layer>' //
				+ '</root>' //
				+ '</mxGraphModel>' //
		);
	},

	insertaEtapa : function(opcs) {
		var graph = this.getGraph(), parent = graph.getDefaultParent(), opcs = opcs || {};

		opcs = opcs || {};
		opcs.titulo = (opcs.titulo || 'No name') + "\n" + (opcs.id);
		opcs.id = 'ETA_' + opcs.id;
		opcs.x = opcs.x || 50;
		opcs.y = opcs.y || 50;
		opcs.w = opcs.w || 100;
		opcs.h = opcs.h || 40;

		// Si ya está presente la etapa
		var celda = graph.getModel().getCell(opcs.id);
		if (celda) {
			graph.getModel().setValue(celda, opcs.titulo);
			// celda.setValue(opcs.titulo);
			return;
		}

		// Sino existe se crea
		graph.getModel().beginUpdate();
		try {
			return graph.insertVertex(parent, opcs.id, opcs.titulo, opcs.x, opcs.y, opcs.w, opcs.h);
		} finally {
			graph.getModel().endUpdate();
		}

	},

	insertaAccion : function(opcs) {
		var graph = this.getGraph(), parent = graph.getDefaultParent();

		opcs = opcs || {};
		opcs.titulo = (opcs.titulo || 'No name') + "\n" + opcs.id;
		opcs.id = 'ACC_' + opcs.id;
		if (typeof opcs.etapaOrigen == 'string')
			opcs.etapaOrigen = graph.getModel().getCell('ETA_' + opcs.etapaOrigen);
		if (typeof opcs.etapaDestino == 'string')
			opcs.etapaDestino = graph.getModel().getCell('ETA_' + opcs.etapaDestino);

		// Si ya está presente la acción se elimina para dibujarla de nuevo
		var celda = graph.getModel().getCell(opcs.id);
		if (celda) {
			graph.getModel().remove(celda);
		}

		graph.getModel().beginUpdate();
		try {
			return graph.insertEdge(parent, opcs.id, opcs.titulo, opcs.etapaOrigen, opcs.etapaDestino, opcs.estilo);
		} finally {
			graph.getModel().endUpdate();
		}

	},

	/**
	 * flujoData debería contener: { etapas: [ ... ], acciones: [ ... ] }
	 */
	loadFromData : function(flujoData) {
		var graph = this.getGraph();
		// Asegura info
		flujoData = flujoData || {};
		flujoData.etapas = flujoData.etapas || [];
		flujoData.acciones = flujoData.acciones || [];
		// Crea etapas
		// var nX = 20, nY = 20;
		for (var i = 0; i < flujoData.etapas.length; i++) {
			var etapa = flujoData.etapas[i];
			this.insertaEtapa({
				id : etapa.cNombre,
				titulo : etapa.cTitulo
//				,
//				x : nX,
//				y : nY
			});
//			nX += 140;
//			if (nX > 700) {
//				nY += 100;
//				nX = 20;
//			}
		}
		for (var i = 0; i < flujoData.acciones.length; i++) {
			var accion = flujoData.acciones[i];
			this.insertaAccion({
				id : accion.cNombre,
				titulo : accion.cTitulo,
				etapaOrigen : accion.cEtapaOrigen,
				etapaDestino : accion.cEtapaDestino
			});
		}

		{
			// Aplica un Layout Automático
			var layout = new mxFastOrganicLayout(graph);
			var parent = graph.getDefaultParent();
			// Moves stuff wider apart than usual
			layout.forceConstant = 180;

			graph.getModel().beginUpdate();
			layout.execute(parent);
			graph.getModel().endUpdate();
		}

		{
			// Borra todos los EDGES y los vuelve a crear
			graph.getModel().beginUpdate();
			for (cId in graph.getModel().cells) {
				if (cId.startsWith('ACC_')){
					var acc = graph.getModel().cells[ cId ], eta = acc.source;
					graph.getModel().remove(acc);			
					// eta.remove(acc, false);					
				}
			}
			graph.getModel().endUpdate();
		}
		for (var i = 0; i < flujoData.acciones.length; i++) {
			var accion = flujoData.acciones[i];
			this.insertaAccion({
				id : accion.cNombre,
				titulo : accion.cTitulo,
				etapaOrigen : accion.cEtapaOrigen,
				etapaDestino : accion.cEtapaDestino
			});
		}

		this.undoManager.clear();

	},

	loadFromXml : function(strXml) {
		var graph = this.getGraph(), doc = mxUtils.parseXml(strXml), codec = new mxCodec(doc);

		codec.decode(doc.documentElement, graph.getModel());
		this.undoManager.clear();
	},

	leer : function(opcs) {
		this.iniciar();

		var me = this, graph = this.getGraph();

		opcs = opcs || {};
		opcs.reDibujar = (opcs.reDibujar || false);
		if (!opcs.pFlujo)
			return true;
		// TODO: Para Maxito, acá se recibe el controlador Sencha, esto no se debería
		// utilizar si mxGraph es una componente de Sencha
		me.viewController = opcs.viewController;

		// Si no viene xml base 64 en los datos de flujo, se genera a partir de la información del flujo
		wkf.Helper.jsonCall({
			params : {
				prm_funcion : 'jStore.wkf.graph.Flujo',
				prm_flujo : opcs.pFlujo
			},
			callback : function(res, opts) {
				var jsonRes = Ext.decode(res.responseText), flujoData = jsonRes.records[0];
				// Fuerza volver a crear el dibujo con los datos del flujo.
				if (opcs.reDibujar) {
					me.loadFromData(flujoData);
					return;
				}
				// Si ya existe el XML de mxGraph se carga
				if (flujoData.mxGraph) {
					me.loadFromXml(flujoData.mxGraph);
					return true;
				}
				// Si el campo mxGrpah está vacío, se dibuja a partir de la data
				me.loadFromData(flujoData);
				return true;
			}
		});

	}
});