Ext.define('wkf.view.dashboard.DashboardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard-dashboardview',

    onGraficoTareasPendientesItemClick: function(chart, item, event, eOpts) {
        var me = this,
            refs = me.getReferences(),
            idEtapa = item.record.get('idEtapa'),
            titulo = item.record.get('etapa');

        refs.gfTareasPendientesUsr.setCaptions({
            title: {
                text: titulo
            }
        });
    },

    onGraficoTareasPendientesTooltip: function(tooltip, record, item) {
        tooltip.setHtml(record.get('etapa') + ': ' + record.get('cant') + (record.get('cant') > 1 ? ' tareas' : ' tarea'));
    }

});
