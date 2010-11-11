Wando = { base: {}, records: {} };

Ext.apply(Wando, { 
    createPagingToolbar: function(store, items) {  
        var bar = new Ext.PagingToolbar({ 
            pageSize      : Wando.pageSize,
            beforePageText: "第",
            afterPageText : "/ {0}页",
            displayMsg    : "显示 {0} - {1} 总 {2} 条记录 ",
            emptyMsg      : "没有相关记录",
            displayInfo   : true,
            store         : store,
            items         : items
        });

        bar.paramNames = { 
            start: "offset", 
            limit: "limit", 
            sort : "sort",
            dir  : "dir"
        };
        return bar;
    },

    pageSize : 20
})
