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
        var store = this.createStore();
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
                items: [this.createForm(store), this.createGrid(store)],
                listeners: { 
                    'show': function(){ 
                        store.load();
                    }
                }
            });
        }
        win.show();
    },

    createForm: function(store){ 
        var form = new Ext.form.FormPanel({ 
            frame: true,
            autoHeight: true,
            region: 'north',
            defaults: { width: 500 },
            buttonAlign: 'right',
            buttons: [{ 
                text: '保存',
                handler: function(){ 
                    var data = Ext.getCmp('question').getValue();
                    Ext.Ajax.request({ 
                        url: '/questions/create',
                        method: 'POST',
                        jsonData: { question: { qcon: data } },
                        success: function(){ 
                            store.reload();
                        },
                        failure: function(){ 
                            Ext.Msg.alert('Wando团队', '创建失败');
                        }
                    })
                }
            }],
            items: [{ 
                xtype: 'textfield',
                fieldLabel: '问题',
                id: 'question'
            }]
        });
        return form;
    },

    createStore: function(){ 
        return new Ext.data.JsonStore({ 
            url: '/questions.json',
            fields: [
                'id',
                'qcon'
            ]
        });
    },

    createGrid: function(store){ 
        var deleteRecords = [];
        var deleteIds = [];
        var grid = new Ext.grid.GridPanel({ 
            id: 'questionGrid',
            frame: true,
            viewConfig: { forceFit: true },
            region: 'center',
            store: store,
            tbar: [{ 
                xtype: 'textfield'
            },{ 
                text: '查找'
            }, '-',{ 
                text: '删除',
                handler: function(){ 
                    deleteRecords = grid.getSelectionModel().getSelections();
                    for(var i = 0; i < deleteRecords.length; i++){ 
                        deleteIds.push(deleteRecords[i].get('id'));
                    }
                    Ext.Ajax.request({ 
                        url: '/questions/deletes',
                        method: 'DELETE',
                        jsonData: { question_ids: deleteIds },
                        success: function(){ 
                            store.reload();
                        },
                        failure: function(){ 
                            Ext.Msg.alert('Wando团队', '删除失败');
                        }
                    })
                }
            }],
            cm: new Ext.grid.ColumnModel([
                //new Ext.grid.RowNumberer(),
                { header: 'ID',   dataIndex: 'id', width: 5 },
                { header: '问题', dataIndex: 'qcon' }
            ])
        });
        return grid;
    }
});
