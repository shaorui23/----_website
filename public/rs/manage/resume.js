Manage.ResumeCenter = Ext.extend(Ext.app.Module, {
    id: 'resumeCenter',
    init: function(){
        this.rearchData();
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
                width: 900,
                height: 480,
                iconCls: 'bogus',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                items: this.createPanel(),
            });
        }
        win.show();
        Manage.resumeCenter.readData();
    },

    rearchData : function(){ 
             rStore = new Ext.data.JsonStore({ 
              url:"/manage/edit_resume.json",
              root:"content",
              fields:['rname','rsex','rbirth','rmari_sta','rrace','rblood','rhei','rwei','rpoli',
                    'riden','rpho','rmail','raddr','rprof','rexp','redu','rskill','reva']
        });
        rStore.load({callback:function(record){store = record;}});
    },

    createPanel: function(){ 
        return new Ext.form.FormPanel({
            labelAlign: 'right',
            frame:true,
            id:'formPanel',
            url: '/manage/edit_resume.json',
            width: 450,
            reader: rStore,
            items:[{ 
                layout:'column',
                items:[{ 
                    columnWidth:.3,
                    layout:'form',
                    items:[{ 
                        xtype: 'textfield',
                        fieldLabel: '问题一',
                        id: 'rname',
                    },{
                        xtype: 'textfield',
                        fieldLabel: '问题四',
                        id: 'rmari_sta',
                   },{
                        xtype: 'textfield',
                        fieldLabel: '问题七',
                        id: 'rhei',
                   },{
                        xtype: 'textfield',
                        fieldLabel: '问题十',
                        id: 'riden',
                   },{
                        xtype: 'textfield',
                        fieldLabel: '问题十三',
                        id: 'raddr',
                   },{
                        xtype: 'textfield',
                        fieldLabel: '问题十六',
                        id: 'redu',
                   }]
                },{ 
                    columnWidth:.3,
                    layout:'form',
                    items:[{ 
                        xtype: 'textfield',
                        fieldLabel: '问题二',
                        id: 'rsex'
                    },{
                        xtype: 'textfield',
                        fieldLabel: '问题五',
                        id: 'rrace'
                   },{
                        xtype: 'textfield',
                        fieldLabel: '问题八',
                        id: 'rwei'
                   },{
                        xtype: 'textfield',
                        fieldLabel: '问题十一',
                        id: 'rpho',
                   },{
                        xtype: 'textfield',
                        fieldLabel: '问题十四',
                        id: 'rprof',
                   },{
                        xtype: 'textfield',
                        fieldLabel: '问题十七',
                        id: 'rskill',
                   }]
                },{ 
                    columnWidth:.3,
                    layout:'form',
                    items:[{ 
                        xtype: 'textfield',
                        fieldLabel: '问题三',
                        id: 'rbirth'
                    },{
                        xtype: 'textfield',
                        fieldLabel: '问题六',
                        id: 'rblood'
                   },{
                        xtype: 'textfield',
                        fieldLabel: '问题九',
                        id: 'rpoli'
                   },{
                        xtype: 'textfield',
                        fieldLabel: '问题十二',
                        id: 'rmail',
                   },{
                        xtype: 'textfield',
                        fieldLabel: '问题十五',
                        id: 'rexp',
                   },{
                        xtype: 'textfield',
                        fieldLabel: '问题十八',
                        id: 'reva',
                   }]
                }]
            }],
            buttons: [{ text: '修改提交', handler: function() { Manage.resumeCenter.save(); }}]
        });
    },

    readData : function(){ 
        Ext.getCmp("rname").setValue(store[0].data.rname);
        Ext.getCmp("rsex").setValue(store[0].data.rsex);
        Ext.getCmp("rbirth").setValue(store[0].data.rbirth);
        Ext.getCmp("rmari_sta").setValue(store[0].data.rmari_sta);
        Ext.getCmp("rrace").setValue(store[0].data.rrace);
        Ext.getCmp("rblood").setValue(store[0].data.rblood);
        Ext.getCmp("rhei").setValue(store[0].data.rhei);
        Ext.getCmp("rwei").setValue(store[0].data.rwei);
        Ext.getCmp("rpoli").setValue(store[0].data.rpoli);
        Ext.getCmp("riden").setValue(store[0].data.riden);
        Ext.getCmp("rpho").setValue(store[0].data.rpho);
        Ext.getCmp("rmail").setValue(store[0].data.rmail);
        Ext.getCmp("raddr").setValue(store[0].data.raddr);
        Ext.getCmp("rprof").setValue(store[0].data.rprof);
        Ext.getCmp("rexp").setValue(store[0].data.rexp);
        Ext.getCmp("redu").setValue(store[0].data.redu);
        Ext.getCmp("rskill").setValue(store[0].data.rskill);
        Ext.getCmp("reva").setValue(store[0].data.reva);
    },

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

    save : function(){ 
        data = Manage.resumeCenter.editData(); 
        Ext.MessageBox.confirm("确认","确认保存",
            function(button,text){ 
                if(button == "yes"){ 
                    Ext.Ajax.request({ 
                        url:"/manage/update_resume.json",
                        method:'PUT',
                        jsonData:data,
                        disableCaching:false,
                        success : function(){ location.href = "/manage"; },
                    });
                }
          });
    },

});
