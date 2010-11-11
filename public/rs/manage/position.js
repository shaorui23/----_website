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
                closeAction: 'hide',
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
        alert(isEditing);
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
                position_type:  Ext.getCmp('position_type').getValue(),
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
                title: '*职位必填信息',
                autoHeight: true,
                style: 'margin-left:5px;',
                items:[{ 
                    columnWidth: .5,
                    layout:'form',
                    defaultType:'textfield',
                    items:[
                        { fieldLabel: '职位名称', id: 'jname' },
                        { fieldLabel: '招聘人数', id: 'job_number' },
                        { fieldLabel: '职位类型', id: 'position_type' }
                    ]
                },{ 
                    columnWidth: .5,
                    layout:'form',
                    defaultType:'datefield',
                    items:[
                        { fieldLabel: '发布日期', id: 'created_date', value: new Date(), format:'Y-m-d'},
                        { fieldLabel: '截止日期', id: 'closed_date', format:'Y-m-d'},
                    ]
                }]
               },{ 
                    width: 500,
                    height: 50,
                    xtype: 'textarea',
                    fieldLabel: '职位描述', id: 'jdesc'
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
                listeners: { click: function() { } }
            },{
                text: '全部职位(0)', leaf: true, 
                listeners: { click: function() { } } 
            },{ 
                text: '已招满(0)', leaf: true, 
                listeners: { click: function() { } } 
            },{ 
                text: '已截止(0)', leaf: true, 
                listeners: { click: function() { } } 
            },{
                text: '已删除(0)', leaf: true, 
                listeners: { click: function() { } } 
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
            url:'/jobs.json',
            method: 'GET'
        });
        store.load();

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
            { header: '状态'        , sortable: true, dataIndex: 'state' },
            { header: '操作'        , dataIndex: '#', renderer: addOperator, width: 120 }
        ]);
        tbar = [ 
            { text: '添加职位', handler: function(){ _this.createAddjob("add") }}, '-',
            { text: '查询', handler: function(){  }}
        ];

        return new Ext.grid.EditorGridPanel({ 
            viewConfig: { forceFit: true },
            title: "职位列表",
            stripeRows: true,
            region: 'center',
            anchor: "100% 100%",
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
    }
});


