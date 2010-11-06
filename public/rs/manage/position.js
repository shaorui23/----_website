Manage.PositionManage = Ext.extend(Ext.app.Module, {
    id: 'positionManage',
    init: function(){
        this.launcher = {
            text: '职位管理',
            iconCls: 'bogus',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function(){
        var manage = this.app.getDesktop();
        var win = manage.getWindow('positionManage');
        if(!win){
            win = manage.createWindow({
                id: 'positionManage',
                title: '职位管理',
                width: 640,
                height: 480,
                iconCls: 'bogus',
                shim: false,
                animCollapse: false,
                constrainHeader: true,

                layout: 'border',
                items: [this.createForm(), this.createGrid()]
            });
        }
        win.show();
    },

    createForm: function(){ 
        return new Ext.form.FormPanel({ 
            frame: true,
            autoHeight: true,
            region: 'north',
            defaults: { width: 500 },
            buttons: [{ 
                text: '保存'
            }],
            items: [{ 
                xtype: 'textfield',
                fieldLabel: '职位',
                name: 'question'
            },{ 
                xtype: 'textarea',
                fieldLabel: '职位描述',
                name: 'description'
            }]
        });
    },

    createGrid: function(){ 
        var store = new Ext.data.JsonStore({ 
            fields: [
                'question',
                'description'
            ]
        });

        return new Ext.grid.GridPanel({ 
            frame: true,
            viewConfig: { forceFit: true },
            region: 'center',
            store: store,
            tbar: [{ 
                xtype: 'textfield'
            },{ 
                text: '查找'
            }, '-',{ 
                text: '编辑'
            }],
            cm: new Ext.grid.ColumnModel([
                new Ext.grid.RowNumberer(),
                { header: '职位', dataIndex: 'position' },
                { header: '描述', dataIndex: 'description' }
            ])
        });
    }
});


