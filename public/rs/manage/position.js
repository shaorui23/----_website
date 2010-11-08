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
                width: 940,
                height: 530,
                iconCls: 'bogus',
                shim: false,
                animCollapse: false,
                constrainHeader: true,

                layout: 'border',
                frame: true,
                items: [
                    { 
                        region: "center",
                        split: false,
                        layout: 'anchor',
                        items: [this.createGrid()]
                    },
                    this.createTree()
                ]
            });
        }
        win.show();
    },

    createAddjob: function(){ 
        var manage = this.app.getDesktop();
        var win = manage.getWindow('positionManage');
            win = manage.createWindow({
                title: '发布职位',
                width: 640,
                height: 350,
                layout: 'fit',
                frame: true,
                items: this.createForm()
            });
        win.show();
    },

    createPosition: function(){ 
        Ext.Msg.confirm('提示', "是否添加新职位?", function(button){ 
            if(button == 'no') return false;
            var job = { 
                jname        :  Ext.getCmp('jname').getValue(),
                job_number   :  Ext.getCmp('job_number').getValue(),
                type         :  Ext.getCmp('type').getValue(),
                requirement  :  Ext.getCmp('requirement').getValue(),
                created_date :  Ext.getCmp('created_date').getValue(),
                closed_date  :  Ext.getCmp('closed_date').getValue(),
                jdesc        :  Ext.getCmp('jdesc').getValue()
            };
            
            Ext.Ajax.request({ 
                url: '/jobs.json',
                method: "POST",
                jsonData: { job: job },
                success: function(){
                    Ext.Msg.alert("提示", "添加成功!");
                },
                failure: function(response, onpts) {
                    Ext.Msg.alert("提示", "添加失败！");
                } 
            });
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
            buttons: [{ 
                text: '保存职位', handler: _this.createPosition
            },{ 
                text: '重置数据', handler: function(){}
            }],
            items: [{ 
                layout: 'column',
                xtype: 'fieldset',
                title: '招聘简述',
                autoHeight: true,
                style: 'margin-left:5px;',
                items:[{ 
                    columnWidth: .5,
                    layout:'form',
                    defaultType:'textfield',
                    items:[
                        { fieldLabel: '职位名称', id: 'jname' },
                        { fieldLabel: '招聘人数', id: 'job_number' },
                        { fieldLabel: '职位类型', id: 'type' }
                    ]
                },{ 
                    columnWidth: .5,
                    layout:'form',
                    defaultType:'textfield',
                    items:[
                        { fieldLabel: '发布日期', id: 'created_date', xtype:'datefield', value: new Date(), format:'Y-m-d'},
                        { fieldLabel: '截止日期', id: 'closed_date', xtype:'datefield', format:'Y-m-d'},
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
                'type',
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

        var sm = new Ext.grid.CheckboxSelectionModel();
        var cm = new Ext.grid.ColumnModel([
            sm,
            { header: '序号'        , sortable: true, dataIndex: 'id'},
            { header: '职位名称'    , sortable: true, dataIndex: 'jname'},
            { header: '职位类型'    , sortable: true, dataIndex: 'type'},
            { header: '招聘人数'    , sortable: true, dataIndex: 'job_number'},
            { header: '发布日期'    , sortable: true, dataIndex: 'created_date' },
            { header: '截止日期'    , sortable: true, dataIndex: 'closed_date'},
            { header: '职位要求'    , sortable: true, dataIndex: 'requirement'},
            { header: '职位描述'    , sortable: true, dataIndex: 'jdesc'},
            { header: '状态'        , sortable: true, dataIndex: 'state' },
            { header: '操作'        , dataIndex: '#' }
        ]);
        tbar = [ 
            { text: '添加职位', handler: function(){ _this.createAddjob() }}, '-',
            { text: '查询', handler: function(){  }}
        ];

        return new Ext.grid.GridPanel({ 
            frame: true,
            viewConfig: { forceFit: true },
            title: "职位列表",
            stripeRows: true,
            region: 'center',
            anchor: "100% 100%",
            store: store,
            tbar: tbar, 
            cm: cm,
            sm: sm
        });
    }
});


