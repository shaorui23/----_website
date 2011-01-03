Manage = new Ext.app.App({
	init:function(){
		Ext.QuickTips.init();
	},


	getModules: function(){
        Manage.questionBase   = new Manage.QuestionBase();
        Manage.positionManage = new Manage.PositionManage();
        Manage.paperCenter    = new Manage.PaperCenter();
        Manage.resumeCenter   = new Manage.ResumeCenter();
        Manage.decesionCenter = new Manage.DecesionCenter();
       // Manage.setting        = new Manage.Setting();
		return [
            Manage.questionBase,
            Manage.positionManage,
            Manage.paperCenter,
            Manage.resumeCenter,
            Manage.decesionCenter,
        //    Manage.setting
		];
	},

    // config for the start menu
    getStartConfig: function(){
        return {
            title: '欢迎使用1.com网站设计后台管理系统',
            iconCls: 'user',
            toolItems: [{
                text:'设置',
                iconCls:'settings',
                handler: function() { alert("你点了设置"); },
                scope:this
            },'-',{
                text:'注销',
                iconCls:'logout',
                handler: function() { window.location.reload();alert("你已成功退出系统");},
                scope:this
            }]
        };
    }
});
