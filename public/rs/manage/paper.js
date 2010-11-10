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
                    if(newTab.id == 'newPaper') { 
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
            root: 'content',
            fields: [
                'id',
                'jname'
            ]
        });
        var jobCombo = new Ext.form.ComboBox({ 
            id: 'jobCombo',
            typeAhead: true,
            triggerAction: 'all',
            mode: 'local',
            store: jobStore,
            valueField: 'id',
            displayField: 'jname'
        });

        var _this = this;
        var sm = new Ext.grid.CheckboxSelectionModel();
        return new Ext.grid.GridPanel({ 
            id: 'npGrid',
            frame: true,
            viewConfig: { forceFit: true },
            store: npStore,
            anchor: '100%, 50%',
            tbar: [
                '选择职位：',
                jobCombo, 
                '->',
                { 
                    text: '删除',
                    handler: function() { 
                        var npGrid = Ext.getCmp('npGrid');
                        _this.gsDeleter(npGrid);
                    }
                }, { 
                    text: '保存',
                    handler: function() { 
                        //获取数据
                        var npGrid = Ext.getCmp('npGrid');
                        var qbIds = _this.gdGetor(npGrid, ['id'], 'all');
                        var jobId = jobCombo.getValue();
                        //todo: 继续构造前台数据，如何保存两个表的记录
                        //提交数据
                        Ext.Ajax.request({ 
                            url: '/group',
                            jsonData: { pDatas: { qbIds: qbDatas, jobId: jobDatas } },
                            success: function() { 
                                Ext.Msg.alert("Wando", 'success');
                            },
                            failure: function() { 
                                Ext.Msg.alert('Wando', 'failure');
                            }
                        });
                    }
                }
            ],
            sm: sm,
            cm: new Ext.grid.ColumnModel([
                sm,
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
                'van',
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
                    //var records = qbGrid.getSelectionModel().getSelections();
                    var npGrid = Ext.getCmp('npGrid');

                    _this.recordsMoveHandler(qbGrid, npGrid, 'add-delete', [], 0);
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
    /*用于将一个grid中的被选中的数据转移到另一个grid中
     *sourceGrid: Ext.data.Store   要移出数据的store
     *aimGrid:    Ext.data.Store   要加入数据的store
     *action:     'add' || 'add-delete' || 'insert' || 'insert-delete' || 'loadData' || 'loadData-delete'; defaults: 'add'
     *indexs:     []              想要导入的数据域
     *insertPos:  插入的位置
    */
    recordsMoveHandler: function() { 
        /*argument list***///todo:应该考虑用hash对象实现; 函数体太过于庞大了,分解
        var sourceGrid  = arguments[0];
        var aimGrid     = arguments[1];
        var action      = arguments[2] ? arguments[2] : 'add';
        var indexs      = arguments[3] ? arguments[3] : sourceGrid.getStore().fields.keys;  //默认两个store的fields一样
        var insertPos   = arguments[4] ? arguments[4] : 0;  //插入位置以0为grid的第一行
        /*****************/

        var _this = this;

        //获取两个grid的store
        var sourceStore = sourceGrid.getStore();
        var aimStore = aimGrid.getStore();

        //取出sourceStore的数据
        var records = sourceGrid.getSelectionModel().getSelections();

        //初始化indexs，在传入insert命令时允许传入[]
        if(indexs.length == 0) { 
            indexs = sourceStore.fields.keys;
        }

        //将records中的数据构造为[{}, {}]形式
        var datas = [];
        datas = _this.gdGetor(sourceGrid, indexs, 'selections');
        /*
        for(var i = 0; i < records.length; i++) { 
            var data = {};
            for(var j = 0; j < indexs.length; j++) { 
                data[indexs[j]] = records[i].get(indexs[j]);
            }
            datas.push(data);
        }
        */

        //解析action
        var isDelete = false;
        if(action.indexOf('-') != -1) { 
            isDelete = true;
            action = action.substring(0, action.indexOf('-'));
        }

        //执行action
        if(action == 'add') { 
            //加入数据
            for(var i = 0; i < datas.length; i++) { 
                var record = new aimStore.recordType(datas[i]);
                aimStore.add(record);
            }
        }else if(action == 'insert') { 
            //当插入的数据量大于1时拒绝执行函数
            if(datas.length != 1) return false;  

            //判断插入位置是否合理
            if(aimStore.getCount() <= insertPos || insertPos < 0) insertPos = 0;

            //插入
            var record = new aimStore.recordType(datas[0]);
            aimStore.insert(insertPos,record);
        }else if(action == 'loadData') { 
            //装载
            aimStore.loadData(datas);
        }else { 
            //操作违法
            return false;
        }

        //删除sourceStore中的选中数据
        if(isDelete == true) { 
            /*
            for(var i = 0; i < records.length; i++) { 
                var index = sourceStore.indexOf(records[i]);
                sourceStore.removeAt(index);
            }
            */
            _this.gsDeleter(sourceGrid);
        }

        return true;
    },

    /*删除grid中选中的数据 **********
     *aimGrid: 需要操作的grid
    */
    //gs: grid, selected
    gsDeleter: function(aimGrid) { 
        var records = aimGrid.getSelectionModel().getSelections();
        var store = aimGrid.getStore();
        for(var i = 0; i < records.length; i++) { 
            var index = store.indexOf(records[i]);
            store.removeAt(index);
        }
    },

    /*由于将gird中的数据取出并构造为[{}, {}]的形式
     *sourceGrid: Ext.grid
     *indexs:     []  想要导出数据域
     *action:     'all' || 'selections', defaults: 'add'
    */
    //gd: grid, data
    gdGetor: function(sourceGrid, indexs, action) { 
        var sourceStore = sourceGrid.getStore();

        //判断indexs是否为空
        if(indexs.length == 0) { 
            indexs = sourceStore.fields.keys;
        }

        //判断action
        var records = [];
        if(action == 'all' || action == 'selections') { 
            if(action == 'all') sourceGrid.getSelectionModel().selectAll();
            records = sourceGrid.getSelectionModel().getSelections();
        }else { 
            return false;
        }

        //获取数据
        var datas = [];
        for(var i = 0; i < records.length; i++) { 
            var data = {};
            for(var j = 0; j < indexs.length; j++) { 
                data[indexs[j]] = records[i].get(indexs[j]);
            }
            datas.push(data);
        }
        return datas;
    },

    /*处理进入创建问卷tab*/
    newPaperHandler: function() { 
        //加载jobcombobox的数据
        Ext.getCmp('jobCombo').getStore().reload();
        //加载gbgrid的数据
        Ext.getCmp('qbGrid').getStore().reload();
    }
});
