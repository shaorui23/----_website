Manage = new Ext.app.App({
	init:function(){
		Ext.QuickTips.init();
	},


	getModules: function(){
        Manage.questionBase = new Manage.QuestionBase();
        Manage.positionManage = new Manage.PositionManage();
        Manage.paperCenter = new Manage.PaperCenter();
        Manage.resumeCenter = new Manage.ResumeCenter();
        Manage.decesionCenter = new Manage.DecesionCenter();
		return [
            Manage.questionBase,
            Manage.positionManage,
            Manage.paperCenter,
            Manage.resumeCenter,
            Manage.decesionCenter
		];
	},

    // config for the start menu
    getStartConfig: function(){
        return {
            title: 'Jack Slocum',
            iconCls: 'user',
            toolItems: [{
                text:'Settings',
                iconCls:'settings',
                scope:this
            },'-',{
                text:'Logout',
                iconCls:'logout',
                scope:this
            }]
        };
    }
});
