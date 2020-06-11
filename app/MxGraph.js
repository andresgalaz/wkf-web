Ext.define('wkf.MxGraph', {
	singleton : true,
	graph : null,

	getGraph : function(opcs) {
		if (this.graph != null)
			return this.graph;

		// this.iniciar();
		var container = document.getElementById('contenedorGrafico');
		mxEvent.disableContextMenu(container);
		this.graph = new mxGraph(container);

		var style = this.graph.getStylesheet().getDefaultEdgeStyle();
		style[mxConstants.STYLE_ROUNDED] = true;
		style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
		this.graph.alternateEdgeStyle = 'elbow=vertical';

		return this.graph;
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
		var nX = 20, nY = 20;
		for (var i = 0; i < flujoData.etapas.length; i++) {
			var etapa = flujoData.etapas[i];
			this.insertaEtapa({
				id : etapa.cNombre,
				titulo : etapa.cTitulo,
				x : nX,
				y : nY
			});
			nX += 140;
			if (nX > 700) {
				nY += 100;
				nX = 20;
			}
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
	},

	loadFromXml : function(strXml) {
		var graph = this.getGraph(), doc = mxUtils.parseXml(strXml), codec = new mxCodec(doc);

		codec.decode(doc.documentElement, graph.getModel());
	},

	leer : function(opcs) {
		this.iniciar();

		var me = this, graph = this.getGraph();

		opcs = opcs || {};
		opcs.reDibujar = (opcs.reDibujar || false);
		if (!opcs.pFlujo)
			return true;

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