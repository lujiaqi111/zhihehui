$(document).ready(function(){
	var offerParaJson=JSON.parse(sessionStorage.getItem('offerParaJson'));
//	if(offerParaJson.binging.bindStyle=='折页'){
//		$('#foldingLable').removeClass('hide');
//		$('#displaySizeDiv').removeClass('hide');
//	}
	
	
	$('#foldingNum').on('blur',function(){
		var value=$(this).val();
		var customWidth=$('#customWidth').val();
//		var customHeight=$('#customWidth').val();
		var foldingNum=$('#foldingNum').val();
		var displayWidth=Number(customWidth)*parseInt(value);
//		var displayHeight=Number(customHeight)*parseInt(value);
		$('#displayWidth').text(isNaN(displayWidth)?0:displayWidth);
//		$('#displayHeight').text(isNaN(displayHeight)?0:displayHeight);
	});
});