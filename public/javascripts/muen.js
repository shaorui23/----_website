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
