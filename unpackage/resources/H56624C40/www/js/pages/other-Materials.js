$(document).ready(function(){
	//获取值
	var sellerId=getUrlParam('sellerId');
	var memberId=getUrlParam('memberId');
	
//	var sellerId='10';
//	var memberId='4';
	
	$('#materialsTable').on('tap click','tr',function(){
		if($(this).index()==0){
			//填写问题
			window.location='materials-request.html?sellerId='+sellerId+'&memberId='+memberId;
		}else{
			//询价页面
			window.location='materiel.html?sellerId='+sellerId+'&memberId='+memberId;
		}
	});
	
	var ua = navigator.userAgent.toLowerCase();
	var system='';
	if (/iphone|ipad|ipod/.test(ua)) {
		system='iphone';		
	} else if (/android/.test(ua)) {
		system='android';
	}
	
	$('#sureMaterBut').on('tap click',function(){
		var text1=$('#text').val();
		if(text1==''){
			layer.msg('请先填写您的要求',{offset: '80%'});
			return false;
		}
		$.ajax({
			type:"post",
			url:ajaxUrlPath+"/mobile/otherOrder/save",
			async:true,
			data:{
				sellerId:sellerId,
				memberId:memberId,
				text:text1
			},
			success:function(data){
				if(data.code==0){
					if(system=='android'){
						//安卓
						getYangGao.getData();
					}else{
						//iOS
						window.location="blank.html";
					}
				}else{
					layer.msg('网络堵塞',{offset: '80%'});
				}
			}
		});
	});
	
	
});