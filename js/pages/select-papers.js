$(document).ready(function(){
	var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	var customIndex;
	var offerParaJson=JSON.parse(sessionStorage.getItem('offerParaJson'));
	var sellerId='';
	console.log(offerParaJson);
	if(offerParaJson==null||offerParaJson==undefined){
		sellerId=getUrlParam('sellerId');
//		console.log('1');
	}else{
		sellerId=localStorage.getItem('sellerId');
//		console.log('2');
	}
	var status = getUrlParam('status');
	console.log(sellerId);
	
	
	//获取数据
	getPaperData(sellerId);
	function getPaperData(sellerId){
		$.ajax({
			type:"post",
			url:ajaxUrlPath+"/mobile/paper/getAll",
			data:{sellerId:sellerId},
			async:true,
			success:function(data){
				console.log(JSON.stringify(data));
				if(data.code==0){
					var resultArr=data.result;
					console.log(status);
					if(status=='cover'){
						for (var i=0;i<resultArr.length;i++) {
							if(resultArr[i].name == '封面' || resultArr[i].name == '通用'){
								displayPapersTable(resultArr[i].dtos,resultArr[i].name);
							}
						}
					}else if(status == 'lining'){
						for (var i=0;i<resultArr.length;i++) {
							if(resultArr[i].name == '内页' || resultArr[i].name == '通用'){
								displayPapersTable(resultArr[i].dtos,resultArr[i].name);
							}
						}
					}else if(status == 'huanchen'){
						for (var i=0;i<resultArr.length;i++) {
							if(resultArr[i].name == '内页' || resultArr[i].name == '通用'){
								displayPapersTable(resultArr[i].dtos,resultArr[i].name);
							}
						}
					}
//					var html ='<tr class="table-title other" data-sign="title"><td colspan="4">'+'指定特殊纸张'+'</td></tr>'+
//						'<tr class="assign" style="display:none"><td colspan="4" class="table-selecteds">'+
//						'<ul class="mui-table-view">'+ 
//					        '<li class="mui-table-view-cell mui-collapse">'+
//					            '<a class="" href="#"><span style="width:30%;"><input style="border:0;width:110px;margin-bottom:0px" type="text" val="" placeholder="请输入纸张"></span><span style="width:30%"><input style="border:0;width:110px;margin-bottom:0px" type="number" val="" placeholder="请输入克数"></span><span style="width:30%"><input style="border:0;width:110px;margin-bottom:0px" type="number" val="" placeholder="请输入单价"></span></a>'+
//					            '</li></ul></td></tr>';
//					$("#selectPapersTable").append(html)
					$('.other').on('tap',function(){
						if($('.assign').is(':hidden')){
							$(".assign").css("display",'block');
						}else{
							$(".assign").css("display",'none');
						}
					})
					
				}else{
					parent.layer.msg('没有获取更多纸张数据',{offset:'80%'});
				}
			}
		});
	}
	$('#otherPaper').on('tap',function(){
		var selfPaperPrice ='';
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
		var open_index = layer.open({
					  type: 2,
					  skin: 'demo-class',
					  area: ['100%', '100%'], //宽高
		//			  offset: '10%',
		//			  scrollbar: false,
					  title:"<small>自定义纸张</small>",
					  scrollbar: false,
					  closeBtn: 2,
					  shadeClose:false,
					  fix:true,
					  content: 'other-papers.html',
					  success: function(layero, index){
					  	$(layero).addClass("scroll-wrapper");
					     console.log(index);
//					     $(layero).on('tap','#sureButton',function(){
//					     	layer.close(open_index);
//					     })
						var body = layer.getChildFrame('body',index);
						if(selfPaperColor!=undefined){
							body.find('input[name="papername"]').val(selfPaperName);
							body.find('input[name="color"]').val(selfPaperColor);
							body.find('input[name="KeZhong"]').val(selfPaperWeight);
							
							if(selfPaperNormal=='0'){
								body.find('input[name="price"]').val(selfPaperPrice);
								console.log(body.find('.specschoose').eq(0));
								body.find('.specschoose').eq(0).addClass('active');
								body.find('.specschoose').eq(0).siblings().removeClass('active');
								var pricehtml = '<font>价格</font>'+
								'<input style="width: 20%;" type="number" name="price" id="price" value="'+selfPaperPrice+'" />/张';
								body.find('.price').html(pricehtml);
								body.find('.specialhidenum').css('display','none')
							}else if(selfPaperNormal == '1'){
//								body.find('input[name="price"]').val(selfPaperPrice);
								body.find('.specschoose').eq(1).addClass('active');
								body.find('.specschoose').eq(1).siblings().removeClass('active');
								var pricehtml = '<font>价格</font>'+
								'<input style="width: 20%;" type="number" name="price" id="price" value="'+selfPaperPrice+'" />/张';
								body.find('.price').html(pricehtml);
								body.find('.specialhidenum').css('display','none')
							}else if(selfPaperNormal == '2'){
								body.find('.specschoose').eq(2).addClass('active');
								body.find('.specschoose').eq(2).siblings().removeClass('active');
								var pricehtml = '<font>特规纸张不支持自动报价，请联系客服人员</font>'
								body.find('.price').html(pricehtml);
								body.find('input[name="selfPaperWidth"]').val(selfPaperWidth);
								body.find('input[name="selfPaperLength"]').val(selfPaperLength);
								body.find('.specialhidenum').css('display','inline-block')
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
	})
	
	$('#sureButton').on('tap',function(){
		var divIndex=$(this).attr('sign');
		var papertype = $(this).attr('papertype');
		var _this = this;
		console.log(papertype);
		var requirementstatus = $(this).attr('requirementstatus');
		var $tdChild=$('#selectPapersTable').find('.table-selected').find('span');
//		console.log(JSON.stringify($tdChild)+'测试');
		if(papertype==undefined){
//			parent.layer.msg('请选择纸张或填写指定纸张',{offset:'80%'});
			
//				var $tdChilds=$('#selectPapersTable').find('.table-selecteds').find('span');
//				console.log(JSON.stringify($tdChilds)+'测试1');
//				var isSelfPaper = 1;
				if($tdChild.length==0){
					parent.layer.msg('请选择纸张',{offset:'80%'});
					return false;
				}else{
					var paperType=$tdChild.eq(0).text();
					console.log(paperType);
					var weight=$tdChild.eq(2).attr('weight');
					var price=$tdChild.eq(2).attr('price');
					
					var priceArr = []
					console.log(priceArr);
					var weightArr=[];
					priceArr.push(price);
					weightArr.push(weight);
					var optionS='';
					optionS='<option value="'+weightArr[0]+'" price="'+priceArr[0]+'">'+weightArr[0]+'</option>';
					if(requirementstatus == 1){
						$parent=parent.$('.requirement1').eq(divIndex);
					}else if(requirementstatus == 2){
						$parent=parent.$('.requirement2').eq(divIndex);
					}else if(requirementstatus == 3){
						$parent=parent.$('.requirement3').eq(divIndex);
					}else if(requirementstatus == 5){
						$parent=parent.$('.requirement5').eq(divIndex);
					}else{
						$parent=parent.$('.requirement').eq(divIndex);
					}
					$parent.find('.selfcolor').remove();
					console.log(paperType+'---'+optionS);
					$parent.find('.paper-type').css('width','40%')
					$parent.find('.paper-type').val(paperType);
					$parent.find('.paper-keZhong').empty().append(optionS);
			    	parent.layer.close(index);
				}
				
				
			
		}else{
			var selfPaperName = $(_this).attr('papertype');
				var selfPaperWeight = $(_this).attr('KeZhong');
				
				var selfPaperColor = $(_this).attr('color');
				var selfPaperNormal = $(_this).attr('specs');
//				alert(selfPaperNormal);
				if(selfPaperNormal == 2){
					var selfPaperLength = $(_this).attr('selfPaperLength');
					var selfPaperWidth = $(_this).attr('selfPaperWidth');
//					alert(selfPaperLength);
					if(selfPaperName==''||selfPaperWeight==''||selfPaperLength=='' || selfPaperWidth==''){
						parent.layer.msg('请填写完整纸张信息',{offset:'80%'});
						return false;
					}else{
						var optionS='';
						optionS='<option value="'+selfPaperWeight+'" selfPaperWidth="'+selfPaperWidth+'" selfPaperLength="'+selfPaperLength+'" selfPaperNormal="'+selfPaperNormal+'" selfPaperColor="'+selfPaperColor+'">'+selfPaperWeight+'</option>';
						if(requirementstatus == 1){
							$parent=parent.$('.requirement1').eq(divIndex);
						}else if(requirementstatus == 2){
							$parent=parent.$('.requirement2').eq(divIndex);
						}else if(requirementstatus == 3){
							$parent=parent.$('.requirement3').eq(divIndex);
						}else if(requirementstatus == 5){
							$parent=parent.$('.requirement5').eq(divIndex);
						}else{
							$parent=parent.$('.requirement').eq(divIndex);
						}
						$parent.find('.selfcolor').remove();
						$parent.find('.paper-type').val(selfPaperName);
						$parent.find('.paper-type').css('width','25%')
						$parent.find('.paper-type').after('<span class="selfcolor">'+selfPaperColor+'</span>');
						$parent.find('.paper-keZhong').empty().append(optionS);
						$parent.find('.papers-type').attr('selfPaperWidth',selfPaperWidth);
						$parent.find('.papers-type').attr('selfPaperLength',selfPaperLength);
						$parent.find('.papers-type').attr('selfPaperColor',selfPaperColor);
						$parent.find('.papers-type').attr('selfPaperName',selfPaperName);
						$parent.find('.papers-type').attr('selfPaperWeight',selfPaperWeight);
						$parent.find('.papers-type').attr('selfPaperNormal',selfPaperNormal);
						
						parent.layer.close(index);
					}
				}else{
					var selfPaperPrice = $(_this).attr('price');
					if(selfPaperName==''||selfPaperWeight==''||selfPaperPrice==''){
						parent.layer.msg('请填写完整纸张信息',{offset:'80%'});
						return false;
					}else{
						var optionS='';
						optionS='<option value="'+selfPaperWeight+'" selfPaperPrice="'+selfPaperPrice+'" selfPaperNormal="'+selfPaperNormal+'" selfPaperColor="'+selfPaperColor+'">'+selfPaperWeight+'</option>';
						if(requirementstatus == 1){
							$parent=parent.$('.requirement1').eq(divIndex);
						}else if(requirementstatus == 2){
							$parent=parent.$('.requirement2').eq(divIndex);
						}else if(requirementstatus == 3){
							$parent=parent.$('.requirement3').eq(divIndex);
						}else if(requirementstatus == 5){
							$parent=parent.$('.requirement5').eq(divIndex);
						}else{
							$parent=parent.$('.requirement').eq(divIndex);
						}
						$parent.find('.selfcolor').remove();
						$parent.find('.paper-type').val(selfPaperName);
						$parent.find('.paper-type').css('width','25%')
						$parent.find('.paper-type').after('<span class="selfcolor">'+selfPaperColor+'</span>');
						$parent.find('.paper-keZhong').empty().append(optionS);
						$parent.find('.papers-type').attr('selfPaperPrice',selfPaperPrice);
						$parent.find('.papers-type').attr('selfPaperColor',selfPaperColor);
						$parent.find('.papers-type').attr('selfPaperName',selfPaperName);
						$parent.find('.papers-type').attr('selfPaperWeight',selfPaperWeight);
						$parent.find('.papers-type').attr('selfPaperNormal',selfPaperNormal);
						
						parent.layer.close(index);
					}
				}
				console.log(selfPaperName);
				
				
			
		}
	});
	
	$('#customPapersBtn').on('tap click',function(){
		$('html').css('height',"100%");
		$('html').css('overflow','hidden');
		$('body').css('height',"100%");
		$('body').css('overflow','hidden');
		customIndex=layer.open({
		  type: 1,
		  skin: 'demo-class',
		  area: '95%', //宽高
//		  scrollbar: false,
		  title:"自定义纸张",
		  content: $('#customPapers'),
		  success: function(layero){
			  	$(layero).addClass("scroll-wrapper");
			  	
			  },
			  end:function(){
			  	var type = $(layero).find('input[name="papername"]').val();
				var color = $(layero).find('input[name="color"]').val();
				var KeZhong = $(layero).find('input[name="KeZhong"]').val();
				var price = $(layero).find('input[name="price"]').val();
				console.log(type+color+KeZhong+price)
			  	$('html').css('height',"auto");
			  	$('html').css('overflow','auto');
			  	$('body').css('height',"auto");
			  	$('body').css('overflow','auto');
			  }
		});
	});
	
	$('#sureButton2').on('tap click',function(){
		var divIndex=$(this).attr('sign');
		var requirementstatus = $(this).attr('requirementstatus');
		var customPapers01=$('#customPapers01').val();
		var customPapers02=$('#customPapers02').val();
		var customPapers03=$('#customPapers03').val();
		if(customPapers01==''||customPapers02==''||customPapers03==''){
			parent.parent.layer.msg('请填写完整相关信息',{offset:'80%'});
		}else{
			var optionS='<option value="'+customPapers03+'">'+customPapers02+'</option>';
			var $parent = '';
			if(requirementstatus == 1){
				$parent=parent.$('.requirement1').eq(divIndex);
			}else if(requirementstatus == 2){
				$parent=parent.$('.requirement2').eq(divIndex);
			}else if(requirementstatus == 3){
				$parent=parent.$('.requirement3').eq(divIndex);
			}else{
				$parent=parent.$('.requirement').eq(divIndex);
			}
			
			$parent.find('.paper-type').val(customPapers01);
			$parent.find('.paper-keZhong').empty().append(optionS);
			layer.close(customIndex);
	    	parent.layer.close(index);
		}
	});
});

function displayPapersTable(commonArr,trTitle){
	var commonStr='<tr class="table-title" data-sign="title"><td colspan="4">'+trTitle+'</td></tr>';
	for(var i=0;i<commonArr.length;i++){
		var weightArr=commonArr[i].weights;
		var weightStr='';
		var priceStr = '';
		for (var j=0;j<weightArr.length;j++) {
			weightStr=weightStr+weightArr[j].weight+'/'+weightArr[j].tonnage+'|';
			priceStr = 	priceStr + weightArr[j].price+'/';
		}
		weightStr=weightStr.substr(0,weightStr.length-1);
		priceStr =priceStr.substr(0,priceStr.length-1);
		console.log(priceStr);
		
		//最大值和最小值
		var minMax=weightArr[0].weight+'~'+weightArr[weightArr.length-1].weight;
		//选择星星级别
		var rendition='';
		switch (commonArr[i].colorDepth){
			case 1:
				rendition='formItemDiff1';
				break;
			case 2:
				rendition='formItemDiff2';
				break;
			case 3:
				rendition='formItemDiff3';
				break;
			case 4:
				rendition='formItemDiff4';
				break;
			case 5:
				rendition='formItemDiff5';
				break;
		}
		commonStr = commonStr + '<tr><td colspan="4">'+
						'<ul class="mui-table-view">'+ 
					        '<li class="mui-table-view-cell mui-collapse">'+
					            '<a class="" href="#"><span>'+commonArr[i].name+'</span><span>'+commonArr[i].color+'</span><span weight="'+weightStr+'" price="'+priceStr+'">'+minMax+'</span><span></span></a>'+
					            '<div class="mui-collapse-content">';
		for (var z = 0; z < weightArr.length; z++) {
			commonStr=commonStr+'<p><span>'+commonArr[i].name+'</span><span>'+commonArr[i].color+'</span><span weight = "'+weightArr[z].weight+'" price="'+weightArr[z].price+'">'+weightArr[z].weight+'</span><span class="'+rendition+'"></span></p>';
		}			                
		commonStr = commonStr + '</div></li></ul></td></tr>'
					            
		console.log(commonStr);
		
	}
	
	console.log(commonStr);
	$('#selectPapersTable').append(commonStr);
	$('#selectPapersTable tr .mui-collapse-content').on('tap','p',function(){
		console.log(111);
		if($(this).data('sign')!='title'){
			$(this).addClass('table-selected').siblings('p').removeClass('table-selected');
			$(this).parents('tr').siblings().find('p').removeClass('table-selected');
		}
	});
}
