Manage.PaperCenter = Ext.extend(Ext.app.Module, {
    id: 'paperCenter',
    init: function() {
        van = this;
        this.launcher = {
            text: '问卷中心',
            iconCls: 'bogus',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function() {
        var manage = this.app.getDesktop();
        var win = manage.getWindow('paperCenter');
        if(!win) {
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

    createPanel: function() { 
        var _this = this;
        return new Ext.TabPanel({ 
            frame: true,
            activeTab: 0,

            items: [{ 
                id: 'oldPaper',
                title: '历史问卷',
                layout: 'anchor',
                items: [this.createOPGrid(), this.createPQGrid()]
            }, { 
                id: 'newPaper',
                title: '创建问卷',
                layout: 'anchor',
                items: [this.createNPGrid(), this.createQBGrid()]
            }, { 
                id: 'readPaper',
                title: '问卷审核'
            }],
            listeners: { 
                beforetabchange: function(panel, newTab, currentTab) { 
                    if(newTab.id == 'newPaper'){ 
                        _this.newPaperHandler();
                    }
                } 
            }
        });
    },

    //OP: old paper
    createOPGrid: function() { 
        var opStore = new Ext.data.JsonStore({ 
            fields: [
                'id',
                'qcon'
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
                { header: 'ID', dataIndex: 'id' },
                { header: '问题', dataIndex: 'qcon' }
            ])
        })
 
    },

    //PQ: paper question
    createPQGrid: function() { 
        var pqStore = new Ext.data.JsonStore({ 
            fields: [
                'id',
                'qcon'
            ]
        });

        return new Ext.grid.GridPanel({ 
            frame: true,
            viewConfig: { forceFit: true },
            store: pqStore,
            anchor: '100%, 50%',
            cm: new Ext.grid.ColumnModel([
                new Ext.grid.RowNumberer(),
                { header: 'ID', dataIndex: 'id' },
                { header: '问题', dataIndex: 'qcon' }
            ])
        })
 
    },

    //NP: new paper
    createNPGrid: function() { 
        var npStore = new Ext.data.JsonStore({ 
            fields: [
                'id',
                'qcon'
            ]
        });
        var jobStore = new Ext.data.JsonStore({ 
            url: '/jobs.json',
            fields: [
                'jname'
            ]
        });
        var jobCombo = new Ext.form.ComboBox({ 
            id: 'jobCombo',
            typeAhead: true,
            triggerAction: 'all',
            mode: 'local',
            store: jobStore,
            valueField: 'jname',
            displayField: 'jname'
        });

        return new Ext.grid.GridPanel({ 
            id: 'npGrid',
            frame: true,
            viewConfig: { forceFit: true },
            store: npStore,
            anchor: '100%, 50%',
            tbar: ['选择职位：',jobCombo],
            cm: new Ext.grid.ColumnModel([
                new Ext.grid.RowNumberer(),
                { header: 'ID', dataIndex: 'id', width: 5 },
                { header: '问题', dataIndex: 'qcon' }
            ])
        })
    },

    //QB: questionBase
    createQBGrid: function() { 
        var _this = this;
        var qbStore = new Ext.data.JsonStore({ 
            url: '/questions.json',
            fields: [
                'id',
                'qcon'
            ]
        });

        var sm = new Ext.grid.CheckboxSelectionModel();
        return new Ext.grid.GridPanel({ 
            id: 'qbGrid',
            frame: true,
            viewConfig: { forceFit: true },
            anchor: '100%, 50%',
            store: qbStore,
            sm: sm,
            tbar: [{ 
                xtype: 'textfield'
            },{ 
                text: '查找'
            }, { 
                text: '加入问卷',
                handler: function() { 
                    var qbGrid = Ext.getCmp('qbGrid');
                    var datas = qbGrid.getSelectionModel().getSelections();
                    datas = _this.recordHandler(datas);

                    var npStore = Ext.getCmp('npGrid').getStore();
                    npStore.loadData(data);
                }
            }],
            cm: new Ext.grid.ColumnModel([
                sm,
                { header: 'ID', dataIndex: 'id', width: 5 },
                { header: '问题', dataIndex: 'qcon' }
            ])
        });
    },

    //hanlders**********************************
    //用于将从grid取到的数据构造为json数组数据
    recordHandler: function(records) { 
        var datas = [];
        var data = {};
        var indexs = ['id', 'qcon'];
        for(var i = 0; i < records.length; i++) { 
            data = {};
            for(var j = 0; j < indexs.length; j++) { 
                data[indexs[j]] = records[i].get(indexs[j]);
            }
            datas.push(data);
        }
        return datas;
    },
    //处理进入创建问卷tab
    newPaperHandler: function(){ 
        //加载jobcombobox的数据
        //加载gbgrid的数据
        Ext.getCmp('qbGrid').getStore().reload();
    }
});
