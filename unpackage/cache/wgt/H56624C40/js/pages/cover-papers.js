$(document).ready(function(){
	var offerParaJson=JSON.parse(sessionStorage.getItem('offerParaJson'));
	getComPapers('cover',localStorage.getItem('sellerId'));
	 if(offerParaJson.binging.bindStyle=='硬面精装' || offerParaJson.binging.bindStyle=='软面精装'){
					$('.requirement1 .color2').val(0);
					$('.requirement1 .color2').attr('disabled','disabled');
					$('.requirement1 .color2').css('color','#C0C0C0');
				}else{
					$('.requirement1 .color2').val(4);
					$('.requirement1 .color2').removeAttr('disabled');
					$('.requirement1 .color2').css('color','#FF6F00');
				}
});
$('.back2').on('tap',function(){
	swiper.slideTo(1);
})
function getComPapers(type,sellerId){
	$.ajax({
		type:"post",
		url:ajaxUrlPath+"/mobile/paper/getAll",
		async:true,
		data:{'sellerId':sellerId},
		success:function(data){
			console.log(JSON.stringify(data));
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
										oTd=$('#commonPaperTable1').find('tr').eq(0).find('td').eq(mark);
									}else{
										oTd=$('#commonPaperTable1').find('tr').eq(1).find('td').eq(mark-3);
									}
									oTd.attr('weight',weights[v].weight);
//									oTd.data('dun',weights[v].price);
									oTd.attr('price',weights[v].price);
									oTd.attr('name',dtosArr[j].name);
									oTd.find('p').text(weights[v].weight+'克'+dtosArr[j].name);
										
									mark++;
								}
							}
						}
					}
				}else{
					for (var i=0;i<result.length;i++) {
						if(result[i].name=='内页'||result[i].name=='通用'){
							var dtosArr=result[i].dtos;
							console.log(dtosArr);
							for (var j=0;j<dtosArr.length;j++) {
								var weights=dtosArr[j].weights;
								for (var v=0;v<weights.length;v++) {
									var oTd;
									if(mark<3){
										oTd=$('#commonPaperTable1').find('tr').eq(0).find('td').eq(mark);
									}else{
										oTd=$('#commonPaperTable1').find('tr').eq(1).find('td').eq(mark-3);
									}
									oTd.data('weight',weights[v].weight);
									oTd.data('price',weights[v].price);
									oTd.data('name',dtosArr[j].name);
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


var offerParaJson = JSON.parse(sessionStorage.getItem('offerParaJson'));
		console.log(offerParaJson.linling);
		if(offerParaJson.linling != undefined ){
			console.log(2222);
			$('.cover').find('.paper-keZhong').find('option:selected').attr('price',offerParaJson.linling[0].dunWeiJia);
			$('.cover').find('.paper-keZhong').html('<option value="" selected="selected">'+offerParaJson.linling[0].keZhong+'</option>');
			$('.cover').find('.paper-type').val(offerParaJson.linling[0].type);
			$('.cover').find('.color1').val(offerParaJson.linling[0].color1)
			$('.cover').find('.color2').val(offerParaJson.linling[0].color2)
			$('.cover').find('.spot-color').val(offerParaJson.linling[0].spotColor)
			$('.cover').find('.pages-num').val(offerParaJson.linling[0].pagesNum);
			$('.cover').find('.select').val(offerParaJson.linling[0].danShuang)
			$('.cover').find('.val').val(offerParaJson.linling[0].surface)
//			$('.coverpage').find('.special-tech-value').html(offerParaJson.linling[0].special);
			if(offerParaJson.linling[0].ifLeKou!=undefined || offerParaJson.linling[0].ifLeKou != 'undefined'){
				$('.cover').find('.if-leKou').attr('checked',offerParaJson.linling[0].ifLeKou);
				if(offerParaJson.linling[0].ifLeKou == 'checked'){
					$('.cover').find('.checkbox-img').attr('src','img/radion02.png');
				}else{
					$('.cover').find('.checkbox-img').attr('src','img/radion01.png');
				}
			}
			
			$('.cover').find('.special-tech-value').html(offerParaJson.linling[0].special)
		}
			
//		var select = document.getElementById("select");
//      select.onchange=function(){
//          var selvalue = select.value;
//          var val = document.getElementById("val");
//          switch(selvalue){
//              case "single" : val.innerHTML="<option value='0.0125'>水性光油</option><option value='0.0175'>水性哑油</option><option value='0.075'>哑膜</option><option value='0.05' selected='selected'>光膜</option>";break;
//              case "dablue" : val.innerHTML="<option value='0.0125'>水性光油</option><option value='0.0175'>水性哑油</option><option value='0.075'>哑膜</option><option value='0.05' selected='selected'>光膜</option>";break;
//              default : alert("erro");
//          }
//      };
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
 
			$(".requirement1 .handle").off('tap').on('tap', function(event) {
				event.preventDefault();
				event.stopPropagation()
				// 默认第一层显示第1项;第二层显示第2项
				picker.pickers[0].setSelectedIndex(0);
				picker.pickers[1].setSelectedIndex(2);
				var _this = this;
				picker.show(function(selectItems) {
					var text1 = selectItems[0].text;
					var text2 = selectItems[1].text;
					$(_this).find('.select').val(text1);
					$(_this).find('.val').val(text2)
				})
				// picker.dispose();
			});
		}
       

		//点击添加内页的按钮
//		$('.requirement1 .container').on('tap click','.add-papers-icon',function(e){
//			e.preventDefault();
//			e.stopPropagation()
//			var sign=$(this).data('sign');
//			var standardNum=0;
//			if(sign=='inside'){
//				standardNum=2;
//			}else if(sign=='materials'){
//				standardNum=3;
//			}else{
//				standardNum=4;
//			}
//			var index=$(this).data('index');
//			if(index>standardNum){
//				layer.msg("最多只能添加3种内页呦！",{offset: '80%'});
//			}else{
//				$('.container').find('.requirement1').eq(index).css('display','block');
//				$(this).data('index',Number(index)+1);
//			}
//		});
		//点击下一步按钮
		$('#nextButton1').on('tap',function(e){
			e.preventDefault();
			e.stopPropagation()
			var mark=$(this).attr('sign');
			var sellerId = localStorage.getItem('sellerId');
			console.log(sellerId);
			var memberId = localStorage.getItem('memberId');
			var offerParaJson=JSON.parse(sessionStorage.getItem('offerParaJson'));
			var productType = '画册';
			var bindingStyle = offerParaJson.binging.bindStyle;
			var pageWidth = offerParaJson.sizestr.pageWidth;
			var pageHeight = offerParaJson.sizestr.pageHeight;
			var pageSize = offerParaJson.sizestr.pageSize;
			var pageSizeCh = offerParaJson.sizestr.pageSizeCh;
//			alert(bindingStyle);
			var paperArr=[];
			var falseMark=0;
			console.log($('#bookNum').val());
			if($('#bookNum').val() != undefined){
				var bookNum =Number($('#bookNum').val());
			}
			
			$('.requirement1:visible').each(function(){
				//判断数据的合理性
				console.log($(this));
				var nocoverPaper = 0;
//				alert($(this).find('.input_check').is(':checked'));
				if($(this).find('.input_check').is(':checked')){
					nocoverPaper = 1;
				}else{
					nocoverPaper = 0;
					falseMark=judgeEmpty1($(this),falseMark);
				}
//				falseMark=judgeEmpty1($(this),falseMark);
				
				var paperJson={};
				
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
				paperJson.ifLaYe=$(this).find('.if-leKou').attr('checked');
//				paperJson.laYeNum=$(this).find('.laye-pages-num').val();
				paperJson.color1=$(this).find('.color1').val();
				paperJson.color2=$(this).find('.color2').val();
				paperJson.spotColor=$(this).find('.spot-color').val();
				console.log(paperJson.spotColor);
				paperJson.foldNum=$('#foldNum').find('input').val();//折页的折数
				paperJson.typeNum=$('#typeNum').find('input').val();//单页的品种数
				if(nocoverPaper == 0){
					paperArr.push(paperJson);
				}
			});
//			if(falseMark==1){
//				return false;
//			}
			console.log(mark);
			console.log(paperArr);
			if(mark=='cover'){
				offerParaJson.cover=paperArr;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
//				window.location='cover-papers.html';
				
//				if(falseMark==1){
//					swiper.allowSlideNext= false;
//				}else{
////					swiper.allowSlideNext= true;
//					console.log(bindingStyle+'测试');
//					if(offerParaJson.binging.bindStyle=='硬面精装' || offerParaJson.binging.bindStyle=='软面精装'){
//						swiper.slideTo(3,1000,false);  
//					}else{
//						swiper.slideTo(4,1000,false); 
//					}
//					
//					
//				}
				   
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
				if(falseMark==1){
					swiper.allowSlideNext= false;
				}else{
//					swiper.allowSlideNext = false;
			    			var offerParaJson=JSON.parse(sessionStorage.getItem('offerParaJson'));
			    			console.log(offerParaJson.binging.bindStyle);
			    			if(offerParaJson.binging.bindStyle=='硬面精装' || offerParaJson.binging.bindStyle=='软面精装'){
//								alert(111);
								swiper.slideTo(3,1000,false);
								
							}else{
//								alert(222);
								swiper.slideTo(4,100,false); 
							}
					
				}
				   
				 
				loadScript("js/pages/lining-papers.js") 
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
			}else{
				offerParaJson.inside=paperArr;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
				console.log(JSON.parse(sessionStorage.getItem('offerParaJson')));
//				window.location='inquiry-papers.html';
				
				if(falseMark==1){
					swiper.allowSlideNext= false;
				}else{
					swiper.allowSlideNext= true;
					swiper.slideTo(3);  
				}
				
//				loadScript("js/pages/edit-inquiry.js") 
			}
		});