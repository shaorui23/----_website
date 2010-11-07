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
                //items: [this.createForm(), this.createGrid()]
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
                fieldLabel: '职位',
                name: 'question'
            },{ 
                xtype: 'textarea',
                fieldLabel: '职位描述',
                name: 'description'
            }]
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
            { text: '添加职位', handler: function(){ _this.createForm() }}, '-',
            { text: '查询', handler: function(){  }}
        ];

        return new Ext.grid.GridPanel({ 
            frame: true,
            viewConfig: { forceFit: true },
            title: "职位列表",
            region: 'center',
            anchor: "100% 90%",
            store: store,
            tbar: tbar, 
            cm: cm,
            sm: sm
        });
    }
});


