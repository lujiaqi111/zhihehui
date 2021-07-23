$(document).ready(function(){
	//将数值显示在页面上
	var offerParaJson=JSON.parse(sessionStorage.getItem('offerParaJson'));
	var singleJson=offerParaJson.single;
	var $singleRequirement=$('.requirement').eq(0);
	displayData(singleJson[0],$singleRequirement);
	
	//改变折页和单页数，页数改变
	$('.requirement').on('blur','.type-pages-num',function(){
		var value=parseInt($(this).val())*2;
		$('.requirement').find('.pages-num').val(isNaN(value)?'0':value);
	});
	
	//改变数值或者点击按钮时“再询价”的颜色改变
	$('.container').on('change','input,select',function(){
		$('#priceBtn').removeClass('disabled').attr('disabled',false);
	});
	$('.container').on('tap click','.checkbox-img,.add-icon,.paper-type',function(){
		$('#priceBtn').removeClass('disabled').attr('disabled',false);
	});
	
	$('#priceBtn').on('tap click',function(){
		//判断内容是否填写完整
		var falseMark=0;
		$('.requirement:visible').each(function(){
			//判断数据的合理性
			falseMark=judgeEmpty($(this),falseMark);
			if(falseMark==1){
				return false;
			}
		});
		if(falseMark==1){
			return false;
		}
		
		//计算总费用
		var allPrice='0/0/0/0/0/0/0/0';
		var bindStyle='';
		var pageSize='';
		var pageSizeCh='';
		var pageHeight=0;
		var pageWidth=0;
		var bookNum=$('#bookNum').val();
		if($(this).text()=='询价'){
			//装订方式和尺寸从之前的页面获取
			bindStyle=offerParaJson.binging.bindStyle;
			pageSize=offerParaJson.size.pageSize;
			pageSizeCh=offerParaJson.size.pageSizeCh;
			pageWidth=offerParaJson.size.pageWidth;
			pageHeight=offerParaJson.size.pageHeight;
		}else{
			//装订方式和尺寸从当前的页面获取
			bindStyle=$('#allBingingDiv').find('select').val()==null?'':$('#allBingingDiv').find('select').val();
			var allSizeValue=$('#allSizeDiv').find('select').val();
			if(allSizeValue==null){
				//尺寸从之前的之中获取
				pageSize=offerParaJson.size.pageSize;
				pageSizeCh=offerParaJson.size.pageSizeCh;
				pageWidth=offerParaJson.size.pageWidth;
				pageHeight=offerParaJson.size.pageHeight;
			}else{
				pageSize=allSizeValue;
				pageSizeCh=$('#allSizeDiv').find('select').find('option:selected').text();
				pageWidth=$('#allSizeDiv').find('select').find('option:selected').data('width');
				pageHeight=$('#allSizeDiv').find('select').find('option:selected').data('height');
			}
		}
		//判断特殊工艺里是否有特殊要求
		var specialRequired=0;
		$('.special-tech-value:visible').each(function(){
			var techValue=$(this).text();
			if(techValue.indexOf('特殊要求')>=0){
				specialRequired=1;
			}
		});
		
		//得到单页的品数，特殊工艺费*2；
		var typeNum='';
		if($('.requirement').find('.requirement-title')=='单页'){
			typeNum=$('.requirement').find('.type-pages-num').val()*2;
		}
		//添加特殊工艺里有特殊要求的不计算
		if(pageSize!=''&&specialRequired==0){
			//单页和折页没有装订费
			allPrice=getCostAll('无',pageSize,bookNum,typeNum);
		}
		
		var allPriceArr=allPrice.split('/');
		//将数据上传
		var sellerId=offerParaJson.sellerId;
		var memberId=offerParaJson.memberId;
		var productType=offerParaJson.productType;
		var memo='';//装订的特殊要求单页折页没有
		uploadOffer(sellerId,memberId,productType,bindStyle,pageSize,pageSizeCh,pageWidth,pageHeight,bookNum,allPriceArr,memo);
		
	});
});
