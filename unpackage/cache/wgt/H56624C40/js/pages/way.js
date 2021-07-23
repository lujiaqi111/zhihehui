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
	
	
	$('#wayTable').on('tap','td',function(e){
		e.preventDefault();
		e.stopPropagation()
		var sign=$(this).attr('sign');
		if(sign!='disabled'&&sign!='request'){
//			$(this).addClass('selected');
//			$(this).parent('tr').siblings('tr').find('td').removeClass('selected');
//			alert($(this).find('p').text());
			bindingJson.bindStyle=$(this).find('p').text();
//			bindingJson.bindRequire='';
			offerParaJson.binging=bindingJson;
			sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
//			alert(sessionStorage.getItem('offerParaJson'));
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
			$(this).children().find('p').css('color','#FFFFFF');
			$(this).siblings().children().find('p').css('color','#8f8f94');
			$(this).parent('tr').siblings('tr').find('td').children().find('p').css('color','#8f8f94');
			$(this).parent('tr').siblings('tr').find('td').removeClass('active');
			swiper.slideTo(1,1000,false);
			loadScript("js/pages/binging.js")
		}else if(sign=='request'){
			$(this).addClass('selected');
			$(this).parent('tr').siblings('tr').find('td').removeClass('selected');
			layer.open({
			  type: 2,
			  skin: 'demo-class',
			  area: ['90%', '85%'], //宽高
//			  area: '95%',
			  title:'',
			  shadeClose:false,
			  closeBtn: 2,
			  content: 'materials-request.html',
			  success: function(layero,index){
							  	$(layero).addClass("scroll-wrapper");
//							  	$(layero).find('#sureMaterBut').on('tap',function(){
//									layer.close(index);
//									window.location = 'index.html';
//								})
				},
			  end:function(){
			  }
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
	
	$('#singleTable').on('tap','td',function(){
			$(this).addClass('selected');
			$(this).parent('tr').siblings('tr').find('td').removeClass('selected');
			bindingJson.bindStyle=$(this).find('p').text();
			bindingJson.bindRequire='';
			offerParaJson.binging=bindingJson;
			sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
			console.log(sessionStorage.getItem('offerParaJson'));
			window.location='single-size.html';
	});
	
	$('#requirementlayer').on('tap','#sureButton',function(){
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
