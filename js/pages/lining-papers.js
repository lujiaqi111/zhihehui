$(document).ready(function(){
	var offerParaJson=JSON.parse(sessionStorage.getItem('offerParaJson'));
	getComPapers('lining',localStorage.getItem('sellerId'));
});
function getComPapers(type,sellerId){
	$.ajax({
		type:"post",
		url:ajaxUrlPath+"/mobile/paper/getAll",
		async:true,
		data:{'sellerId':sellerId},
		success:function(data){
			if(data.code==0){
				var result=data.result;
				var str='';
				var mark=0;
				if(type=='cover'){
					for (var i=0;i<result.length;i++) {
						if(result[i].name=='封面'||result[i].name=='通用'){
							var dtosArr=result[i].dtos;
							for (var j=0;j<dtosArr.length;j++) {
								var weights=dtosArr[j].weights;
								for (var v=0;v<weights.length;v++) {
									var oTd;
									if(mark<3){
										oTd=$('#commonPaperTable2').find('tr').eq(0).find('td').eq(mark);
									}else{
										oTd=$('#commonPaperTable2').find('tr').eq(1).find('td').eq(mark-3);
									}
									console.log(dtosArr[j].name);
									oTd.attr('weight',weights[v].weight);
									oTd.attr('price',weights[v].price);
									oTd.attr('name',dtosArr[j].name);
									oTd.find('p').text(weights[v].weight+'克'+dtosArr[j].name);
										
									mark++;
								}
							}
						}
					}
				}else{
					console.log(result.length)
					for (var i=0;i<result.length;i++) {
						if(result[i].name=='内页'||result[i].name=='通用'){
							var dtosArr=result[i].dtos;
							console.log(dtosArr);
							for (var j=0;j<dtosArr.length;j++) {
								var weights=dtosArr[j].weights;
								for (var v=0;v<weights.length;v++) {
									var oTd;
									if(mark<3){
										oTd=$('#commonPaperTable2').find('tr').eq(0).find('td').eq(mark);
									}else{
										oTd=$('#commonPaperTable2').find('tr').eq(1).find('td').eq(mark-3);
									}
									console.log(dtosArr[j].name);
									oTd.attr('weight',weights[v].weight);
									oTd.attr('price',weights[v].price);
									oTd.attr('name',dtosArr[j].name);
									oTd.find('p').text(weights[v].weight+'克'+dtosArr[j].name);
										
									mark++;
								}
							}
						}
					}
				}
				
			}
		}
	});
}
document.querySelector('input').scrollIntoView();
		var index = 0;
		 $('.requirement2').on('tap','.checkbox-img',function(e){
		 			e.preventDefault();
					e.stopPropagation()
					console.log('测试'+$(this).siblings('.img-checkbox').attr('checked'));
					if($(this).siblings('.img-checkbox').attr('checked')==undefined || $(this).siblings('.img-checkbox').attr('checked')=='undefined'){
						$(this).siblings('.img-checkbox').attr('checked',true);
						$(this).attr('src','img/radion02.png');
						if($(this).attr('sign')=='leKou'){
							var pagesNum=parseInt($(this).parents('.requirement2').find('.pages-num').val())+4;
							$(this).parents('.requirement2').find('.pages-num').val(pagesNum);
						}
					}else{
						$(this).siblings('.img-checkbox').attr('checked',false);
						$(this).attr('src','img/radion01.png');
						//点击自带纸按钮  取消自带纸张
						if($(this).attr('sign')=='leKou'){
							var pagesNum=parseInt($(this).parents('.requirement2').find('.pages-num').val())-4;
							$(this).parents('.requirement2').find('.pages-num').val(pagesNum<0?0:pagesNum);
						}
					}
				});	
		
		$('.back3').on('click',function(){
			if(offerParaJson.binging.bindStyle=='硬面精装' || offerParaJson.binging.bindStyle=='软面精装'){
				swiper.slideTo(3);
			}else{
				swiper.slideTo(2);
			}
		})
		$('.back5').on('click',function(){
			swiper.slideTo(1);
		})
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
			}]);
 
			$(".requirement2 .handle").off('tap').on('tap', function(event) {
				// 默认第一层显示第1项;第二层显示第2项
//				var index = $(this).attr('index');
//				console.log(index)
				event.preventDefault();
				event.stopPropagation()
				var _this = this
				picker.pickers[0].setSelectedIndex(0);
				picker.pickers[1].setSelectedIndex(2);
				picker.show(function(selectItems) {
					var text1 = selectItems[0].text;
					var text2 = selectItems[1].text;
					$(_this).find('.select').val(text1);
					$(_this).find('.val').val(text2)
				})
				// picker.dispose();
			});
		}
        
       
