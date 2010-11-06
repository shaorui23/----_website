Manage.PaperCenter = Ext.extend(Ext.app.Module, {
    id: 'paperCenter',
    init: function(){
        this.launcher = {
            text: '问卷中心',
            iconCls: 'bogus',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function(){
        var manage = this.app.getDesktop();
        var win = manage.getWindow('paperCenter');
        if(!win){
            win = manage.createWindow({
                id: 'paperCenter',
                title: '问卷中心',
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
        return new Ext.TabPanel({ 
            frame: true,
            activeTab: 0,

            items: [{ 
                title: '历史问卷',
                layout: 'anchor',
                items: [this.createOPGrid(), this.createPQGrid()]
            }, { 
                title: '创建问卷',
                layout: 'anchor',
                items: [this.createNPGrid(), this.createQBGrid()]
            }]
        });
    },

    //OP: old paper
    createOPGrid: function(){ 
        var opStore = new Ext.data.JsonStore({ 
            fields: [
                'question',
                'description'
            ]
        });

        return new Ext.grid.GridPanel({ 
            frame: true,
            viewConfig: { forceFit: true },
            store: opStore,
            anchor: '100%, 50%',
            tbar: [{ 
                xtype: 'textfield'
            },{ 
                text: '查找'
            }],
            cm: new Ext.grid.ColumnModel([
                new Ext.grid.RowNumberer(),
                { header: '问题', dataIndex: 'question' },
                { header: '描述', dataIndex: 'description' }
            ])
        })
 
    },

    //PQ: paper question
    createPQGrid: function(){ 
        var pqStore = new Ext.data.JsonStore({ 
            fields: [
                'question',
                'description'
            ]
        });

        return new Ext.grid.GridPanel({ 
            frame: true,
            viewConfig: { forceFit: true },
            store: pqStore,
            anchor: '100%, 50%',
            cm: new Ext.grid.ColumnModel([
                new Ext.grid.RowNumberer(),
                { header: '问题', dataIndex: 'question' },
                { header: '描述', dataIndex: 'description' }
            ])
        })
 
    },

    //NP: new paper
    createNPGrid: function(){ 
        var npStore = new Ext.data.JsonStore({ 
            fields: [
                'question',
                'description'
            ]
        });

        return new Ext.grid.GridPanel({ 
            frame: true,
            viewConfig: { forceFit: true },
            store: npStore,
            anchor: '100%, 50%',
            tbar: ['选择职位：', { 
                xtype: 'combo'
            }],
            cm: new Ext.grid.ColumnModel([
                new Ext.grid.RowNumberer(),
                { header: '问题', dataIndex: 'question' },
                { header: '描述', dataIndex: 'description' }
            ])
        })
    },

    //QB: questionBase
    createQBGrid: function(){ 
        var qbStore = new Ext.data.JsonStore({ 
            fields: [
                'question',
                'description'
            ]
        });

        return new Ext.grid.GridPanel({ 
            frame: true,
            viewConfig: { forceFit: true },
            anchor: '100%, 50%',
            store: qbStore,
            tbar: [{ 
                xtype: 'textfield'
            },{ 
                text: '查找'
            }],
            cm: new Ext.grid.ColumnModel([
                new Ext.grid.RowNumberer(),
                { header: '问题', dataIndex: 'question' },
                { header: '描述', dataIndex: 'description' }
            ])
        });
    }
});


