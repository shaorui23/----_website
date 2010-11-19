Manage.PaperCenter = Ext.extend(Ext.app.Module, {
    id: 'paperCenter',
    init: function() {
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
                width: 840,
                height: 580,
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
        //创建jobcombo
        var jobCombo = this.createJobCombo('jobCombo');
        var jobCombo2 = this.createJobCombo('jobCombo2');

        return new Ext.TabPanel({ 
            frame: true,
            activeTab: 0,
            items: [{ 
                id: 'readPaper',
                title: '问卷审核',
                layout: 'border',
                items: [this.createPAsGrid(jobCombo2), this.createPAForm()]
            }, { 
                id: 'oldPaper',
                title: '历史问卷',
                layout: 'anchor',
                items: [this.createOPGrid(), this.createPQGrid()]
            }, { 
                id: 'newPaper',
                title: '创建问卷',
                layout: 'anchor',
                items: [this.createNPGrid(jobCombo), this.createQBGrid()]
            }],
            listeners: { 
                beforetabchange: function(panel, newTab, currentTab) { 
                    if(newTab.id == 'newPaper') { 
                        //加载jobcombobox的数据
                        Ext.getCmp('jobCombo').getStore().reload();
                        //加载gbgrid的数据
                        Ext.getCmp('qbGrid').getStore().reload();
                    }else if(newTab.id == 'oldPaper') { 
                        //加载old paper
                        Ext.getCmp('opGrid').getStore().reload();
                    }else if(newTab.id == 'readPaper') { 
                        //加载jobcombobox的数据
                        Ext.getCmp('jobCombo2').getStore().reload();
                        //加载pasGrid的数据
                        Ext.getCmp('pasGrid').getStore().reload();
                    }
                } 
            }
        });
    },

    //改变paper的状态
    paperStateer: function(id, job_id, action) { 
        var url = '';
        var datas = {};
        //判断当前试卷是要启用还是要禁用，true为启用，false为禁用
        if(action == true) { 
            url = '/papers/be_active';
            datas = { id: id, job_id: job_id };
        }
        else { 
            url = '/papers/be_unactive';
            datas = { id: id };
        }

        Ext.Ajax.request({ 
            url: url,
            method: 'post',
            jsonData: datas,
            success: function() { 
                Ext.Msg.alert('Wando', 'success');
            },
            failure: function() { 
                Ext.Msg.alert('Wando', 'failure');
            }
        });
        Ext.getCmp('opGrid').getStore().reload();
    },

    //OP: old paper
    createOPGrid: function() { 
        var opStore = new Ext.data.JsonStore({ 
            url: '/papers.json',
            fields: [
                'id',
                'job_id',
                'job_name',
                'active'
            ]
        });

        function stateRender() { 
            var record = arguments[2];
            if(record.get('active') == false) {
                return "<a href='#' onclick='Manage.paperCenter.paperStateer(" + record.get('id') + ', ' + record.get('job_id')  + ", true)'>启用</a>";
            }else { 
                return "<a href='#' onclick='Manage.paperCenter.paperStateer(" + record.get('id') +  ', ' + record.get('job_id') + ", false)'>禁用</a>";
            }
        }

        function activeRender() { 
            var record = arguments[2];
            if(record.get('active') == false) { 
                return "禁用";
            }else { 
                return "使用中";
            }
        }

        return new Ext.grid.GridPanel({ 
            id: 'opGrid',
            frame: true,
            viewConfig: { forceFit: true },
            store: opStore,
            anchor: '100%, 50%',
            tbar: [{ 
                xtype: 'textfield',
                id: 'opGridText'   //mouse
            },{ 
                text: '查找',  //mouse
                handler: function() { 
                    var jobName = Ext.getCmp('opGridText').getValue();
                    Ext.Ajax.request({ 
                        url: "/papers/search_by_job",
                        jsonData: { jobName: jobName },
                        success: function(response) { 
                            var datas = Ext.decode(response.responseText);
                            opStore.loadData(datas);
                        },
                        failure: function() {
                            Ext.Msg.alert('Wando', 'Failure');
                        }
                    });
                }
            }, { 
                text: '清空查询',  //mouse
                handler: function() { 
                    opStore.reload();
                }
            }],
            cm: new Ext.grid.ColumnModel([
                new Ext.grid.RowNumberer(),
                { header: 'ID',    dataIndex: 'id' },
                { header: '职位',  dataIndex: 'job_name' },
                { header: '状态',  dataIndex: 'active', renderer: activeRender },
                { header: '操作',  dataIndex: '#',      renderer: stateRender }
            ]),
            listeners: { 
                cellclick: function(grid, rowIndex, columnIndex, e) { 
                    var record = grid.getStore().getAt(rowIndex);
                    var opId = record.get('id');
                    var pqStore = Ext.getCmp('pqGrid').store;
                    pqStore.proxy = new Ext.data.HttpProxy({ method: 'GET', url: '/papers/show_questions?id=' + opId });
                    pqStore.reload(); 
                }
            }
        })
 
    },

    //PQ: paper question
    createPQGrid: function() { 
        var pqStore = new Ext.data.JsonStore({ 
            url: '/papers/show_questions',
            fields: [
                'id',
                'qcon'
            ]
        });

        return new Ext.grid.GridPanel({ 
            id: 'pqGrid',
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

    createJobCombo: function(idName) { 
        jobStore = new Ext.data.JsonStore({ 
            url: '/jobs/all_jobs.json',
            root: 'content',
            fields: [
                'id',
                'jname'
            ]
        });

        return new Ext.form.ComboBox({ 
            id: idName,
            typeAhead: true,
            width: 100,
            triggerAction: 'all',
            mode: 'local',
            store: jobStore,
            valueField: 'id',
            displayField: 'jname'
        });
    },

    //NP: new paper
    createNPGrid: function(jobCombo) { 
        var _this = this;
        var npStore = new Ext.data.JsonStore({ 
            fields: [
                'id',
                'qcon'
            ]
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
                        var qbGrid = Ext.getCmp('qbGrid');
                        //_this.gsDeleter(npGrid);
                        _this.recordsMoveHandler(npGrid, qbGrid, 'add-delete', [], 0);
                    }
                }, { 
                    text: '保存',
                    handler: function() { 
                        //获取数据
                        var npGrid = Ext.getCmp('npGrid');
                        var qbIds = _this.gdGetor(npGrid, ['id'], 'all', ['question_id']);
                        var jobId = jobCombo.getValue();
                        //检验数据
                        if(qbIds.length == 0) { 
                            Ext.Msg.alert('Wando', '未选题！');
                            return false;
                        }
                        else if(jobId == '') { 
                            Ext.Msg.alert('Wando', '职位不能为空!');
                            return false;
                        }
                        //提交数据
                        Ext.Ajax.request({ 
                            url: '/papers',
                            jsonData: { pDatas: { qbIds: qbIds, jobId: { job_id: jobId } } },
                            success: function() { 
                                Ext.Msg.alert("Wando", 'success');
                                npGrid.store.removeAll();
                                Ext.getCmp('qbGrid').store.reload();
                                jobStore.reload();
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
                xtype: 'textfield',
                id: 'qbGridText',  //mouse
            },{ 
                text: '查找',  //mouse
                handler: function() { 
                    var value = Ext.getCmp('qbGridText').getValue();
                    var store = Ext.getCmp('qbGrid').store;
                    Ext.Ajax.request({ 
                        url: '/questions/search_by_qcon',
                        jsonData: { qcon: value },
                        success: function(response) { 
                            var questions = Ext.decode(response.responseText);
                            store.loadData(questions);
                        }, 
                        failure: function() { 
                            Ext.Msg.alert('Wando', 'failure');
                        }
                    });
                }
            }, { 
                text: '清空查询',  //mouse
                handler: function() { 
                    var store = Ext.getCmp('qbGrid').store;
                    store.reload();
                }
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

    //PAs: paper-answers
    createPAsGrid: function(jobCombo) { 
        var store = new Ext.data.JsonStore({ 
            url: '/paper_answers.json',
            fields: [
                'id',
                'user_name',
                'job_name',
                'create_at',
                'mark'
            ]
        });

        var searchStore = new Ext.data.JsonStore({ 
            fields: ['mark', 'mark_cn'],
            data: [
                { mark: 1, mark_cn: '未批阅' },
                { mark: 2, mark_cn: '已批阅' },
                { mark: 3, mark_cn: '全部' }
            ]
        });

        var searchCombo = new Ext.form.ComboBox({ 
            id: 'searchCombo',
            typeAhead: true,
            width: 70,
            triggerAction: 'all',
            mode: 'local',
            valueField: 'mark',
            displayField: 'mark_cn',
            store: searchStore
        });

        //mouse
        function readRender(value, metadata, record) { 
            if(record.get('mark') == null) { 
                return '未批阅';
            }else { 
                switch(record.get('mark')) { 
                    case 1: return '优秀';
                    case 2: return '良好';
                    case 3: return '及格';
                    default: return '淘汰';
                }
            }
        }

        return new Ext.grid.GridPanel({ 
            id: 'pasGrid',
            title: '查找问卷',
            region: 'west',
            width: 300,
            frame: true,
            viewConfig: { forceFit: true },
            tbar: [jobCombo, searchCombo, 
                { 
                    text: '查询',  //mouse
                    handler : function() { 
                        var job_id = jobCombo.getValue();
                        var read_id = searchCombo.getValue();
                        var searchParams = {};
                        if(job_id != '') searchParams['job_id'] = job_id;
                        else searchParams['job_id'] = 'No Limit';
                        if(read_id != '') searchParams['read_id'] = read_id;
                        else searchParams['read_id'] = 3;
                        Ext.Ajax.request({ 
                            url: '/paper_answers/search_limit',
                            jsonData: { params: searchParams },
                            success: function(response) { 
                                var datas = Ext.decode(response.responseText);
                                store.loadData(datas);
                            }
                        })
                    }
                }, { 
                    text: '清空查询',
                    handler: function() { 
                        //重新加载pasGrid的数据
                        Ext.getCmp('pasGrid').getStore().reload();
                    }
            }],
            sm: new Ext.grid.RowSelectionModel({ singleSelect: true }),
            store: store,
            colModel: new Ext.grid.ColumnModel({ 
                defaults: { sortable: true },
                columns: [
                    new Ext.grid.RowNumberer,
                    { header: '名字',     dataIndex: 'user_name' },
                    { header: '职位',     dataIndex: 'job_name' },
                    { header: '提交时间', dataIndex: 'create_at' },
                    { header: '分数',     dataIndex: '#', renderer: readRender }
                ]
            }),
            listeners: { 
                cellclick: function(grid, rowIndex, columnIndex) { 
                    var paId = grid.store.getAt(rowIndex).get('id');
                    var paperQuestion = {};
                    var paperAnswer = {};
                    var questionCount = 0;
                    Ext.Ajax.request({ 
                        url: '/paper_answers/show_p_and_a?id=' + paId,
                        success: function(response) { 
                            var datas = Ext.decode(response.responseText);
                            paperAnswer = datas.paper_answers;
                            paperQuestion = datas.paper_questions;
                            questionCount = datas.question_count;
                            //限制6个问题
                            var nameIndexs = ['gque_one', 'gque_two', 'gque_three', 'gque_four', 'gque_five', 'gque_six'];
                            var paForm = Ext.getCmp('paForm');
                            var j = 0;
                            for(var i = 0; i < questionCount; i++) { 
                                paForm.getComponent(j).setVisible(true);
                                paForm.getComponent(j).setValue(paperQuestion["que_" + (i + 1)]);
                                j++;
                                paForm.getComponent(j).setVisible(true);
                                paForm.getComponent(j).setValue(paperAnswer[nameIndexs[i]]);
                                j++;
                            }                                                                                               
                            if(j < 11) { 
                                for(var i = j; i < 12; i++) { 
                                    paForm.getComponent(i).setVisible(false);
                                }
                            }
                        },
                        failure: function() { 
                            Ext.Msg.alert("Wando", 'Failure');
                        }
                    });
                }
            }
        });
    },

    //PA: paper answers
    createPAForm: function() { 
        var markStore = new Ext.data.JsonStore({ 
            fields: ['mark', 'mark_cn'],
            data: [
                { mark: 1, mark_cn: '优秀' },
                { mark: 2, mark_cn: '良好' },
                { mark: 3, mark_cn: '及格' },
                { mark: 4, mark_cn: '淘汰' }
            ]
        });

        var markCombo = new Ext.form.ComboBox({ 
            id: 'markCombo',
            typeAhead: true,
            width: 70,
            triggerAction: 'all',
            mode: 'local',
            valueField: 'mark',
            displayField: 'mark_cn',
            store: markStore
        });

        return new Ext.form.FormPanel({ 
            id: 'paForm',
            title: '问卷回复',
            region: 'center',
            layout: 'form',
            autoScroll: true,
            tbar: ['评分:', markCombo, { 
                text: '提交',
                handler: function() { 
                    var paId = Ext.getCmp('pasGrid').getSelectionModel().getSelected().get('id');
                    var mark = markCombo.getValue();
                    Ext.Ajax.request({ 
                        url: '/paper_answers/give_mark',
                        jsonData: { paId: paId, mark: mark },
                        success: function() { 
                            Ext.getCmp('pasGrid').store.reload();  //mouse
                            Ext.Msg.alert('Wando', 'Success');
                        },
                        failure: function() { 
                            Ext.Msg.alert('Wando', 'Failure');
                        }
                    });
                }
            }],
            defaults: { 
                width: 450,
                hideLabel: true,
                disabled: true,
                style: "color:black"
            },
            labelWidth: 75,
            bodyStyle: 'padding: 5px 5px 0',
            items: [{ 
                xtype: 'textfield',
                name: 'question1',
                frame: true
            }, { 
                xtype: 'textarea',
                name: 'answer1',
                frame: true
            }, { 
                xtype: 'textfield',
                name: 'question2',
                frame: true
            }, { 
                xtype: 'textarea',
                fieldLabel: 'Name',
                name: 'answer2',
                frame: true
            }, { 
                xtype: 'textfield',
                name: 'question3',
                frame: true
            }, { 
                xtype: 'textarea',
                fieldLabel: 'Name',
                name: 'answer3',
                frame: true
            }, { 
                xtype: 'textfield',
                name: 'question4',
                frame: true
            }, { 
                xtype: 'textarea',
                fieldLabel: 'Name',
                name: 'answer4',
                frame: true
            }, { 
                xtype: 'textfield',
                name: 'question5',
                frame: true
            }, { 
                xtype: 'textarea',
                fieldLabel: 'Name',
                name: 'answer5',
                frame: true
            }, { 
                xtype: 'textfield',
                name: 'question6',
                frame: true
            }, { 
                xtype: 'textarea',
                fieldLabel: 'Name',
                name: 'answer6',
                frame: true
            }]
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
        var sourceGrid  = arguments[0] ? arguments[0] : '';
        var aimGrid     = arguments[1] ? arguments[1] : '';
        var action      = arguments[2] ? arguments[2] : 'add';
        var indexs      = arguments[3] ? arguments[3] : [];  //默认两个store的fields一样
        var insertPos   = arguments[4] ? arguments[4] : 0;  //插入位置以0为grid的第一行
        /*****************/

        //判断参数是否合法
        if(sourceGrid == '' || aimGrid == '') return false;

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
     *indexs:     []  想要导出的sourceGrid数据域, defaults: sourceGrid.fields.keys
     *action:     'all' || 'selections', defaults: 'all'
     *outIndexs:  []  想要出的特定数据域, defaults: []
     *
     *说明：如果传入了outIndexs，函数返回的哈希数据key会以以它为主,但要求是同时必须传入indexs，函数会一一对应
     *例子：indexs = ['id', 'name'], outIndexs = ['order_id', 'order_name'], 则返回的数据为[{ order_id: ++ , order_name: ++ }]
     *      若outIndexs为空或者不传入，则以indexs出入的参数导出，若indexs也为空，则按grid的fields中的keys返回
    */
    //gd: grid, data
    gdGetor: function() { 
        /*arguments list ***********/
        var sourceGrid = arguments[0] ? arguments[0] : '';
        var indexs     = arguments[1] ? arguments[1] : [];
        var action     = arguments[2] ? arguments[2] : 'all';
        var outIndexs  = arguments[3] ? arguments[3] : [];
        /**************/

        //判断参数是否合法
        if(sourceGrid == '') return false;
        if(outIndexs.length != 0 && outIndexs.length != indexs.length) return false;

        //获取store
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
                //根据outIndexs生成数据
                if(outIndexs.length != 0) { 
                    data[outIndexs[j]] = records[i].get(indexs[j]);
                }else { 
                    data[indexs[j]] = records[i].get(indexs[j]);
                }
            }
            datas.push(data);
        }
        return datas;
    },
});
