Manage = new Ext.app.App({
	init:function(){
		Ext.QuickTips.init();
	},

	getModules: function(){
		return [
            new Manage.QuestionBase(),
            new Manage.PositionManage(),
            new Manage.PaperCenter(),
            new Manage.ResumeCenter()
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
