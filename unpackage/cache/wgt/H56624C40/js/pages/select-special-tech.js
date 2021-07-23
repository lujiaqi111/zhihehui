$(document).ready(function(){
	var stuffIndex;
	var customStuffIndex;
	var areaIndex;
	var colorIndex;
	
//	$(window).scroll(function(){ 
//	// 重点就是下面这一条语句的实现 
//		$("#sureButton01").css({top: window.innerHeight + window.scrollY - 42 }); 
//	}); 
	
	//点击局部UV的丝网选项 填写颜色编号
//	$('#color').on('change',function(){
//		$('html').css('height',"100%");
//		$('html').css('overflow','hidden');
//		$('body').css('height',"100%");
//		$('body').css('overflow','hidden');
//		if($(this).val()=='丝网'){
//			//跳出颜色填写框
//			colorIndex=layer.open({
//			  type: 1,
//			  skin: 'demo-class',
//			  area: '95%', //宽高
////			  scrollbar: false,
//			  title:"自定义印刷颜色",
//			  shadeClose:true,
//			  content: $('#otherColor'),
//			  cancel: function(index){ 
//				  $('#color').val('');
//				  $('#otherColorInput').val('');
//				  layer.close(index);
//				  return false; 
//				},
//				success: function(layero){
//			  	$(layero).addClass("scroll-wrapper");
//			  },
//			  end:function(){
//			  	$('html').css('height',"auto");
//			  	$('html').css('overflow','auto');
//			  	$('body').css('height',"auto");
//			  	$('body').css('overflow','auto');
//			  }
//			});
//		}
//	})
	//颜色改变
	$('#color').change(function(){
		if($('#color').val()!=''){
			$(this).css('color','#FF6F00');
			$(this).parent().css('color','#FF6F00');
			$('.select-special-table tr:nth-child(4) td:nth-child(1)').css('color','#FF6F00')
		}
		
	})
	$('#colorText').click(function(){
		console.log(111);
		$('#color').trigger('change');
	})
	$('#moQieText').click(function(){
		$('#moQie').trigger('change');
	})
	$('#technology').change(function(){
		if($('#technology').val()!='选择工艺'){
			$(this).css('color','#FF6F00');
			$('.select-special-table tr:nth-child(1) td:nth-child(1)').css('color','#FF6F00')
		}
		
	})
	$('#moQie').change(function(){
		if($('#moQie').val()!=''){
			$(this).css('color','#FF6F00');
			$(this).parent().css('color','#FF6F00');
			$('.select-special-table tr:nth-child(7) td:nth-child(1)').css('color','#FF6F00')
		}
		
	})
	$('#kongJu').change(function(){
		if($('#kongJu').val()==''){
			$(this).css('color','#FF6F00');
			$(this).parent().css('color','#FF6F00');
			$('.select-special-table tr:nth-child(9) td:nth-child(1)').css('color','#FF6F00')
		}
		
	})
	//点击局部UV自定义颜色确定按钮
	$('#sureButton05').on('tap click',function(){
		var color=$('#otherColorInput').val();
		if(color==''){
			parent.parent.layer.msg('请填写印刷颜色编号',{offset:'80%'});
		}else{
			$('#color').append('<option value="'+color+'" selected="selected">'+color+'</option>');
			$('#otherColorInput').val('');
			layer.close(colorIndex);
			console.log($('#color').val());
		}
	});
	
	$('#materialText').on('click',function(){
		$('html').css('height',"100%");
		$('html').css('overflow','hidden');
		$('body').css('height',"100%");
		$('body').css('overflow','hidden')
		parent.$('.layui-layer>span.layui-layer-setwin a').css('display','none');
		stuffIndex=layer.open({
			  type: 1,
			  skin: 'demo-class',
			  area: '100%', //宽高
			  scrollbar: true,
			  title:"",
			  shadeClose:true,
			  content: $('#selectStuff'),
			  closeBtn: 2,
			  success: function(layero){
			  	$(layero).addClass("scroll-wrapper");
			  },
			  end:function(){
			  	$('html').css('height',"auto");
			  	$('html').css('overflow','auto');
			  	$('body').css('height',"auto");
			  	$('body').css('overflow','auto');
			  	parent.$('.layui-layer>span.layui-layer-setwin a').css('display','block');
			  }
			});
	});
	
	$('#selectStuff').on('click','td',function(){
		if($(this).hasClass('border-selected')){
			$(this).removeClass('border-selected')
		}else{
			$(this).addClass('border-selected').siblings('td').removeClass('border-selected').parent('tr').siblings('tr').find('td').removeClass('border-selected');
		}
	});
	
	$('#sureButton02').on('click',function(){
		var $borderObj=$('#selectStuff').find('.border-selected');
		if($borderObj.length==0){
			$('#material').val('');
			
		}else{
			$('#material').val($borderObj.find('p').text()+$borderObj.find('span').text());
			$('#material').parent().css('color','#FF6F00');
			$('#material').css('color','#FF6F00')
			$('.select-special-table tr:nth-child(1) td:nth-child(1)').css('color','#FF6F00')
		}
		layer.close(stuffIndex);
		
	});
	
	$('#otherStuffDiv').on('tap click',function(){
		$('html').css('height',"100%");
		$('html').css('overflow','hidden');
		$('body').css('height',"100%");
		$('body').css('overflow','hidden');
		layer.close(stuffIndex);
		customStuffIndex=layer.open({
			  type: 1,
			  skin: 'demo-class',
			  area: '100%', //宽高
			  scrollbar: true,
			  title:"自定义烫印材料",
			  shadeClose:true,
			  content: $('#otherStuff'),
			  success: function(layero){
			  	$(layero).addClass("scroll-wrapper");
			  },
			  end:function(){
			  	$('html').css('height',"auto");
			  	$('html').css('overflow','auto');
			  	$('body').css('height',"auto");
			  	$('body').css('overflow','auto');
			  }
			});
	});
	
	$('#sureButton04').on('tap click',function(){
		if($('#otherStuffInput').val()==''){
			parent.parent.layer.msg('请填写指定材料',{offset:'80%'});
		}else{
			$('#material').val('指定材料-'+$('#otherStuffInput').val());
			layer.close(customStuffIndex);
		}		
	});
	
	$('#area1Text').on('click',function(){
		//判断是第几个area
		$('html').css('height',"100%");
		$('html').css('overflow','hidden');
		$('body').css('height',"100%");
		$('body').css('overflow','hidden');
		$('#sureButton03').attr('sign','0');
		console.log(parent);
		parent.$('.layui-layer>span.layui-layer-setwin a').css('display','none');
		areaIndex=layer.open({
			  type: 1,
			  skin: 'demo-class',
			  area: '100%', //宽高
//			  scrollbar: false,
			  title:"",
			  shadeClose:true,
			  content: $('#selectArea'),
			  closeBtn: 2,
			  success: function(layero){
			  	$('#sizeShash').css('height','100%');
			  	$('#areaUl li').removeClass('area-selected');
			  	$(layero).addClass("scroll-wrapper");
			  	
			  },
			  end:function(){
			  	$('html').css('height',"auto");
			  	$('html').css('overflow','auto');
			  	$('body').css('height',"auto");
			  	$('body').css('overflow','auto');
			  	parent.$('.layui-layer>span.layui-layer-setwin a').css('display','block');
			  	
			  }
			});
	});
	$('#area2Text').on('tap click',function(){
		//判断是第几个area
		$('html').css('height',"100%");
		$('html').css('overflow','hidden');
		$('body').css('height',"100%");
		$('body').css('overflow','hidden');
		$('#sureButton03').attr('sign','1');
		parent.$('.layui-layer>span.layui-layer-setwin a').css('display','none');
		areaIndex=layer.open({
			  type: 1,
			  skin: 'demo-class',
			  area: '100%', //宽高
//			  scrollbar: false,
			  title:"",
			  shadeClose:true,
			  content: $('#selectArea'),
			  closeBtn: 2,
			  success: function(layero){
			  	$('#sizeShash').css('height','100%');
			  	$('#areaUl li').removeClass('area-selected');
			  	$(layero).addClass("scroll-wrapper");
			  },
			  end:function(){
			  	$('html').css('height',"auto");
			  	$('html').css('overflow','auto');
			  	$('body').css('height',"auto");
			  	$('body').css('overflow','auto');
			  	parent.$('.layui-layer>span.layui-layer-setwin a').css('display','block');
			  	
			  }
			});
	});
	
	$('#areaUl').on('tap click','li',function(){
		$(this).addClass('area-selected').siblings('li').removeClass('area-selected');
		var height=$(this).text();
		height=100-Number(height.substring(0,height.length-1));
		$('#sizeShash').css('height',height+'%');
	});
	
	$('#sureButton03').on('tap click',function(){
		var $borderObj = $('#areaUl').find('.area-selected');
		if($borderObj.length == 0){
			$('#specialTech').find('.area').eq($(this).attr('sign')).val('');
		}else{
			$('#specialTech').find('.area').eq($(this).attr('sign')).val($borderObj.text());
			$('#specialTech').find('.area').eq($(this).attr('sign')).css('color','#FF6F00')
			  	$('#specialTech').find('.area').eq($(this).attr('sign')).parent().css('color','#FF6F00');
			  	if(Number($(this).attr('sign')) == 0){
			  		$('.select-special-table tr:nth-child('+(Number($(this).attr('sign'))+1)+') td:nth-child(1)').css('color','#FF6F00')
			  	}else if(Number($(this).attr('sign')) == 1){
			  		$('.select-special-table tr:nth-child('+(Number($(this).attr('sign'))+3)+') td:nth-child(1)').css('color','#FF6F00')
			  	}
			  	
		}
		
		layer.close(areaIndex);
	});
	
	$('#sureButton01').on('tap click',function(){
		var material=$('#material').val();
		var technology=$('#technology').val();
		var area1=$('#area1').val();
		var color=$('#color').val();
		var area2=$('#area2').val();
		var moQie=$('#moQie').val();
		var aoTu=$('#aoTu').val();
//		var area3=$('#area3').val();
		var kongJu=$('#kongJu').val();
//		var specialRequire=$('#specialRequire').val();
		var specialS='';
		if(material==''&&technology==''&&area1==''){
			
		}else if(material!=''&& technology!=''&&area1!=''){
			specialS='烫金化铝：'+material+' '+technology+' '+area1+';<br/>';
		}else{
			parent.layer.msg('请填写完整烫金化铝信息',{offset:'80%'});
			return false;
		}
		
		if(color==''&&area2==''){
			
		}else if(color!=''&&area2!=''){
			specialS=specialS+'局部UV/丝网印刷：'+color+' '+area2+';<br/>';
		}else{
			parent.layer.msg('请填写完整局部UV/丝网印刷信息',{offset:'80%'});
			return false;
		}
		
		if(moQie!=''){
			specialS=specialS+'模切：'+moQie+';<br/>';
		}
		
		if(kongJu!=''){
			specialS=specialS+'蝴蝶订：'+kongJu+';<br/>';
		}
//		console.log(material+''+technology+''+area1+''+color+''+area2+''+moQie+''+kongJu)
		if(material==''&& technology==''&&area1==''&&color==''&&area2==''&&moQie==''&&kongJu==''){
			parent.layer.msg('请右上角关闭页面',{offset:'80%'});
			return false;
		}else{
			console.log(1113);
		}
//		if(specialRequire!=''){
//			specialS=specialS+'特殊要求：'+specialRequire+';<br/>';
//		}
//		
		var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
		var divIndex=$(this).attr('sign');
		var status = $(this).attr('status');
		if(specialS!=''){
			specialS=specialS.substring(0,specialS.length-5);
			console.log(specialS);
			console.log(status);
			console.log(divIndex);
			if(status == 1){
				parent.$('.requirement1').eq(divIndex).find('.special-tech-value').empty().html(specialS).removeClass('hide');
			}else if(status == 2){
				parent.$('.requirement2').eq(divIndex).find('.special-tech-value').empty().html(specialS).removeClass('hide');
			}else if(status == 3){
				parent.$('.requirement3').eq(divIndex).find('.special-tech-value').empty().html(specialS).removeClass('hide');
			}else if(status == 5){
				parent.$('.requirement5').eq(divIndex).find('.special-tech-value').empty().html(specialS).removeClass('hide');
			}else{
				console.log(divIndex);
				parent.$('.requirement').eq(divIndex).find('.special-tech-value').empty().html(specialS).removeClass('hide');
			}
			
		}
		parent.layer.close(index);
	});
});
