$(document).ready(function(){
	console.log(sessionStorage.getItem('offerParaJson'))
	var offerParaJson=JSON.parse(sessionStorage.getItem('offerParaJson'));
	//画自定义展示图
//	alert(JSON.stringify(offerParaJson));
	var blockWidth=$('#customBlock').width();
	var blockHeight=$('#customBlock').height();
	var ratio=blockWidth/blockHeight;
	var acrualWidth=$('#customWidth').val();
	var acrualHeight=$('#customHeight').val();

	drawBlock(blockWidth,blockHeight,ratio,acrualWidth,acrualHeight);
	
	//修改宽、高、折页，自动修改展开的大小  只在单页折页中使用的到  
	$('#customWidth').on('blur',function(){
		var value=$(this).val();
		var foldingNum=$('#foldingNum').val();
		var displayWidth=Number(value)*parseInt(foldingNum);
		$('#displayWidth').text(isNaN(displayWidth)==NaN?0:displayWidth);
		acrualWidth=value;
		acrualHeight=$('#customHeight').val();
		var pagesizenum = standardSize(parseInt(acrualWidth),parseInt(acrualHeight));
		for (var i = 0; i < $('#bindingTable tr td p').length; i++) {
			 console.log($('#bindingTable tr td p').eq(i).attr('sign'))
			if($('#bindingTable tr td p').eq(i).attr('sign')==pagesizenum){
				
				$('#bindingTable tr td p').eq(i).addClass('selected')
				$('#bindingTable tr td p').eq(i).parent().addClass('selected')
			}else{
				$('#bindingTable tr td p').eq(i).removeClass('selected');
				$('#bindingTable tr td p').eq(i).parent().removeClass('selected')
			}
			
		}
		drawBlock(blockWidth,blockHeight,ratio,acrualWidth,acrualHeight);
		sizeToJson(offerParaJson,sizeJson,acrualWidth,acrualHeight);
	});
	
	$('#customHeight').on('blur',function(){
		var value=$(this).val();
//		var foldingNum=$('#foldingNum').val();
//		var displayHeight=Number(value)*parseInt(foldingNum);
//		$('#displayHeight').text(isNaN(displayHeight)==NaN?0:displayHeight);
		$('#displayHeight').text(value);
		acrualWidth=$('#customWidth').val();
		acrualHeight=value;
		var pagesizenum = standardSize(parseInt(acrualWidth),parseInt(acrualHeight));
		for (var i = 0; i < $('#bindingTable tr td p').length; i++) {
			 console.log($('#bindingTable tr td p').eq(i).attr('sign'))
			if($('#bindingTable tr td p').eq(i).attr('sign')==pagesizenum){
				
				$('#bindingTable tr td p').eq(i).addClass('selected')
				$('#bindingTable tr td p').eq(i).parent().addClass('selected')
			}else{
				$('#bindingTable tr td p').eq(i).removeClass('selected');
				$('#bindingTable tr td p').eq(i).parent().removeClass('selected')
			}
			
		}
		drawBlock(blockWidth,blockHeight,ratio,acrualWidth,acrualHeight);
		sizeToJson(offerParaJson,sizeJson,acrualWidth,acrualHeight);
//		if(Number(acrualWidth)<=Number(acrualHeight)){
//			//横版不勾选
//			$('#heightWidthChange').find('.img-checkbox').attr('checked',false);
//			$('#heightWidthChange').find('.checkbox-img').attr('src','img/radion01.png');
//		}else{
//			//横版勾选
//			$('#heightWidthChange').find('.img-checkbox').attr('checked',true);
//			$('#heightWidthChange').find('.checkbox-img').attr('src','img/radion02.png');
//		}
	});
	
	var sizeJson={};
	/**
	 * 当为特殊要求是，pageSize='',pageSizeCh='特殊要求'，pageWidth和pageHeight为特殊要求尺寸
	 */
	var pageWidth='';
	var pageHeight='';
	var pageSize='';
	var pageSizeCh='';
	var foldNum='';
	
	$('#bindingTable').on('tap click','td',function(e){
		/*
		 * 点击表格中的纸张直接跳转到下一页（以废弃）
		 */
		e.preventDefault();
		e.stopPropagation()
		pageSizeCh=$(this).find('p').text();
		console.log(pageSizeCh);
		pageSize=$(this).find('p').attr('sign');
		console.log(pageSize)
		$("#choose").attr("checked", false);
		$(this).addClass('selected');
		$(this).find('p').addClass('selected');
		$(this).parent('tr').siblings('tr').children().find('p').removeClass('selected');
		$(this).siblings('td').children('p').removeClass('selected');
		$(this).siblings('td').removeClass('selected').parent('tr').siblings('tr').find('td').removeClass('selected');
		var sizeArr=$(this).find('span').text().split('X');
		var width1=sizeArr[0].substring(0,sizeArr[0].length-2);
		var height1=sizeArr[1].substring(0,sizeArr[1].length-2)
		console.log(width1+','+height1+','+blockWidth+','+blockHeight+','+ratio);
		$('#customWidth').val(width1);
		$('#customHeight').val(height1);
		//展示图
		drawBlock(blockWidth,blockHeight,ratio,width1,height1);
		//横版不勾选
//		$('#heightWidthChange').find('.img-checkbox').attr('checked',false);
//		$('#heightWidthChange').find('.checkbox-img').attr('src','img/radion01.png');
//		将尺寸的值构建json
//		sizeToJson(offerParaJson,sizeJson,pageWidth,pageHeight,pageSize,pageSizeCh,foldNum);
		sizeToJson(offerParaJson,sizeJson,width1,height1,pageSize,pageSizeCh);
		/*
		 * 新逻辑：点击表格中的纸张将数值显示在下面的输入框中
		 */
	
	});
	
	$('#nextButton0').on('tap',function(){
		var mark=$(this).attr('sign');
		pageWidth=$('#customWidth').val();
		pageHeight=$('#customHeight').val();
		if(pageWidth<=0||pageHeight<=0||pageWidth==''||pageHeight==''){
			layer.msg('请选择纸张的尺寸',{offset:'80%'});
			return false;
		}
		if($('#displaySizeDiv').hasClass('hide')==false){
			foldNum=$('#foldingNum').val();
			if(foldNum<=0||foldNum==''){
				layer.msg('请填写折页数',{offset:'80%'});
				return false;
			}
		}
		pageSize=standardSize(parseInt(pageWidth),parseInt(pageHeight));
		console.log(pageSize);
		if(pageSize!=''){
			//将pageSize转成中文
			pageSizeCh=sizeCharToCh(pageSize);
		}else{
			pageSizeCh='';
		}
		console.log(pageSizeCh);
//		将尺寸的值构建json
		sizeToJson(offerParaJson,sizeJson,pageWidth,pageHeight,pageSize,pageSizeCh);
		sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
//		alert(JSON.stringify(offerParaJson));
		
		swiper.slideTo(2);  
	});
	
	//点击图片，checkbox选中
//	$('#heightWidthChange').on('tap click',function(){
//		if($(this).find('.img-checkbox').attr('checked')==undefined){
//			$(this).find('.img-checkbox').attr('checked',true);
//			$(this).find('.checkbox-img').attr('src','img/radion02.png');
//		}else{
//			$(this).find('.img-checkbox').attr('checked',false);
//			$(this).find('.checkbox-img').attr('src','img/radion01.png');
//		}
//		var width2=$('#customWidth').val();
//		var height2=$('#customHeight').val();
//		$('#customWidth').val(height2);
//		$('#customHeight').val(width2);
//		drawBlock(blockWidth,blockHeight,ratio,height2,width2);
//	});
		
	
});

