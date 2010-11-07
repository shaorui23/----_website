Manage.DecesionCenter = Ext.extend(Ext.app.Module, {
    id: 'decesionCenter',
    init: function(){
        this.launcher = {
            text: '筛选中心',
            iconCls: 'bogus',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function(){
        var manage = this.app.getDesktop();
        var win = manage.getWindow('decesionCenter');
        if(!win){
            win = manage.createWindow({
                id: 'decesionCenter',
                title: '筛选中心',
                width: 640,
                height: 480,
                iconCls: 'bogus',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
            });
        }
        win.show();
    }
});
