	var orderlist = new Array();
	// 旧
	// const ajaxUrlPath = "http://mobile.zhihehui.1000ways.cn";
	// 新
	const ajaxUrlPath = "http://newmobile.1000ways.cn";
	// alert(plus.push.getClientInfo().clientid)
	
	$('input[type=number]').keyup(function(e) {
			this.value=this.value.replace(/D/g,'')
		});
	var originalHeight=document.documentElement.clientHeight || document.body.clientHeight;

	window.onresize=function(){
	
	    //软键盘弹起与隐藏  都会引起窗口的高度发生变化
	    var  resizeHeight=document.documentElement.clientHeight || document.body.clientHeight;
	
	    if(resizeHeight*1<originalHeight*1){ //resizeHeight<originalHeight证明窗口被挤压了
	        $('.mui-bar').css('display','none');
	    }else{
	        $('.mui-bar').css('display','block');
	    }
	}
	
	//获取url中的参数方法
	function getUrlParam(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	    if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	function loadScript(url){
		var script=document.createElement('script');
		script.type="text/javascript";
		script.src=url;
		document.body.appendChild(script);
	}
//	$('input,textarea').on('blur',function(){
////	  console.log(parent.$('body'));
//	  parent.$('body').scrollTop(0);
//	  window.scroll(0,0);
//	  $('body').scrollTop(0);
//	});
//	$('select').on('change',function(){
//		parent.$('body').scrollTop(0);
//	  window.scroll(0,0);
//	});

	//Utf8转成中文
	function getCharFromUtf8(str) {  
	    var cstr = "";  
	    var nOffset = 0;  
	    if (str == "")  
	        return "";  
	    str = str.toLowerCase();  
	    nOffset = str.indexOf("%e");  
	    if (nOffset == -1)  
	        return str;  
	    while (nOffset != -1) {  
	        cstr += str.substr(0, nOffset);  
	        str = str.substr(nOffset, str.length - nOffset);  
	        if (str == "" || str.length < 9)  
	            return cstr;  
	        cstr += utf8ToChar(str.substr(0, 9));  
	        str = str.substr(9, str.length - 9);  
	        nOffset = str.indexOf("%e");  
	    }
	    return cstr;  
	}
	
	//将编码转换成字符  
	document.body.addEventListener('touchmove', function (event) {
	    event.preventDefault();
	}, false);
	function utf8ToChar(str) {  
	    var iCode, iCode1, iCode2;  
	    iCode = parseInt("0x" + str.substr(1, 2));  
	    iCode1 = parseInt("0x" + str.substr(4, 2));  
	    iCode2 = parseInt("0x" + str.substr(7, 2));  
	    return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));  
	}
	
	function displayData(dataJson,obj){
		obj.removeClass('hide');
		//显示封面的数据
		if(dataJson.ifLeKou=='checked'){
			obj.find('.le-kou-checkbox').attr('checked',true);
			obj.find('.le-kou-checkbox').siblings('img').attr('src','img/radion02.png');
		}
		if(dataJson.ifLaYe=='checked'){
			obj.find('.if-laye').attr('checked',true);
			obj.find('.if-laye').siblings('img').attr('src','img/radion02.png');
			obj.find('.laye-pages-div').removeClass('hide');
			obj.find('.laye-pages-num').val(dataJson.laYeNum);
		}
		obj.find('.pages-num').val(dataJson.pagesNum);
		obj.find('.color1').val(dataJson.color1);
		obj.find('.color2').val(dataJson.color2);
		if(dataJson.spotColor!=''){
			obj.find('.spot-color-div').removeClass('hide');
			obj.find('.spot-color').val(dataJson.spotColor);
		}
		obj.find('.paper-keZhong').empty().append('<option value="'+dataJson.dunWeiJia+'">'+dataJson.keZhong+'</option>');
		obj.find('.paper-type').val(dataJson.type);
		if(dataJson.ifmySelf=='checked'){
			obj.find('.myself-paper-checkbox').attr('checked',true);
			obj.find('.myself-paper-checkbox').siblings('img').attr('src','img/radion02.png');
			obj.find('.myself-paper-div').removeClass('hide');
			obj.find('.myself-paper-keZhong').val(dataJson.myselfKeZhong);
			obj.find('.myself-paper-type').val(dataJson.myselfType);
		}
		obj.find('.danShuang-paper').val(dataJson.danShuang);
		obj.find('.surface-handle-tech').val(dataJson.surface);
		if(dataJson.special!=''){
			obj.find('.special-tech-value').removeClass('hide').html(dataJson.special);
		}
		//控制折页和单页的显示
		if(dataJson.typeNum!=''){
			//单页
			obj.find('.type-pages-num').val(dataJson.typeNum);
		}else{
			//折页
			obj.find('.requirement-title').text('折页');
			obj.find('.type-pages-div').find('span').text('折数');
			obj.find('.type-pages-num').val(dataJson.foldNum);
		}
	}
	
	function judgeEmpty1(obj,falseMark){
		console.log(obj.find('input.select'));
		console.log(obj.find('input.select').val());
		//判断信息是否填写完整

		if(obj.find('.paper-type').val()==''){
			layer.msg('请选择纸张',{offset:'80%'});
			falseMark=1;
			return falseMark;
		}
		if(obj.find('.myself-paper-div').is(":hidden")==false){
			if(obj.find('.myself-paper-keZhong').val()==''){
				layer.msg('请填写自带纸张的克重',{offset:'80%'});
				falseMark=1;
				return falseMark;
			}
			if(obj.find('.myself-paper-type').val()==''){
				layer.msg('请填写自带纸张的类型',{offset:'80%'});
				falseMark=1;
				return falseMark;
			}
		}
		
		
		if(obj.find('.pages-num').val()==''||obj.find('.pages-num').val()<0){
			layer.msg('请填写页面页数',{offset:'80%'});
			falseMark=1;
			return falseMark;
		}
		
		if(obj.find('.color1').val()==''||obj.find('.color2').val()==''){
			layer.msg('请填写印刷色数',{offset:'80%'});
			falseMark=1;
			return falseMark;
		}
		
		
		if(obj.find('.laye-pages-div').is(":hidden")==false){
			if(obj.find('.laye-pages-num').val()==''){
				layer.msg('请填写拉页页数',{offset:'80%'});
				falseMark=1;
				return falseMark;
			}
		}
		if(obj.find('.spot-color-div').is(":hidden")==false){
			if(obj.find('.spot-color').val()==''){
				layer.msg('请填写专色',{offset:'80%'});
				falseMark=1;
				return falseMark;
			}
		}
		
		
	}
	function judgeEmpty2(obj,falseMark){
		//判断信息是否填写完整

		if(obj.find('.paper-type').val()==''){
			layer.msg('请选择纸张',{offset:'80%'});
			falseMark=1;
			return falseMark;
		}
		if(obj.find('.myself-paper-div').is(":hidden")==false){
			if(obj.find('.myself-paper-keZhong').val()==''){
				layer.msg('请填写自带纸张的克重',{offset:'80%'});
				falseMark=1;
				return falseMark;
			}
			if(obj.find('.myself-paper-type').val()==''){
				layer.msg('请填写自带纸张的类型',{offset:'80%'});
				falseMark=1;
				return falseMark;
			}
		}
		
		
		if(obj.find('.pages-num').val()==''||obj.find('.pages-num').val()<0){
			layer.msg('请填写页面页数',{offset:'80%'});
			falseMark=1;
			return falseMark;
		}
		
		if(obj.find('.color1').val()==''||obj.find('.color2').val()==''){
			layer.msg('请填写印刷色数',{offset:'80%'});
			falseMark=1;
			return falseMark;
		}
		
		
		if(obj.find('.laye-pages-div').is(":hidden")==false){
			if(obj.find('.laye-pages-num').val()==''){
				layer.msg('请填写拉页页数',{offset:'80%'});
				falseMark=1;
				return falseMark;
			}
		}
		if(obj.find('.spot-color-div').is(":hidden")==false){
			if(obj.find('.spot-color').val()==''){
				layer.msg('请填写专色',{offset:'80%'});
				falseMark=1;
				return falseMark;
			}
		}
		
	}
	function judgeEmpty3(obj,falseMark){

		//判断信息是否填写完整
		
		if($('#bookNum').val()==''||$('#bookNum').val()<=0){
			layer.msg('请填写印刷数量',{offset:'80%'});
			falseMark=1;
			return falseMark;
		}
		
	}
	
	
	
	
	$(document).ready(function(){
		var offerParaJson=JSON.parse(sessionStorage.getItem('offerParaJson'));
		//选择表格中的纸张
		$('#commonPaperTable1').on('tap click','td',function(e){
			e.preventDefault();
			e.stopPropagation()
			if($(this).attr('name')!=undefined){
				$(this).siblings('td').children('p').removeClass('selected');
				$(this).find('p').addClass('selected').siblings('td').removeClass('selected').parent('tr').siblings('tr').children().find('p').removeClass('selected');
				$(this).parent('tr').siblings('tr').children().find('p').removeClass('selected');
				var keZhong=$(this).attr('weight');
				var duiWeiJia=$(this).attr('price');
				console.log(duiWeiJia);
				var paperType=$(this).attr('name');
				var $containerOne=$('.requirement1').eq(0);
				var optionS='<option value="'+duiWeiJia+'" price="'+duiWeiJia+'">'+keZhong+'</option>';
				$containerOne.find('.selfcolor').remove();
				$containerOne.find('.paper-keZhong').empty().append(optionS);
				$containerOne.find('.paper-type').val(paperType);
				$containerOne.find('.paper-type').css('width','40%')
			}
		});
		$('#commonPaperTable2').on('tap click','td',function(e){
			e.preventDefault();
			e.stopPropagation()
			if($(this).attr('name')!=undefined){
				$(this).siblings('td').children('p').removeClass('selected');
				$(this).find('p').addClass('selected').siblings('td').removeClass('selected').parent('tr').siblings('tr').children().find('p').removeClass('selected');
				$(this).parent('tr').siblings('tr').children().find('p').removeClass('selected');
				var keZhong=$(this).attr('weight');
				var duiWeiJia=$(this).attr('price');
				console.log(duiWeiJia);
				var paperType=$(this).attr('name');
				var $containerOne=$('.requirement2').eq(0);
				var optionS='<option value="'+duiWeiJia+'" price="'+duiWeiJia+'">'+keZhong+'</option>';
				$containerOne.find('.selfcolor').remove();
				$containerOne.find('.paper-type').css('width','35%');
				$containerOne.find('.paper-keZhong').empty().append(optionS);
				$containerOne.find('.paper-type').val(paperType);
			}
		});
	
		//点击图片，checkbox选中
		
//		$('.requirement').on('tap','.checkbox-img',function(){
//			console.log($(this).siblings('.img-checkbox').attr('checked'));
//			if($(this).siblings('.img-checkbox').attr('checked')==undefined || $(this).siblings('.img-checkbox').attr('checked')=='undefined'){
//				$(this).siblings('.img-checkbox').attr('checked',true);
//				$(this).attr('src','img/radion02.png');
//				if($(this).attr('sign')=='leKou'){
//					var pagesNum=parseInt($(this).parents('.requirement').find('.pages-num').val())+4;
//					$(this).parents('.requirement').find('.pages-num').val(pagesNum);
//				}
//			}else{
//				$(this).siblings('.img-checkbox').attr('checked',false);
//				$(this).attr('src','img/radion01.png');
//				//点击自带纸按钮  取消自带纸张
//				if($(this).attr('sign')=='leKou'){
//					var pagesNum=parseInt($(this).parents('.requirement').find('.pages-num').val())-4;
//					$(this).parents('.requirement').find('.pages-num').val(pagesNum<0?0:pagesNum);
//				}
//			}
//		});
		
		//点击选择纸张的按钮，跳出纸张的弹出框
		$('.requirement1').on('tap','.papers-type',function(e){
			e.preventDefault();
			e.stopPropagation()
			console.log(333);
			$('html').css('height',"100%");
			$('html').css('overflow','hidden');
			$('body').css('height',"100%");
			$('body').css('overflow','hidden');
			var status = $(this).attr('status');
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
			
			var requirementstatus = 1;
			var divIndex=$('.requirement1').index($(this).parents('.requirement1'));
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
//		$('.requirement2').on('tap','.papers-type',function(e){
//			e.preventDefault();
//			e.stopPropagation()
//			console.log(333);
//			$('html').css('height',"100%");
//			$('html').css('overflow','hidden');
//			$('body').css('height',"100%");
//			$('body').css('overflow','hidden');
//			var status = $(this).attr('status');
//			var requirementstatus = 2;
//			var divIndex=$('.requirement2').index($(this).parents('.requirement2'));
//			console.log(divIndex);
////			console.log("divIndex"+divIndex);
//			layer.open({
//			  type: 2,
//			  skin: 'demo-class',
//			  area: ['95%','90%'], //宽高
////			  offset: '10%',
////			  scrollbar: false,
//			  title:"<small>选择纸张</small>",
////			  shadeClose:true,
//			  closeBtn:2,
//			  content: 'select-papers.html?sellerId='+getUrlParam('sellerId')+'&status='+status,
//			  success: function(layero, index){
//			  	$(layero).addClass("scroll-wrapper");
//			    var body = layer.getChildFrame('body', index);
//			    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
//				body.find('#sureButton').attr('sign',divIndex);
//				body.find('#sureButton2').attr('sign',divIndex);
//				body.find('#sureButton').attr('requirementstatus',requirementstatus);
//			  	body.find('#sureButton2').attr('requirementstatus',requirementstatus);
//			  },
//			  end:function(){
//			  	$('html').css('height',"auto");
//			  	$('html').css('overflow','auto');
//			  	$('body').css('height',"auto");
//			  	$('body').css('overflow','auto');
//			  }
//			});
//		});
		$('.requirement3').on('tap','.papers-type',function(e){
			e.preventDefault();
			e.stopPropagation()
			console.log(333);
			$('html').css('height',"100%");
			$('html').css('overflow','hidden');
			$('body').css('height',"100%");
			$('body').css('overflow','hidden');
			var status = $(this).attr('status');
			var requirementstatus = 3;
			var divIndex=$('.requirement3').index($(this).parents('.requirement3'));
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
		var mo=function(e){e.preventDefault();};
		/*禁止滑动*/
		function stop(){
	        document.body.style.overflow='hidden';        
	        document.addEventListener("touchmove",mo,false);//禁止页面滑动
		}
		/*取消滑动限制*/
		function move(){
	        document.body.style.overflow='';//出现滚动条
	        document.removeEventListener("touchmove",mo,false);        
		}
		
		
		
		
		//控制专色输入框的的显示	    
		$('.requirement').on('blur','.color1,.color2',function(){
			var $parent=$(this).parents('.requirement').find('.spot-color-div');
			if($(this).val()>4){
				$parent.show();
			}else{
				if($(this).siblings('input').val()<=4){
					$parent.hide().find('input').val('');
				}
			}
		});
		
		
		
		
		

		$('#nextButton3').on('tap',function(){
			var mark=$(this).attr('sign');
//			alert(mark);
			var sellerId = localStorage.getItem('sellerId');
			console.log(sellerId);
			var memberId = localStorage.getItem('memberId');
			var offerParaJson=JSON.parse(sessionStorage.getItem('offerParaJson'));
			console.log(JSON.stringify(offerParaJson));
			var productType = '画册';
			var bindingStyle = offerParaJson.binging.bindStyle;
			var pageWidth = offerParaJson.sizestr.pageWidth;
			var pageHeight = offerParaJson.sizestr.pageHeight;
			var pageSize = offerParaJson.sizestr.pageSize;
			var pageSizeCh = offerParaJson.sizestr.pageSizeCh;
			var memo = $('#memo').val();
			var isPlasticSeal = 0;
			console.log($('#sufeng input').is(':checked'));
			if($('#sufeng input').is(':checked')){
				isPlasticSeal = 1
			}else{
				isPlasticSeal = 0;
			}
			console.log(isPlasticSeal);
			var paperArr=[];
			var coverpageArr = [];
			var insidepageArr = [];
			var huanchenpageArr = [];
			var falseMark=0;
			console.log($('#bookNum').val());
			if($('#bookNum').val() != undefined){
				var bookNum =Number($('#bookNum').val());
			}
			offerParaJson['ordername']={
							liningPaperMethod:0
			}
			$('.requirement3:visible').each(function(){
				//判断数据的合理性
				console.log($(this));
//				falseMark=judgeEmpty3($(this),falseMark);
//				if(falseMark==1){
//					return false;
//				}
				var paperJson={};
				
				if($(this).find('.paper-keZhong').find('option:selected').attr('price')==null){
					paperJson.selfPaperName  = $(this).find('.paper-type').val();
					paperJson.selfPaperPrice = $(this).find('.paper-keZhong').find('option:selected').attr('selfPaperPrice')
					paperJson.selfPaperWeight = $(this).find('.paper-keZhong').find('option:selected').text();
//					paperJson.isSelfPaper = 1;
					paperJson.dunWeiJia = 0;
					paperJson.keZhong = 0;
					paperJson.type = '';
					paperJson.selfPaperColor= $(this).find('.paper-keZhong').find('option:selected').attr('selfPaperColor');
					paperJson.selfPaperNormal= Number($(this).find('.paper-keZhong').find('option:selected').attr('selfPaperNormal'));
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
//				paperJson.ifmySelf=$(this).find('.if-myself-paper').attr('checked');
//				paperJson.myselfKeZhong=$(this).find('.myself-paper-keZhong').val();
//				paperJson.myselfType=$(this).find('.myself-paper-type').val();
				paperJson.danShuang=$(this).find('.select').val();
				console.log(paperJson.danShuang);
				paperJson.surface=$(this).find('.val').val();
				paperJson.special=$(this).find('.special-tech-value').html();
				paperJson.pagesNum=$(this).find('.pages-num').val();
				paperJson.spreadPages=$(this).find('.layePages-num').val();
//				paperJson.hasSpread=$(this).find('.if-leKou').attr('checked');
				if($(this).find('.if-leKou').attr('checked') == 'checked'){
					paperJson['hasSpread'] = 1
				}else{
					paperJson['hasSpread'] = 0
				}
				console.log($(this).find('.input_check').is(':checked'));
				if($(this).find('.input_check').is(':checked')){
					paperJson.isSelfPaper = 1;
				}else{
					paperJson.isSelfPaper = 0;
				}
//				console.log($(this).find('.del').text())
				paperJson.name = $(this).find('.del').text();
				
//				paperJson.laYeNum=$(this).find('.laye-pages-num').val();
				paperJson.color1=$(this).find('.color1').val();
				paperJson.color2=$(this).find('.color2').val();
				paperJson.spotColor=$(this).find('.spot-color').val();
				console.log(paperJson.spotColor);
				paperJson.foldNum=$('#foldNum').find('input').val();//折页的折数
				paperJson.typeNum=$('#typeNum').find('input').val();//单页的品种数
				if($(this).attr('type')==1){
					coverpageArr.push(paperJson);
				}else if($(this).attr('type') == 2){
					insidepageArr.push(paperJson);
				}else if($(this).attr('type') == 3){
					if($("#lining input").is(':checked')){
						huanchenpageArr = [];
						offerParaJson['ordername']={
							liningPaperMethod:2
						}
					}else{
						offerParaJson['ordername']={
							liningPaperMethod:1
						}
						huanchenpageArr.push(paperJson)
					}
					
				}
				paperArr.push(paperJson);
			});
//			if(falseMark==1){
//				return false;
//			}
			
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
//				if(offerParaJson.binging.bindStyle=='硬面精装'||offerParaJson.binging.bindStyle=='软面精装'){
//					
//				}else{
//					window.location='inside-papers.html';
//				}
			}else if(mark=='linling'){
				offerParaJson.linling=paperArr;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
				console.log(sessionStorage.getItem('offerParaJson'))
//				window.location='lining-papers.html';
				if(falseMark==1){
					swiper.allowSlideNext= false;
				}else{
					swiper.allowSlideNext= true;
					swiper.slideTo(2);
				}
			}else if(mark=='single'){
//				offerParaJson.single=paperArr;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
				//计算价格
				window.location='single-offer.html';
			}else if(mark=='edit'){
				offerParaJson.editing=paperArr;
				offerParaJson.inside=insidepageArr;
				offerParaJson.linling = coverpageArr;
				offerParaJson.huanchen = huanchenpageArr
				offerParaJson.binging.bindStyle = $('.requirement').find('.danShuang-paper').find('option:selected').text();
				offerParaJson.isPlasticSeal = isPlasticSeal;
				var bindingStyle = $('.requirement').find('.danShuang-paper').find('option:selected').text();
				offerParaJson.booknum = $('#bookNum').val();
				var pageWidth = $(".pagesizenum").attr('pagewidth');
				var pageHeight =  $(".pagesizenum").attr('pageheight');
				var pageSize = pageSize;
				console.log(pageSize);
				var pageSizeCh = pageSizeCh;
				var memo = $('#memo').val();
				offerParaJson.memo = memo;
				offerParaJson.sizestr.pageWidth = pageWidth;
				offerParaJson.sizestr.pageHeight = pageHeight;
				offerParaJson.sizestr.pageSize = pageSize;
				offerParaJson.sizestr.pageSizeCh = pageSizeCh;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
//				window.location = 'edit-single.html'
				console.log(JSON.parse(sessionStorage.getItem('offerParaJson')));
				uploadOffer(sellerId,memberId,productType,bindingStyle,pageSize,pageSizeCh,pageWidth,pageHeight,bookNum,memo,isPlasticSeal)
			}else{
				offerParaJson.inside=insidepageArr;
				offerParaJson.linling = coverpageArr;
				offerParaJson.huanchen = huanchenpageArr
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
				console.log(JSON.parse(sessionStorage.getItem('offerParaJson')));
//				window.location='inquiry-papers.html';
				if(falseMark==1){
					swiper.allowSlideNext= false;
				}else{
					swiper.allowSlideNext= true;
					swiper.slideTo(3);
				}

				
			}
		});
		
		$('#nextButton4').on('tap',function(){
			var mark=$(this).attr('sign');
//			alert(mark);
			var sellerId = localStorage.getItem('sellerId');
			console.log(sellerId);
			var memberId = localStorage.getItem('memberId');
			var offerParaJson=JSON.parse(sessionStorage.getItem('offerParaJson'));
			console.log(JSON.stringify(offerParaJson));
			var productType = '画册';
			var bindingStyle = offerParaJson.binging.bindStyle;
//			var pageWidth = offerParaJson.sizestr.pageWidth;
//			var pageHeight = offerParaJson.sizestr.pageHeight;
//			var pageSize = offerParaJson.sizestr.pageSize;
//			var pageSizeCh = offerParaJson.sizestr.pageSizeCh;
			var pageWidth = $('.pagesizenum').attr('pageWidth');
				var pageHeight = $('.pagesizenum').attr('pageHeight');
				var pageSize = $('.size-paper option:selected').val();
				var pageSizeCh = $('.size-paper option:selected').text();
				if(pageWidth==0){
					pageWidth = $('#pagewidth').val();
					pageHeight = $('#pageheight').val();
				}
//				offerParaJson.sizestr.pageWidth = pageWidth;
//				offerParaJson.sizestr.pageHeight = pageHeight;
//				offerParaJson.sizestr.pageSize = pageSize;
//				offerParaJson.sizestr.pageSizeCh = pageSizeCh;
			var memo = $('#memo').val();
			var isPlasticSeal = 0;
			console.log($('#sufeng input').is(':checked'));
			if($('#sufeng input').is(':checked')){
				isPlasticSeal = 1
			}else{
				isPlasticSeal = 0;
			}
			console.log(isPlasticSeal);
			var paperArr=[];
			var coverpageArr = [];
			var insidepageArr = [];
			var huanchenpageArr = [];
			var falseMark=0;
			console.log($('#bookNum').val());
			if($('#bookNum').val() != undefined){
				var bookNum =Number($('#bookNum').val());
			}
			offerParaJson['ordername']={
							liningPaperMethod:0
			}
			$('.requirement3:visible').each(function(){
				//判断数据的合理性
				console.log($(this));
//				falseMark=judgeEmpty3($(this),falseMark);
//				if(falseMark==1){
//					return false;
//				}
				var paperJson={};
				
				if($(this).find('.paper-keZhong').find('option:selected').attr('price')==null){
					var selfPaperNormal = Number($(this).find('.paper-keZhong').find('option:selected').attr('selfPaperNormal'))
					if(selfPaperNormal == 2){
						paperJson.selfPaperName  = $(this).find('.paper-type').val();
						paperJson.selfPaperWidth = $(this).find('.papers-type').attr('selfPaperWidth');
						paperJson.selfPaperLength = $(this).find('.papers-type').attr('selfPaperLength')
						paperJson.selfPaperWeight = $(this).find('.paper-keZhong').find('option:selected').text();
						paperJson.dunWeiJia = 0;
						paperJson.keZhong = 0;
						paperJson.type = '';
						paperJson.isSpecialRequirement = 1,
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
//				paperJson.ifmySelf=$(this).find('.if-myself-paper').attr('checked');
//				paperJson.myselfKeZhong=$(this).find('.myself-paper-keZhong').val();
//				paperJson.myselfType=$(this).find('.myself-paper-type').val();
				paperJson.danShuang=$(this).find('.select').val();
				console.log(paperJson.danShuang);
				paperJson.surface=$(this).find('.val').val();
				paperJson.special=$(this).find('.special-tech-value').html();
				paperJson.pagesNum=$(this).find('.pages-num').val();
				paperJson.spreadPages=$(this).find('.layePages-num').val();
//				paperJson.hasSpread=$(this).find('.if-leKou').attr('checked');
				if($(this).find('.if-leKou').attr('checked') == 'checked'){
					paperJson['hasSpread'] = 1
				}else{
					paperJson['hasSpread'] = 0
				}
				console.log($(this).find('.input_check').is(':checked'));
				if($(this).find('.input_check').is(':checked')){
					paperJson.isSelfPaper = 1;
				}else{
					paperJson.isSelfPaper = 0;
				}
//				console.log($(this).find('.del').text())
				paperJson.name = $(this).find('.del').text();
				
//				paperJson.laYeNum=$(this).find('.laye-pages-num').val();
				paperJson.color1=$(this).find('.color1').val();
				paperJson.color2=$(this).find('.color2').val();
				paperJson.spotColor=$(this).find('.spot-color').val();
				console.log(paperJson.spotColor);
				paperJson.foldNum=$('#foldNum').find('input').val();//折页的折数
				paperJson.typeNum=$('#typeNum').find('input').val();//单页的品种数
				if($(this).attr('type')==1){
					coverpageArr.push(paperJson);
				}else if($(this).attr('type') == 2){
					insidepageArr.push(paperJson);
				}else if($(this).attr('type') == 3){
					if($("#lining input").is(':checked')){
						huanchenpageArr = [];
						offerParaJson['ordername']={
							liningPaperMethod:2
						}
					}else{
						offerParaJson['ordername']={
							liningPaperMethod:1
						}
						huanchenpageArr.push(paperJson)
					}
					
				}
				paperArr.push(paperJson);
			});
//			if(falseMark==1){
//				return false;
//			}
			
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
//				if(offerParaJson.binging.bindStyle=='硬面精装'||offerParaJson.binging.bindStyle=='软面精装'){
//					
//				}else{
//					window.location='inside-papers.html';
//				}
			}else if(mark=='linling'){
				offerParaJson.linling=paperArr;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
				console.log(sessionStorage.getItem('offerParaJson'))
//				window.location='lining-papers.html';
				if(falseMark==1){
					swiper.allowSlideNext= false;
				}else{
					swiper.allowSlideNext= true;
					swiper.slideTo(2);
				}
			}else if(mark=='single'){
//				offerParaJson.single=paperArr;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
				//计算价格
				window.location='single-offer.html';
			}else if(mark=='edit'){
				offerParaJson.editing=paperArr;
//				alert($('#nocoverPaper input').is(':checked'))
				if($('#nocoverPaper input').is(':checked')){
					offerParaJson.linling = [];
				}else{
					offerParaJson.linling = coverpageArr;
				}
				if($('#insidePapers input').is(':checked')){
					offerParaJson.inside=[];
				}else{
					offerParaJson.inside=insidepageArr;
				}
				offerParaJson.huanchen = huanchenpageArr
				offerParaJson.binging.bindStyle = $('.requirement').find('.danShuang-paper').find('option:selected').text();
				offerParaJson.isPlasticSeal = isPlasticSeal;
				var bindingStyle = $('.requirement').find('.danShuang-paper').find('option:selected').text();
				offerParaJson.booknum = $('#bookNum').val();
				var pageWidth = $(".pagesizenum").attr('pagewidth');
				var pageHeight =  $(".pagesizenum").attr('pageheight');
				var pageSize = pageSize;
				console.log(pageSize);
				var pageSizeCh = pageSizeCh;
				if(pageWidth==0){
					pageWidth = $('#pagewidth').val();
					pageHeight = $('#pageheight').val();
				}
				var memo = $('#memo').val();
				memo = memo.replace(/\n/g,'\\n');
				offerParaJson.memo = memo;
				offerParaJson.sizestr.pageWidth = pageWidth;
				offerParaJson.sizestr.pageHeight = pageHeight;
				offerParaJson.sizestr.pageSize = pageSize;
				offerParaJson.sizestr.pageSizeCh = pageSizeCh;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
//				window.location = 'edit-single.html'
				console.log(JSON.parse(sessionStorage.getItem('offerParaJson')));
				uploadOffer1(sellerId,memberId,productType,bindingStyle,pageSize,pageSizeCh,pageWidth,pageHeight,bookNum,memo,isPlasticSeal)
			}else{
				offerParaJson.inside=insidepageArr;
				offerParaJson.linling = coverpageArr;
				offerParaJson.huanchen = huanchenpageArr
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
				console.log(JSON.parse(sessionStorage.getItem('offerParaJson')));
//				window.location='inquiry-papers.html';
				if(falseMark==1){
					swiper.allowSlideNext= false;
				}else{
					swiper.allowSlideNext= true;
					swiper.slideTo(3);
				}

				
			}
		});
		$('#nextButton6').on('tap',function(){
			console.log('ceshi')
			var mark=$(this).attr('sign');
//			alert(mark);
			var sellerId = localStorage.getItem('sellerId');
			console.log(sellerId);
			var memberId = localStorage.getItem('memberId');
			var offerParaJson=JSON.parse(sessionStorage.getItem('offerParaJson'));
			var productType = '画册';
			var bindingStyle = offerParaJson.binging.bindStyle;
			var pageWidth = $('.pagesizenum').attr('pageWidth');
			var pageHeight = $('.pagesizenum').attr('pageHeight');
			var pageSize = $('.size-paper option:selected').val();
			var pageSizeCh = $('.size-paper option:selected').text();
			if(pageWidth==0){
				pageWidth = $('#pagewidth').val();
				pageHeight = $('#pageheight').val();
			}
			console.log(bindingStyle);
			var paperArr=[];
			var coverpaperArr=[];
			var insidepaperArr = [];
			var huanchenpaperArr = [];
			var falseMark=0;
			var memo = $('#memo').val();
			console.log($('#bookNum').val());
			if($('#bookNum').val() != undefined){
				var bookNum =Number($('#bookNum').val());
			}
			var isPlasticSeal = 0;
			console.log($('#sufeng input').is(':checked'));
			if($('#sufeng input').is(':checked')){
				isPlasticSeal = 1
			}else{
				isPlasticSeal = 0;
			}
			$('.requirement:visible').each(function(){
				//判断数据的合理性
				console.log($(this));
				console.log($(this).attr('type'));
//				falseMark=judgeEmpty3($(this),falseMark);
//				if(falseMark==1){
//					return false;
//				}
				var paperJson={};
//				paperJson.dunWeiJia=$(this).find('.paper-keZhong').find('option:selected').attr('price');
//				paperJson.keZhong=$(this).find('.paper-keZhong').find('option:selected').text();
//				paperJson.type=$(this).find('.paper-type').val();
//				paperJson.ifmySelf=$(this).find('.if-myself-paper').attr('checked');
//				paperJson.myselfKeZhong=$(this).find('.myself-paper-keZhong').val();
//				paperJson.myselfType=$(this).find('.myself-paper-type').val();
				console.log($(this).find('.paper-keZhong').find('option:selected').attr('price'))
				if($(this).find('.paper-keZhong').find('option:selected').attr('price')==null){
					var selfPaperNormal = Number($(this).find('.paper-keZhong').find('option:selected').attr('selfPaperNormal'))
					if(selfPaperNormal == 2){
						paperJson.selfPaperName  = $(this).find('.paper-type').val();
						paperJson.selfPaperWidth = $(this).find('.papers-type').attr('selfPaperWidth');
						paperJson.selfPaperLength = $(this).find('.papers-type').attr('selfPaperLength')
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
					paperJson.selfPaperNormal = '';
				}
				if($(this).find('.if-leKou').attr('checked') == 'checked'){
					paperJson['hasSpread'] = 1
				}else{
					paperJson['hasSpread'] = 0
				}
				if($(this).find('.input_check').is(':checked')){
					paperJson.isSelfPaper = 1;
				}else{
					paperJson.isSelfPaper = 0;
				}
				
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
				
				paperArr.push(paperJson);
				if($(this).attr('type')==1){
					coverpaperArr.push(paperJson);
				}else if($(this).attr('type') == 2){
					insidepaperArr.push(paperJson);
				}else if($(this).attr('type') == 3){
					if($('#lining input').is(':checked')){
						huanchenpaperArr = [];
						offerParaJson.ordername.liningPaperMethod=2;
					}else{
						huanchenpaperArr.push(paperJson);
						offerParaJson.ordername.liningPaperMethod=1;
					}
					
				}
			});
//			if(falseMark==1){
//				return false;
//			}
			
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
//				if(offerParaJson.binging.bindStyle=='硬面精装'||offerParaJson.binging.bindStyle=='软面精装'){
//					
//				}else{
//					window.location='inside-papers.html';
//				}
			}else if(mark=='linling'){
				offerParaJson.linling=paperArr;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
				console.log(sessionStorage.getItem('offerParaJson'))
//				window.location='lining-papers.html';
				if(falseMark==1){
					swiper.allowSlideNext= false;
				}else{
					swiper.allowSlideNext= true;
					swiper.slideTo(2);
				}
			}else if(mark=='single'){
//				offerParaJson.single=paperArr;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
				//计算价格
				window.location='single-offer.html';
			}else if(mark=='edit'){
				offerParaJson.linling = coverpaperArr;
				offerParaJson.editing=paperArr;
				offerParaJson.inside=insidepaperArr;
				offerParaJson.huanchen = huanchenpaperArr;
				offerParaJson.binging.bindStyle = $('.requirement').find('.danShuang-paper').find('option:selected').text();
				
				var bindingStyle = $('.requirement').find('.danShuang-paper').find('option:selected').text();
				offerParaJson.booknum = $('#bookNum').val();
				var memo = $('#memo').val();
				memo = memo.replace(/\n/g,'\\n');
				offerParaJson['memo'] = memo;
				var pageWidth = $(".pagesizenum").attr('pagewidth');
				var pageHeight =  $(".pagesizenum").attr('pageheight');
				var pageSize = $(".size-paper option:selected").val();
				var pageSizeCh = $(".size-paper option:selected").text();
				if(pageWidth==0){
					pageWidth = $('#pagewidth').val();
					pageHeight = $('#pageheight').val();
				}
				offerParaJson.sizestr.pageWidth = pageWidth;
				offerParaJson.sizestr.pageHeight = pageHeight;
				offerParaJson.sizestr.pageSize = pageSize;
				offerParaJson.sizestr.pageSizeCh = pageSizeCh;
				offerParaJson.isPlasticSeal = isPlasticSeal;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
//				window.location = 'edit-single.html'
				console.log(JSON.parse(sessionStorage.getItem('offerParaJson')));
				uploadOffer1(sellerId,memberId,productType,bindingStyle,pageSize,pageSizeCh,pageWidth,pageHeight,bookNum,memo,isPlasticSeal)
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

				
			}
		});
		$('#nextButton').on('tap',function(){
			console.log('ceshi')
			var mark=$(this).attr('sign');
//			alert(mark);
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
			console.log(bindingStyle);
			var paperArr=[];
			var coverpaperArr=[];
			var insidepaperArr = [];
			var huanchenpaperArr = [];
			var falseMark=0;
			var memo = $('#memo').val();
			console.log($('#bookNum').val());
			if($('#bookNum').val() != undefined){
				var bookNum =Number($('#bookNum').val());
			}
			var isPlasticSeal = 0;
			console.log($('#sufeng input').is(':checked'));
			if($('#sufeng input').is(':checked')){
				isPlasticSeal = 1
			}else{
				isPlasticSeal = 0;
			}
			$('.requirement:visible').each(function(){
				//判断数据的合理性
				console.log($(this));
				console.log($(this).attr('type'));
//				falseMark=judgeEmpty3($(this),falseMark);
//				if(falseMark==1){
//					return false;
//				}
				var paperJson={};
//				paperJson.dunWeiJia=$(this).find('.paper-keZhong').find('option:selected').attr('price');
//				paperJson.keZhong=$(this).find('.paper-keZhong').find('option:selected').text();
//				paperJson.type=$(this).find('.paper-type').val();
//				paperJson.ifmySelf=$(this).find('.if-myself-paper').attr('checked');
//				paperJson.myselfKeZhong=$(this).find('.myself-paper-keZhong').val();
//				paperJson.myselfType=$(this).find('.myself-paper-type').val();
				console.log($(this).find('.paper-keZhong').find('option:selected').attr('price'))
				if($(this).find('.paper-keZhong').find('option:selected').attr('price')==null){
					console.log($(this).find('.paper-type').val())
					paperJson.selfPaperName  = $(this).find('.paper-type').val();
					paperJson.selfPaperPrice = $(this).find('.paper-keZhong').find('option:selected').attr('selfPaperPrice')
					paperJson.selfPaperWeight = $(this).find('.paper-keZhong').find('option:selected').text();
//					paperJson.isSelfPaper = 1;
					paperJson.dunWeiJia = 0;
					paperJson.keZhong = 0;
					paperJson.type = '';
					paperJson.selfPaperColor= $(this).find('.paper-keZhong').find('option:selected').attr('selfPaperColor');
					paperJson.selfPaperNormal= $(this).find('.paper-keZhong').find('option:selected').attr('selfPaperNormal');
				}else{
					paperJson.dunWeiJia=$(this).find('.paper-keZhong').find('option:selected').attr('price');
					paperJson.keZhong=$(this).find('.paper-keZhong').find('option:selected').text();
					paperJson.type=$(this).find('.paper-type').val();
//					paperJson.isSelfPaper = 0;
					paperJson.selfPaperName ='';
					paperJson.selfPaperPrice ='0';
					paperJson.selfPaperWeight = 0;
					paperJson.selfPaperColor = '';
					paperJson.selfPaperNormal = '';
				}
				if($(this).find('.if-leKou').attr('checked') == 'checked'){
					paperJson['hasSpread'] = 1
				}else{
					paperJson['hasSpread'] = 0
				}
				if($(this).find('.input_check').is(':checked')){
					paperJson.isSelfPaper = 1;
				}else{
					paperJson.isSelfPaper = 0;
				}
				
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
				
				paperArr.push(paperJson);
				if($(this).attr('type')==1){
					coverpaperArr.push(paperJson);
				}else if($(this).attr('type') == 2){
					insidepaperArr.push(paperJson);
				}else if($(this).attr('type') == 3){
					if($('#lining input').is(':checked')){
						huanchenpaperArr = [];
						offerParaJson.ordername.liningPaperMethod=2;
					}else{
						huanchenpaperArr.push(paperJson);
						offerParaJson.ordername.liningPaperMethod=1;
					}
					
				}
			});
//			if(falseMark==1){
//				return false;
//			}
			
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
//				if(offerParaJson.binging.bindStyle=='硬面精装'||offerParaJson.binging.bindStyle=='软面精装'){
//					
//				}else{
//					window.location='inside-papers.html';
//				}
			}else if(mark=='linling'){
				offerParaJson.linling=paperArr;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
				console.log(sessionStorage.getItem('offerParaJson'))
//				window.location='lining-papers.html';
				if(falseMark==1){
					swiper.allowSlideNext= false;
				}else{
					swiper.allowSlideNext= true;
					swiper.slideTo(2);
				}
			}else if(mark=='single'){
//				offerParaJson.single=paperArr;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
				//计算价格
				window.location='single-offer.html';
			}else if(mark=='edit'){
				offerParaJson.linling = coverpaperArr;
				offerParaJson.editing=paperArr;
				offerParaJson.inside=insidepaperArr;
				offerParaJson.huanchen = huanchenpaperArr;
				offerParaJson.binging.bindStyle = $('.requirement').find('.danShuang-paper').find('option:selected').text();
				
				var bindingStyle = $('.requirement').find('.danShuang-paper').find('option:selected').text();
				offerParaJson.booknum = $('#bookNum').val();
				offerParaJson['memo'] = $('#memo').val();
				var pageWidth = $(".pagesizenum").attr('pagewidth');
				var pageHeight =  $(".pagesizenum").attr('pageheight');
				var pageSize = $(".size-paper option:selected").val();
				var pageSizeCh = $(".size-paper option:selected").text();
				offerParaJson.sizestr.pageWidth = pageWidth;
				offerParaJson.sizestr.pageHeight = pageHeight;
				offerParaJson.sizestr.pageSize = pageSize;
				offerParaJson.sizestr.pageSizeCh = pageSizeCh;
				offerParaJson.isPlasticSeal = isPlasticSeal;
				sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
//				window.location = 'edit-single.html'
				console.log(JSON.parse(sessionStorage.getItem('offerParaJson')));
				uploadOffer(sellerId,memberId,productType,bindingStyle,pageSize,pageSizeCh,pageWidth,pageHeight,bookNum,memo,isPlasticSeal)
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

				
			}
		});
		
		//在最终询价界面上选择尺寸
		$('#allSizeDiv').find('select').on('change',function(){
			var width=$(this).find('option:selected').data('width');
			var height=$(this).find('option:selected').data('height');
			$('#allSizeDiv').find('label').text('尺寸：'+width+'X'+height);
		});
		
		//点击去印刷按钮
		$('#printBtn').on('tap click',function(){
			if($(this).hasClass('selected')==true){
				var enquiryOrderId=$('#printBtn').attr('data-id');
				//询问框
				layer.confirm('<i>是否有样稿？<i>', {
					area: '60%', 
					skin: 'comfile-layer',
				  	btn: ['否','是'] //按钮
				}, function(){
				 	//否：回到手机界面
			    	var ua = navigator.userAgent.toLowerCase();
					var system='';
					if (/iphone|ipad|ipod/.test(ua)) {
						system='iphone';		
					} else if (/android/.test(ua)) {
						system='android';
					}
			    	if(system=="android"){
						//安卓
						getYangGao.getData(enquiryOrderId);
					}else{
						//iOS
						window.location="blank.html?enquiryOrderId="+enquiryOrderId;
					}
				}, function(){
				  //跳转到样稿界面
				  		window.location="yang-gao.html?enquiryOrderId="+enquiryOrderId;
				});
			}else{
				//不能去印刷
				layer.msg('亲，先要进行询价呦~',{offset:'80%'});
			}
		});
		
		
	});
	
	//上传询价的记录
	function uploadOffer(sellerId,memberId,productType,bindingStyle,pageSize,pageSizeCh,pageWidth,pageHeight,bookNum,memo,isPlasticSeal){
	var bodyArr=[];
	var liningPaperMethod = 0;
	var continues = 0;
	for (var i = 0; i < $('.requirement').length; i++) {
		var _type=Number($('.requirement').eq(i).attr('type'));
		if($('.requirement').eq(i).find('.paper-keZhong').find('option:selected').attr('price')==null || $('.requirement').eq(i).find('.paper-keZhong').find('option:selected').attr('price')==""){
			var _selfPaperWeight=Number($('.requirement').eq(i).find('.paper-keZhong').find('option:selected').text());
			var _selfPaperName=$('.requirement').eq(i).find('.paper-type').val();
			var _selfPaperPrice = $('.requirement').eq(i).find('.paper-keZhong').find('option:selected').attr("selfPaperPrice");
			var _weight=0;
			var _paperType='';
//			_isSelfPaper=1;
			var _selfPaperColor= $('.requirement').eq(i).find('.paper-keZhong').find('option:selected').attr('selfPaperColor');
			var _selfPaperNormal= Number($('.requirement').eq(i).find('.paper-keZhong').find('option:selected').attr('selfPaperNormal'));
		}else{
			var _selfPaperWeight = 0;
			var _selfPaperName = '';
			var _selfPaperPrice = '0';
			var _weight=Number($('.requirement').eq(i).find('.paper-keZhong').find('option:selected').text());
			var _paperType=$('.requirement').eq(i).find('.paper-type').val();
//			_isSelfPaper=0;
			var _selfPaperColor = '';
			var _selfPaperNormal = 0;
		}
		var _name = $('.requirement').eq(i).find('.del').text();
		var _surfaceTreatmentType=$('.requirement').eq(i).find('.select').val();
		var _surfaceTreatmentMethod=$('.requirement').eq(i).find('.val').val();
		var _afterTheProcesses=$('.requirement').eq(i).find('.special-tech-value').text().split(';');
		var _pages=Number($('.requirement').eq(i).find('.pages-num').val());
		var _colorNum1=Number($('.requirement').eq(i).find('.color1').val());
		var _colorNum2=Number($('.requirement').eq(i).find('.color2').val());
		var _properColor=$('.requirement').eq(i).find('.spot-color').val();
		var _spreadPages=$('.requirement').eq(i).find('.layePages-num').val();
//		if(_spreadPages == null || _spreadPages == undefined){
//			_spreadPages = 0
//		}else{
//			_spreadPages = Number(_spreadPages)
//		}
		var _isSelfPaper=0; 
		console.log($('.requirement').eq(i).find('input[name="choosepaper"]').is(':checked'))
		if($('.requirement').eq(i).find('input[name="choosepaper"]').is(':checked')){
			_isSelfPaper = 1;
		}else{
			_isSelfPaper = 0;
		}
		var hasSpread=0;
		if($('.requirement').eq(i).find('.if-leKou').attr('checked')=='checked'){
			hasSpread=1;
		}else{
			
			if(_spreadPages == null || _spreadPages == undefined){
				_spreadPages = 0;
				hasSpread=0;
			}else{
				_spreadPages = Number(_spreadPages);
				hasSpread=1;
			}
		}
		
		
		_tonnagePrice=$('.requirement').eq(i).find('.paper-keZhong').find('option:selected').attr('price');
//		alert(_tonnagePrice);
		if(_tonnagePrice==undefined || _tonnagePrice == 'undefined' || _tonnagePrice == null){
			_tonnagePrice = 0;
		}else{
			_tonnagePrice = _tonnagePrice
		}
		var bodyObj={"type":_type,"name": _name,"colorNum1": _colorNum1,"colorNum2": _colorNum2,"properColor": _properColor,"pages": _pages,
		"weight": _weight,"paperType": _paperType,"isSelfPaper": _isSelfPaper,"selfPaperWeight": _selfPaperWeight,"selfPaperName": _selfPaperName,"selfPaperPrice": _selfPaperPrice,"surfaceTreatmentType": _surfaceTreatmentType,
		"surfaceTreatmentMethod": _surfaceTreatmentMethod,"selfPaperNormal": _selfPaperNormal,"selfPaperColor": _selfPaperColor,"isFlag":0,"hasSpread":hasSpread,"afterTheProcesses": _afterTheProcesses,"spreadPages":_spreadPages,"tonnagePrice":_tonnagePrice};
		var str = JSON.stringify(bodyObj);
		if(_type==1 || _type == 2 || _type==3){
			if(_type==3 && $('#lining input').is(':checked')){
//				return;
			}else{
				bodyArr.push(str);
			}
			if(_type==3){
				if($('#lining input').is(':checked') ||( _weight!='' &&_paperType!='') || (_selfPaperWeight!=''&&_selfPaperName!='')){
					continues=0;
				}else{
					continues=1;
				}
			}
			
		}
		if(_type==3){
			if($('#lining input').is(':checked')){
				liningPaperMethod = 2;
			}else{
				liningPaperMethod = 1;
			}
			
		}
		
	}
//	$('.requirement').each(function(){
//		console.log(1111);
//		var _type=$(this).attr('type');
//		var _weight=Number($(this).find('.paper-keZhong').find('option:selected').text());
//		var _paperType=$(this).find('.paper-type').val();
//		var _surfaceTreatmentType=$(this).find('.select').val();
//		var _surfaceTreatmentMethod=$(this).find('.val').val();
//		var _afterTheProcesses=$(this).find('.special-tech-value').text().split(';');
//		var _pages=Number($(this).find('.pages-num').val());
//		var _isFlag=2;
//		if($(this).find('.if-leKou').attr('checked')=='checked'){
//			_isFlag=1;
//		}
//		var _colorNum1=Number($(this).find('.color1').val());
//		var _colorNum2=Number($(this).find('.color2').val());
//		var _properColor=$(this).find('.spot-color').val();
//
//		
//		_tonnagePrice=$(this).find('.paper-keZhong').find('option:selected').attr('price');
//		var bodyObj={"type":_type,"colorNum1": _colorNum1,"colorNum2": _colorNum2,"properColor": _properColor,"pages": _pages,
//		"weight": _weight,"paperType": _paperType,"surfaceTreatmentType": _surfaceTreatmentType,
//		"surfaceTreatmentMethod": _surfaceTreatmentMethod,"afterTheProcesses": _afterTheProcesses,"isFlag":_isFlag,"tonnagePrice":_tonnagePrice};
//		var str = JSON.stringify(bodyObj);
//		alert(str);
//		if(_type==1 || _type == 2){
//			bodyArr.push(str);
//		}
//		
//	});
	if(bookNum == '' || bookNum <= 0){
		layer.msg('请填写印刷数量',{offset:'80%'});
	}else if(continues==1){
		layer.msg('请填写环衬信息',{offset:'80%'});
	}else{
		
	
	var dataObj = '{"sellerId":'+sellerId+',"userId":'+memberId+',"isPlasticSeal":'+isPlasticSeal+',"liningPaperMethod":'+liningPaperMethod+',"productType":"'+productType+'","bindingMethod":"'+bindingStyle+'","memo":"'+memo+'",'+
	'"productLength":'+pageHeight+',"productWidth":'+pageWidth+',"innerParams":['+bodyArr+'],"pageSize":"'+pageSize+'","dimensions":"'+pageSizeCh+'","num":'+bookNum+'}';

	//上传数据
//	alert(dataObj+'测试');
	$.ajax({
		type:"post",
		dataType:'json',
		url:ajaxUrlPath+"/mobile/enquiryOrder/newSaveEnquiryOrder",
		contentType:'application/json',
		async:true,
		data:dataObj,
		success:function(resultData){
//			alert(JSON.stringify(resultData)+'数据');
			if(resultData.code==0){
				localStorage.setItem('name',resultData.result.name);
				localStorage.setItem('indexItem',3);
				window.location = 'edit-single.html?enquiryOrderId='+resultData.result.enquiryOrderId+'&price='+Number(resultData.result.price).toFixed(2);
				window.scrollTo(0,0);
			}else{
				layer.msg('网络堵塞1',{offset:'80%'});
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
		 	layer.msg('网络堵塞2',{offset:'80%'});
		}
	});
	}
}
	//上传询价的记录
	function uploadOffer1(sellerId,memberId,productType,bindingStyle,pageSize,pageSizeCh,pageWidth,pageHeight,bookNum,memo,isPlasticSeal){
	var bodyArr=[];
	var liningPaperMethod = 0;
	var continues = 0;
	var isSpecialRequirement = 0;
	
	for (var i = 0; i < $('.requirement').length; i++) {
		var _type=Number($('.requirement').eq(i).attr('type'));
		var _selfPaperWidth = '';
		var _selfPaperLength = '';
		var _selfPaperNormal = ''
		var _selfPaperWeight = '';
		var _selfPaperName = '';
		var _selfPaperPrice = '';
		var _weight = '';
		var _paperType='';
		var _selfPaperColor = '';
		if($('.requirement').eq(i).find('.paper-keZhong').find('option:selected').attr('price')==null || $('.requirement').eq(i).find('.paper-keZhong').find('option:selected').attr('price')==""){
			var selfPaperNormal = Number($('.requirement').eq(i).find('.papers-type').attr('selfPaperNormal'));
					if(selfPaperNormal == 2){
						_selfPaperWidth =$('.requirement').eq(i).find('.papers-type').attr('selfPaperWidth');
						_selfPaperLength = $('.requirement').eq(i).find('.papers-type').attr('selfPaperLength')
						_selfPaperWeight=Number($('.requirement').eq(i).find('.paper-keZhong').find('option:selected').text());
						_selfPaperName=$('.requirement').eq(i).find('.paper-type').val();
						_selfPaperPrice = '0';
						_weight=0;
						_paperType='';
						isSpecialRequirement = '1';
			//			_isSelfPaper=1;
						_selfPaperColor= $('.requirement').eq(i).find('.papers-type').attr('selfPaperColor');
						_selfPaperNormal= Number($('.requirement').eq(i).find('.papers-type').attr('selfPaperNormal'));
					}else{
						_selfPaperWeight=Number($('.requirement').eq(i).find('.paper-keZhong').find('option:selected').text());
						_selfPaperName=$('.requirement').eq(i).find('.paper-type').val();
						_selfPaperPrice = $('.requirement').eq(i).find('papers-type').attr("selfPaperPrice");
						_weight=0;
						_paperType='';
			//			_isSelfPaper=1;
						_selfPaperColor= $('.requirement').eq(i).find('.paper-keZhong').find('option:selected').attr('selfPaperColor');
						_selfPaperNormal= Number($('.requirement').eq(i).find('.paper-keZhong').find('option:selected').attr('selfPaperNormal'));
					}
		}else{
			_selfPaperWeight = 0;
			_selfPaperName = '';
			_selfPaperPrice = '0';
			_weight=Number($('.requirement').eq(i).find('.paper-keZhong').find('option:selected').text());
			_paperType=$('.requirement').eq(i).find('.paper-type').val();
//			_isSelfPaper=0;
			_selfPaperColor = '';
			_selfPaperNormal = 0;
		}
		var _name = $('.requirement').eq(i).find('.del').text();
		var _surfaceTreatmentType=$('.requirement').eq(i).find('.select').val();
		var _surfaceTreatmentMethod=$('.requirement').eq(i).find('.val').val();
		var _afterTheProcesses=$('.requirement').eq(i).find('.special-tech-value').text().split(';');
		var _pages=Number($('.requirement').eq(i).find('.pages-num').val());
		var _colorNum1=Number($('.requirement').eq(i).find('.color1').val());
		var _colorNum2=Number($('.requirement').eq(i).find('.color2').val());
		var _properColor=$('.requirement').eq(i).find('.spot-color').val();
		var _spreadPages=$('.requirement').eq(i).find('.layePages-num').val();
		if(_spreadPages == null || _spreadPages == undefined){
			_spreadPages = 0
		}else{
			_spreadPages = Number(_spreadPages)
		}
		var _isSelfPaper=0; 
		if($('.requirement').eq(i).find('input[name="choosepaper"]').is(':checked')){
			_isSelfPaper = 1;
		}else{
			_isSelfPaper = 0;
		}
		var hasSpread=0;
		if($('.requirement').eq(i).find('.if-leKou').attr('checked')=='checked'){
			hasSpread=1;
		}else{
			hasSpread=0;
		}
		
		
		_tonnagePrice=$('.requirement').eq(i).find('.paper-keZhong').find('option:selected').attr('price');
//		alert(_tonnagePrice);
		if(_tonnagePrice==undefined || _tonnagePrice == 'undefined' || _tonnagePrice == null){
			_tonnagePrice = 0;
		}else{
			_tonnagePrice = _tonnagePrice
		}
		var bodyObj={"type":_type,"name": _name,"colorNum1": _colorNum1,"colorNum2": _colorNum2,"properColor": _properColor,"pages": _pages,
		"weight": _weight,"paperType": _paperType,"isSelfPaper": _isSelfPaper,"selfPaperWidth": _selfPaperWidth,"selfPaperLength": _selfPaperLength,"selfPaperWeight": _selfPaperWeight,"selfPaperName": _selfPaperName,"selfPaperPrice": _selfPaperPrice,"surfaceTreatmentType": _surfaceTreatmentType,
		"surfaceTreatmentMethod": _surfaceTreatmentMethod,"selfPaperNormal": _selfPaperNormal,"selfPaperColor": _selfPaperColor,"isFlag":0,"hasSpread":hasSpread,"afterTheProcesses": _afterTheProcesses,"spreadPages":_spreadPages,"tonnagePrice":_tonnagePrice};
		var str = JSON.stringify(bodyObj);
		if(_type==1 || _type == 2 || _type==3){
			if(_type==3 && $('#lining input').is(':checked')){
//				return;
			}else if(_type==1 && $('#nocoverPaper input').is(':checked')){
				
			}else if(_type == 2 && $('#insidePapers input').is(':checked')){
				
			}else{
				bodyArr.push(str);
			}
			if(_type==3){
				if($('#lining input').is(':checked') ||( _weight!='' &&_paperType!='') || (_selfPaperWeight!=''&&_selfPaperName!='')){
					continues=0;
				}else{
					continues=1;
				}
			}
			
		}
		if(_type==3){
			if($('#lining input').is(':checked')){
				liningPaperMethod = 2;
			}else{
				liningPaperMethod = 1;
			}
			
		}
		
	}
//	$('.requirement').each(function(){
//		console.log(1111);
//		var _type=$(this).attr('type');
//		var _weight=Number($(this).find('.paper-keZhong').find('option:selected').text());
//		var _paperType=$(this).find('.paper-type').val();
//		var _surfaceTreatmentType=$(this).find('.select').val();
//		var _surfaceTreatmentMethod=$(this).find('.val').val();
//		var _afterTheProcesses=$(this).find('.special-tech-value').text().split(';');
//		var _pages=Number($(this).find('.pages-num').val());
//		var _isFlag=2;
//		if($(this).find('.if-leKou').attr('checked')=='checked'){
//			_isFlag=1;
//		}
//		var _colorNum1=Number($(this).find('.color1').val());
//		var _colorNum2=Number($(this).find('.color2').val());
//		var _properColor=$(this).find('.spot-color').val();
//
//		
//		_tonnagePrice=$(this).find('.paper-keZhong').find('option:selected').attr('price');
//		var bodyObj={"type":_type,"colorNum1": _colorNum1,"colorNum2": _colorNum2,"properColor": _properColor,"pages": _pages,
//		"weight": _weight,"paperType": _paperType,"surfaceTreatmentType": _surfaceTreatmentType,
//		"surfaceTreatmentMethod": _surfaceTreatmentMethod,"afterTheProcesses": _afterTheProcesses,"isFlag":_isFlag,"tonnagePrice":_tonnagePrice};
//		var str = JSON.stringify(bodyObj);
//		alert(str);
//		if(_type==1 || _type == 2){
//			bodyArr.push(str);
//		}
//		
//	});
	if(bookNum == '' || bookNum <= 0){
		layer.msg('请填写印刷数量',{offset:'80%'});
	}else if(continues==1){
		layer.msg('请填写环衬信息',{offset:'80%'});
	}else{
	var dataObj = '{"sellerId":'+sellerId+',"memberId":0,"userId":'+memberId+',"isPlasticSeal":'+isPlasticSeal+',"liningPaperMethod":'+liningPaperMethod+',"productType":"'+productType+'","bindingMethod":"'+bindingStyle+'","memo":"'+memo+'",'+
	'"productLength":'+pageHeight+',"isSpecialRequirement":'+isSpecialRequirement+',"productWidth":'+pageWidth+',"innerParams":['+bodyArr+'],"pageSize":"'+pageSize+'","dimensions":"'+pageSizeCh+'","num":'+bookNum+'}';

	//上传数据
//	alert(dataObj+'测试');
	$.ajax({
		type:"post",
		dataType:'json',
		url:ajaxUrlPath+"/mobile/enquiryOrder/newSaveEnquiryOrder",
		contentType:'application/json',
		async:true,
		data:dataObj,
		success:function(resultData){
//			alert(JSON.stringify(resultData)+'数据');
			if(resultData.code==0){
				localStorage.setItem('name',resultData.result.name);
				localStorage.setItem('indexItem',3);
				setTimeout(function(){
					if(bindingStyle=='其他装订'){
							window.location = 'adminedit-single.html?price=0&enquiryOrderId='+resultData.result.enquiryOrderId
						}else{
							window.location = 'adminedit-single.html?price='+resultData.result.price+'&enquiryOrderId='+resultData.result.enquiryOrderId
						}
//					window.location = 'adminedit-single.html?price='+resultData.result.price+'&enquiryOrderId='+resultData.result.enquiryOrderId
					window.scrollTo(0,0);
				},400)
				
			}else{
				layer.msg('网络堵塞1',{offset:'80%'});
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
		 	layer.msg('网络堵塞2',{offset:'80%'});
		}
	});
	}
}


function getCostAll(bindingStyle,pageSize,bookNum,typeNum){
	var allPrice=0;
	var paperCost=0;//材料费
	var coverPaperCost=0;//封面材料费
	var insidePaperCost=0;//内页材料费
	var processCost=0;//印刷费
	var faceCost=0;//表面处理
	var coverFaceCost=0//封面的表面处理
	var insideFaceCost=0//内页的表面处理
	var specialCost=0;//特殊工艺
	var houDaoCost=0;//后道加工费
	var tieShu=0;//贴数
	var pNumAll=0;//总的贴数
	var keZhong=0;//大度纸
	var zhengDuZhi=0;//正度纸
	var fangShu=0;//放数（如果为0色 就为100  如果为1色以上就+150）
	
	$('.requirement:visible').each(function(){
		var divIndex=Number($(this).data('sign'));
		var pNum=parseInt($(this).find('.pages-num').val());
		var layeNum=$(this).find('.laye-pages-num').val();
		if($(this).find('.laye-pages-div').is(":hidden")==false&&layeNum!=undefined){
			pNum=pNum+parseInt(layeNum)*2;
		}
		pNumAll=pNumAll+pNum;
		
		if(pNum!=0){
			//计算大度纸和正度纸
			var keZhong=$(this).find('.paper-keZhong').find("option:selected").text();
			var duiWeiJia=$(this).find('.paper-keZhong').val();
			if(divIndex==0){
				daDuZhi=(1.062*keZhong/1000*duiWeiJia/1000*1.05).toFixed(4);
				zhengDuZhi=(0.86*keZhong/1000*duiWeiJia/1000*1.05).toFixed(4);
			}
			//1.计算材料费
			if($(this).find('.myself-paper-checkbox').attr('checked')==undefined){  //没有自带纸
				var pageUnitPrice=0;
				if(pageSize.indexOf('d')>-1){
					pageUnitPrice=(1.062*keZhong/1000*duiWeiJia/1000*1.05).toFixed(4);
				}else{
					pageUnitPrice=(0.86*keZhong/1000*duiWeiJia/1000*1.05).toFixed(4);
				}
//				console.log("ddddd"+divIndex);
				if(divIndex==0){
					//封面材料费
					coverPaperCost=paperCostFunc('cover',parseInt(pNum),parseInt(bookNum),Number(pageUnitPrice),pageSize);
//					console.log("封面的页数="+pNum);
//					console.log("封面的材料费="+coverPaperCost);
				}else{
					//内页材料费
					insidePaperCost=insidePaperCost+paperCostFunc('inside',parseInt(pNum),parseInt(bookNum),Number(pageUnitPrice),pageSize);
//					console.log("内页的页数="+pNum);
//					console.log("内页的材料费="+insidePaperCost);
				}
			}
			
			//2、计算印刷费
			var color1=$(this).find('.color1').val()==''?'4':$(this).find('.color1').val();
			var color2=$(this).find('.color2').val()==''?'4':$(this).find('.color2').val();
			if(divIndex==0){
				if(color1=='0'&&color2=='0'){
					fangShu=100;
				}else{
					fangShu=150;
				}
				processCost=processCost+processCostFunc('cover',parseInt(pNum),parseInt(bookNum),parseInt(color1),parseInt(color2),pageSize);
//				console.log("封面的印工费="+processCost);
			}else{
				processCost=processCost+processCostFunc('inside',parseInt(pNum),parseInt(bookNum),parseInt(color1),parseInt(color2),pageSize);
//				console.log("内页的印工费="+processCost);
			}
			
			//计算贴数
			if(divIndex==0){
				if($('#leKou').attr('checked')=='checked'){
					tieShu=tieShu+1;
				}
			}else{
				if($(this).find('.ke-zhang-select').find("option:selected").text()<=200){
					tieShu=tieShu+Math.ceil(pNum/16)+1;
				}else{
					tieShu=tieShu+Math.ceil(pNum/8)+1;
				}
			}
			
			//3、表面处理
			var costUnitP=$(this).find('.surface-handle-tech').val();
			var danShuang=$(this).find('.danShuang-paper').val();
			if(costUnitP!=''){
				if(divIndex==0){
					//封面表面处理
					coverFaceCost=faceHeadle(Number(costUnitP),parseInt(pNum),parseInt(bookNum),danShuang);
				}else{
					//内页表面处理
					insideFaceCost=insideFaceCost+faceHeadle(Number(costUnitP),parseInt(pNum),parseInt(bookNum),danShuang);
				}
			}
			
			//4.特殊工艺
			var specialHtml=$(this).find('.special-tech-value').text();
			var specialHtmlArr=specialHtml.split(';');
			var specialValueArr=[];
			var specialValue='';
			var specialArr=[];
			for (var i=0;i<specialHtmlArr.length;i++) {
				if(specialHtmlArr[i].indexOf('烫金化铝：')>=0){
					specialValueArr=specialHtmlArr[i].split('：');
					specialValue=specialValueArr[1];
					specialArr=specialValue.split(' ');
					//计算烫电化铝
					specialCost=specialCost+tangDianhl(specialArr[0],specialArr[1],specialArr[2],parseInt(bookNum),pageSize);
				}
				if(specialHtmlArr[i].indexOf('丝网印刷：')>=0){
					specialValueArr=specialHtmlArr[i].split('：');
					specialValue=specialValueArr[1];
					specialArr=specialValue.split(' ');
					//计算局部uv
					specialCost=specialCost+juBuUV(specialArr[1],parseInt(bookNum));
				}
				if(specialHtmlArr[i].indexOf('模切：')>=0){
					specialValueArr=specialHtmlArr[i].split('：');
					specialValue=specialValueArr[1];
					//计算模切
					specialCost=specialCost+moQie(specialValue,parseInt(bookNum));
				}
				if(specialHtmlArr[i].indexOf('凹凸：')>=0){
					specialValueArr=specialHtmlArr[i].split('：');
					specialValue=specialValueArr[1];
					specialArr=specialValue.split(' ');
					//计算凹凸
					specialCost=specialCost+aoTu(specialArr[0],specialArr[1],parseInt(bookNum),pageSize);
				}
				if(specialHtmlArr[i].indexOf('蝴蝶订：')>=0){
					//计算蝴蝶订：
					specialCost=specialCost+huDieDing(parseInt(pNum),parseInt(bookNum));
				}
			}
			//判断是否有单页的品数，有的话，特殊工艺*品数
			if(typeNum!=''){
				specialCost=specialCost*Number(typeNum);
			}
		}
	});
	//计算得出的材料费
	paperCost=Number(coverPaperCost)+Number(insidePaperCost);
	//总的表面处理费用
	faceCost=coverFaceCost+insideFaceCost;
	
	//计算后道加工费
	switch (bindingStyle){
		case '锁线胶装':	//锁线胶装
			houDaoCost=sxjz(parseInt(tieShu),parseInt(bookNum));
			break;
		case '无线胶装':	//无线胶装
			houDaoCost=wxjz(parseInt(tieShu),parseInt(bookNum));
			break;
		case '骑马订':		//骑马钉
			houDaoCost=qmd(parseInt(pNumAll),parseInt(bookNum),pageSize);
			break;
		case '缝线装':		//缝线装
			houDaoCost=fxz(parseInt(bookNum),pageSize);
			break;
		case '硬面精装':	//硬面精装
			houDaoCost=rymjz('ymjz',parseInt(tieShu),parseInt(bookNum),parseInt(fangShu),Number(daDuZhi),Number(zhengDuZhi),pageSize);
			break;
		case '软面精装':	//软面精装
			houDaoCost=rymjz('rmjz',parseInt(tieShu),parseInt(bookNum),parseInt(fangShu),Number(daDuZhi),Number(zhengDuZhi),pageSize);
			break;
		case '锁线裸装':	//锁线裸装
			houDaoCost=sxlz(parseInt(tieShu),parseInt(bookNum));
			break;
		case '圈装':		//圈装
			houDaoCost=qz(parseInt(pNumAll),parseInt(bookNum),pageSize);
			break;
		case '无':		//无
			houDaoCost=0;
			break;
	}
	
	allPrice=parseInt(paperCost)+parseInt(processCost)+parseInt(houDaoCost)+parseInt(faceCost)+parseInt(specialCost);
	allPrice=parseInt(allPrice)+'/'+parseInt(coverPaperCost)+'/'+parseInt(insidePaperCost)+'/'+parseInt(paperCost)+'/'+parseInt(processCost)+'/'+parseInt(houDaoCost)+'/'+parseInt(faceCost)+'/'+parseInt(specialCost)+'/'+parseInt(coverFaceCost)+'/'+parseInt(insideFaceCost);
	console.log(specialCost);
	return allPrice;
}


//材料费
function paperCostFunc(type,pNum,bookNum,pageUnitPrice,pageSize){
	var paperNum=0;
	var paperCost=0;
	if(type=='cover'){
		if(bookNum<=6000){
			paperNum=pNum/32*(bookNum+300);
			if(pageSize.indexOf('8')>-1){
				paperNum=paperNum*2;
			}
			if(pageSize.indexOf('32')>-1){
				paperNum=paperNum/2;
			}
			if(pageSize.indexOf('12')>-1){
				paperNum=pNum/24*(bookNum+300);
			}
		}else{
			paperNum=pNum/32*(bookNum*1.05+300+100);
			if(pageSize.indexOf('8')>-1){
				paperNum=paperNum*2;
			}
			if(pageSize.indexOf('32')>-1){
				paperNum=paperNum/2;
			}
			if(pageSize.indexOf('12')>-1){
				paperNum=pNum/24*(bookNum*1.05+300+100);
			}
		}
	}else{
		if(bookNum<=6000){
			paperNum=pNum/32*(bookNum+200);
			if(pageSize.indexOf('8')>-1){
				paperNum=paperNum*2;
			}
			if(pageSize.indexOf('32')>-1){
				paperNum=paperNum/2;
			}
			if(pageSize.indexOf('12')>-1){
				paperNum=pNum/24*(bookNum+200);
			}
		}else{
			paperNum=pNum/32*(bookNum*1.05+200);
			if(pageSize.indexOf('8')>-1){
				paperNum=paperNum*2;
			}
			if(pageSize.indexOf('32')>-1){
				paperNum=paperNum/2;
			}
			if(pageSize.indexOf('12')>-1){
				paperNum=pNum/24*(bookNum*1.05+200);
			}
		}
	}
	paperCost=(paperNum*pageUnitPrice).toFixed(2);
	return Number(paperCost);
}
//印工费
function processCostFunc(type,pNum,bookNum,color1,color2,pageSize){
	var unitBookCost=0;
	var unitBookCost_bd16=0;
	var unitBookCost_s16=0;
	var processCost=0;
	if(bookNum<=1000){
//		console.log("pNum"+Math.ceil(pNum/4)+"   "+pNum);
		unitBookCost_bd16=Math.ceil(pNum/4)*250;
//		console.log("unitBookCost_bd16="+unitBookCost_bd16);
		if(pageSize=='b16'||pageSize=='d16'){
			unitBookCost=unitBookCost_bd16;
		}
		if(pageSize=='b32'||pageSize=='d32'){
			unitBookCost=unitBookCost_bd16/2;
		}
		if(pageSize=='b8'||pageSize=='d8'){
			unitBookCost=unitBookCost_bd16*2;
		}
		unitBookCost_s16=Math.ceil(pNum/8)*250;
//		console.log("Math.ceil(pNum/8)"+Math.ceil(pNum/8));
//		console.log("pageSize"+pageSize);
		if(pageSize=='s16'){
			unitBookCost=unitBookCost_s16;
		}
		if(pageSize=='s32'){
			unitBookCost=unitBookCost_s16/2;
		}
		if(pageSize=='s8'){
			unitBookCost=unitBookCost_s16*2;
		}
		if(pageSize=='s12'){
			if(type=='cover'){
				unitBookCost=Math.ceil(pNum/6)*250;
			}else{
				unitBookCost=Math.ceil(pNum/6)*300;
			}
		}
		if(pageSize=='b12'||pageSize=='d12'){
			if(type=='cover'){
				unitBookCost=Math.ceil(pNum/6)*550;
			}else{
				unitBookCost=Math.ceil(pNum/6)*600;
			}
		}
	}else if(bookNum>3000){
		var processThousands=Math.ceil(bookNum/1000);
		unitBookCost_bd16=Math.ceil(pNum/4)*(processThousands*50+150);
		if(pageSize=='b16'||pageSize=='d16'){
			unitBookCost=unitBookCost_bd16;
		}
		if(pageSize=='b32'||pageSize=='d32'){
			unitBookCost=unitBookCost_bd16/2;
		}
		if(pageSize=='b8'||pageSize=='d8'){
			unitBookCost=unitBookCost_bd16*2;
		}
		unitBookCost_s16=Math.ceil(pNum/8)*(processThousands*50+150);
		if(pageSize=='s16'){
			unitBookCost=unitBookCost_s16;
		}
		if(pageSize=='s32'){
			unitBookCost=unitBookCost_s16/2;
		}
		if(pageSize=='s8'){
			unitBookCost=unitBookCost_s16*2;
		}
		if(pageSize=='s12'){
			unitBookCost=Math.ceil(pNum/6)*(processThousands*50+150);
		}
		if(pageSize=='b12'||pageSize=='d12'){
			unitBookCost=Math.ceil(pNum/6)*(processThousands*100+200);
		}
	}else{
		unitBookCost_bd16=Math.ceil(pNum/4)*300;
		if(pageSize=='b16'||pageSize=='d16'){
			unitBookCost=unitBookCost_bd16;
		}
		if(pageSize=='b32'||pageSize=='d32'){
			unitBookCost=unitBookCost_bd16/2;
		}
		if(pageSize=='b8'||pageSize=='d8'){
			unitBookCost=unitBookCost_bd16*2;
		}
		unitBookCost_s16=Math.ceil(pNum/8)*300;
		if(pageSize=='s16'){
			unitBookCost=unitBookCost_s16;
		}
		if(pageSize=='s32'){
			unitBookCost=unitBookCost_s16/2;
		}
		if(pageSize=='s8'){
			unitBookCost=unitBookCost_s16*2;
		}
		if(pageSize=='s12'){
			if(type=='cover'){
				unitBookCost=Math.ceil(pNum/6)*300;
			}else{
				unitBookCost=Math.ceil(pNum/6)*350;
			}
		}
		if(pageSize=='b12'||pageSize=='d12'){
			if(type=='cover'){
				unitBookCost=Math.ceil(pNum/6)*650;
			}else{
				unitBookCost=Math.ceil(pNum/6)*700;
			}
		}
	}
//	if(bookNum>3000){
//		processCost=unitBookCost*bookNum;
//	}else{
		processCost=unitBookCost;
//	}
	//根据颜色计算时间封面加工费
//	console.log("processCostppp"+processCost);
	var processCostA=0;
	if(color1==1&&color2==1){
		processCostA=processCost/3;
	}else if(color1>4||color2>4){
		processCostA=processCost/2;
	}else{
		processCostA=processCost;
	}
	return Number(processCostA.toFixed(2));
}

//表面处理
function faceHeadle(costUnitP,pNum,bookNum,danShuang){
	var costAll=0;
	costAll=costUnitP*pNum*bookNum;
//	console.log("costAlsssssl="+costUnitP+" "+pNum+" "+bookNum);
//	console.log("costAll="+costAll);
	if(danShuang=="单面"){
		costAll=costAll/2;
	}
	if(costAll<50){
		costAll=50;
	}
	return Number(costAll.toFixed(2));
}
//烫金化铝
function tangDianhl(material,style,percent,bookNum,pageSize){
	var costAll=0;
	if(material.indexOf('指定材料')>=0){
		costAll=0.15*bookNum*1.5+100;
	}else{
		costAll=0.15*bookNum+100;
	}
	switch (percent){
		case '30%':
			costAll=costAll+(2*100);
			break;
		case '50%':
			costAll=costAll+(3*100);
			break;
		case '70%':
			costAll=costAll+(4*100);
			break;
		case '100%':
			costAll=costAll+(8*100);
			break;
	}
	if(pageSize.indexOf('32')>-1){
		costAll=costAll/2
	}
	if(pageSize.indexOf('8')>-1){
		if(pageSize=='s8'){
			costAll=costAll*1.5;
		}else{
			costAll=costAll*2;
		}
	}
	if(style=='电雕烫凹一体'){
		switch (percent){
			case '15%':
				costAll=costAll+(100*1);
				break;
			case '30%':
				costAll=costAll+(100*2);
				break;
			case '50%':
				costAll=costAll+(100*3);
				break;
			case '70%':
				costAll=costAll+(100*4);
				break;
			case '100%':
				costAll=costAll+(100*8);
				break;
		}
	}
	if(costAll<200){
		costAll=200;
	}
	console.log("butong="+costAll);
	return Number(costAll.toFixed(2));
}
//局部uv
function juBuUV(percent,bookNum){
	percent=percent.substr(0,percent.length-1);
	percent=parseInt(percent)/100;
//	console.log(percent);
	var costAll=0;
	if(percent<=0.5){
		costAll=0.25*bookNum+100;
		if(costAll<300){
			costAll=300;
		}
	}else{
		costAll=0.40*bookNum+150;
		if(costAll<400){
			costAll=400;
		}
	}
	console.log("juBuUV="+costAll);
	return Number(costAll.toFixed(2));
}

//模切
function moQie(style,bookNum){
	var costAll=0;
	if(style=='一般模切'){
		costAll=0.05*bookNum+100;
//		console.log("一般模切="+costAll);
		if(costAll<200){
			costAll=200;
		}
	}else{
		costAll=0.05*bookNum+200;
		if(costAll<300){
			costAll=300;
		}
	}
	return Number(costAll.toFixed(2));
}
//凹凸
function aoTu(style,percent,bookNum,pageSize){
	var costAll=0;
	costAll=0.1*bookNum+100;
	switch (percent){
		case '30%':
			costAll=costAll+(2*100);
			break;
		case '50%':
			costAll=costAll+(3*100);
			break;
		case '70%':
			costAll=costAll+(4*100);
			break;
		case '100%':
			costAll=costAll+(8*100);
			break;
	}
	if(pageSize.indexOf('32')>-1){
		costAll=costAll/2
	}
	if(pageSize.indexOf('8')>-1){
		if(pageSize=='s8'){
			costAll=costAll*1.5;
		}else{
			costAll=costAll*2;
		}
	}
	if(style=='电雕凹凸'){
		switch (percent){
			case '15%':
				costAll=costAll+(100*1);
				break;
			case '30%':
				costAll=costAll+(100*2);
				break;
			case '50%':
				costAll=costAll+(100*3);
				break;
			case '70%':
				costAll=costAll+(100*4);
				break;
			case '100%':
				costAll=costAll+(100*8);
				break;
		}
	}
	if(costAll<200){
		costAll=200;
	}
	return Number(costAll.toFixed(2));
}
//蝴蝶订
function huDieDing(pNum,bookNum){
	var costAll=0;
	if(pNum<=20){
		costAll=0.2*pNum*bookNum;
	}else{
		costAll=0.22*pNum*bookNum;
	}
	if(costAll<100){
		costAll=100;
	}
	return Number(costAll.toFixed(2));
}
//锁线胶装
function sxjz(tieShu,bookNum){
	var costAll=0;
	costAll=tieShu*0.08*bookNum;
	if(costAll<400){
		costAll=400;
	}
	return Number(costAll.toFixed(2));
}
//无线胶装
function wxjz(tieShu,bookNum){
	var costAll=0;
	costAll=tieShu*0.06*bookNum;
	if(costAll<300){
		costAll=300;
	}
	return Number(costAll.toFixed(2));
}

//骑马钉
function qmd(pNum,bookNum,pageSize){
	var costAll=0;
	if(pNum<=20){
		costAll=0.08*bookNum;
	}else{
		costAll=0.10*bookNum;
	}
	if(pageSize=='d8'){
		costAll=0.20*bookNum;
	}
	return Number(costAll.toFixed(2));
}

//缝线装
function fxz(bookNum,pageSize){
	var costAll=0;
	if(pageSize=='d12'||pageSize=='d8'){
		costAll=0.60*bookNum;
	}else{
		costAll=0.45*bookNum;
	}
	if(costAll<200){
		costAll=200;
	}
	return Number(costAll.toFixed(2));
}

function rymjz(type,tieShu,bookNum,fangShu,daDuZhi,zhengDuZhi,pageSize){
	var costAll=0;
	//内页
	var pageCost=0;
	var fuJiaShu=0;
	var typepara=0;
	if(bookNum>6000){
		bookNum=bookNum*1.05;
		fuJiaShu=100;
	}
	if(type=='rmjz'){
		typepara=1;
	}
	pageCost=(tieShu*0.08+5.5-typepara)*bookNum;
	if(pageSize.indexOf(32)>-1){
		pageCost=(tieShu*0.08+4.5-typepara)*bookNum;
	}
	if(pageSize=='b8'||pageSize=='d8'){
		pageCost=(tieShu*0.08+8-typepara)*bookNum;
	}
	if(pageSize=='s8'){
		pageCost=(tieShu*0.08+7-typepara)*bookNum;
	}
	//封面
	var coverCost=0;
	if(pageSize=='s32'){
		coverCost=(1/8)*zhengDuZhi*(bookNum+fangShu)+fuJiaShu;
	}
	if(pageSize=='b32'||pageSize=='d32'){
		coverCost=(1/8)*daDuZhi*(bookNum+fangShu)+fuJiaShu;
	}
	if(pageSize=='s16'){
		coverCost=(1/8)*daDuZhi*(bookNum+fangShu)+fuJiaShu;
	}
	if(pageSize=='b16'||pageSize=='d16'){
		coverCost=(1/4)*zhengDuZhi*(bookNum+fangShu)+fuJiaShu;
	}
	if(pageSize=='b8'||pageSize=='s8'){
		coverCost=(1/4)*daDuZhi*(bookNum+fangShu)+fuJiaShu;
	}
	if(pageSize=='d8'){
		coverCost=(1/3)*daDuZhi*(bookNum+fangShu)+fuJiaShu;
	}
	if(pageSize=='s12'){
		coverCost=(1/8)*daDuZhi*(bookNum+fangShu)+fuJiaShu;
	}
	if(pageSize=='b12'||pageSize=='d12'){
		coverCost=(1/4)*zhengDuZhi*(bookNum+fangShu)+fuJiaShu;
	}
	costAll=pageCost+coverCost;
	return Number(costAll.toFixed(2));
}

//锁线裸装
function sxlz(tieShu,bookNum){
	var costAll=0;
	costAll=(tieShu*0.08+0.8)*bookNum;
	if(costAll<400){
		costAll=400;
	}
	return Number(costAll.toFixed(2));
}

//圈装
function qz(pNum,bookNum,pageSize){
	var costAll=0;
	if(pNum<=40){
		costAll=1.20*bookNum;
		if(pageSize.indexOf('8')>-1){
			costAll=costAll*2;
		}
		if(pageSize.indexOf('32')>-1){
			costAll=costAll/2;
		}
	}else{
		costAll=1.80*bookNum;
		if(pageSize.indexOf('8')>-1){
			costAll=costAll*2;
		}
		if(pageSize.indexOf('32')>-1){
			costAll=1.20*bookNum;
		}
	}
	if(costAll<120){
		costAll=120;
	}
	return Number(costAll.toFixed(2));
}
mui.plusReady(function() {
		plus.runtime.getProperty(plus.runtime.appid,function(inf){
		 // 当前版本
	     var wgtVersion = inf.version;
	     var type = '';
	     if(mui.os.android){
	     	type = 1;
	     }else if(mui.os.ios){
	     	type = 2
	     }
//	     go_to_view('update.html',{version:'2.0',type:1,log:'最近版本'});
//	    
//		alert(wgtVersion);
	     localStorage.setItem('verison',wgtVersion);
//	     var url = base_url + 'mobile/apk/getApkInfo';
	     var url = ajaxUrlPath + '/mobile/apk/getApkInfo';
			mui.ajax(url, {
				data: {
					versionCode: wgtVersion,
					type : type
				},
				dataType: "json",
				type: "post",
				timeout: 10000,
				success: function(res) {
//					alert(JSON.stringify(res));
					
					if(res.code == 0){
						localStorage.setItem('verison',res.result.version);
//						alert('最新version是：' + res.result.version+',请更新！')
						var btnArray = ['确定'];
						mui.confirm('最新version是：' + res.result.version+',是否更新', '发现最新版本', btnArray, function(z) {
							if (z.index == 0) {
								plus.runtime.openURL(res.result.downloadUrl);
//								plus.runtime.openURL("https://www.pgyer.com/HQx8");
//								plus.runtime.openURL("https://www.pgyer.com/Z5k5");
							}else{
								return;
							}
						})

					}else{

					}
						
				}
				})
		  })
	})
	document.addEventListener("pause", function(){  
    mui.plusReady(function() {
		plus.runtime.getProperty(plus.runtime.appid,function(inf){
		 // 当前版本
	     var wgtVersion = inf.version;
	     var type = '';
	     if(mui.os.android){
	     	type = 1;
	     }else if(mui.os.ios){
	     	type = 2
	     }
//	     go_to_view('update.html',{version:'2.0',type:1,log:'最近版本'});
//	    
//		alert(wgtVersion);
	     localStorage.setItem('verison',wgtVersion);
	     localStorage.removeItem('pos');
//	     var url = base_url + 'mobile/apk/getApkInfo';
	     var url = ajaxUrlPath + '/mobile/apk/getApkInfo';
			mui.ajax(url, {
				data: {
					versionCode: wgtVersion,
					type : type
				},
				dataType: "json",
				type: "post",
				timeout: 10000,
				success: function(res) {
//					alert(JSON.stringify(res));
					
					if(res.code == 0){
						localStorage.setItem('verison',res.result.version);
//						alert('最新version是：' + res.result.version+',请更新！')
						var btnArray = ['确定'];
						mui.confirm('最新version是：' + res.result.version+',是否更新', '发现最新版本', btnArray, function(z) {
							if (z.index == 0) {
								plus.runtime.openURL(res.result.downloadUrl);
//								plus.runtime.openURL("https://www.pgyer.com/HQx8");
//								plus.runtime.openURL("https://www.pgyer.com/Z5k5");
							}else{
								return;
							}
						})

					}else{

					}
						
				}
				})
		  })
	})
}, false);
document.addEventListener("splashclosed", function(){  
    mui.plusReady(function() {
		plus.runtime.getProperty(plus.runtime.appid,function(inf){
		 // 当前版本
	     var wgtVersion = inf.version;
	     var type = '';
	     if(mui.os.android){
	     	type = 1;
	     }else if(mui.os.ios){
	     	type = 2
	     }
//	     var url = base_url + 'mobile/apk/getApkInfo';
	     var url = ajaxUrlPath + '/mobile/apk/getApkInfo';
			mui.ajax(url, {
				data: {
					versionCode: wgtVersion,
					type : type
				},
				dataType: "json",
				type: "post",
				timeout: 10000,
				success: function(res) {
					console.log(JSON.stringify(res));
					if(res.code == 0){
						localStorage.setItem('verison',res.result.version);
						var btnArray = ['确定'];
						mui.confirm('最新version是：' + res.result.version+',是否更新', '发现最新版本', btnArray, function(z) {
							if (z.index == 0) {
								plus.runtime.openURL(res.result.downloadUrl);
//								plus.runtime.openURL("https://www.pgyer.com/HQx8");
//								plus.runtime.openURL("https://www.pgyer.com/Z5k5");
							}else{
								return;
							}
						})
	
					}else{
					}
						
				}
				})
		  })
	})
}, false);