function drawBlock(blockWidth,blockHeight,ratio,acrualWidth,acrualHeight){
	var actualRatio=acrualWidth/acrualHeight;
	if(isNaN(actualRatio)&&actualRatio==0){
		
	}else{
		if(acrualWidth<=blockWidth&&acrualHeight<=blockHeight){
			$('#customBlock').width(parseInt(acrualWidth));
			$('#customBlock').height(parseInt(acrualHeight));
			$('#customBlock').css('position','absolute')
			$('#customBlock').css('left','50%')
			$('#customBlock').css('margin-left',(-parseInt(acrualWidth)/2))
		}else{
			if(actualRatio>ratio){
			//实际的宽长比比标准的大  画的宽度=blockWidth  （标准的宽/实际的宽）*实际的高度=画的高度
			 $('#customBlock').width(blockWidth);
			 $('#customBlock').css('position','absolute')
			$('#customBlock').css('left','50%')
			$('#customBlock').css('margin-left',(-blockWidth/2))
			 $('#customBlock').height(parseInt(blockWidth/acrualWidth*acrualHeight));
			}else{
				//实际的宽长比比标准的小  画的高度=blockWidth  （标准高/实际的高）*实际的宽=画的宽
				$('#customBlock').width(parseInt(blockHeight/acrualHeight*acrualWidth));
				$('#customBlock').height(blockHeight);
				$('#customBlock').css('position','absolute')
				$('#customBlock').css('left','50%')
				$('#customBlock').css('margin-left',(-(parseInt(blockHeight/acrualHeight*acrualWidth))/2))
			}
		}
	}
}

