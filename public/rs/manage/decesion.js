Manage.DecesionCenter = Ext.extend(Ext.app.Module, {
    id: 'decesionCenter',
    init: function(){
        this.launcher = {
            text: '筛选中心',
            iconCls: 'bogus',
            handler: this.createWindow,
            scope: this
        };
        this.form = this.createForm();
    },

    createWindow: function(){
        var manage = this.app.getDesktop();
        var win = manage.getWindow('decesionCenter');
        if(!win){
            win = manage.createWindow({
                id: 'decesionCenter',
                title: '筛选中心',
                width: 900,
                height: 580,
                iconCls: 'bogus',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout:'fit',
                items: this.createPanel()
            });
        }
        win.show();
    },

   

    createPanel: function(){ 
        //创建jobcombo
        var jobCombo = this.createJobCombo('jobCombo');
        var jobCombo2 = this.createJobCombo('jobCombo2');

        return new Ext.TabPanel({ 
            frame: true,
            activeTab: 0,
            items: [{ 
                id: 'oldPaper',
                title: '面试管理',
                layout: 'fit',
                items: [this.updateView()]
            }, { 
                id: 'readPaper',
                title: '应聘者录用',
                layout: 'border',
                items: [this.createPAsGrid(jobCombo2), this.createPAForm()]
            }],
            listeners: { 
                beforetabchange: function(panel, newTab, currentTab) { 
                    if(newTab.id == 'newPaper') { 
                        Ext.getCmp('jobCombo').getStore().reload();
                        Ext.getCmp('qbGrid').getStore().reload();
                    }else if(newTab.id == 'oldPaper') { 
                     //   Ext.getCmp('opGrid').getStore().reload();
                    }else if(newTab.id == 'readPaper') { 
                        Ext.getCmp('jobCombo2').getStore().reload();
                        Ext.getCmp('pasGrid').getStore().reload();
                    }
                } 
            }
        });
    },

    getJobWin: function() { 
        var manage = this.app.getDesktop();
        var win = manage.getWindow('JobWin');
        if(!win) { 
            win = manage.createWindow({
                title: '添加面试结果',
                id: 'JobWin',
                closeAction: 'hide',
                width: 520,
                height: 200,
                layout: 'fit',
                frame: true,
                items: this.form
            });
         }
         return win;
    },

    createViewMark: function(id){ 
       // var manage = this.app.getDesktop();
        //Manage.decesionCenter.createForm();
        this.getJobWin().show();
    },
    
    createForm: function(){ 
        var form = new Ext.form.FormPanel({ 
            defaultType: 'textarea',
            //title: "面试结果输入",
            labelWidth: 80,
            width: 150,
            frame: true,
            items: [{ 
              id: "pingjia",
              fieldLabel: "面试评价",
              name:'evaluation',
              height:100,
              width:390
            }],
            buttons: [{ 
                text:'提交',
                handler: function(){ 
                    var id         = Ext.getCmp("view").getSelectionModel().getSelected().get('id');
                    var evaluation = Ext.getCmp("pingjia").getValue();
                    Ext.Ajax.request({ 
                        jsonData: { paId : id, evaluate : evaluation },
                        url:'/paper_answers/give_evaluate.json',
                        method: 'post',
                        success: function(response){ 
                            Manage.decesionCenter.createForm().form.reset();
                            Ext.getCmp("view").getStore().reload();
                            Manage.decesionCenter.getJobWin().hide();
                            alert("添加面试结果成功!");
                        },
                        failure: function(response){ 
                            Ext.getCmp("view").getStore().reload();
                            _this.getJobWin().hide();
                            alert("添加面试结果失败!");
                        }
                    })

                }
            }]
        });
        return form;
    },

    updateView: function() {
        var store = new Ext.data.JsonStore({ 
            url: '/paper_answers.json',
            fields: [
                'id',
                'user_name',
                'job_name',
                'create_at',
                'evaluate',
                'mark'
            ]
        });
        store.load();

        var addOperator = function(value, mataData, record, rowIndex, colIndex, store){ 
            var link = String.format('<a href="#" onclick="Manage.decesionCenter.createViewMark({0})">成绩录入</a>',record.data.id);
           // alert(record.data.id);
            return link;
        };

        function viewEvaluate(value, metadata, record) { 
            if(record.get('evaluate') == null) { 
                return "<font color=#ff0000>未添加面试结果</font>";
            } else { 
              return value;
            }
        };

        function readRender(value, metadata, record) { 
            if(record.get('mark') == null) { 
                return "<font color=#ff0000>未批阅</font>";
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
            id: 'view',
            title: '面试成绩管理',
            viewConfig: { forceFit: true },
            sm: new Ext.grid.RowSelectionModel({ singleSelect: true }),
            store: store,
            colModel: new Ext.grid.ColumnModel({ 
                defaults: { sortable: true },
                columns: [
                    new Ext.grid.RowNumberer,
                    { header: '名字',     dataIndex: 'user_name',width:50 },
                    { header: '职位',     dataIndex: 'job_name',width:50 },
                    { header: '提交时间', dataIndex: 'create_at',width:30 },
                    { header: '问卷分数', dataIndex: 'mark',width:30, renderer:readRender },
                    { header: '面试结果', dataIndex: 'evaluate',width:190,renderer: viewEvaluate  },
                    { header: '操作',dataIndex:"#", renderer:addOperator,width:50 },
                   // { header: '分数',     renderer: readRender }
                ]
            })
        });
      // body...
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

    update: function(id){ 
        Ext.Msg.confirm("温馨提示","确定录取该应聘者?",function(button){ 
            if(button=="yes"){ 
                Ext.Ajax.request({ 
                    jsonData: { paId : id, state : "employeed" },
                    url:'/paper_answers/employ.json',
                    method: 'post',
                    success: function(response){ 
                        Manage.decesionCenter.createPAsGrid().store.reload();
                        alert("添加面试结果成功!");
                    },
                    failure: function(response){ 
                        alert("添加面试结果失败!");
                    }
                })
            }
        });
    },
    

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

        var addOperator = function(value, mataData, record, rowIndex, colIndex, store){ 
            //var link = String.format('<a href="#" onclick="Manage.positionManage.editJob( {0}, \'edit\' )">查看修改</a>', record.data.id) + '&nbsp;';
            var link = String.format('<a href="#" onclick="Manage.decesionCenter.update({0})">是否录用？</a>',record.data.id);
            return link;
        };
        
        var sm = new Ext.grid.CheckboxSelectionModel({  });
        //mouse
        function readRender(value, metadata, record) { 
            if(record.get('mark') == null) { 
                return "<font color=#ff0000>未批阅</font>";
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
            title: '筛选应聘者',
            region: 'west',
            width: 400,
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
                        Ext.getCmp('pasGrid').getStore().reload();
                    }
            }],
            store: store,
            colModel: new Ext.grid.ColumnModel({ 
                defaults: { sortable: true },
                columns: [
                    new Ext.grid.RowNumberer,
                    sm,
                    { header: '名字',     dataIndex: 'user_name' },
                    { header: '职位',     dataIndex: 'job_name' },
                    { header: '提交时间', dataIndex: 'create_at' },
                    { header: '问卷分数', dataIndex: 'mark', renderer: readRender },
                    { header: '操作',dataIndex:"#", renderer:addOperator },
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
                            evaluate      = datas.evaluate;
                            questionCount = datas.question_count;
                            //限制6个问题
                            var nameIndexs = ['gque_one', 'gque_two', 'gque_three', 'gque_four', 'gque_five', 'gque_six'];
                            var paForm = Ext.getCmp('paForm');
                            var j = 0;
                            Ext.getCmp('evaluate').setValue(evaluate);
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
                            Ext.Msg.alert("出现错误", '出现错误!');
                        }
                    });
                }
            }
        });
    },
    

    createPAForm: function() { 

        return new Ext.form.FormPanel({ 
            id: 'paForm',
            title: '问卷回复和面试结果预览',
            region: 'center',
            layout: 'form',
            autoScroll: true,
            tbar: [],
            defaults: { 
                width: 420,
               // hideLabel: true,
                disabled: true,
                style: "color:black"
            },
            labelWidth: 35,
            bodyStyle: 'padding: 5px 5px 0',
            items: [{ 
                xtype: 'textfield',
                fieldLabel: '问题1',
                name: 'question1',
                frame: true
            }, { 
                xtype: 'textarea',
                fieldLabel: '答案',
                height:40,
                name: 'answer1',
                frame: true
            }, { 
                xtype: 'textfield',
                fieldLabel: '问题2',
                name: 'question2',
                frame: true
            }, { 
                xtype: 'textarea',
                fieldLabel: '答案',
                height:40,
                name: 'answer2',
                frame: true
            }, { 
                xtype: 'textfield',
                fieldLabel: '问题3',
                name: 'question3',
                frame: true
            }, { 
                xtype: 'textarea',
                fieldLabel: '答案',
                height:40,
                name: 'answer3',
                frame: true
            }, { 
                xtype: 'textfield',
                fieldLabel: '问题4',
                name: 'question4',
                frame: true
            }, { 
                xtype: 'textarea',
                fieldLabel: '答案',
                height:40,
                name: 'answer4',
                frame: true
            }, { 
                xtype: 'textfield',
                fieldLabel: '问题5',
                name: 'question5',
                frame: true
            }, { 
                xtype: 'textarea',
                fieldLabel: '答案',
                height:40,
                name: 'answer5',
                frame: true
            }, { 
                xtype: 'textfield',
                fieldLabel: '问题6',
                name: 'question6',
                frame: true
            }, { 
                xtype: 'textarea',
                fieldLabel: '答案',
                height:40,
                name: 'answer6',
                frame: true
            }, { 
                xtype: 'textarea',
                fieldLabel: '<font color=#ff0000>面试结果</font>',
                height:50,
                id: 'evaluate',
                frame: true
            }]
        });
    }
    




    
});
