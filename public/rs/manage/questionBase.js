Manage.QuestionBase = Ext.extend(Ext.app.Module, {
    id: 'questionBase',
    init: function(){
        this.launcher = {
            text: '题库',
            iconCls: 'bogus',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function(){
        var manage = this.app.getDesktop();
        var win = manage.getWindow('questionBase');
        if(!win){
            win = manage.createWindow({
                id: 'questionBase',
                title: '题库',
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
                fieldLabel: '问题',
                name: 'question'
            },{ 
                xtype: 'textarea',
                fieldLabel: '问题描述',
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
                { header: '问题', dataIndex: 'question' },
                { header: '描述', dataIndex: 'description' }
            ])
        });
    }
});
