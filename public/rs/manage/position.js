Manage.PositionManage = Ext.extend(Ext.app.Module, {
    id: 'positionManage',
    init: function(){
        this.launcher = {
            text: '职位管理',
            iconCls: 'bogus',
            handler: this.createWindow,
            scope: this
        };
        this.grid = this.createGrid();
        this.form = this.createForm();
        this.tree = this.createTree();
        isEditing = true;
    },

    createWindow: function(){
        var manage = this.app.getDesktop();
        var win = manage.getWindow('positionManage');
        if(!win){
            win = manage.createWindow({
                id: 'positionManage',
                title: '职位管理',
//                closeAction: 'hide',          liwen修改:解决win不能关闭问题
                width: 940,
                height: 530,
                iconCls: 'bogus',
                layout: 'border',
                items: [
                    { 
                        region: "center",
                        split: false,
                        layout: 'anchor',
                        items: [this.grid]
                    },
                    this.tree
                ]
            });
        }
        win.show();
    },

    getJobWin: function() { 
        var manage = this.app.getDesktop();
        var win = manage.getWindow('JobWin');
        if(!win) { 
            win = manage.createWindow({
                title: '修改职位信息',
                id: 'JobWin',
                closeAction: 'hide',
                width: 640,
                height: 350,
                layout: 'fit',
                frame: true,
                items: this.form
            });
         }
         return win;
    },

    createAddjob: function(action){ 
        action == "add" ? isEditing = false : isEditing = true
        var manage = this.app.getDesktop();
        this.form.getForm().reset();
        this.getJobWin().show();
    },

    editJob: function(id, action) { 
        action == "edit" ? isEditing = true : isEditing = false
        var manage = this.app.getDesktop();
        var win = this.getJobWin();

        Ext.Ajax.request({ 
            url: String.format('/jobs/{0}/get_job.json', id),
            method: 'GET',
            success: function(response, option){ 
                var content = Ext.util.JSON.decode(response.responseText).content;
                Manage.positionManage.form.getForm().setValues(content);
            }
        });
        win.show();
    },

    deleteJob: function(id) { 
        Ext.Msg.confirm("提示", "确认删除此职位？", function(btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({ 
                    url:    '/jobs/' + id,
                    method: 'DELETE',
                    success: function(response, opts) { 
                        var scope = Manage.positionManage;
                        scope.grid.store.load();
                        Ext.Msg.alert("提示", "删除成功");
                    },
                    failure: function(response, opts) { 
                        Ext.Msg.alert("提示", "删除失败");
                    } 
                });
            }
        });
    },

    addPaper: function(id) { 
    
    },

    createPosition: function(action){ 
        var _this = this;
        Manage.positionManage.getJobWin().hide();
        Ext.Msg.confirm('提示', "是否执行该操作?", function(button){ 
            if(button == 'no') { 
                Manage.positionManage.getJobWin().show();
            } else {  
            var job = { 
                id           :  isEditing == true ? row_id : undefined,
                jname        :  Ext.getCmp('jname').getValue(),
                job_number   :  Ext.getCmp('job_number').getValue(),
                jobtype_id   :  Ext.getCmp('position_type').getValue(),
                requirement  :  Ext.getCmp('requirement').getValue(),
                created_date :  Ext.getCmp('created_date').getValue(),
                closed_date  :  Ext.getCmp('closed_date').getValue(),
                jdesc        :  Ext.getCmp('jdesc').getValue()
            };
            
            Ext.Ajax.request({ 
                url: isEditing == true ? '/jobs/'+ row_id + '.json' : '/jobs.json',
                method: isEditing == true ? "PUT":"POST",
                jsonData: { job: job },
                success: function(){
                    //Manage.positionManage.form.getForm().reset();
                    //Manage.positionManage.getJobWin().hide()
                    Manage.positionManage.grid.store.load();
                    Ext.Msg.alert("提示", "操作成功!");
                },
                failure: function(response, onpts) {
                    Ext.Msg.alert("提示", "操作失败！");
                } 
            });
           }
        });
    },

    createForm: function(){ 
        var _this = this;
        var store = new Ext.data.JsonStore({ 
            fields: [
                'id',
                'jname'
            ],
            root: "content",
            url:'/jobs/all_jobs.json',
            method: 'GET'
        });
        var combo = new Ext.form.ComboBox({ 
            fieldLabel : "*职位类型",
            triggerAction : "all",
            emptyText: '请选择',
            width: 170,
            editable: "false",
            store : new Ext.data.JsonStore({ 
                root : 'content',
                proxy: new Ext.data.HttpProxy({ url: '/jobtypes/for_select.json', method: 'get' }),
                fields: ['id', 'job_type']
            }),
            id: 'position_type',
            displayField: 'job_type',
            valueField: 'id',
            listeners: { 
                select : function(combo, record, index){ 
                    Ext.getCmp("position_type").setValue(record.get('id'));
                    combo.fireEvent('blur'); //选择后失去焦点 
                }
            }
        });
        var job_number = new Ext.form.NumberField({  
            fieldLabel:'*招聘人数',  
            allowDecimals : false,//不允许输入小数  
            allowNegative : false,//不允许输入负数  
            nanText :'请输入有效的整数',  
            id: 'job_number'
        });  

        return new Ext.form.FormPanel({ 
            frame: true,
            autoHeight: true,
            region: 'center',
            width:450,
            height: 220,
            closeAction:'hide',
            buttons: [{ 
                text: '保存职位', handler: _this.createPosition
            },{ 
                text: '重置数据', handler: function(){ Manage.positionManage.form.getForm().reset() }
            }],
            items: [{ 
                layout: 'column',
                xtype: 'fieldset',
                title: '带*号为必填信息',
                autoHeight: true,
                style: 'margin-left:5px;',
                items:[{ 
                    columnWidth: .5,
                    layout:'form',
                    defaultType:'textfield',
                    items:[
                        { fieldLabel: '*职位名称', id: 'jname' },
                        job_number,
                        combo,
                        { fieldLabel: '学历要求', id: 'education' },

                    ]
                },{ 
                    columnWidth: .5,
                    layout:'form',
                    defaultType:'datefield',
                    items:[
                        { fieldLabel: '*发布日期', id: 'created_date', value: new Date(), format:'Y-m-d'},
                        { fieldLabel: '*截止日期', id: 'closed_date', format:'Y-m-d'},
                        { fieldLabel: '*月薪范围', id: 'salary', xtype: 'textfield'},
                        { fieldLabel: '最低工作经验', id: 'experience', xtype: 'textfield' }
                    ]
                }]
               },{ 
                    width: 500,
                    height: 50,
                    xtype: 'textarea',
                    fieldLabel: '<b>职位描述</b><br />(最多可输入200字)', maxLength: 200, id: 'jdesc'
               },{ 
                    width: 500,
                    height: 70,
                    xtype: 'textarea',
                    fieldLabel: '应聘要求', id: 'requirement'
               }
            ]
      });
    },

    createTree: function() { 
        var _this = this;
        var root = new Ext.tree.AsyncTreeNode({ 
            text: '状态',
            expanded: true,
            children: [{ 
                text: '招聘ing(0)', leaf: true, 
                listeners: { click: function() {                                      //liwen修改：查询功能 
                    var condition="state=\'" + "招聘ing" +"\'"
                    var url="/jobs/all_jobs.json?conditions="+condition;
                    Manage.positionManage.queryConfig(url);
                } }
            },{
                text: '未发布(0)', leaf: true, 
                listeners: { click: function() {                                      //liwen修改：查询功能 
                    var condition="state=\'" + "未发布" +"\'"
                    var url="/jobs/all_jobs.json?conditions="+condition;
                    Manage.positionManage.queryConfig(url);
                } } 
            },{ 
                text: '全部(0)', leaf: true, 
                listeners: { click: function() {                                      //liwen修改：查询功能 
                    var url="/jobs/all_jobs.json";
                    Manage.positionManage.queryConfig(url);
                } } 
            },{ 
                text: '已招满(0)', leaf: true, 
                listeners: { click: function() {                                      //liwen修改：查询功能 
                    var condition="state=\'" + "已招满" +"\'"
                    var url="/jobs/all_jobs.json?conditions="+condition;
                    Manage.positionManage.queryConfig(url);
                } } 
            },{ 
                text: '已截止(0)', leaf: true, 
                listeners: { click: function() {                                      //liwen修改：查询功能 
                    var condition="state=\'" + "已截止" +"\'"
                    var url="/jobs/all_jobs.json?conditions="+condition;
                    Manage.positionManage.queryConfig(url);
                } } 
            },{
                text: '已删除(0)', leaf: true, 
                listeners: { click: function() {                                      //liwen修改：查询功能 
                    var condition="state=\'" + "已删除" +"\'"
                    var url="/jobs/all_jobs.json?conditions="+condition;
                    Manage.positionManage.queryConfig(url);
                } } 
            }]
        });

        return new Ext.tree.TreePanel({ 
            root   : root,
            split  : true,
            width  : 120,
            title  : '状态列表',
            region : 'west',
            collapsible: true
        });
    },

    createGrid: function(){ 
        var _this = this;
        var store = new Ext.data.JsonStore({ 
            fields: [
                'id',
                'jname',
                'position_type',
                'job_number',
                'created_date',
                'closed_date',
                'requirement',
                'jdesc',
                'state'
            ],
            root: "content",
            totalProperty:'total',          //liwen修改:支持分页
            url:'/jobs/all_jobs.json',
            method: 'GET'
        });
        store.load({ params:{ offset:0,limit:Wando.pageSize } });     //liwen修改:支持分页

        var pageToolbar = Wando.createPagingToolbar(store);

        var addOperator = function(value, mataData, record, rowIndex, colIndex, store){ 
           // alert(record.data.id);
            var link = String.format('<a href="#" onclick="Manage.positionManage.editJob( {0}, \'edit\' )">查看修改</a>', record.data.id) + '&nbsp;';
            link += String.format('<a href="#" onclick="Manage.positionManage.deleteJob({0})">删除</a>', record.data.id) + '&nbsp;';
            //link += String.format('<a href="#" onclick="Manage.positionManage.addPaper({0})">添加问卷</a>', record.data.id);
            return link;
        };

        var sm = new Ext.grid.CheckboxSelectionModel();
        var cm = new Ext.grid.ColumnModel([
            sm,
            { header: '序号'        , sortable: true, dataIndex: 'id', width:50},
            { header: '职位名称'    , sortable: true, dataIndex: 'jname'},
            { header: '职位类型'    , sortable: true, dataIndex: 'position_type'},
            { header: '招聘人数'    , sortable: true, dataIndex: 'job_number'},
            { header: '发布日期'    , sortable: true, dataIndex: 'created_date' },
            { header: '截止日期'    , sortable: true, dataIndex: 'closed_date'},
            { header: '职位要求'    , sortable: true, dataIndex: 'requirement'},
            { header: '职位描述'    , sortable: true, dataIndex: 'jdesc'},
            { header: '学历要求'    , sortable: true, dataIndex: 'jdesc'},
            { header: '经验要求'    , sortable: true, dataIndex: 'jdesc'},
            { header: '状态'        , sortable: true, dataIndex: 'state' },
            { header: '操作'        , dataIndex: '#', renderer: addOperator, width: 120 }
        ]);
        tbar = [ 
            { text: '添加职位', handler: function(){ _this.createAddjob("add") }}, '-',
            { text: '发布选中职位', handler: function(){ }},'-',
            { text: '查询', handler: function(){ }},'->',
            { text: '添加职位类型', handler: function(){ } }
        ];

        return new Ext.grid.EditorGridPanel({ 
            viewConfig: { forceFit: true },
            title: "职位列表",
            stripeRows: true,
            region: 'center',
            anchor: "100% 100%",
            id:'jobGrid',                 //liwen修改:添加id
            store: store,
            loadMask: {msg:"读取中..."},
            tbar: tbar, 
            bbar: pageToolbar,
            cm: cm,
            sm: sm,
            listeners: { 
                cellclick: function(grid, rowIndex, columnIndex) { 
                    var store = Manage.positionManage.grid.getStore();
                    var record = store.getAt(rowIndex);
                    row_id = record.get("id");
                }
            }
        });
    },

//liwen修改:查询模块
    queryConfig : function(url){ 
         var store = Ext.getCmp("jobGrid").getStore();
         store.removeAll();
         store.proxy=new Ext.data.HttpProxy({url:url});
         store.load({ params:{ offset:0,limit:Wando.pageSize } });
    }
});


