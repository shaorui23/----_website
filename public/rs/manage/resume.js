Manage.ResumeCenter = Ext.extend(Ext.app.Module, {
    id: 'resumeCenter',
    init: function(){
        this.query = this.query();
        this.launcher = {
            text: '简历中心',
            iconCls: 'bogus',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function(){
        var manage = this.app.getDesktop();
        var win = manage.getWindow('resumeCenter');
        if(!win){
            win = manage.createWindow({
                id: 'resumeCenter',
                title: '简历中心',
                width: 1000,
                height: 550,
                iconCls: 'bogus',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                items: this.createPanel(),
            });
        }
        win.show();
    },

    createPanel: function(){ 
        return new Ext.TabPanel({ 
            frame: true,
            activeTab: 0,
            items: [{ 
                id: 'resume',
                title: '简历问项',
                layout: 'anchor',
                items: [this.formPanel()]
            }, { 
                id: 'resumeAnswer',
                title: '简历收集',
                layout: 'anchor',
                tbar:[{ xtype:'button',text:'查询',handler:function(){ Ext.getCmp("queryWin").show() } },
                      { xtype:'button',text:'清空查询',handler:function(){ 
                            url = "/manage/resume_an.json";
                            Manage.resumeCenter.queryConfig(url); 
                      } }],
                items: [this.createGrid1(),this.createGrid2(),this.creatForm()],
            }],
        });
    },

//查询模块
    query : function(){ 
        var form = new Ext.form.FormPanel({ 
        defaultType: 'textfield',
        labelAlign: 'right',
        labelWidth: 40,
        frame: true,
        autoWidth:true,
        items:[{xtype: 'textfield',fieldLabel:'帐号',id:'login'},
               {xtype: 'textfield',fieldLabel:'姓名',id:'name'},
               {xtype: 'textfield',fieldLabel:'性别',id:'sex'},
               {xtype: 'textfield',fieldLabel:'学历',id:'edu'},
               {xtype: 'textfield',fieldLabel:'专业',id:'prof'}],
        buttons:[{ text:'查询',handler:function(){ 
                  var login = Ext.getCmp("login").getValue();
                  var sex   = Ext.getCmp("sex").getValue();
                  var name  = Ext.getCmp("name").getValue();
                  var edu   = Ext.getCmp("edu").getValue();
                  var prof  = Ext.getCmp("prof").getValue();
                  var condition = "";
                  if(login != ""){ condition += "users.login=\'"+ login + "\'" }
                  if(sex!= "" && condition =="" ){
                      condition += "rsex_a=\'"+ sex + "\'"}
                  else if(sex!=""){ 
                      condition += "and rsex_a=\'"+ sex + "\'" }
                  if(name != "" && condition =="" ){ 
                      condition += "rname_a=\'"+ name + "\'" }
                  else if(name!=""){ 
                      condition += "and rname_a=\'"+ name + "\'" }
                  if(edu != "" && condition =="" ){ 
                      condition += "redu_a=\'"+ edu + "\'" }
                  else if(edu!=""){ 
                      condition += "and redu_a=\'"+ edu + "\'" }
                  if(prof != "" && condition =="" ){ 
                      condition += "rprof_a=\'"+ prof + "\'" }
                  else if(prof!=""){ 
                      condition += "rprof_a=\'"+ prof + "\'" }
                  url = "/manage/query.json?conditions="+condition;
                  Manage.resumeCenter.queryConfig(url);
               }}]
       });
       var win = new Ext.Window({ 
               id:"queryWin",
               autoHeight:true,
               autoWidth:true,
               closeAction:'hide',
               items:[form]
           });
       },

//查询模块配置
    queryConfig : function(url){ 
         var store = Ext.getCmp("grid1").getStore();
         store.removeAll();
         store.proxy=new Ext.data.HttpProxy({url:url});
         store.load();
         Ext.getCmp("queryWin").hide();
    },

//简历内容formpanel
    formPanel : function(){ 
        var rStore = new Ext.data.JsonStore({ 
                  url:"/manage/edit_resume.json",
                  root:"content",
                  fields:['rname','rsex','rbirth','rmari_sta','rrace','rblood','rhei','rwei','rpoli',
                        'riden','rpho','rmail','raddr','rprof','rexp','redu','rskill','reva']
            });
        rStore.load({callback:function(record){
            if(record.length != 0){        //如果没记录，则新建 
                url="/manage/update_resume.json";
                method = 'PUT';
                Ext.getCmp("rname").setValue(record[0].data.rname);
                Ext.getCmp("rsex").setValue(record[0].data.rsex);
                Ext.getCmp("rbirth").setValue(record[0].data.rbirth);
                Ext.getCmp("rmari_sta").setValue(record[0].data.rmari_sta);
                Ext.getCmp("rrace").setValue(record[0].data.rrace);
                Ext.getCmp("rblood").setValue(record[0].data.rblood);
                Ext.getCmp("rhei").setValue(record[0].data.rhei);
                Ext.getCmp("rwei").setValue(record[0].data.rwei);
                Ext.getCmp("rpoli").setValue(record[0].data.rpoli);
                Ext.getCmp("riden").setValue(record[0].data.riden);
                Ext.getCmp("rpho").setValue(record[0].data.rpho);
                Ext.getCmp("rmail").setValue(record[0].data.rmail);
                Ext.getCmp("raddr").setValue(record[0].data.raddr);
                Ext.getCmp("rprof").setValue(record[0].data.rprof);
                Ext.getCmp("rexp").setValue(record[0].data.rexp);
                Ext.getCmp("redu").setValue(record[0].data.redu);
                Ext.getCmp("rskill").setValue(record[0].data.rskill);
                Ext.getCmp("reva").setValue(record[0].data.reva);
            }
            else
            {//如果没记录，则修改
                url="/manage/create_resume.json";
                method = 'POST';
            }
          
        }});

        return new Ext.form.FormPanel({
            labelAlign: 'right',
            frame:true,
            id:'formPanel',
            url: '/manage/edit_resume.json',
            autoWidth: true,
            height: 490,
            reader: rStore,
            items:[{ 
                layout:'column',
                items:[{ 
                    columnWidth:.3,
                    layout:'form',
                    items:[{xtype: 'textfield',fieldLabel: 'name',id: 'rname',},
                           {xtype: 'textfield',fieldLabel: 'marital status',id: 'rmari_sta',},
                           {xtype: 'textfield',fieldLabel: 'height',id: 'rhei',},
                           {xtype: 'textfield',fieldLabel: 'identity',id: 'riden',},
                           {xtype: 'textfield',fieldLabel: 'address',id: 'raddr',},
                           {xtype: 'textfield',fieldLabel: 'education',id: 'redu'}]
                },{ 
                    columnWidth:.3,
                    layout:'form',
                    items:[{xtype: 'textfield',fieldLabel: 'sex',id: 'rsex'},
                           {xtype: 'textfield',fieldLabel: 'race',id: 'rrace'},
                           {xtype: 'textfield',fieldLabel: 'weight',id: 'rwei'},
                           {xtype: 'textfield',fieldLabel: 'phone',id: 'rpho',},
                           {xtype: 'textfield',fieldLabel: 'profession',id: 'rprof',},
                           {xtype: 'textfield',fieldLabel: 'skill',id: 'rskill'}]
                },{ 
                    columnWidth:.3,
                    layout:'form',
                    items:[{xtype: 'textfield',fieldLabel: 'birth',id: 'rbirth'},
                          {xtype: 'textfield',fieldLabel: 'blood',id: 'rblood'},
                          {xtype: 'textfield',fieldLabel: 'politics',id: 'rpoli'},
                          {xtype: 'textfield',fieldLabel: 'E-mail',id: 'rmail'},
                          {xtype: 'textfield',fieldLabel: 'experience',id: 'rexp'},
                          {xtype: 'textfield',fieldLabel: 'evaluation',id: 'reva'}]
                }]
            }],
            buttons: [{ text: '修改提交', handler: function() { Manage.resumeCenter.save(); }}]
        });
    },

//编辑简历内容数据
    editData : function(){ 
        var data = {};
        data["resume"] = [];
        var obj = {};
        obj.rname = Ext.getCmp("rname").getValue();
        obj.rsex = Ext.getCmp("rsex").getValue();
        obj.rbirth = Ext.getCmp("rbirth").getValue();
        obj.rmari_sta = Ext.getCmp("rmari_sta").getValue();
        obj.rrace = Ext.getCmp("rrace").getValue();
        obj.rblood = Ext.getCmp("rblood").getValue();
        obj.rhei = Ext.getCmp("rhei").getValue();
        obj.rwei = Ext.getCmp("rwei").getValue();
        obj.rpoli = Ext.getCmp("rpoli").getValue();
        obj.riden = Ext.getCmp("riden").getValue();
        obj.rpho = Ext.getCmp("rpho").getValue();
        obj.rmail = Ext.getCmp("rmail").getValue();
        obj.raddr = Ext.getCmp("raddr").getValue();
        obj.rprof = Ext.getCmp("rprof").getValue();
        obj.rexp = Ext.getCmp("rexp").getValue();
        obj.redu = Ext.getCmp("redu").getValue();
        obj.rskill = Ext.getCmp("rskill").getValue();
        obj.reva = Ext.getCmp("reva").getValue();
        data["resume"].push(obj);
        return data;
    },

//保存简历内容
    save : function(){ 
        var data = Manage.resumeCenter.editData(); 
        Ext.MessageBox.confirm("确认","确认保存",
            function(button,text){ 
                if(button == "yes"){ 
                    Ext.Ajax.request({ 
                        url:url,
                        method:method,
                        jsonData:data,
                        disableCaching:false,
                        success : function(){ location.href = "/manage"; },
                    });
                }
          });
    },

//简历收集上面grid显示
    createGrid1 : function(){ 
        var fStore = new Ext.data.JsonStore({ 
            url:"/manage/resume_an.json",
            totalProperty:'total',
            remoteSore:true,
            root:"content",
            fields:['id','rname_a','rsex_a','rbirth_a','rpho_a','rmail_a','rprof_a','redu_a','user_login']
        });
        fStore.load({ params:{ offset:0,limit:Wando.pageSize } });

        var grid1 = new Ext.grid.GridPanel({ 
            store:fStore,
            border:true,
            id:'grid1',
            anchor: '100% 50%',
            frame:true,
            stripeRows:true,
            viewConfig:{ forceFit:true },
            cm:new Ext.grid.ColumnModel([
                {header:'帐号'      ,dataIndex:'user_login' },
                {header:'姓名'      ,dataIndex:'rname_a'     },
                {header:'性别'      ,dataIndex:'rsex_a'      },
                {header:'出生年月'  ,dataIndex:'rbirth_a'    },
                {header:'学历'      ,dataIndex:'redu_a'      },
                {header:'专业'      ,dataIndex:'rprof_a'     },
                {header:'E-mail'    ,dataIndex:'rmail_a'     },
                {header:'联系电话'  ,dataIndex:'rpho_a'      },
            ]),
            bbar:Wando.createPagingToolbar(fStore)
        });
        grid1.on('cellclick',function(grid, rowIndex) {
            var tStore = Ext.getCmp('grid2').getStore();
            var newUrl ="/manage/find_resume_an.json?id=" + fStore.getAt(rowIndex).data.id;

            tStore.removeAll();
            tStore.proxy=new Ext.data.HttpProxy({url:newUrl});
            tStore.load({callback:function(record){
                Ext.getCmp("raddr_a").setValue(record[0].data.raddr_a);
                Ext.getCmp("rexp_a").setValue(record[0].data.rexp_a);
                Ext.getCmp("reva_a").setValue(record[0].data.reva_a);
            }});
        });
       return grid1;
    },

//简历收集下面grid显示
    createGrid2 : function(){ 
        var tStore = new Ext.data.JsonStore({ 
            url:"/",
            remoteSort:true,
            root: "content",
            fields:['rhei_a','rwei_a','rmari_sta_a','rrace_a','rblood_a','rpoli_a','rskill_a','riden_a','raddr_a','rexp_a','reva_a']
        });

        return new Ext.grid.GridPanel({ 
            store:tStore,
            border:false,
            id:'grid2',
            anchor: '100% ',
            stripeRows:true,
            height:45,
            viewConfig:{ forceFit:true },
            cm: new Ext.grid.ColumnModel([
                {header:'身高'      ,dataIndex:'rhei_a'     },
                {header:'体重'      ,dataIndex:'rwei_a'     },
                {header:'婚姻状况'  ,dataIndex:'rmari_sta_a'},
                {header:'血型'      ,dataIndex:'rblood_a'   },
                {header:'民族'      ,dataIndex:'rrace_a'    },
                {header:'政治面貌'  ,dataIndex:'rpoli_a'    },
                {header:'技能'      ,dataIndex:'rskill_a'   },
                {header:'身份证号'  ,dataIndex:'riden_a'    },
            ])
        });
    },

//简历收集中显示form
    creatForm : function(){ 
        return new Ext.form.FormPanel({
            labelAlign: 'right',
            frame:true,
            id:'resumeForm',
            anchor: '100%, 40%',
            layout:'form',
            reader: Ext.getCmp('grid2').getStore(),
            items:[{ 
                xtype: 'textarea',
                readOnly:true,
                fieldLabel: '家庭住址',
                id: 'raddr_a',
                anchor:"100% 20%"
            },{ 
                xtype:  'textarea',
                readOnly:true,
                fieldLabel: '经历',
                id: 'rexp_a',
                anchor:"100% 20%"
            },{ 
                xtype:  'textarea',
                readOnly:true,
                fieldLabel: '评价',
                id: 'reva_a',
                height:180,
                anchor:"100% 60%"
            }]
      });
    },

});
