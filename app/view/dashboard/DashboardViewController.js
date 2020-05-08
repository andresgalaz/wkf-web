Ext.define('wkf.view.dashboard.DashboardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard-dashboardview',

    onGraficoTareasPendientesItemClick: function(chart, item, event, eOpts) {
        var me = this,
            refs = me.getReferences(),
            cTitulo = item.record.get('cEtapa');

        refs.gfTareasPendientesUsr.setCaptions({
            title: { text: cTitulo }
        });
    },

    onGraficoTareasPendientesTooltip: function(tooltip, record, item) {
        tooltip.setHtml(record.get('cEtapa') + ': ' + record.get('nCount') + (record.get('nCount') > 1 ? ' tareas' : ' tarea'));
    }

});
