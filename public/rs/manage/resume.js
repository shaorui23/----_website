Manage.ResumeCenter = Ext.extend(Ext.app.Module, {
    id: 'resumeCenter',
    init: function(){
        this.launcher = {
            text: '简历中心',
            iconCls: 'bogus',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function(){
        var manage = this.app.getDesktop();
        var win = manage.getWindow('resumeCenter');
        if(!win){
            win = manage.createWindow({
                id: 'resumeCenter',
                title: '简历中心',
                width: 640,
                height: 480,
                iconCls: 'bogus',
                shim: false,
                animCollapse: false,
                constrainHeader: true,

                layout: 'fit',
                items: this.createPanel()
            });
        }
        win.show();
    },

    createPanel: function(){ 
        var data = [ 
            { 'question': 'Name', 'description': 'your whole name' },
            { 'question': 'Educational BackGround', 'description': 'how about your colleage life' }
        ];

        var rStore = new Ext.data.JsonStore({ 
            fields: [
                'question',
                'description'
            ]
        });
        rStore.loadData(data);

        var sm = new Ext.grid.CheckboxSelectionModel()
        return new Ext.grid.GridPanel({ 
            frame: true,
            viewConfig: { forceFit: true },
            tbar: [{ 
                text: '新增'
            }, { 
                text: '删除'
            }], 
            store: rStore,
            sm: sm,
            cm: new Ext.grid.ColumnModel([
                new Ext.grid.RowNumberer(),
                sm,
                { header: '问题', dataIndex: 'question' },
                { header: '描述', dataIndex: 'description' }
            ])
        });
    }
});
