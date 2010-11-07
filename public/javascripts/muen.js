strin = function(){
		//alert("aa");
		if(document.all && document.getElementById){
			aa=document.getElementById("nuw");
			//alert(aa.innerHTML);
			for(var i=0;i<aa.childNodes.length;i++){
				var bb = aa.childNodes[i];
				//alert(bb.name);
				if(bb.nodeName=="LI"){
					//alert("bb.nodeName");
					bb.onmouseover=function(){
						this.className="over";
					}
					bb.onmouseout= function(){
						this.className="";
					}
				}
				else{
					//alert("bb.nodeName");
				}
		
			}
			//navRoot.childNodes.length
		}
	}
	window.onload=strin;

//主页友情链接跳转功能
function select_change_to(){ 
    var url = "";
    var select_url = document.getElementById('selectd_fo').value;
    if(select_url != "auction"){  
        if(select_url == "shop")
            url = "http://localhost:3000";
        else if(select_url == "nick")
            url = "http://localhost:3000";
        else if(select_url == "info")
            url = "http://localhost:3000";
        else if(select_url == "web")
            url = "http://localhost:3000";
        window.open(url);
    }
}

//动态时间函数的实现
function Clock() {
	var date = new Date();
	this.year = date.getFullYear();
	this.month = date.getMonth() + 1;
	this.date = date.getDate();
	this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
	this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

	this.toString = function() {
		return this.year + "年" + this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute + ":" + this.second + " " + this.day; 
	};
	
	this.toSimpleDate = function() {
		return this.year + "-" + this.month + "-" + this.date;
	};
	
	this.toDetailDate = function() {
		return this.year + "-" + this.month + "-" + this.date + " " + this.hour + ":" + this.minute + ":" + this.second;
	};
	
	this.display = function(ele) {
		var clock = new Clock();
		ele.innerHTML = clock.toString();
		window.setTimeout(function() {clock.display(ele);}, 1000);
	};
}
