$(document).ready(function(){
	var enquiryOrderId=getUrlParam('enquiryOrderId');
	$('#yangGaoUl li').click(function(){
	    if($(this).find('i').hasClass('checked')){
			$(this).siblings('li').children('i').removeClass('checked') 
	    }else{
	        $(this).find('i').addClass("checked");
			$(this).siblings('li').children('i').removeClass('checked') 
	    }
	});
	
	var ua = navigator.userAgent.toLowerCase();
	var system='';
	if (/iphone|ipad|ipod/.test(ua)) {
		system='iphone';		
	} else if (/android/.test(ua)) {
		system='android';
	}
	
	$('#submitBtn').click(function(){
		var sampleManuscript=$('#yangGaoUl').find('.selected').parent('li').find('span').text();
		$.ajax({
			type:"post",
			url:ajaxUrlPath+"/mobile/enquiryOrder/updateEnquiryOrder",
			async:true,
			data:{
				enquiryOrderId:enquiryOrderId,
				sampleManuscript:sampleManuscript
			},
			success:function(data){
				if(data.code==0){
					if(system=='android'){
						//安卓
						getYangGao.getData(enquiryOrderId);
					}else{
						//iOS
						window.location="blank.html?enquiryOrderId="+enquiryOrderId;
					}
				}else{
					layer.msg('网络堵塞',{offset: '80%'});
				}
			}
		});
	});
	
});