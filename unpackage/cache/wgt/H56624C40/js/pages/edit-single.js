$(document).ready(function(){
	var enquiryOrderId=getUrlParam('enquiryOrderId');
	if(enquiryOrderId!=null){
		$.ajax({
			type:"post",
			url:ajaxUrlPath+"/mobile/enquiryOrder/getById",
			async:true,
			data:{
				enquiryOrderId:enquiryOrderId
			},
			success:function(data){
				if(data.code==0){
					//显示修改的信息
//					console.log(data);
					displayEditData(data.result);
				}else{
					layer.msg('没有获取到询价信息呦~',{offset: '80%'});
				}
			}
		});
	}else{
		layer.msg('没有获取到询价信息呦~',{offset: '80%'});
	}
	
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
		//装订方式和尺寸从当前的页面获取
		bindStyle=$('#allBingingDiv').find('select').val()==null?'':$('#allBingingDiv').find('select').val();
		var allSizeValue=$('#allSizeDiv').find('select').val();
//			console.log("allSizeValue"+allSizeValue);
		if(allSizeValue==null){
			//尺寸从之前的之中获取
			pageSize=$('#allSizeDiv').find('label').attr('data-pageSize');
			pageSizeCh=$('#allSizeDiv').find('label').attr('data-pageSizeCh');
			pageWidth=$('#allSizeDiv').find('label').attr('data-width');
			pageHeight=$('#allSizeDiv').find('label').attr('data-height');
		}else{
			pageSize=allSizeValue;
			pageSizeCh=$('#allSizeDiv').find('select').find('option:selected').text();
			pageWidth=$('#allSizeDiv').find('select').find('option:selected').data('width');
			pageHeight=$('#allSizeDiv').find('select').find('option:selected').data('height');
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
		var sellerId=$(this).attr('data-sellerId');
		var memberId=$(this).attr('data-memberId');
		var productType=$(this).attr('data-productType');
		var memo=$(this).attr('data-memo');
		uploadOffer(sellerId,memberId,productType,bindStyle,pageSize,pageSizeCh,pageWidth,pageHeight,bookNum,allPriceArr,memo);
		
	});
});

function displayEditData(data){
	$('#allPriceDiv').find('strong').text(data.price);
	$('#allBingingDiv').find('span').text(data.bindingMethod);
	$('#allSizeDiv').find('select').val(data.pageSize);
	$('#allSizeDiv').find('label').attr('data-width',data.productWidth).attr('data-height',data.productLength).attr('data-pageSize',data.pageSize).attr('data-pageSizeCh',data.dimensions);
	$('#allSizeDiv').find('label').text('尺寸：'+data.productWidth+'X'+data.productLength);
	$('.requirement').find('.requirement-title').text(data.bindingMethod);
	var innerParams=data.innerParams;
	displayEditData2(0,innerParams[0]);
	$('#bookNum').val(data.num);
	$('#priceBtn').attr('data-sellerId',data.sellerId).attr('data-memberId',data.customerId).attr('data-productType',data.productType).attr('data-memo',data.memo);
	$('#printBtn').attr('data-id',data.id);
}

function displayEditData2(divIndex,data){
	var $contains=$('.requirement').eq(divIndex);
	$contains.removeClass('hide');
	$contains.find('.type-pages-num').val(data.foldPages);
	$contains.find('.pages-num').val(data.pages);
	$contains.find('.color1').val(data.colorNum1);
	$contains.find('.color2').val(data.colorNum2);
	$contains.find('.paper-keZhong').append('<option value="'+data.tonnagePrice+'">'+data.weight+'</option>');
	$contains.find('.paper-type').val(data.paperType);
	if(data.isSelfPaper==1){
		$contains.find('.myself-paper-checkbox').attr('checked',true);
		$contains.find('.myself-paper-checkbox').siblings('img').attr('src','img/radion02.png');
		$contains.find('.myself-paper-div').removeClass('hide');
		$contains.find('.myself-paper-keZhong').val(data.selfPaperName);
		$contains.find('.myself-paper-type').val(data.selfPaperWeight==null?'':data.selfPaperWeight);
	}
	$contains.find('.danShuang-paper').val(data.surfaceTreatmentType);
	$contains.find('.surface-handle-tech').val(data.surfaceTreatmentMethod);
	$contains.find('.special-tech-value').removeClass('hide').html(data.afterTheProcesses);
}