//		//点击添加内页的按钮
//		$('.requirement2').on('tap','.add-papers-icon',function(e){
//			e.preventDefault();
//			e.stopPropagation()
//			var sign=$(this).attr('sign');
//			var standardNum=0;
//			if(sign=='inside'){
//				standardNum=2;
//			}else if(sign=='materials'){
//				standardNum=3;
//			}else{
//				standardNum=4;
//			}
//			var index=$(this).attr('index');
//			if(index>standardNum){
//				layer.msg("最多只能添加3种内页呦！",{offset: '80%'});
//			}else{
//				$('.requirement2').eq(index).css('display','block');
//				$(this).attr('index',Number(index)+1);
//			}
//		});
		$('#nextButton2').off().on('tap',function(e){
			e.preventDefault();
			e.stopPropagation()
			var mark=$(this).attr('sign');
			console.log(111);
			var sellerId = localStorage.getItem('sellerId');
			console.log(sellerId);
			var memberId = localStorage.getItem('memberId');
			var offerParaJson=JSON.parse(sessionStorage.getItem('offerParaJson'));
			console.log(JSON.stringify(offerParaJson))
			var productType = '画册';
			var bindingStyle = offerParaJson.binging.bindStyle;
			var pageWidth = offerParaJson.sizestr.pageWidth;
			var pageHeight = offerParaJson.sizestr.pageHeight;
			var pageSize = offerParaJson.sizestr.pageSize;
			var pageSizeCh = offerParaJson.sizestr.pageSizeCh;
			console.log(bindingStyle);
			console.log(sessionStorage.getItem('offerParaJson')+'测试1');
			var paperArr=[];
			var falseMark=0;
			console.log($('#bookNum').val());
			if($('#bookNum').val() != undefined){
				var bookNum =Number($('#bookNum').val());
			}
			
			$('.requirement2:visible').each(function(){
				//判断数据的合理性
				var insidePaper = 0;
				if($(this).find('.input_check').is(':checked')){
					insidePaper = 1;
				}else{
					insidePaper = 0;
					falseMark=judgeEmpty2($(this),falseMark);
				}
				
				var paperJson={};
//				paperJson.dunWeiJia=$(this).find('.paper-keZhong').find('option:selected').attr('price');
//				paperJson.keZhong=$(this).find('.paper-keZhong').find('option:selected').text();
//				paperJson.type=$(this).find('.paper-type').val();
				if($(this).find('.paper-keZhong').find('option:selected').attr('price')==null){
					var selfPaperNormal = Number($(this).find('.paper-keZhong').find('option:selected').attr('selfPaperNormal'))
					if(selfPaperNormal == 2){
						paperJson.selfPaperName  = $(this).find('.paper-type').val();
						paperJson.selfPaperWidth = $(this).find('.paper-keZhong').find('option:selected').attr('selfPaperWidth');
						paperJson.selfPaperLength = $(this).find('.paper-keZhong').find('option:selected').attr('selfPaperLength')
						paperJson.selfPaperWeight = $(this).find('.paper-keZhong').find('option:selected').text();
						paperJson.dunWeiJia = 0;
						paperJson.keZhong = 0;
						paperJson.type = '';
						paperJson.selfPaperColor= $(this).find('.paper-keZhong').find('option:selected').attr('selfPaperColor');
						paperJson.selfPaperNormal= Number($(this).find('.paper-keZhong').find('option:selected').attr('selfPaperNormal'));
					}else{
						paperJson.selfPaperName  = $(this).find('.paper-type').val();
						paperJson.selfPaperPrice = $(this).find('.paper-keZhong').find('option:selected').attr('selfPaperPrice')
						paperJson.selfPaperWeight = $(this).find('.paper-keZhong').find('option:selected').text();
	//					paperJson.isSelfPaper = 1;
						paperJson.dunWeiJia = 0;
						paperJson.keZhong = 0;
						paperJson.type = '';
						paperJson.selfPaperColor= $(this).find('.paper-keZhong').find('option:selected').attr('selfPaperColor');
						paperJson.selfPaperNormal= Number($(this).find('.paper-keZhong').find('option:selected').attr('selfPaperNormal'));
					}
				}else{
					paperJson.dunWeiJia=$(this).find('.paper-keZhong').find('option:selected').attr('price');
					paperJson.keZhong=$(this).find('.paper-keZhong').find('option:selected').text();
					paperJson.type=$(this).find('.paper-type').val();
//					paperJson.isSelfPaper = 0;
					paperJson.selfPaperName ='';
					paperJson.selfPaperPrice ='0';
					paperJson.selfPaperWeight = 0;
					paperJson.selfPaperColor = '';
					paperJson.selfPaperNormal = 0;
				}
				if($(this).find('.input_check').is(':checked')){
					paperJson.isSelfPaper = 1;
				}else{
					paperJson.isSelfPaper = 0;
				}
//				paperJson.ifmySelf=$(this).find('.if-myself-paper').attr('checked');
//				paperJson.myselfKeZhong=$(this).find('.myself-paper-keZhong').val();
//				paperJson.myselfType=$(this).find('.myself-paper-type').val();
				paperJson.danShuang=$(this).find('.select').val();
				console.log(paperJson.danShuang);
				paperJson.surface=$(this).find('.val').val();
				paperJson.special=$(this).find('.special-tech-value').html();
				paperJson.pagesNum=$(this).find('.pages-num').val();
				paperJson.spreadPages=$(this).find('.layePages-num').val();
//				paperJson.ifLaYe=$(this).find('.if-laye').attr('checked');
//				paperJson.laYeNum=$(this).find('.laye-pages-num').val();
				paperJson.color1=$(this).find('.color1').val();
				paperJson.color2=$(this).find('.color2').val();
				paperJson.spotColor=$(this).find('.spot-color').val();
				console.log(paperJson.spotColor);
				paperJson.foldNum=$('#foldNum').find('input').val();//折页的折数
				paperJson.typeNum=$('#typeNum').find('input').val();//单页的品种数
				if(insidePaper == 0){
					paperArr.push(paperJson);
				}
			});
			console.log(paperArr);
//			if(falseMark==1){
//				return false;
//			}
			console.log(sessionStorage.getItem('offerParaJson'));
			console.log(mark);
			if(mark=='cover'){
				offerParaJson.cover=paperArr;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
//				window.location='cover-papers.html';
				if(falseMark==1){
					swiper.allowSlideNext= false;
				}else{
					swiper.allowSlideNext= true;
					swiper.slideTo(1);  
				} 
//				swiper.slideTo(1);  
//				if(offerParaJson.binging.bindStyle=='硬面精装'||offerParaJson.binging.bindStyle=='软面精装'){
//					
//				}else{
//					window.location='inside-papers.html';
//				}
//				loadScript("js/pages/cover-papers.js") 
			}else if(mark=='linling'){
				offerParaJson.linling=paperArr;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
				console.log(sessionStorage.getItem('offerParaJson'))
//				window.location='lining-papers.html';
//				swiper.slideTo(2); 
				 
				if(falseMark==1){
					swiper.allowSlideNext= false;
				}else{
					swiper.allowSlideNext= true;
					swiper.slideTo(2); 
				}
				
//				loadScript("js/pages/lining-papers.js") 
			}else if(mark=='single'){
//				offerParaJson.single=paperArr;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
				//计算价格
				window.location='single-offer.html';
			}else if(mark=='edit'){
				offerParaJson.editing=paperArr;
				offerParaJson.inside=paperArr.slice(2,paperArr.length);
				offerParaJson.binging.bindStyle = $('.requirement').find('.danShuang-paper').find('option:selected').text();
				
				var bindingStyle = $('.requirement').find('.danShuang-paper').find('option:selected').text();
				offerParaJson.booknum = $('#bookNum').val();
				var pageWidth = $(".pagesizenum").attr('pagewidth');
				var pageHeight =  $(".pagesizenum").attr('pageheight');
				var pageSize = $(".size-paper option:selected").val();
				var pageSizeCh = $(".size-paper option:selected").text();
				offerParaJson.sizestr.pageWidth = pageWidth;
				offerParaJson.sizestr.pageHeight = pageHeight;
				offerParaJson.sizestr.pageSize = pageSize;
				offerParaJson.sizestr.pageSizeCh = pageSizeCh;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
				window.location = 'edit-single.html'
				console.log(JSON.parse(sessionStorage.getItem('offerParaJson')));
				uploadOffer(sellerId,memberId,productType,bindingStyle,pageSize,pageSizeCh,pageWidth,pageHeight,bookNum)
			}else if(mark == 'inside'){
				offerParaJson.inside=paperArr;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
				console.log(sessionStorage.getItem('offerParaJson')+'测试2');
				if(falseMark==1 || (offerParaJson.inside.length==0 && offerParaJson.linling.length==0)){
					swiper.slideTo(4,100,false);
					swiper.allowSlideNext= false;
					if(offerParaJson.inside.length==0 && offerParaJson.linling.length==0){
						mui.toast('请填写封面或内页内容');
					}
				}else{
					swiper.allowSlideNext= true;
					swiper.slideTo(5);
					loadScript("js/pages/edit-inquiry.js") 
				}
				 
//				loadScript("js/pages/edit-inquiry.js") 
			}
		});
		

		$('.requirement2').off('click').on('click','.papers-type',function(e){
					e.preventDefault();
					e.stopPropagation();
					var requirementstatus = 2;
					console.log(333);
					var status = $(this).attr('status');
					$('html').css('height',"100%");
					$('html').css('overflow','hidden');
					$('body').css('height',"100%");
					$('body').css('overflow','hidden');
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
					var divIndex=$('.requirement2').index($(this).parents('.requirement2'));
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
//				$('.requirement2').off('tap','.add-special-div')
				$('.requirement2').off('tap').on('tap','.add-special-div',function(e){
			e.preventDefault();
			e.stopPropagation();
			var status = 2;
			var divIndex1=$('.requirement2').index($(this).parents('.requirement2'));
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