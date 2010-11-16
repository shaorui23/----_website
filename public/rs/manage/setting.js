Manage.Setting = Ext.extend(Ext.app.Module, {
    id: 'setting',
    init: function(){
        this.launcher = {
            text: '基础数据设置',
            iconCls: 'bogus',
            handler: this.createWindow,
            scope: this
        },
        this.tab = this.createTabpanel();
    },

    createWindow: function(){
        var manage = this.app.getDesktop();
        var win = manage.getWindow('setting');
        if(!win){
            win = manage.createWindow({
                id: 'setting',
                title: '设置中心',
                width: 640,
                height: 400,
                iconCls: 'bogus',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                 
                layout: 'fit',
                items:this.tab
            });
        }
        win.show();
    },

    createTabpanel: function() { 
        var tabs = new Ext.TabPanel({ 
            activeTab : 0,
            frame : true,
            items:[{ 
                title: '职位类型',
                items:this.addForm()
            },{ 
                title: '学历要求',
                items:[]
            }]
        });
        return tabs;
    },

    addForm : function(){ 
        var store = new Ext.data.JsonStore({ 
            url: '/jobtypes.json',
            root: 'content',
            fields: [
                'id',
                'job_type'
            ]
        });
        store.load();

         return new Ext.grid.GridPanel({ 
            viewConfig: { forceFit: true },
            closeAction: 'hide',
            width: 620,
            height: 350,
            //anchor: '100%, 100%',
            store: store,
            tbar: [{ 
                xtype: 'textfield'
            },{ 
                text: '查找'
            }],
            cm: new Ext.grid.ColumnModel([
                new Ext.grid.RowNumberer(),
                { header: 'ID',    dataIndex: 'id' },
                { header: '职位',  dataIndex: 'job_type' },
                { header: '操作',  dataIndex: '#',    }
            ])
        })
    },
})

