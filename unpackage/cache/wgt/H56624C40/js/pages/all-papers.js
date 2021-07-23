$(document).ready(function(){
	//将数值显示在页面上
	var offerParaJson=JSON.parse(sessionStorage.getItem('offerParaJson'));
//	console.log(offerParaJson);
	
	var coverJson=offerParaJson.cover;
	var $coverRequirement=$('.requirement').eq(0);
	if(coverJson!=null){
		displayData(coverJson[0],$coverRequirement);
	}
	var liningJson=offerParaJson.linling;
	var $liningRequirement=$('.requirement').eq(1);
	if(liningJson!=null){
		displayData(liningJson[0],$liningRequirement);
	}
	var insideJson=offerParaJson.inside;
	if(insideJson!=null){
		$('.container').find('.add-papers-icon').data('index',2+insideJson.length);
		for (var i=0;i<insideJson.length;i++) {
			displayData(insideJson[i],$('.requirement').eq(2+i));
		}
	}
	
	//改变数值或者点击按钮时“再询价”的颜色改变
	$('.container').on('change','input,select',function(){
		$('#priceBtn').removeClass('disabled').attr('disabled',false);
	});
	$('.container').on('tap click','.checkbox-img,.add-icon,.paper-type',function(){
		$('#priceBtn').removeClass('disabled').attr('disabled',false);
	});
	
	//点击去询价按钮
	$('#priceBtn').on('tap click',function(){
		//判断内容是否填写完整
		var falseMark=0;
		$('.requirement:visible').each(function(){
			//判断数据的合理性
			falseMark=judgeEmpty3($(this),falseMark);
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
//			console.log("allSizeValue"+allSizeValue);
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
		
//		allPriceArr[0]:allPrice  总价格
//		allPriceArr[1]:coverPaperCost  封面的材料费
//		allPriceArr[2]:insidePaperCost 内页的材料费
//		allPriceArr[3]:paperCost 总材料费
//		allPriceArr[4]:processCost 印工费
//		allPriceArr[5]:houDaoCost 后道加工处理费
//		allPriceArr[6]:faceCost 表面处理费用
//		allPriceArr[7]:specialCostAll  特殊工艺费用
//		allPriceArr[8]:coverFaceCost  封面的表面处理
//		allPriceArr[9]:insideFaceCost  内页的表面处理
		var allPriceArr='';
		//添加特殊工艺里有特殊要求的不计算
//		console.log("hdhjshj"+bindStyle+'    '+pageSize+'   '+bookNum+'  '+specialRequired);
		if(bindStyle!=''&&pageSize!=''&&specialRequired==0){
			allPrice=getCostAll(bindStyle,pageSize,bookNum,'');
		}
		allPriceArr=allPrice.split('/');
		
		//将数据上传
		var sellerId=offerParaJson.sellerId;
		var memberId=offerParaJson.memberId;
		var productType=offerParaJson.productType;
		var memo=offerParaJson.binging.bindRequire;//装订的特殊要求
		uploadOffer(sellerId,memberId,productType,bindStyle,pageSize,pageSizeCh,pageWidth,pageHeight,bookNum,allPriceArr,memo);
		
	});
	
});

