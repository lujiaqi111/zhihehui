$(document).ready(function(){
	//获取当前页面的URL
	var url = location.href;
	//截取传递参数  
//	var paraString = url.substring(url.indexOf("productType") + 12, url.length);
	
	//获取值
	var sellerId=getUrlParam('sellerId');
	var memberId=getUrlParam('memberId');
//	var	productType=getCharFromUtf8(paraString);
//	var sellerId='10';
//	var memberId='20';
//	var productType='单页/折页';
	
	/**
	 * 该页面的json格式
	 * bindStyle:装订的方式，bindRequire：装订的特殊要求
	 * 当为特殊要求时：bindStyle=''，bindRequire=特殊要求的内容
	 * (sellerId:,memberId:,productType:,binging:(bindStyle:,bindRequire:))
	 */
	var offerParaJson={};
	offerParaJson.sellerId=sellerId;
	offerParaJson.memberId=memberId;
//	offerParaJson.productType=productType;
	var bindingJson={};
	
	
	$('#wayTable').on('tap click','td',function(e){
		e.preventDefault();
		e.stopPropagation()
		var sign=$(this).attr('sign');
		console.log(sign);
		if(sign!='disabled'&&sign!='request'){
//			$(this).addClass('selected');
//			$(this).parent('tr').siblings('tr').find('td').removeClass('selected');
			console.log($(this).find('p').text());
			bindingJson.bindStyle=$(this).find('p').text();
//			bindingJson.bindRequire='';
			offerParaJson.binging=bindingJson;
			sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
			console.log(sessionStorage.getItem('offerParaJson'));
			$(this).addClass('active');
			$(this).children().find('p').css('color','#FFFFFF');
			$(this).parent('tr').siblings('tr').find('td').removeClass('selected');
			window.location='adminindex.html';
		}else if(sign=='request'){
			$(this).addClass('selected');
			$(this).parent('tr').siblings('tr').find('td').removeClass('selected');
			layer.open({
			  type: 2,
			  skin: 'demo-class',
			  area: ['90%', '85%'], //宽高
//			  area: '95%',
			  title:'',
			  shadeClose:true,
			  closeBtn: 0,
			  content: 'materials-request.html'
			});
		}
			
//			bindingJson.bindStyle=$(this).find('p').text();
//			bindingJson.bindRequire='';
//			offerParaJson.binging=bindingJson;
//			sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
//			console.log(sessionStorage.getItem('offerParaJson'));
//			window.location='binding.html';
	});
	
	for(var i=0;i<$('#wayTable td').length;i++){
		if($('#wayTable td').eq(i).hasClass('active')){
			$('#wayTable td').eq(i).removeClass('active')
		}
	}
	
	$('#singleTable').on('tap click','td',function(){
			$(this).addClass('selected');
			$(this).parent('tr').siblings('tr').find('td').removeClass('selected');
			bindingJson.bindStyle=$(this).find('p').text();
			bindingJson.bindRequire='';
			offerParaJson.binging=bindingJson;
			sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
			console.log(sessionStorage.getItem('offerParaJson'));
			window.location='single-size.html';
	});
	
	$('#requirementlayer').on('tap click','#sureButton',function(){
		var requireContent=$('#requireContent').val();
		if(requireContent==''){
			layer.msg('请填写您的特殊要求',{offset: '80%'});
		}else{
			bindingJson.bindStyle='';
			bindingJson.bindRequire=requireContent;
			offerParaJson.binging=bindingJson;
			sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
			window.location='binding.html';
		}
	});
});
