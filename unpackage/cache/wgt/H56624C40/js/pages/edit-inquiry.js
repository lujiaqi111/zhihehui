var indexAry=['A','B','C','D','E','F','G','H','I','J'];
$(document).ready(function(){
	
//	var enquiryOrderId=getUrlParam('enquiryOrderId');
//	if(enquiryOrderId!=null){
//		$.ajax({
//			type:"post",
//			url:ajaxUrlPath+"/mobile/enquiryOrder/getById",
//			async:true,
//			data:{
//				enquiryOrderId:enquiryOrderId
//			},
//			success:function(data){
//				if(data.code==0){
//					//显示修改的信息
////					console.log(data);
//					displayEditData(data.result);
//				}else{
//					layer.msg('没有获取到询价信息呦~',{offset: '80%'});
//				}
//			}
//		});
//	}else{
//		layer.msg('没有获取到询价信息呦~',{offset: '80%'});
//	}
	
	//改变数值或者点击按钮时“再询价”的颜色改变
	$('.container').on('change','input,select',function(){
		$('#priceBtn').removeClass('disabled').attr('disabled',false);
	});
	$('.container').on('tap click','.checkbox-img,.add-icon,.paper-type',function(){
		$('#priceBtn').removeClass('disabled').attr('disabled',false);
	});
	
	//点击去询价按钮
	$('#priceBtn').on('tap click',function(e){
		e.preventDefault();
		e.stopPropagation()
		//判断内容是否填写完整
		var falseMark=0;
		$('.requirement3:visible').each(function(){
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
		var allPriceArr='';
		//添加特殊工艺里有特殊要求的不计算
//		console.log("hdhjshj"+bindStyle+'    '+pageSize+'   '+bookNum+'  '+specialRequired);
		if(bindStyle!=''&&pageSize!=''&&specialRequired==0){
			allPrice=getCostAll(bindStyle,pageSize,bookNum,'');
		}
		allPriceArr=allPrice.split('/');
		
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
	$('#allBingingDiv').find('select').val(data.bindingMethod);
	$('#allSizeDiv').find('select').val(data.pageSize);
	$('#allSizeDiv').find('label').attr('data-width',data.productWidth).attr('data-height',data.productLength).attr('data-pageSize',data.pageSize).attr('data-pageSizeCh',data.dimensions);
	$('#allSizeDiv').find('label').text('尺寸：'+data.productWidth+'X'+data.productLength);
	var innerParams=data.innerParams;
	var insideIndex=2;
	for(var i=0;i<innerParams.length;i++){
		if(innerParams[i].type==1){
			displayEditData2(0,innerParams[i]);
		}
		if(innerParams[i].type==3){
			displayEditData2(1,innerParams[i]);
		}
		if(innerParams[i].type==2){
			displayEditData2(insideIndex,innerParams[i]);
			insideIndex=insideIndex+1;
		}
	}
	$('#bookNum').val(data.num);
//	console.log("xiangku "+data.sellerId);
	$('#priceBtn').attr('data-sellerId',data.sellerId).attr('data-memberId',data.customerId).attr('data-productType',data.productType).attr('data-memo',data.memo);
	$('#printBtn').attr('data-id',data.id);
	
}

function displayEditData2(divIndex,data){
	var $contains=$('.requirement3').eq(divIndex);
	$contains.removeClass('hide');
	var pages=data.pages;
	if(data.isFlag==1){
		$contains.find('#leKou').attr('checked',true);
		$contains.find('#leKou').siblings('img').attr('src','img/radion02.png');
		pages=pages-4;
//		console.log('到底几个pages'+pages);
	}
	if(data.hasSpread==1){
		$contains.find('.if-leKou').attr('checked',true);
		$contains.find('.if-leKou').siblings('img').attr('src','img/radion02.png');
		$contains.find('.laye-pages-div').removeClass('hide');
		$contains.find('.laye-pages-num').val(data.spreadPages);
	}
	$contains.find('.pages-num').val(pages);
	$contains.find('.color1').val(data.colorNum1);
	$contains.find('.color2').val(data.colorNum2);
	
	if(data.isSelfPaper==1){
		$contains.find('.paper-keZhong').append('<option value="'+data.selfPaperPrice+'">'+data.selfPaperWeight+'</option>');
		$contains.find('.paper-type').val(data.selfPaperName);
	}else{
		$contains.find('.paper-keZhong').append('<option value="'+data.tonnagePrice+'">'+data.weight+'</option>');
		$contains.find('.paper-type').val(data.paperType);
	}
	$contains.find('.danShuang-paper').val(data.surfaceTreatmentType);
	$contains.find('.surface-handle-tech').val(data.surfaceTreatmentMethod);
	$contains.find('.special-tech-value').removeClass('hide').html(data.afterTheProcesses);
}

console.log(JSON.parse(sessionStorage.getItem('offerParaJson')));
		$(document).ready(function(){
			var huanchenhtml = '<div class="requirement requirement3 huanchenpage" type="3">'+
					'<p style="padding: 0px 15px;color: #8e8e8e;" class="del">环衬</p>'+
					'<div class="papercol" id="lining" style="border: 0px;">无环衬(自衬)'+
						'<input type="checkbox" name="lining" class="input_check" id="choose" />'+
				        '<label for="choose"></label>'+
					'</div>'+
					'<div class="papercol paper papers-type" status="lining">'+
						'<font>环衬纸张</font><select class="paper-keZhong"><option value=""  selected="selected"></option>'+
							'</select><span>克</span>'+
							'<input type="text" value="" class="paper-type" readonly="readonly"  status="lining" /></div>'+
					'<div class="papercol color">'+
						'<font>印刷色数</font>'+
						'<input type="number" class="color1" value="0" />色'+
						'<b>+</b>'+
						'<input type="number" class="color2" value="0" />色'+
						'<div class="spot-color-info spot-color-div hide">'+
							'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
							'<input type="text" class="primary-color" value="" />'+
						'</div>'+
					'</div>'+
					'<div class="papercol">'+
							'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
							'<input type="text" class="spot-color" value="Pantone" style="width:auto"/>'+
					'</div>'+
					'<div class="papercol pages">'+
						'<font>环衬页数</font>'+
						'<input type="number" class="pages-num" value="8" readonly="readonly"/>P'+
					'</div>'+
					'<div class="papercol surface-handle handle" index="1">'+
						'<font>表面处理</font>'+
						'<input type="text" class="select" value="" style="width: 35%;"/>'+
						'<input type="text" class="val" value="" style="width: 35%;"/>'+
					'</div>'+
					'<div class="papercol special-tech" style="cursor: pointer;">'+
						'<p class="add-special-div"><font>特殊工艺</font>'+
						'<img src="img/add.png" class="add-icon" /></p>'+
						'<div class="special-tech-value">'+
						'</div><span class="selfPaper">'+
						'<span>自带纸</span>'+
						'<input type="checkbox" name="choosepaper" class="input_check" id="choosepaper" />'+
	        			'<label for="choosepaper"></label>'+
					'</span></div>'+
				'</div>';
			$('.requirement3').eq(0).nextAll().remove();
			var offerParaJson = JSON.parse(sessionStorage.getItem('offerParaJson'));
			console.log(JSON.stringify(offerParaJson));

//			$('.requirement3 .danShuang-paper').find('option:selected').val(offerParaJson.binging.bindStyle);
//			$('.requirement3 .danShuang-paper').find('option:selected').text(offerParaJson.binging.bindStyle);
//			$('.requirement3 .danShuang-paper').find('option[text="'+offerParaJson.binging.bindStyle+'"]').attr('selected','selected');
			$('.requirement3 .danShuang-paper').change(function(){
				console.log($('.requirement3 .danShuang-paper').find('option:selected').val())
				if($('.requirement3 .danShuang-paper').find('option:selected').val()=='软面精装' || $('.requirement3 .danShuang-paper').find('option:selected').val()=='硬面精装'){
//					$('.huanchenpage').remove()
					if($('.huanchenpage').length>0){
						$('.huanchenpage').remove();
					}
					$('.coverpages').eq($(".requirement3 .coverpages").length-1).after(huanchenhtml);
					selfpapershow();
					showLevel2();
					showclick();
				}else{
					
					$('.huanchenpage').remove()
				}
			})
			
			for (var i = 0; i < $('.danShuang-paper option').length; i++) {
				
				if($('.danShuang-paper option').eq(i).html() == offerParaJson.binging.bindStyle){
					$('.danShuang-paper option').eq(i).prop('selected',true);
				}else{
					$('.danShuang-paper option').eq(i).removeAttr('selected');
				}
			}
//			$('.requirement3 .size-paper').find('option:selected').val(offerParaJson.sizestr.pageSize)
//			$('.requirement3 .size-paper').find('option:selected').text(offerParaJson.sizestr.pageSizeCh);
//			alert(offerParaJson.sizestr.pageSize);
			for (var i = 0; i < $('.size-paper option').length; i++) {
				
				if($('.size-paper option').eq(i).val() == offerParaJson.sizestr.pageSize){
					$('.size-paper option').eq(i).prop('selected',true);
				}else{
					$('.size-paper option').eq(i).removeAttr('selected');
				}
			}
			$('.requirement3 .pagesizenum').html('尺寸:'+offerParaJson.sizestr.pageWidth+'X'+offerParaJson.sizestr.pageHeight);
			$('.requirement3 .pagesizenum').attr('pagewidth',offerParaJson.sizestr.pageWidth);
			$('.requirement3 .pagesizenum').attr('pageheight',offerParaJson.sizestr.pageHeight);
			$('.requirement3 .pagesizenum').attr('pageSize',offerParaJson.sizestr.pageSize);
			$('.requirement3 .pagesizenum').attr('pageSizeCh',offerParaJson.sizestr.pageSizeCh);
			console.log(offerParaJson.booknum);
			$('.requirement3 .size-paper').change(function(){
				var size = $(".requirement3 .size-paper option:selected").attr('size');
				var pagewidth = $(".requirement3 .size-paper option:selected").attr('pagewidth');
				var pageheight = $(".requirement3 .size-paper option:selected").attr('pageheight');
				var pageSize = $(".requirement3 .size-paper option:selected").val();
				var pageSizeCh = $(".requirement3 .size-paper option:selected").text();
				$(".requirement3 .pagesizenum").html(size);
				$(".requirement3 .pagesizenum").attr('pagewidth',pagewidth);
				$(".requirement3 .pagesizenum").attr('pageheight',pageheight);
				$('.requirement3 .pagesizenum').attr('pageSize',pageSize);
				$('.requirement3 .pagesizenum').attr('pageSizeCh',pageSizeCh);
				offerParaJson.sizestr.pageSizeCh = pageSizeCh;
				offerParaJson.sizestr.pageSize = pageSize;
				offerParaJson.sizestr.pageheight = pageheight;
				offerParaJson.sizestr.pageWidth = pagewidth;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
			})
			$(".binding-handle").off().on('tap',function(){
				console.log('测试测试')
			})
			if(offerParaJson.booknum != undefined || offerParaJson.booknum=='undefined'){
				$('#bookNum').val(offerParaJson.booknum);
			}else{
				$('#bookNum').val('');
			}
			if(offerParaJson.isPlasticSeal == 1){
				$('#sufeng input').attr('checked','checked');
			}else{
				$('#sufeng input').removeAttr('checked');
			}
//			if(offerParaJson.linling[0].isSelfPaper==0 || offerParaJson.linling[0].isSelfPaper==null){
//				$('.coverpage').find('.paper-keZhong').find('option:selected').attr('price',offerParaJson.linling[0].dunWeiJia);
//				$('.coverpage').find('.paper-keZhong').find('option:selected').text(offerParaJson.linling[0].keZhong);
//				$('.coverpage').find('.paper-type').val(offerParaJson.linling[0].type);
//			}else if(offerParaJson.linling[0].isSelfPaper==1){
//				$('.coverpage').find('.paper-keZhong').find('option:selected').attr('selfPaperPrice',offerParaJson.linling[0].selfPaperPrice);
//				$('.coverpage').find('.paper-keZhong').find('option:selected').text(offerParaJson.linling[0].selfPaperWeigth);
//				$('.coverpage').find('.paper-type').val(offerParaJson.linling[0].selfPaperName);
//			}
//			
//			$('.coverpage').find('.color1').val(offerParaJson.linling[0].color1)
//			$('.coverpage').find('.color2').val(offerParaJson.linling[0].color2)
//			$('.coverpage').find('.spot-color').val(offerParaJson.linling[0].spotColor)
//			$('.coverpage').find('.pages-num').val(offerParaJson.linling[0].pagesNum);
//			$('.coverpage').find('.select').val(offerParaJson.linling[0].danShuang)
//			$('.coverpage').find('.val').val(offerParaJson.linling[0].surface)
////			$('.coverpage').find('.special-tech-value').html(offerParaJson.linling[0].special);
//			if(offerParaJson.linling[0].ifLaYe!=undefined || offerParaJson.linling[0].ifLaYe != 'undefined'){
//				$('.coverpage').find('.if-leKou').attr('checked',offerParaJson.linling[0].ifLaYe);
//				if(offerParaJson.linling[0].ifLaYe == 'checked'){
//					$('.coverpage').find('.checkbox-img').attr('src','img/radion02.png');
//				}else{
//					$('.coverpage').find('.checkbox-img').attr('src','img/radion01.png');
//				}
//			}else{
//				$('.coverpage').find('.if-leKou').removeAttr('checked');
//			}
//			
//			$('.coverpage').find('.special-tech-value').html(offerParaJson.linling[0].special)
//			alert(offerParaJson.linling.length+'测试长度');
			if(offerParaJson.linling.length==0){
				var coverhtml = '<div class="requirement requirement3 huanchenpage" type="1">'+
					'<p style="padding: 0px 15px;color: #8e8e8e;" class="del">封面A</p>'+
					'<div class="papercol" id="nocoverPaper" style="border: 0px;">无封面'+
						'<input type="checkbox" name="nocoverPaper" class="input_check" id="choose" checked="checked" />'+
				        '<label for="choose"></label>'+
					'</div>'+
					'<div class="papercol paper papers-type" status="cover">'+
						'<font>封面纸张</font><select class="paper-keZhong"><option value=""  selected="selected"></option>'+
							'</select><span>克</span>'+
							'<input type="text" value="" class="paper-type" readonly="readonly"  status="lining" /></div>'+
					'<div class="papercol color">'+
						'<font>印刷色数</font>'+
						'<input type="number" class="color1" value="0" />色'+
						'<b>+</b>'+
						'<input type="number" class="color2" value="0" />色'+
						'<div class="spot-color-info spot-color-div hide">'+
							'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
							'<input type="text" class="primary-color" value="" />'+
						'</div>'+
					'</div>'+
					'<div class="papercol">'+
							'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
							'<input type="text" class="spot-color" value="Pantone" style="width:auto"/>'+
					'</div>'+
					'<div class="papercol pages">'+
						'<font>封面页数</font>'+
					'<input type="number" class="pages-num" value="4" />P'+
					'<span>勒口/拉页</span>'+
					'<input type="checkbox" class="img-checkbox hide if-leKou"/>'+
						'<img src="img/radion01.png" class="checkbox-img" sign="leKou"/>'+
						'<img src="img/note.png" class="question-icon covernote"/>'+
					'</div>'+
					'<div class="papercol surface-handle handle" index="1">'+
						'<font>表面处理</font>'+
						'<input type="text" class="select" value="" style="width: 35%;"/>'+
						'<input type="text" class="val" value="" style="width: 35%;"/>'+
					'</div>'+
					'<div class="papercol special-tech" style="cursor: pointer;">'+
						'<p class="add-special-div"><font>特殊工艺</font>'+
						'<img src="img/add.png" class="add-icon" /></p>'+
						'<div class="special-tech-value">'+
						'</div><span class="selfPaper">'+
						'<span>自带纸</span>'+
						'<input type="checkbox" name="choosepaper" class="input_check" id="choosepaper" />'+
	        			'<label for="choosepaper"></label>'+
					'</span></div>'+
				'</div>';
//				alert(coverhtml);
			$(".requirement3").eq(0).after(coverhtml);
//			coverhtml.clone().appendTo($('.container'));
			showclick();
			addcoverpaper();
			checklaye();
			clicknocover();
			$('.covernote').off().on('tap',function(){
		layer.open({
							  type: 2,
							  skin: 'demo-class',
							  area: ['80%', '40%'], //宽高
				//			  scrollbar: false,
							  title:"",
							  content: 'cover-laye.html',
							  scrollbar: false,
							  closeBtn: 1,
							  shadeClose:false,
							  success: function(layero,index){
							  	$(layero).addClass("scroll-wrapper");
							  	$(layero).find('.back').on('tap',function(){
							  		layer.close(index);
								})
							  	
							  },
							  end:function(){
							  	$('html').css('height',"auto");
							  	$('html').css('overflow','auto');
							  	$('body').css('height',"auto");
							  	$('body').css('overflow','auto');
							  }
							});
					})
			}else if(offerParaJson.linling.length>0){
				for (var i = 0; i < offerParaJson.linling.length; i++) {
				var coverhtml = '<div class="requirement requirement3 coverpage coverpages" type="1">';
				console.log(i>0);
				
				
					
				if(offerParaJson.linling[i].selfPaperColor==''){
					console.log(offerParaJson.linling[i].dunWeiJia+'吨位价');
					if(i==0){
						coverhtml = coverhtml + '<p style="padding: 0px 15px;color: #8e8e8e;" class="del">封面'+indexAry[i]+'</p>'+
						'<div class="papercol" id="nocoverPaper" style="border: 0px;">无封面'+
						'<input type="checkbox" name="nocoverPaper" class="input_check" id="choose"  />'+
				        '<label for="choose"></label>'+
					'</div>'+
					'<div class="papercol paper papers-type" status="cover" >'+
						'<font>封面纸张</font>';
					}else if(i>0){
						coverhtml = coverhtml +'<p style="padding: 0px 15px;color: #8e8e8e;" class="del">封面'+indexAry[i]+'<img style="margin-left: 5px;height: 1rem;" src="img/del.png" alt="" /></p>'+
					'<div class="papercol paper papers-type" status="cover" >'+
						'<font>封面纸张</font>';
					}
					coverhtml = coverhtml+'<select class="paper-keZhong">'+
							'<option value="" selected="selected" price="'+offerParaJson.linling[i].dunWeiJia+'">'+offerParaJson.linling[i].keZhong+'</option>'+
						'</select>'+
						'<span>克</span>'+
						'<input type="text" value="'+offerParaJson.linling[i].type+'" class="paper-type" readonly="readonly" status="cover"/>'+
					'</div>';
				}else{
					if(offerParaJson.linling[i].selfPaperNormal == 2){
						if(i==0){
						coverhtml = coverhtml + '<p style="padding: 0px 15px;color: #8e8e8e;" class="del">封面'+indexAry[i]+'</p>'+
						'<div class="papercol paper papers-type" status="cover" selfPaperWidth="'+offerParaJson.linling[i].selfPaperWidth+'" selfPaperLength="'+offerParaJson.linling[i].selfPaperLength+'" selfPaperNormal="'+offerParaJson.linling[i].selfPaperNormal+'" selfPaperColor="'+offerParaJson.linling[i].selfPaperColor+'" selfPaperWeight="'+offerParaJson.linling[i].selfPaperWeight+'" selfPaperName="'+offerParaJson.linling[i].selfPaperName+'">'+
							'<font>封面纸张</font>';
						}else if(i>0){
							coverhtml = coverhtml +'<p style="padding: 0px 15px;color: #8e8e8e;" class="del">封面'+indexAry[i]+'<img style="margin-left: 5px;height: 1rem;" src="img/del.png" alt="" /></p>'+
						'<div class="papercol paper papers-type" status="cover" selfPaperWidth="'+offerParaJson.linling[i].selfPaperWidth+'" selfPaperLength="'+offerParaJson.linling[i].selfPaperLength+'" selfPaperNormal="'+offerParaJson.linling[i].selfPaperNormal+'" selfPaperColor="'+offerParaJson.linling[i].selfPaperColor+'" selfPaperWeight="'+offerParaJson.linling[i].selfPaperWeight+'" selfPaperName="'+offerParaJson.linling[i].selfPaperName+'">'+
							'<font>封面纸张</font>';
						}
					}else{
						if(i==0){
						coverhtml = coverhtml + '<p style="padding: 0px 15px;color: #8e8e8e;" class="del">封面'+indexAry[i]+'</p>'+
						'<div class="papercol paper papers-type" status="cover" selfPaperPrice="'+offerParaJson.linling[i].selfPaperPrice+'" selfPaperNormal="'+offerParaJson.linling[i].selfPaperNormal+'" selfPaperColor="'+offerParaJson.linling[i].selfPaperColor+'" selfPaperWeight="'+offerParaJson.linling[i].selfPaperWeight+'" selfPaperName="'+offerParaJson.linling[i].selfPaperName+'">'+
							'<font>封面纸张</font>';
						}else if(i>0){
							coverhtml = coverhtml +'<p style="padding: 0px 15px;color: #8e8e8e;" class="del">封面'+indexAry[i]+'<img style="margin-left: 5px;height: 1rem;" src="img/del.png" alt="" /></p>'+
						'<div class="papercol paper papers-type" status="cover" selfPaperPrice="'+offerParaJson.linling[i].selfPaperPrice+'" selfPaperNormal="'+offerParaJson.linling[i].selfPaperNormal+'" selfPaperColor="'+offerParaJson.linling[i].selfPaperColor+'" selfPaperWeight="'+offerParaJson.linling[i].selfPaperWeight+'" selfPaperName="'+offerParaJson.linling[i].selfPaperName+'">'+
							'<font>封面纸张</font>';
						}
					}
					console.log(333);
					
					coverhtml = coverhtml+'<select class="paper-keZhong">'+
							'<option value="" selected="selected" selfPaperPrice="'+offerParaJson.linling[i].selfPaperPrice+'" selfPaperNormal="'+offerParaJson.linling[i].selfPaperNormal+'" selfPaperColor="'+offerParaJson.linling[i].selfPaperColor+'">'+offerParaJson.linling[i].selfPaperWeight+'</option>'+
						'</select>'+
						'<span>克</span>'+
						'<input type="text" value="'+offerParaJson.linling[i].selfPaperName+'"  class="paper-type" readonly="readonly" status="cover" style="width:25%"/><span class="selfcolor">'+offerParaJson.linling[i].selfPaperColor+'</span>'+
					'</div>';
				}
				coverhtml = coverhtml+'<div class="papercol color">'+
					'<font>印刷色数</font>'+
					'<input type="number" class="color1" id="color1" value="'+offerParaJson.linling[i].color1+'" />色'+
					'<b>+</b>'+
					'<input type="number" class="color2" id="color2" value="'+offerParaJson.linling[i].color2+'" />色'+
					'<div class="spot-color-info spot-color-div hide">'+
						'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
						'<input type="text" class="primary-color" value="Pantone" style="width: auto;"/>'+
					'</div>'+
				'</div>'+
				'<div class="papercol">'+
						'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'	+				
						'<input type="text" class="spot-color"  value="'+offerParaJson.linling[i].spotColor+'" style="width: auto;"/>'+
				'</div>'+
				'<div class="papercol pages">'+
					'<font>封面页数</font>'+
					'<input type="number" class="pages-num" value="'+offerParaJson.linling[i].pagesNum+'" />P'+
					'<span>勒口/拉页</span>';
					if((offerParaJson.linling[i].ifLaYe!=undefined && offerParaJson.linling[i].ifLaYe=="checked") || (offerParaJson.linling[i].ifLaYe!='undefined'&&offerParaJson.linling[i].ifLaYe=="checked")){
						coverhtml = coverhtml+'<input type="checkbox" class="img-checkbox hide if-leKou" checked="checked"/>'+
						'<img src="img/radion02.png" class="checkbox-img" sign="leKou"/>'+
						'<img src="img/note.png" class="question-icon covernote"/>'
					}else{
						coverhtml = coverhtml+'<input type="checkbox" class="img-checkbox hide if-leKou"/>'+
						'<img src="img/radion01.png" class="checkbox-img" sign="leKou"/>'+
						'<img src="img/note.png" class="question-icon covernote"/>'
					}
					
				coverhtml = coverhtml+'</div>'+
				'<div class="papercol surface-handle handle" index="0">'+
					'<font>表面处理</font>'+
					'<input type="text" class="select" value="'+offerParaJson.linling[i].danShuang+'" style="width: 35%;"/>'+
					'<input type="text" class="val" value="'+offerParaJson.linling[i].surface+'" style="width: 35%;" readonly="readonly"/>'+
				'</div>'+
				'<div class="papercol special-tech" style="cursor: pointer;">'+
					'<p class="add-special-div"><font>特殊工艺</font>'+
					'<img src="img/add.png" class="add-icon" /></p>'+
					'<div class="special-tech-value">'+offerParaJson.linling[i].special+'</div>';
					if(offerParaJson.linling[i].isSelfPaper==1){
						coverhtml = coverhtml+'<span class="selfPaper">'+
						'<span>自带纸</span>'+
						'<input type="checkbox" checked="checked" name="choosepaper" class="input_check" id="choosepaper" />'+
	        			'<label for="choosepaper"></label>'+
					'</span>'
					}else{
						coverhtml = coverhtml+'<span class="selfPaper">'+
						'<span>自带纸</span>'+
						'<input type="checkbox" name="choosepaper" class="input_check" id="choosepaper" />'+
	        			'<label for="choosepaper"></label>'+
					'</span>'
					}
				coverhtml = coverhtml+'</div>'+
			'</div>';
			$(".requirement3:last-child").after(coverhtml);
//			coverhtml.clone().appendTo($('.container'));
			showclick();
			addcoverpaper();
			checklaye();
			clicknocover();
			$('.covernote').off().on('tap',function(){
		layer.open({
							  type: 2,
							  skin: 'demo-class',
							  area: ['80%', '40%'], //宽高
				//			  scrollbar: false,
							  title:"",
							  content: 'cover-laye.html',
							  scrollbar: false,
							  closeBtn: 1,
							  shadeClose:false,
							  success: function(layero,index){
							  	$(layero).addClass("scroll-wrapper");
							  	$(layero).find('.back').on('tap',function(){
							  		layer.close(index);
								})
							  	
							  },
							  end:function(){
							  	$('html').css('height',"auto");
							  	$('html').css('overflow','auto');
							  	$('body').css('height',"auto");
							  	$('body').css('overflow','auto');
							  }
							});
					})
			}
			}
			console.log($('.coverpages:last-child')+'测试')
				$('.coverpages:last-child').addClass('lastcover-requirement');
					var addcoverhtml = '<div class="add add-coverpapers-icon" index="" sign="cover" style="cursor: pointer;">'+
							'<img src="img/badd.png" style="display: inline-block;margin-left: 45%;margin-top: 20px;width: 33%;"/>'+
							'<p style="text-align: center;margin-left: 20%;font-size:12px;">更多封面</p>'+
						'</div>'
				$('.coverpages').eq($('.coverpages').length-1).append(addcoverhtml)
				if(offerParaJson.huanchen!=undefined){
					var html = '';
					console.log(offerParaJson.huanchen.length)
					if(offerParaJson.huanchen.length==0){
						console.log(offerParaJson.binging.bindStyle!='硬面精装')
						if(offerParaJson.binging.bindStyle=='硬面精装' || offerParaJson.binging.bindStyle=='软面精装'){
							console.log(333);
							html = '<div class="requirement requirement3 huanchenpage" type="3">'+
							'<p style="padding: 0px 15px;color: #8e8e8e;" class="del">环衬</p>'+
							'<div class="papercol" id="lining" style="border: 0px;">无环衬(自衬)';
								if(offerParaJson.ordername.liningPaperMethod==2){
									html = html +'<input type="checkbox" name="lining" class="input_check" id="choose" checked="checked"/>'+
						        '<label for="choose"></label>';
								}else{
									html = html +'<input type="checkbox" name="lining" class="input_check" id="choose"/>'+
						        '<label for="choose"></label>';
								}
								
							html = html +'</div>'+
							'<div class="papercol paper papers-type" status="lining">'+
								'<font>环衬纸张</font><select class="paper-keZhong"><option value=""  selected="selected"></option>'+
									'</select><span>克</span>'+
									'<input type="text" value="" class="paper-type" readonly="readonly"  status="lining" /></div>'+
							'<div class="papercol color">'+
								'<font>印刷色数</font>'+
								'<input type="number" class="color1" value="0" />色'+
								'<b>+</b>'+
								'<input type="number" class="color2" value="0" />色'+
								'<div class="spot-color-info spot-color-div hide">'+
									'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
									'<input type="text" class="primary-color" value="Pantone" />'+
								'</div>'+
							'</div>'+
							'<div class="papercol">'+
									'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
									'<input type="text" class="spot-color" value="Pantone" style="width:auto"/>'+
							'</div>'+
							'<div class="papercol pages">'+
								'<font>环衬页数</font>'+
								'<input type="number" class="pages-num" value="8" readonly="readonly"/>P'+
							'</div>'+
							'<div class="papercol surface-handle handle" index="1">'+
								'<font>表面处理</font>'+
								'<input type="text" class="select" value="" style="width: 35%;"/>'+
								'<input type="text" class="val" value="" style="width: 35%;"/>'+
							'</div>'+
							'<div class="papercol special-tech" style="cursor: pointer;">'+
								'<p class="add-special-div"><font>特殊工艺</font>'+
								'<img src="img/add.png" class="add-icon" /></p>'+
								'<div class="special-tech-value">'+
								'</div><span class="selfPaper">'+
								'<span>自带纸</span>'+
								'<input type="checkbox" name="choosepaper" class="input_check" id="choosepaper" />'+
			        			'<label for="choosepaper"></label>'+
							'</span></div>'+
						'</div>';
						}else{
							console.log(555);
							html='';
						}
						
				
					}else{
						
					
					for (var i = 0; i < offerParaJson.huanchen.length; i++) {
				
				
					html = '<div class="requirement requirement3 huanchenpage" type="3">'+
					'<p style="padding: 0px 15px;color: #8e8e8e;" class="del">环衬</p>'+
					'<div class="papercol" id="lining" style="border: 0px;">无环衬(自衬)';
						if(offerParaJson.ordername.liningPaperMethod==2){
									html = html +'<input type="checkbox" name="lining" class="input_check" id="choose" checked="checked"/>'+
						        '<label for="choose"></label>';
								}else{
									html = html +'<input type="checkbox" name="lining" class="input_check" id="choose"/>'+
						        '<label for="choose"></label>';
								}
						
						if(offerParaJson.huanchen[i].selfPaperPrice=='0'){
							html = html+'</div>'+
					'<div class="papercol paper papers-type" status="lining" >'+
						'<font>环衬纸张</font>'+
							'<select class="paper-keZhong"><option value="" price="'+(offerParaJson.huanchen[i].dunWeiJia==undefined?'':offerParaJson.huanchen[i].dunWeiJia)+'" selected="selected">'+(offerParaJson.huanchen[i].keZhong==undefined?'':offerParaJson.huanchen[i].keZhong)+'</option>'+
							'</select><span>克</span>'+
							'<input type="text" value="'+(offerParaJson.huanchen[i].type==undefined?'':offerParaJson.huanchen[i].type)+'" class="paper-type" readonly="readonly"  status="lining" />';
						}else{
							html = html+'</div>'+
					'<div class="papercol paper papers-type" status="lining" selfPaperPrice="'+offerParaJson.huanchen[i].selfPaperPrice+'" selfPaperNormal="'+offerParaJson.huanchen[i].selfPaperNormal+'" selfPaperColor="'+offerParaJson.huanchen[i].selfPaperColor+'" selfPaperWeight="'+offerParaJson.huanchen[i].selfPaperWeight+'" selfPaperName="'+offerParaJson.huanchen[i].selfPaperName+'">'+
						'<font>环衬纸张</font>'+
							'<select class="paper-keZhong"><option value="" selfPaperPrice="'+offerParaJson.huanchen[i].selfPaperPrice+'" selfPaperNormal="'+offerParaJson.huanchen[i].selfPaperNormal+'" selfPaperColor="'+offerParaJson.huanchen[i].selfPaperColor+'" selected="selected">'+offerParaJson.huanchen[i].selfPaperWeight+'</option>'+
							'</select><span>克</span>'+
							'<input type="text" value="'+offerParaJson.huanchen[i].selfPaperName+'" class="paper-type" readonly="readonly"  status="lining" style="width:25%"/><span class="selfcolor">'+offerParaJson.huanchen[i].selfPaperColor+'</span>';
						}
							
				html = html+'</div>'+
					'<div class="papercol color">'+
						'<font>印刷色数</font>'+
						'<input type="number" class="color1" value="'+offerParaJson.huanchen[i].color1+'" />色'+
						'<b>+</b>'+
						'<input type="number" class="color2" value="'+offerParaJson.huanchen[i].color2+'" />色'+
						'<div class="spot-color-info spot-color-div hide">'+
							'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
							'<input type="text" class="primary-color" value="Pantone" />'+
						'</div>'+
					'</div>'+
					'<div class="papercol">'+
							'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
							'<input type="text" class="spot-color" value="'+offerParaJson.huanchen[i].spotColor+'" style="width:auto"/>'+
					'</div>'+
					'<div class="papercol pages">'+
						'<font>环衬页数</font>'+
						'<input type="number" class="pages-num" value="'+offerParaJson.huanchen[i].pagesNum+'" readonly="readonly"/>P'+
					'</div>'+
					'<div class="papercol surface-handle handle" index="'+(i+1)+'">'+
						'<font>表面处理</font>'+
						'<input type="text" class="select" value="'+offerParaJson.huanchen[i].danShuang+'" style="width: 35%;"/>'+
						'<input type="text" class="val" value="'+offerParaJson.huanchen[i].surface+'" style="width: 35%;"/>'+
					'</div>'+
					'<div class="papercol special-tech " style="cursor: pointer;">'+
						'<p class="add-special-div"><font>特殊工艺</font>'+
						'<img src="img/add.png" class="add-icon" /></p>'+
						'<div class="special-tech-value">'+offerParaJson.huanchen[i].special+
						'</div>'
						if(offerParaJson.huanchen[i].isSelfPaper==1){
						html = html+'<span class="selfPaper">'+
						'<span>自带纸</span>'+
						'<input type="checkbox" checked="checked" name="choosepaper" class="input_check" id="choosepaper" />'+
	        			'<label for="choosepaper"></label>'+
					'</span>'
					}else{
						html = html + '<span class="selfPaper">'+
						'<span>自带纸</span>'+
						'<input type="checkbox" name="choosepaper" class="input_check" id="choosepaper" />'+
	        			'<label for="choosepaper"></label>'+
					'</span>';
					}
					html = html+'</div>'+
				'</div>';
				huanchenhtml = html;
				}
			}
				
				console.log(html);
				$(".requirement3:last-child").after(html);
//				html.clone().appendTo($('.container'));
				showLevel2();
				selfpapershow();
//				chooseleKou();
//				showclick();
				if(i==0){
					$('.del img').remove();
				}
				
				
			}
				
			if(offerParaJson.inside.length==0){
				var html = '<div class="requirement requirement3 insidepage" type="2">'+
				'<p style="padding: 0px 15px;color: #8e8e8e;" class="del">内页A</p>'+
				'<div class="papercol" id="insidePapers" style="border: 0px;">无内页'+
						'<input type="checkbox" name="insidePapers" class="input_check" id="choose" checked="checked" />'+
				        '<label for="choose"></label>'+
					'</div>'+
								'<div class="papercol paper papers-type" status="lining">'+
									'<font>内页纸张</font>'+
					'<select class="paper-keZhong"><option value="" selected="selected"></option>'+
							'</select><span>克</span>'+
							'<input type="text" value="" class="paper-type" readonly="readonly"  status="lining" />'+	
							'</div>'+
					'<div class="papercol color">'+
						'<font>印刷色数</font>'+
						'<input type="number" class="color1" value="4" />色'+
						'<b>+</b>'+
						'<input type="number" class="color2" value="4" />色'+
						'<div class="spot-color-info spot-color-div hide">'+
							'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
							'<input type="text" class="primary-color" value="" />'+
						'</div>'+
					'</div>'+
					'<div class="papercol">'+
							'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
							'<input type="text" class="spot-color" value="" style="width:auto"/>'+
					'</div>'+
					'<div class="papercol pages">'+
						'<font>内页页数</font>'+
						'<input type="number" class="pages-num" value="4" />P'+
						'<font style="margin-left: 6px;">拉页</font>'+
						'<input type="number" class="layePages-num" value="" style="width: 12%;"/>处'+
						'<img src="img/note.png" class="question-icon liningnote"/>'+
					'</div>'+
					'<div class="papercol surface-handle handle" index="1">'+
						'<font>表面处理</font>'+
						'<input type="text" class="select" value="" style="width: 35%;"/>'+
						'<input type="text" class="val" value="" style="width: 35%;"/>'+
					'</div>'+
					'<div class="papercol special-tech" style="cursor: pointer;">'+
						'<p class="add-special-div"><font>特殊工艺</font>'+
						'<img src="img/add.png" class="add-icon" /></p>'+
						'<div class="special-tech-value">'+
						'</div>'+'<span class="selfPaper">'+
						'<span>自带纸</span>'+
						'<input type="checkbox"  name="choosepaper" class="input_check" id="choosepaper" />'+
	        			'<label for="choosepaper"></label>'+
					'</span>'+'</div>'+
				'</div>';
				$(".requirement3:last-child").after(html);
				showLevel2();
				showclick();
				clicknoinside();
//				chooseleKou();
				
				$('.liningnote').off().on('tap',function(){
					console.log('测试');
					layer.open({
							type: 2,
							skin: 'demo-class',
							area: ['80%', '40%'], //宽高
				//			  scrollbar: false,
							title:"",
							content: 'lining-laye.html',
							scrollbar: false,
							closeBtn: 1,
							shadeClose:false,
							success: function(layero,index){
							  	$(layero).addClass("scroll-wrapper");
							  	$(layero).find('.back').on('tap',function(){
							  		layer.close(index);
							})  	
							},
							  end:function(){
							  	$('html').css('height',"auto");
							  	$('html').css('overflow','auto');
							  	$('body').css('height',"auto");
							  	$('body').css('overflow','auto');
							  }
							});
							})
			}else{
			for (var i = 0; i < offerParaJson.inside.length; i++) {
				console.log(111);
				var leKou = "img/radion01.png";
				if(offerParaJson.inside[i].ifLeKou=="checked"){
					leKou = "img/radion02.png";
				}else{
					leKou = "img/radion01.png";
				}
				
				var html = '<div class="requirement requirement3 insidepage" type="2">'
				
					
						
						if(offerParaJson.inside[i].selfPaperColor==''){
							if(i==0){
								html = html + '<p style="padding: 0px 15px;color: #8e8e8e;" class="del">内页'+indexAry[i]+'</p>'+
								'<div class="papercol" id="insidePapers" style="border: 0px;">无内页'+
						'<input type="checkbox" name="insidePapers" class="input_check" id="choose"  />'+
				        '<label for="choose"></label>'+
					'</div>'+
								'<div class="papercol paper papers-type" status="lining">'+
									'<font>内页纸张</font>';
							}else if(i>0){
								html = html + '<p style="padding: 0px 15px;color: #8e8e8e;" class="del">内页'+indexAry[i]+'<img style="margin-left: 5px;height: 1rem;" src="img/del.png" alt="" /></p>'+
								'<div class="papercol paper papers-type" status="lining" >'+
									'<font>内页纸张</font>';
							}
							html = html+'<select class="paper-keZhong"><option value="" price="'+offerParaJson.inside[i].dunWeiJia+'" selected="selected">'+offerParaJson.inside[i].keZhong+'</option>'+
							'</select><span>克</span>'+
							'<input type="text" value="'+offerParaJson.inside[i].type+'" class="paper-type" readonly="readonly"  status="lining" />';
						}else{
							if(offerParaJson.inside[i].selfPaperNormal == 2){
								if(i==0){
									html = html + '<p style="padding: 0px 15px;color: #8e8e8e;" class="del">内页'+indexAry[i]+'</p>'+
									'<div class="papercol" id="insidePapers" style="border: 0px;">无内页'+
										'<input type="checkbox" name="insidePapers" class="input_check" id="choose"  />'+
								        '<label for="choose"></label>'+
									'</div>'+
									'<div class="papercol paper papers-type" status="lining" selfPaperWidth="'+offerParaJson.inside[i].selfPaperWidth+'" selfPaperLength="'+offerParaJson.inside[i].selfPaperLength+'" selfPaperNormal="'+offerParaJson.inside[i].selfPaperNormal+'" selfPaperColor="'+offerParaJson.inside[i].selfPaperColor+'" selfPaperWeight="'+offerParaJson.inside[i].selfPaperWeight+'" selfPaperName="'+offerParaJson.inside[i].selfPaperName+'">'+
										'<font>内页纸张</font>';
								}else if(i>0){
									html = html + '<p style="padding: 0px 15px;color: #8e8e8e;" class="del">内页'+indexAry[i]+'<img style="margin-left: 5px;height: 1rem;" src="img/del.png" alt="" /></p>'+
									'<div class="papercol paper papers-type" status="lining" selfPaperWidth="'+offerParaJson.inside[i].selfPaperWidth+'" selfPaperLength="'+offerParaJson.inside[i].selfPaperLength+'" selfPaperNormal="'+offerParaJson.inside[i].selfPaperNormal+'" selfPaperColor="'+offerParaJson.inside[i].selfPaperColor+'" selfPaperWeight="'+offerParaJson.inside[i].selfPaperWeight+'" selfPaperName="'+offerParaJson.inside[i].selfPaperName+'">'+
										'<font>内页纸张</font>';
								}
							}else{
								if(i==0){
									html = html + '<p style="padding: 0px 15px;color: #8e8e8e;" class="del">内页'+indexAry[i]+'</p>'+
									'<div class="papercol" id="insidePapers" style="border: 0px;">无内页'+
										'<input type="checkbox" name="insidePapers" class="input_check" id="choose"  />'+
								        '<label for="choose"></label>'+
									'</div>'+
									'<div class="papercol paper papers-type" status="lining" selfPaperPrice="'+offerParaJson.inside[i].selfPaperPrice+'" selfPaperNormal="'+offerParaJson.inside[i].selfPaperNormal+'" selfPaperColor="'+offerParaJson.inside[i].selfPaperColor+'" selfPaperWeight="'+offerParaJson.inside[i].selfPaperWeight+'" selfPaperName="'+offerParaJson.inside[i].selfPaperName+'">'+
										'<font>内页纸张</font>';
								}else if(i>0){
									html = html + '<p style="padding: 0px 15px;color: #8e8e8e;" class="del">内页'+indexAry[i]+'<img style="margin-left: 5px;height: 1rem;" src="img/del.png" alt="" /></p>'+
									'<div class="papercol paper papers-type" status="lining" selfPaperPrice="'+offerParaJson.inside[i].selfPaperPrice+'" selfPaperNormal="'+offerParaJson.inside[i].selfPaperNormal+'" selfPaperColor="'+offerParaJson.inside[i].selfPaperColor+'" selfPaperWeight="'+offerParaJson.inside[i].selfPaperWeight+'" selfPaperName="'+offerParaJson.inside[i].selfPaperName+'">'+
										'<font>内页纸张</font>';
								}
							}
							
							html = html+'<select class="paper-keZhong"><option value="" selfPaperNormal="'+offerParaJson.inside[i].selfPaperNormal+'" selfPaperColor="'+offerParaJson.inside[i].selfPaperColor+'" selfPaperPrice="'+offerParaJson.inside[i].selfPaperPrice+'" selected="selected">'+offerParaJson.inside[i].selfPaperWeight+'</option>'+
							'</select><span>克</span>'+
							'<input type="text" value="'+offerParaJson.inside[i].selfPaperName+'" class="paper-type" readonly="readonly"  status="lining" style="width:25%" /><span class="selfcolor">'+offerParaJson.inside[i].selfPaperColor+'</span>';
						}
							
				html = html+'</div>'+
					'<div class="papercol color">'+
						'<font>印刷色数</font>'+
						'<input type="number" class="color1" value="'+offerParaJson.inside[i].color1+'" />色'+
						'<b>+</b>'+
						'<input type="number" class="color2" value="'+offerParaJson.inside[i].color2+'" />色'+
						'<div class="spot-color-info spot-color-div hide">'+
							'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
							'<input type="text" class="primary-color" value="" />'+
						'</div>'+
					'</div>'+
					'<div class="papercol">'+
							'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
							'<input type="text" class="spot-color" value="'+offerParaJson.inside[i].spotColor+'" style="width:auto"/>'+
					'</div>'+
					'<div class="papercol pages">'+
						'<font>内页页数</font>'+
						'<input type="number" class="pages-num" value="'+offerParaJson.inside[i].pagesNum+'" />P'+
						'<font style="margin-left: 6px;">拉页</font>'+
						'<input type="number" class="layePages-num" value="'+offerParaJson.inside[i].spreadPages+'" style="width: 12%;"/>处'+
						'<img src="img/note.png" class="question-icon liningnote"/>'+
					'</div>'+
					'<div class="papercol surface-handle handle" index="'+(i+1)+'">'+
						'<font>表面处理</font>'+
						'<input type="text" class="select" value="'+offerParaJson.inside[i].danShuang+'" style="width: 35%;"/>'+
						'<input type="text" class="val" value="'+offerParaJson.inside[i].surface+'" style="width: 35%;"/>'+
					'</div>'+
					'<div class="papercol special-tech" style="cursor: pointer;">'+
						'<p class="add-special-div"><font>特殊工艺</font>'+
						'<img src="img/add.png" class="add-icon" /></p>'+
						'<div class="special-tech-value">'+offerParaJson.inside[i].special+
						'</div>';
						if(offerParaJson.inside[i].isSelfPaper==1){
						html = html+'<span class="selfPaper">'+
						'<span>自带纸</span>'+
						'<input type="checkbox" checked="checked" name="choosepaper" class="input_check" id="choosepaper" />'+
	        			'<label for="choosepaper"></label>'+
					'</span>';
					}else{
						html = html + '<span class="selfPaper">'+
						'<span>自带纸</span>'+
						'<input type="checkbox" name="choosepaper" class="input_check" id="choosepaper" />'+
	        			'<label for="choosepaper"></label>'+
					'</span>';
					}
					html = html +'</div>'+
				'</div>';
				$(".requirement3:last-child").after(html);
//				html.clone().appendTo($('.container'));
				showLevel2();
				showclick();
				clicknoinside();
//				chooseleKou();
				
				$('.liningnote').off().on('tap',function(){
					console.log('测试');
					layer.open({
							type: 2,
							skin: 'demo-class',
							area: ['80%', '40%'], //宽高
				//			  scrollbar: false,
							title:"",
							content: 'lining-laye.html',
							scrollbar: false,
							closeBtn: 1,
							shadeClose:false,
							success: function(layero,index){
							  	$(layero).addClass("scroll-wrapper");
							  	$(layero).find('.back').on('tap',function(){
							  		layer.close(index);
							})  	
							},
							  end:function(){
							  	$('html').css('height',"auto");
							  	$('html').css('overflow','auto');
							  	$('body').css('height',"auto");
							  	$('body').css('overflow','auto');
							  }
							});
							})
				
				
			}
			}
			console.log(222);
			
				
				$('.requirement3:last-child').addClass('last-requirement');
				var addhtml = '<div class="add add-papers-icon" index="" sign="inside" style="cursor: pointer;">'+
						'<img src="img/badd.png" style="display: inline-block;margin-left: 45%;margin-top: 20px;width: 33%;"/>'+
						'<p style="text-align: center;margin-left: 20%;font-size:12px;">更多内页</p>'+
					'</div>'
				$('.last-requirement .papercol:last-child').after(addhtml)
				$('.del').on('tap',function(){
					console.log(333);
					console.log($(this).parent().hasClass('coverpages'))
					
//							console.log($('this').parent().siblings().find('.add-papers-icon').attr('index'));
							$('this').parent().siblings('.add-papers-icon').attr('index',Number(index)-1);
							$(this).parents('.requirement3').remove();
							
				if($(this).parent().hasClass('coverpages')){
						$('.requirement3.coverpages').eq($('.requirement3.coverpages').length-1).addClass('last-requirement');
							var appendhtml = '<div class="add add-coverpapers-icon" index="'+(Number(index)+1)+'" sign="inside">'+
					'<img src="img/badd.png" style="display: inline-block;margin-left: 45%;margin-top: 20px;width: 33%;"/>'+
					'<p style="text-align: center;margin-left: 20%;font-size:12px;">更多封面</p>'+
				'</div>';
				$('.requirement3.coverpages').eq($('.requirement3.coverpages').length-1).append(appendhtml);
				}else if($(this).parent().hasClass('insidepage')){
					$('.requirement3.insidepage').eq($('.requirement3.insidepage').length-1).addClass('last-requirement');
							var appendhtml = '<div class="add add-papers-icon" index="'+(Number(index)+1)+'" sign="inside">'+
					'<img src="img/badd.png" style="display: inline-block;margin-left: 45%;margin-top: 20px;width: 33%;"/>'+
					'<p style="text-align: center;margin-left: 20%;font-size:12px;">更多内页</p>'+
				'</div>';
				$('.requirement3.insidepage').eq($('.requirement3.insidepage').length-1).append(appendhtml)
				}
						showclick();
						showLevel2();
						addpaper();
						addcoverpaper();
				})
				
			
			
		})
//		$('#priceBtn').on('tap click',function(){
//			window.location = 'edit-single.html'
//		})
		//点击添加内页的按钮
		addpaper();
		function addpaper(){
			var index = 0;
		var indexnum = 0;
		$('.requirement3 .add-papers-icon').off().on('tap',function(e){
			e.preventDefault();
			e.stopPropagation()
			console.log(111);
//			var sign=$(this).attr('sign');
//			console.log(sign);
//			var standardNum=0;
			index=$(this).attr('index');
			var kezhong = $('.requirement3').eq(1).find('.paper-keZhong option:selected').html();
			
			var price = $('.requirement3').eq(1).find('.paper-keZhong option:selected').attr('price');
			console.log(kezhong+','+price);
			var paper_type = $('.requirement3').eq(1).find('.paper-type').val();
//			console.log(index)
//			if(index>standardNum){
//				layer.msg("最多只能添加3种内页呦！",{offset: '80%'});
//			}else{
//				$('.container').find('.requirement').eq(index).css('display','block');
				$('.requirement3.insidepage').eq($('.requirement3.insidepage').length-1).find('p.del img').remove();
				var html = '<div class="requirement3 requirement last-requirement insidepage" type="2">'+
				'<p style="padding: 0px 15px;color: #8e8e8e;" class="del">内页'+indexAry[$('.insidepage').length]+'<img style="margin-left: 5px;height: 1rem;" src="img/del.png" alt="" /></p>'+
				'<div class="papercol paper papers-type" status="lining">'+
					'<font>内页纸张</font>'+
					'<select class="paper-keZhong">'+
						'<option value="'+price+'" price="'+price+'">'+kezhong+'</option>'+
					'</select>'+
					'<span>克</span>'+
					'<input type="text" value="'+paper_type+'" class="paper-type" readonly="readonly" status="lining"/>'+
				'</div>'+
				'<div class="papercol color">'+
					'<font>印刷色数</font>'+
					'<input type="number" class="color1" value="4" />色'+
					'<b>+</b>'+
					'<input type="number" class="color2" value="4" />色'+
					'<div class="spot-color-info spot-color-div hide">'+
						'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
						'<input type="text" class="primary-color" value="" />'+
					'</div>'+
				'</div>'+
				'<div class="papercol">'+
						'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
						'<input type="text" class="spot-color" value="Pantone" style="width:auto"/>'+
				'</div>'+
				'<div class="papercol pages">'+
					'<font>内页页数</font>'+
					'<input type="number" class="pages-num" value="4" />P'+
					'<font style="margin-left: 6px;">拉页</font>'+
					'<input type="number" class="layePages-num" value="" style="width: 12%;"/>P'+
					'<img src="img/note.png" class="question-icon"/>'+
				'</div>'+
				'<div class="papercol surface-handle handle" index="'+(Number(index)+1)+'">'+
					'<font>表面处理</font>'+
					'<input type="text" class="select" value="" style="width: 35%;"/>'+
					'<input type="text" class="val" value="" style="width: 35%;"/>'+
				'</div>'+
				'<div class="papercol special-tech">'+
					'<p class="add-special-div"><font>特殊工艺</font>'+
					'<img src="img/add.png" class="add-icon" /></p>'+
					'<div class="special-tech-value"></div>'+
				'</div>'+
				'<div class="add add-papers-icon" index="'+(Number(index)+1)+'" sign="inside">'+
					'<img src="img/add.png" style="display: inline-block;margin-left: 45%;margin-top: 20px;width: 33%;"/>'+
					'<p style="text-align: center;margin-left: 20%;font-size:12px;">更多内页</p>'+
				'</div>'+
			'</div>'
				$(".requirement3:last-child").after(html);
				showLevel2();
				addpaper();
				addcoverpaper();
				$('.requirement3').on('tap','.checkbox-img',function(e){
					e.preventDefault();
					e.stopPropagation()
					console.log('测试'+$(this).siblings('.img-checkbox').attr('checked'));
					if($(this).siblings('.img-checkbox').attr('checked')==undefined || $(this).siblings('.img-checkbox').attr('checked')=='undefined'){
						$(this).siblings('.img-checkbox').attr('checked',true);
						$(this).attr('src','img/radion02.png');
						if($(this).attr('sign')=='leKou'){
							var pagesNum=parseInt($(this).parents('.requirement3').find('.pages-num').val())+4;
							$(this).parents('.requirement3').find('.pages-num').val(pagesNum);
						}
					}else{
						$(this).siblings('.img-checkbox').attr('checked',false);
						$(this).attr('src','img/radion01.png');
						//点击自带纸按钮  取消自带纸张
						if($(this).attr('sign')=='leKou'){
							var pagesNum=parseInt($(this).parents('.requirement3').find('.pages-num').val())-4;
							$(this).parents('.requirement3').find('.pages-num').val(pagesNum<0?0:pagesNum);
						}
					}
				});	
				$(this).attr('index',Number(index)+1);
				$('.requirement3:last-child').siblings().removeClass('last-requirement')
				$('.requirement3:last-child').siblings().find(".add-papers-icon").remove();
				$('.del').off().on('tap',function(){
					console.log(333);
//							console.log($('this').parent().siblings().find('.add-papers-icon').attr('index'));
							$('this').parent().siblings('.add-papers-icon').attr('index',Number(index)-1);
							$(this).parents('.requirement3').remove();
							$('.requirement3:last-child').addClass('last-requirement');
							var appendhtml = '<div class="add add-papers-icon" index="'+(Number(index)+1)+'" sign="inside">'+
					'<img src="img/badd.png" style="display: inline-block;margin-left: 45%;margin-top: 20px;width: 33%;"/>'+
					'<p style="text-align: center;margin-left: 20%;font-size:12px;">更多内页</p>'+
				'</div>'
							$('.requirement3:last-child').append(appendhtml);
							if($('.requirement3.insidepage').length==1){
								
							}else{
								$('.requirement3.insidepage').eq($('.requirement3.insidepage').length-1).find('.del').append('<img style="margin-left: 5px;height: 1rem;" src="img/del.png" alt="" />');
							}
							$('.requirement3').on('tap','.checkbox-img',function(e){
							e.preventDefault();
							e.stopPropagation()
							console.log('测试'+$(this).siblings('.img-checkbox').attr('checked'));
							if($(this).siblings('.img-checkbox').attr('checked')==undefined || $(this).siblings('.img-checkbox').attr('checked')=='undefined'){
								$(this).siblings('.img-checkbox').attr('checked',true);
								$(this).attr('src','img/radion02.png');
								if($(this).attr('sign')=='leKou'){
									var pagesNum=parseInt($(this).parents('.requirement3').find('.pages-num').val())+4;
									$(this).parents('.requirement3').find('.pages-num').val(pagesNum);
								}
							}else{
								$(this).siblings('.img-checkbox').attr('checked',false);
								$(this).attr('src','img/radion01.png');
								//点击自带纸按钮  取消自带纸张
								if($(this).attr('sign')=='leKou'){
									var pagesNum=parseInt($(this).parents('.requirement3').find('.pages-num').val())-4;
									$(this).parents('.requirement3').find('.pages-num').val(pagesNum<0?0:pagesNum);
								}
							}
						});	
				})
				$('.requirement3 .papers-type').off().on('tap',function(e){
					e.preventDefault();
					e.stopPropagation()
					var status = $(this).attr('status');
					$('html').css('height',"100%");
					$('html').css('overflow','hidden');
					$('body').css('height',"100%");
					$('body').css('overflow','hidden');
					var selfPaperPrice = $(this).attr('selfPaperPrice');
					var selfPaperColor = $(this).attr('selfPaperColor');
					var selfPaperName = $(this).attr('selfPaperName');
					var selfPaperWeight = $(this).attr('selfPaperWeight');
					var selfPaperNormal = $(this).attr('selfPaperNormal');
					var divIndex=$('.requirement3').index($(this).parents('.requirement3'));
					console.log(divIndex);
		//			console.log("divIndex"+divIndex);
					layer.open({
					  type: 2,
					  skin: 'demo-class',
					  area: ['95%','90%'], //宽高
						title:"",
						closeBtn:2,
						shadeClose:false,
						fix:true,
					  content: 'select-papers.html?sellerId='+getUrlParam('sellerId')+'&status='+status,
					  success: function(layero, index){
					  	$(layero).addClass("scroll-wrapper");
					    var body = layer.getChildFrame('body', index);
					    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
						body.find('#sureButton').attr('sign',divIndex);
						body.find('#sureButton2').attr('sign',divIndex);
					  },
					  end:function(){
					  	$('html').css('height',"auto");
					  	$('html').css('overflow','auto');
					  	$('body').css('height',"auto");
					  	$('body').css('overflow','auto');
					  }
					});
				});

		
//			}
		});
		}
		
		addcoverpaper()
		function addcoverpaper(){
			
		
		$('.requirement3 .add-coverpapers-icon').off().on('tap',function(e){
			console.log(111);
			e.preventDefault();
			e.stopPropagation()
//			console.log(111);
//			var sign=$(this).attr('sign');
//			console.log(sign);
//			var standardNum=0;
			index=$(this).attr('index');
			var kezhong = $('.requirement3').eq(1).find('.paper-keZhong option:selected').html();
			
			var price = $('.requirement3').eq(1).find('.paper-keZhong option:selected').attr('price');
			console.log(kezhong+','+price);
			var paper_type = $('.requirement3').eq(1).find('.paper-type').val();
//			console.log(index)
//			if(index>standardNum){
//				layer.msg("最多只能添加3种内页呦！",{offset: '80%'});
//			}else{
				$('.coverpage').eq($('.coverpage').length-1).find('p.del img').remove();
//				$('.container').find('.requirement').eq(index).css('display','block');
				var html = '<div class="requirement3 requirement last-requirement coverpage coverpages" type="1">'+
				'<p style="padding: 0px 15px;color: #8e8e8e;" class="del">封面'+indexAry[$('.requirement3.coverpages').length]+'<img style="margin-left: 5px;height: 1rem;" src="img/del.png" alt="" /></p>'+
				'<div class="papercol paper papers-type" status="cover">'+
					'<font>封面纸张</font>'+
					'<select class="paper-keZhong">'+
						'<option value="'+price+'" price="'+price+'">'+kezhong+'</option>'+
					'</select>'+
					'<span>克</span>'+
					'<input type="text" value="'+paper_type+'" class="paper-type" readonly="readonly" status="lining"/>'+
				'</div>'+
				'<div class="papercol color">'+
					'<font>印刷色数</font>'+
					'<input type="number" class="color1" value="4" />色'+
					'<b>+</b>'+
					'<input type="number" class="color2" value="4" />色'+
					'<div class="spot-color-info spot-color-div hide">'+
						'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
						'<input type="text" class="primary-color" value="" />'+
					'</div>'+
				'</div>'+
				'<div class="papercol">'+
						'<font>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</font>'+
						'<input type="text" class="spot-color" value="Pantone" style="width:auto"/>'+
				'</div>'+
				'<div class="papercol pages">'+
					'<font>封面页数</font>'+
					'<input type="number" class="pages-num" value="4" />P'+
					'<span>勒口/拉页</span>'+
					'<input type="checkbox" class="img-checkbox hide if-leKou"/>'+
					'<img src="img/radion01.png" class="checkbox-img" sign="leKou"/>'+
					'<img src="img/note.png" class="question-icon covernote"/>'+
				'</div>'+
				'<div class="papercol surface-handle handle" index="'+(Number(index)+1)+'">'+
					'<font>表面处理</font>'+
					'<input type="text" class="select" value="" style="width: 35%;"/>'+
					'<input type="text" class="val" value="" style="width: 35%;"/>'+
				'</div>'+
				'<div class="papercol special-tech">'+
					'<p class="add-special-div"><font>特殊工艺</font>'+
					'<img src="img/add.png" class="add-icon" /></p>'+
					'<div class="special-tech-value hide"></div>'+
					'<span class="selfPaper">'+
						'<span>自带纸</span>'+
						'<input type="checkbox" name="choosepaper" class="input_check" id="choosepaper" />'+
	        			'<label for="choosepaper"></label>'+
					'</span>'+
				'</div>'+
				'<div class="add add-coverpapers-icon" index="'+(Number(index)+1)+'" sign="cover">'+
					'<img src="img/add.png" style="display: inline-block;margin-left: 45%;margin-top: 20px;width: 33%;"/>'+
					'<p style="text-align: center;margin-left: 20%;font-size:12px;">更多封面</p>'+
				'</div>'+
			'</div>'
				console.log($(".coverpages"))
				$(".coverpages").eq($('.coverpages').length-1).find('.del img').remove();
				$(".coverpages").eq($('.coverpages').length-1).after(html);
				showLevel2();
//				showclick();
				addpaper();
				addcoverpaper();
				checklaye();
				
				
				$(this).attr('index',Number(index)+1);
				$('.coverpages').eq($('.coverpages').length-1).siblings().find(".add-coverpapers-icon").remove();
				$('.coverpages').eq($('.coverpages').length-1).siblings().removeClass('lastcover-requirement')
				
				$('.del').off().on('click',function(){
							console.log(333);
							console.log($('this').parent().siblings().find('.add-papers-icon').attr('index'));
							$('this').parent().siblings('.add-papers-icon').attr('index',Number(index)-1);
							$(this).parents('.coverpages').remove();
							$('.coverpages:last-child').addClass('lastcover-requirement');
							var appendhtml = '<div class="add add-coverpapers-icon" index="'+(Number(index)+1)+'" sign="inside">'+
					'<img src="img/badd.png" style="display: inline-block;margin-left: 45%;margin-top: 20px;width: 33%;"/>'+
					'<p style="text-align: center;margin-left: 20%;font-size:12px;">更多封面</p>'+
				'</div>'
//				console.log($('.coverpages').eq($('.coverpages').length-1))
							$('.coverpage').eq($('.coverpage').length-1).append(appendhtml);
							if($('.requirement3.coverpage').length==1){
								
							}else{
								$('.requirement3.coverpage').eq($('.requirement3.coverpage').length-1).find('.del').append('<img style="margin-left: 5px;height: 1rem;" src="img/del.png" alt="" />');
							}
							addcoverPaper();
							showclick();
				})
				$('.requirement3 .papers-type').off().on('tap',function(e){
					e.preventDefault();
					e.stopPropagation()
					console.log(333);
					var status = $(this).attr('status');
					$('html').css('height',"100%");
					$('html').css('overflow','hidden');
					$('body').css('height',"100%");
					$('body').css('overflow','hidden');
					var divIndex=$('.requirement3').index($(this).parents('.requirement3'));
					console.log(divIndex);
		//			console.log("divIndex"+divIndex);
					var selfPaperPrice = $(this).attr('selfPaperPrice');
			var selfPaperColor = $(this).attr('selfPaperColor');
			var selfPaperName = $(this).attr('selfPaperName');
			var selfPaperWeight = $(this).attr('selfPaperWeight');
			var selfPaperNormal = $(this).attr('selfPaperNormal');
					layer.open({
					  type: 2,
					  skin: 'demo-class',
					  area: ['95%','90%'], //宽高
		//			  offset: '10%',
		//			  scrollbar: false,
					  title:"",
					  closeBtn:2,
					  shadeClose:false,
					  fix:true,
					  content: 'select-papers.html?sellerId='+getUrlParam('sellerId')+'&status='+status,
					  success: function(layero, index){
					  	$(layero).addClass("scroll-wrapper");
					    var body = layer.getChildFrame('body', index);
					    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
						body.find('#sureButton').attr('sign',divIndex);
						body.find('#sureButton2').attr('sign',divIndex);
					  	if(selfPaperPrice!=undefined){
							body.find('#otherPaper').attr('selfPaperPrice',selfPaperPrice);
							body.find('#otherPaper').attr('selfPaperColor',selfPaperColor);
							body.find('#otherPaper').attr('selfPaperName',selfPaperName);
							body.find('#otherPaper').attr('selfPaperWeight',selfPaperWeight);
							body.find('#otherPaper').attr('selfPaperNormal',selfPaperNormal);
						}
					  },
					  end:function(){
					  	$('html').css('height',"auto");
					  	$('html').css('overflow','auto');
					  	$('body').css('height',"auto");
					  	$('body').css('overflow','auto');
					  }
					});
				});

		
//			}
		});
}
		$('.liningnote').on('tap',function(){
		layer.open({
							  type: 2,
							  skin: 'demo-class',
							  area: ['80%', '40%'], //宽高
				//			  scrollbar: false,
							  title:"",
							  content: 'lining-laye.html',
							  scrollbar: false,
							  closeBtn: 1,
							  shadeClose:false,
							  success: function(layero,index){
							  	$(layero).addClass("scroll-wrapper");
							  	$(layero).find('.back').on('tap',function(){
							  		layer.close(index);
								})
							  	
							  },
							  end:function(){
							  	$('html').css('height',"auto");
							  	$('html').css('overflow','auto');
							  	$('body').css('height',"auto");
							  	$('body').css('overflow','auto');
							  }
							});
	})
		function checklaye(){
					$('.requirement3 .checkbox-img').off().on('tap',function(e){
						e.preventDefault();
						e.stopPropagation()
						console.log('测试'+$(this).siblings('.img-checkbox').attr('checked'));
						if($(this).siblings('.img-checkbox').attr('checked')==undefined || $(this).siblings('.img-checkbox').attr('checked')=='undefined'){
							$(this).siblings('.img-checkbox').attr('checked',true);
							$(this).attr('src','img/radion02.png');
							if($(this).attr('sign')=='leKou'){
								var pagesNum=parseInt($(this).parents('.requirement3').find('.pages-num').val())+4;
								$(this).parents('.requirement3').find('.pages-num').val(pagesNum);
							}
						}else{
							$(this).siblings('.img-checkbox').attr('checked',false);
							$(this).attr('src','img/radion01.png');
							//点击自带纸按钮  取消自带纸张
							if($(this).attr('sign')=='leKou'){
								var pagesNum=parseInt($(this).parents('.requirement3').find('.pages-num').val())-4;
								$(this).parents('.requirement3').find('.pages-num').val(pagesNum<0?0:pagesNum);
							}
						}
					});	
				}
		showLevel2()
        function showLevel2() {
//			$("#area").text("");
			var picker = new mui.PopPicker({
				layer: 2,
				buttons: ['取消', '确定']
			});
			picker.setData([{
				value: '110000',
				text: '单面',
				children: [{
					value: "0.0127",
					text: "水性光油"
				}, {
					value: "0.0175",
					text: "水性哑油"
				},{
					value: "0.075",
					text: "哑膜"
				}, {
					value: "0.05",
					text: "光膜"
				}]
			}, {
				value: '120000',
				text: '双面',
				children: [{
					value: "0.0127",
					text: "水性光油"
				}, {
					value: "0.0175",
					text: "水性哑油"
				},{
					value: "0.075",
					text: "哑膜"
				}, {
					value: "0.05",
					text: "光膜"
				}]
			},{
				value: '',
				text: '无',
				children: [{
					value: "0",
					text: "无"
				}]
			}
			]);
 
			$(".requirement3 .handle").off('tap').on('tap', function(event) {
				// 默认第一层显示第1项;第二层显示第2项
//				var index = $(this).attr('index');
				event.preventDefault();
				event.stopPropagation()
				var _this = this
				picker.pickers[0].setSelectedIndex(0);
				picker.pickers[1].setSelectedIndex(2);
				picker.show(function(selectItems) {
					var text1 = selectItems[0].text;
					var text2 = selectItems[1].text;
					console.log(index);
					$(_this).find('.select').val(text1);
					$(_this).find('.val').val(text2)
				})
				// picker.dispose();
			});
//			$(".requirement4 .handle").off('tap').on('tap', function(event) {
//				// 默认第一层显示第1项;第二层显示第2项
////				var index = $(this).attr('index');
//				var _this = this
//				picker.pickers[0].setSelectedIndex(0);
//				picker.pickers[1].setSelectedIndex(2);
//				picker.show(function(selectItems) {
//					var text1 = selectItems[0].text;
//					var text2 = selectItems[1].text;
//					console.log(index);
//					$(_this).find('.select').val(text1);
//					$(_this).find('.val').val(text2)
//				})
//				// picker.dispose();
//			});
			$('.requirement3').off('tap','.add-special-div');
				$('.requirement3').on('tap','.add-special-div',function(e){
				window.event? window.event.cancelBubble = true : e.stopPropagation();
			e.preventDefault();
			e.stopPropagation();
			var status = 3;
			var divIndex1=$('.requirement3').index($(this).parents('.requirement3'));
			console.log(divIndex1+"ceshi");
//			$('html,body').animate({scrollTop: 0}, 100);
			$('html,body').css('z-index', '1000');
			$('html').addClass('scrollFix');
//			stop();
//			
			layer.open({
			  type: 2,
			  skin: 'demo-class',
			  area: ['350px','580px'], //宽高
			  scrollbar: false,
			  title:"",
			  content: 'select-special-tech.html',
//			  closeBtn: 0,
//			  shadeClose:true,
			  success: function(layero, index){
			  	$(layero).addClass("scroll-wrapper");
			    var body = layer.getChildFrame('body', index);
			    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
				body.find('#sureButton01').attr('sign',divIndex1);
				body.find('#sureButton01').attr('status',status);
				
			  },
			  end:function(){
//			  	alert(222);
//			  	$('html').removeClass('scrollFix');
			  	$('html,body').css('z-index', '0');
//			  	move();
			  }
			  
			});
		});
	}
        function showclick(){
        	$('.requirement3').off().on('tap','.add-special-div',function(e){
			console.log(333)
			e.preventDefault();
			e.stopPropagation();
			var status = 3;
			var divIndex1=$('.requirement3').index($(this).parents('.requirement3'));
			console.log(divIndex1);
//			$('html,body').animate({scrollTop: 0}, 100);
			$('html,body').css('z-index', '1000');
			$('html').addClass('scrollFix');
//			stop();
//			
			layer.open({
			  type: 2,
			  skin: 'demo-class',
			  area: ['350px','580px'], //宽高
			  scrollbar: false,
			  title:"",
			  content: 'select-special-tech.html',
//			  closeBtn: 0,
//			  shadeClose:true,
			  success: function(layero, index){
			  	$(layero).addClass("scroll-wrapper");
			    var body = layer.getChildFrame('body', index);
			    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
				body.find('#sureButton01').attr('sign',divIndex1);
				body.find('#sureButton01').attr('status',status);
				
			  },
			  end:function(){
//			  	alert(222);
//			  	$('html').removeClass('scrollFix');
			  	$('html,body').css('z-index', '0');
//			  	move();
			  }
			  
			});
		});
		
		$('.requirement3 .papers-type').off().on('click',function(e){
					e.preventDefault();
					e.stopPropagation();
					console.log(333+'测试');
					var requirementstatus = 3;
					console.log(444);
					var status = $(this).attr('status');
					$('html').css('height',"100%");
					$('html').css('overflow','hidden');
					$('body').css('height',"100%");
					$('body').css('overflow','hidden');
					var divIndex=$('.requirement3').index($(this).parents('.requirement3'));
					console.log(divIndex);
		//			console.log("divIndex"+divIndex);
					var selfPaperPrice = '';
					var selfPaperColor = $(this).attr('selfPaperColor');
					var selfPaperName = $(this).attr('selfPaperName');
					var selfPaperWeight = $(this).attr('selfPaperWeight');
					var selfPaperNormal = $(this).attr('selfPaperNormal');
					var selfPaperWidth = '';
					var selfPaperLength = '';
					if(selfPaperNormal == 2){
						selfPaperWidth = $(this).attr('selfPaperWidth');
						selfPaperLength = $(this).attr('selfPaperLength');
					}else{
						selfPaperPrice = $(this).attr('selfPaperPrice');
					}
					layer.open({
					  type: 2,
					  skin: 'demo-class',
					  area: ['95%','90%'], //宽高
					  title:"",
					  closeBtn:2,
//					  shadeClose:true,
					  fix:true,
					  content: 'select-papers.html?sellerId='+getUrlParam('sellerId')+'&status='+status,
					  success: function(layero, index){
					  	$(layero).addClass("scroll-wrapper");
					    var body = layer.getChildFrame('body', index);
					    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
						body.find('#sureButton').attr('sign',divIndex);
						body.find('#sureButton2').attr('sign',divIndex);
						body.find('#sureButton').attr('requirementstatus',requirementstatus);
					  	body.find('#sureButton2').attr('requirementstatus',requirementstatus);
					  	if(selfPaperColor!=undefined){
							  	if(selfPaperNormal ==2){
							  		body.find('#otherPaper').attr('selfPaperWidth',selfPaperWidth);
							  		body.find('#otherPaper').attr('selfPaperLength',selfPaperLength);
									body.find('#otherPaper').attr('selfPaperColor',selfPaperColor);
									body.find('#otherPaper').attr('selfPaperName',selfPaperName);
									body.find('#otherPaper').attr('selfPaperWeight',selfPaperWeight);
									body.find('#otherPaper').attr('selfPaperNormal',selfPaperNormal);
							  	}else{
							  		body.find('#otherPaper').attr('selfPaperPrice',selfPaperPrice);
									body.find('#otherPaper').attr('selfPaperColor',selfPaperColor);
									body.find('#otherPaper').attr('selfPaperName',selfPaperName);
									body.find('#otherPaper').attr('selfPaperWeight',selfPaperWeight);
									body.find('#otherPaper').attr('selfPaperNormal',selfPaperNormal);
							  	}
							
							  }
					  },
					  end:function(){
					  	$('html').css('height',"auto");
					  	$('html').css('overflow','auto');
					  	$('body').css('height',"auto");
					  	$('body').css('overflow','auto');
					  }
					});
				});
        }
        function selfpapershow(){
        	$('#lining label').on('tap',function(){
					if($('#lining input').is(':checked')){
						$('.huanchenpage input').removeAttr('disabled');
					$('.huanchenpage input').css('color','#FF6F00');
					$('.huanchenpage select').css('color','#FF6F00');
					$('.huanchenpage .special-tech-value').css('color','#FF6F00');
					$('.requirement3').off().on('tap','.add-special-div',function(e){
			console.log(333)
			e.preventDefault();
			e.stopPropagation();
			var status = 3;
			var divIndex1=$('.requirement3').index($(this).parents('.requirement3'));
			console.log(divIndex1);
//			$('html,body').animate({scrollTop: 0}, 100);
			$('html,body').css('z-index', '1000');
			$('html').addClass('scrollFix');
//			stop();
//			
			layer.open({
			  type: 2,
			  skin: 'demo-class',
			  area: ['350px','580px'], //宽高
			  scrollbar: false,
			  title:"",
			  content: 'select-special-tech.html',
//			  closeBtn: 0,
//			  shadeClose:true,
			  success: function(layero, index){
			  	$(layero).addClass("scroll-wrapper");
			    var body = layer.getChildFrame('body', index);
			    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
				body.find('#sureButton01').attr('sign',divIndex1);
				body.find('#sureButton01').attr('status',status);
				
			  },
			  end:function(){
//			  	alert(222);
//			  	$('html').removeClass('scrollFix');
			  	$('html,body').css('z-index', '0');
//			  	move();
			  }
			  
			});
		});
		
		$('.requirement3 .papers-type').on('tap',function(e){
					e.preventDefault();
					e.stopPropagation();
					console.log(333+'测试');
					var requirementstatus = 3;
					console.log(444);
					var status = $(this).attr('status');
					$('html').css('height',"100%");
					$('html').css('overflow','hidden');
					$('body').css('height',"100%");
					$('body').css('overflow','hidden');
					var selfPaperPrice = $(this).attr('selfPaperPrice');
			var selfPaperColor = $(this).attr('selfPaperColor');
			var selfPaperName = $(this).attr('selfPaperName');
			var selfPaperWeight = $(this).attr('selfPaperWeight');
			var selfPaperNormal = $(this).attr('selfPaperNormal');
					var divIndex=$('.requirement3').index($(this).parents('.requirement3'));
					console.log(divIndex);
		//			console.log("divIndex"+divIndex);
					layer.open({
					  type: 2,
					  skin: 'demo-class',
					  area: ['95%','90%'], //宽高
					  title:"",
					  closeBtn:2,
//					  shadeClose:true,
					  fix:true,
					  content: 'select-papers.html?sellerId='+getUrlParam('sellerId')+'&status='+status,
					  success: function(layero, index){
					  	$(layero).addClass("scroll-wrapper");
					    var body = layer.getChildFrame('body', index);
					    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
						body.find('#sureButton').attr('sign',divIndex);
						body.find('#sureButton2').attr('sign',divIndex);
						body.find('#sureButton').attr('requirementstatus',requirementstatus);
					  	body.find('#sureButton2').attr('requirementstatus',requirementstatus);
					  	if(selfPaperPrice!=undefined){
							body.find('#otherPaper').attr('selfPaperPrice',selfPaperPrice);
							body.find('#otherPaper').attr('selfPaperColor',selfPaperColor);
							body.find('#otherPaper').attr('selfPaperName',selfPaperName);
							body.find('#otherPaper').attr('selfPaperWeight',selfPaperWeight);
							body.find('#otherPaper').attr('selfPaperNormal',selfPaperNormal);
						}
					  },
					  end:function(){
					  	$('html').css('height',"auto");
					  	$('html').css('overflow','auto');
					  	$('body').css('height',"auto");
					  	$('body').css('overflow','auto');
					  }
					});
				});
					}else{
//						alert(2222);
						$('.huanchenpage .color1').attr('disabled','disabled');
						$('.huanchenpage .color2').attr('disabled','disabled');
						$('.huanchenpage .spot-color').attr('disabled','disabled');
						$('.huanchenpage .pages-num').attr('disabled','disabled');
						$('.huanchenpage input').css('color','#CCCCCC');
						$('.huanchenpage select').css('color','#CCCCCC');
						$('.huanchenpage .special-tech-value').css('color','#CCCCCC');
						$('.huanchenpage .papers-type').off('tap');
						$('.huanchenpage .add-special-div').off('tap');
					}
				})
        }
function clicknocover(){
        	//点击无封面
			$('#nocoverPaper label').on('tap',function(){
				console.log($('input[name="nocoverPaper"]').is(':checked'));
				if($('input[name="nocoverPaper"]').is(':checked')){
					$('.requirement3 input').removeAttr('disabled');
					$('.requirement3 input').css('color','#FF6F00');
					$('.requirement3 select').css('color','#FF6F00');
					$('.requirement3 .special-tech-value').css('color','#FF6F00');
					$('.requirement3').off().on('tap','.add-special-div',function(e){
			console.log(333)
			e.preventDefault();
			e.stopPropagation();
			var status = 1;
			var divIndex1=$('.requirement3').index($(this).parents('.requirement5'));
			console.log(divIndex1);
//			$('html,body').animate({scrollTop: 0}, 100);
			$('html,body').css('z-index', '1000');
			$('html').addClass('scrollFix');
//			stop();
//			
			layer.open({
			  type: 2,
			  skin: 'demo-class',
			  area: ['350px','580px'], //宽高
			  scrollbar: false,
			  title:"",
			  content: 'select-special-tech.html',
//			  closeBtn: 0,
//			  shadeClose:true,
			  success: function(layero, index){
			  	$(layero).addClass("scroll-wrapper");
			    var body = layer.getChildFrame('body', index);
			    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
				body.find('#sureButton01').attr('data-sign',divIndex1);
				body.find('#sureButton01').attr('status',status);
				
			  },
			  end:function(){
//			  	alert(222);
//			  	$('html').removeClass('scrollFix');
			  	$('html,body').css('z-index', '0');
//			  	move();
			  }
			  
			});
		});
		$('.requirement3 .papers-type').on('tap',function(e){
					e.preventDefault();
					e.stopPropagation();
					console.log(333+'测试');
					var requirementstatus = 1;
					console.log(444);
					var status = $(this).attr('status');
					$('html').css('height',"100%");
					$('html').css('overflow','hidden');
					$('body').css('height',"100%");
					$('body').css('overflow','hidden');
					var divIndex=$('.requirement3').index($(this).parents('.requirement5'));
					console.log(divIndex);
					var selfPaperPrice = $(this).attr('selfPaperPrice');
			var selfPaperColor = $(this).attr('selfPaperColor');
			var selfPaperName = $(this).attr('selfPaperName');
			var selfPaperWeight = $(this).attr('selfPaperWeight');
			var selfPaperNormal = $(this).attr('selfPaperNormal');
		//			console.log("divIndex"+divIndex);
					layer.open({
					  type: 2,
					  skin: 'demo-class',
					  area: ['95%','90%'], //宽高
					  title:"",
					  closeBtn:2,
//					  shadeClose:true,
					  fix:true,
					  content: 'select-papers.html?sellerId='+getUrlParam('sellerId')+'&status='+status,
					  success: function(layero, index){
					  	$(layero).addClass("scroll-wrapper");
					    var body = layer.getChildFrame('body', index);
					    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
						body.find('#sureButton').attr('sign',divIndex);
						body.find('#sureButton2').attr('sign',divIndex);
						body.find('#sureButton').attr('requirementstatus',requirementstatus);
					  	body.find('#sureButton2').attr('requirementstatus',requirementstatus);
					  if(selfPaperPrice!=undefined){
					body.find('#otherPaper').attr('selfPaperPrice',selfPaperPrice);
					body.find('#otherPaper').attr('selfPaperColor',selfPaperColor);
					body.find('#otherPaper').attr('selfPaperName',selfPaperName);
					body.find('#otherPaper').attr('selfPaperWeight',selfPaperWeight);
					body.find('#otherPaper').attr('selfPaperNormal',selfPaperNormal);
				}
					  },
					  end:function(){
					  	$('html').css('height',"auto");
					  	$('html').css('overflow','auto');
					  	$('body').css('height',"auto");
					  	$('body').css('overflow','auto');
					  }
					});
				});
				}else{
					$('.requirement3.coverpages input').attr('disabled','disabled');
					$('.requirement3.coverpages input').css('color','#CCCCCC');
					$('.requirement3.coverpages select').css('color','#CCCCCC');
					$('.requirement3.coverpages .special-tech-value').css('color','#CCCCCC');
					$('.requirement3.coverpages .papers-type').off('tap click');
					$('.requirement3.coverpages .add-special-div').off('tap click');
				}
			})
			
        }
        function clicknoinside(){
        	//点击无内页
			$('#insidePapers label').on('tap',function(){
				console.log($('input[name="insidePapers"]').is(':checked'));
				if($('input[name="insidePapers"]').is(':checked')){
					$('.requirement3 input').removeAttr('disabled');
					$('.requirement3 input').css('color','#FF6F00');
					$('.requirement3 select').css('color','#FF6F00');
					$('.requirement3 .special-tech-value').css('color','#FF6F00');
					$('.requirement3').off().on('tap','.add-special-div',function(e){
			console.log(333)
			e.preventDefault();
			e.stopPropagation();
			var status = 2;
			var divIndex1=$('.requirement3').index($(this).parents('.requirement5'));
			console.log(divIndex1);
//			$('html,body').animate({scrollTop: 0}, 100);
			$('html,body').css('z-index', '1000');
			$('html').addClass('scrollFix');
//			stop();
//			
			layer.open({
			  type: 2,
			  skin: 'demo-class',
			  area: ['350px','580px'], //宽高
			  scrollbar: false,
			  title:"",
			  content: 'select-special-tech.html',
//			  closeBtn: 0,
//			  shadeClose:true,
			  success: function(layero, index){
			  	$(layero).addClass("scroll-wrapper");
			    var body = layer.getChildFrame('body', index);
			    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
				body.find('#sureButton01').attr('data-sign',divIndex1);
				body.find('#sureButton01').attr('status',status);
				
			  },
			  end:function(){
//			  	alert(222);
//			  	$('html').removeClass('scrollFix');
			  	$('html,body').css('z-index', '0');
//			  	move();
			  }
			  
			});
		});
		$('.requirement3 .papers-type').on('tap',function(e){
					e.preventDefault();
					e.stopPropagation();
					console.log(333+'测试');
					var requirementstatus = 2;
					console.log(444);
					var status = $(this).attr('status');
					$('html').css('height',"100%");
					$('html').css('overflow','hidden');
					$('body').css('height',"100%");
					$('body').css('overflow','hidden');
					var divIndex=$('.requirement3').index($(this).parents('.requirement5'));
					console.log(divIndex);
					var selfPaperPrice = $(this).attr('selfPaperPrice');
			var selfPaperColor = $(this).attr('selfPaperColor');
			var selfPaperName = $(this).attr('selfPaperName');
			var selfPaperWeight = $(this).attr('selfPaperWeight');
			var selfPaperNormal = $(this).attr('selfPaperNormal');
		//			console.log("divIndex"+divIndex);
					layer.open({
					  type: 2,
					  skin: 'demo-class',
					  area: ['95%','90%'], //宽高
					  title:"",
					  closeBtn:2,
//					  shadeClose:true,
					  fix:true,
					  content: 'select-papers.html?sellerId='+getUrlParam('sellerId')+'&status='+status,
					  success: function(layero, index){
					  	$(layero).addClass("scroll-wrapper");
					    var body = layer.getChildFrame('body', index);
					    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
						body.find('#sureButton').attr('sign',divIndex);
						body.find('#sureButton2').attr('sign',divIndex);
						body.find('#sureButton').attr('requirementstatus',requirementstatus);
					  	body.find('#sureButton2').attr('requirementstatus',requirementstatus);
					  if(selfPaperPrice!=undefined){
					body.find('#otherPaper').attr('selfPaperPrice',selfPaperPrice);
					body.find('#otherPaper').attr('selfPaperColor',selfPaperColor);
					body.find('#otherPaper').attr('selfPaperName',selfPaperName);
					body.find('#otherPaper').attr('selfPaperWeight',selfPaperWeight);
					body.find('#otherPaper').attr('selfPaperNormal',selfPaperNormal);
				}
					  },
					  end:function(){
					  	$('html').css('height',"auto");
					  	$('html').css('overflow','auto');
					  	$('body').css('height',"auto");
					  	$('body').css('overflow','auto');
					  }
					});
				});
				}else{
					$('.requirement3.insidepage input').attr('disabled','disabled');
					$('.requirement3.insidepage input').css('color','#CCCCCC');
					$('.requirement3.insidepage select').css('color','#CCCCCC');
					$('.requirement3.insidepage .special-tech-value').css('color','#CCCCCC');
					$('.requirement3.insidepage .papers-type').off('tap click');
					$('.requirement3.insidepage .add-special-div').off('tap click');
				}
			})
        }

