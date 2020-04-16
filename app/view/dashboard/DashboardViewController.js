Ext.define('wkf.view.dashboard.DashboardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard-dashboardview',

    onGraficoTareasPendientesTooltip: function(tooltip, record, item) {
        tooltip.setHtml(record.get('tarea') + ': ' + record.get('porc') + '%');
    }

});