function standardSize(pageWidth,pageHeight){
	var pageSize='';
	var pageWidthArr=[];
	var pageHeightArr=[];
	//宽度的判断 32,16,8
	if(pageWidth>=0&&pageWidth<=125){
		pageWidthArr.push('s32');
	}else if(pageWidth>=125&&pageWidth<=130){
		pageWidthArr.push('b32');
	}else if(pageWidth>=135&&pageWidth<=145){
		pageWidthArr.push('d32');
	}else if(pageWidth>=150&&pageWidth<=180){
		pageWidthArr.push('s16');
	}else if(pageWidth>=185&&pageWidth<=190){
		pageWidthArr.push('b16');
	}else if(pageWidth>=195&&pageWidth<=215){
		pageWidthArr.push('d16');
	}else if(pageWidth>=220&&pageWidth<=250){
		pageWidthArr.push('s8');
	}else if(pageWidth>=255&&pageWidth<=260){
		pageWidthArr.push('b8');
	}else if(pageWidth>=265&&pageWidth<=290){
		pageWidthArr.push('d8');
	}
	//宽度的判断 12
	if(pageWidth>=0&&pageWidth<=240){
		pageWidthArr.push('s12');
	}
	if(pageWidth>=0&&pageWidth<=250){
		pageWidthArr.push('b12');
	}
	if(pageWidth>=0&&pageWidth<=285){
		pageWidthArr.push('d12');
	}
	//高度的判断 32 16 8
	if(pageHeight>=0&&pageHeight<=180){
		pageHeightArr.push('s32');
	}else if(pageHeight>=180&&pageHeight<=185){
		pageHeightArr.push('b32');
	}else if(pageHeight>=190&&pageHeight<=215){
		pageHeightArr.push('d32');
	}else if(pageHeight>=220&&pageHeight<=250){
		pageHeightArr.push('s16');
	}else if(pageHeight>=255&&pageHeight<=260){
		pageHeightArr.push('b16');
	}else if(pageHeight>=265&&pageHeight<=290){
		pageHeightArr.push('d16');
	}else if(pageHeight>=295&&pageHeight<=365){
		pageHeightArr.push('s8');
	}else if(pageHeight>=370&&pageHeight<=385){
		pageHeightArr.push('b8');
	}else if(pageHeight>=390&&pageHeight<=430){
		pageHeightArr.push('d8');
	}
	//高度的判断 12
	if(pageHeight>=0&&pageHeight<=240){
		pageHeightArr.push('s12');
	}
	if(pageHeight>=0&&pageHeight<=250){
		pageHeightArr.push('b12');
	}
	if(pageHeight>=0&&pageHeight<=285){
		pageHeightArr.push('d12');
	}
	//判断尺寸的归属
	for(var i=0;i<pageWidthArr.length;i++){
		for(var j=0;j<pageHeightArr.length;j++){
			if(pageWidthArr[i]==pageHeightArr[j]){
				pageSize=pageHeightArr[j];
				break;
			}
		}
		if(pageSize!=''){
			break;
		}
	}
	
	return pageSize;
}

function sizeCharToCh(pageSize){
	var firstChar=pageSize.substring(0,1);
	var pageSizeCh=pageSize.substring(1,pageSize.length);
	switch (firstChar){
		case 's':
			pageSizeCh='小'+pageSizeCh+'开';
			break;
		case 'b':
			pageSizeCh='标'+pageSizeCh+'开';
			break;
		case 'd':
			pageSizeCh='大'+pageSizeCh+'开';
			break;
	}
	return pageSizeCh;
}

function sizeToJson(offerParaJson,sizeJson,pageWidth,pageHeight,pageSize,pageSizeCh){
	sizeJson.pageWidth=pageWidth;
	sizeJson.pageHeight=pageHeight;
	sizeJson.pageSize=pageSize;
	sizeJson.pageSizeCh=pageSizeCh;
	console.log(JSON.stringify(sizeJson));
	offerParaJson.sizestr=sizeJson;
	console.log(sessionStorage.getItem('offerParaJson'));
	sessionStorage.setItem('offerParaJson',JSON.stringify(offerParaJson));
	console.log(sessionStorage.getItem('offerParaJson'));
}
	$('#choose').change(function(){
			acrualWidth = $('#customHeight').val();
			acrualHeight = $('#customWidth').val();
			$('#customHeight').val(acrualHeight);
			$('#customWidth').val(acrualWidth);
			blockWidth = $('#customBlock').height();
			blockHeight = $('#customBlock').width();
			ratio = acrualWidth/acrualHeight
			var pagesizenum = standardSize(parseInt(acrualWidth),parseInt(acrualHeight));
			for (var i = 0; i < $('#bindingTable tr td p').length; i++) {
				 console.log($('#bindingTable tr td p').eq(i).attr('sign'))
				if($('#bindingTable tr td p').eq(i).attr('sign')==pagesizenum){
					
					$('#bindingTable tr td p').eq(i).addClass('selected')
					$('#bindingTable tr td p').eq(i).parent().addClass('selected')
				}else{
					$('#bindingTable tr td p').eq(i).removeClass('selected');
					$('#bindingTable tr td p').eq(i).parent().removeClass('selected')
				}
				
			}
			drawBlock(blockWidth,blockHeight,ratio,acrualWidth,acrualHeight);
	})

