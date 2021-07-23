$(document).ready(function(){
	var offerParaJson=JSON.parse(sessionStorage.getItem('offerParaJson'));
	
	if(offerParaJson.binging.bindStyle=='折页'){
		//折页
		var foldNum=offerParaJson.size.foldNum;
		$('#foldNum').removeClass('hide');
		$('#typeNum').addClass('hide');
		$('#pagesName').text('折页页数');
		$('#commonPaperTitle').text('折页常用纸张');
		$('#foldNum').find('input').val(foldNum);
		$('#pagesNum').val(parseInt(foldNum)*2);
	}
	
	//填写折数或者品数时，页数改变
	$('#foldNum,#typeNum').find('input').on('blur',function(){
		$('#pagesNum').val(parseInt($(this).val())*2);
	});
	
	getComPapers('inside',offerParaJson.sellerId);
	
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
										oTd=$('#commonPaperTable').find('tr').eq(0).find('td').eq(mark);
									}else{
										oTd=$('#commonPaperTable').find('tr').eq(1).find('td').eq(mark-3);
									}
									oTd.data('weight',weights[v].weight);
									oTd.data('dun',weights[v].price);
									oTd.data('name',dtosArr[j].name);
									oTd.find('p').text(weights[v].weight+'克'+dtosArr[j].name);
										
									mark++;
								}
							}
						}
					}
				}else{
					for (var i=0;i<result.length;i++) {
						if(result[i].name=='内面'||result[i].name=='通用'){
							var dtosArr=result[i].dtos;
							for (var j=0;j<dtosArr.length;j++) {
								var weights=dtosArr[j].weights;
								for (var v=0;v<weights.length;v++) {
									var oTd;
									if(mark<3){
										oTd=$('#commonPaperTable').find('tr').eq(0).find('td').eq(mark);
									}else{
										oTd=$('#commonPaperTable').find('tr').eq(1).find('td').eq(mark-3);
									}
									oTd.data('weight',weights[v].weight);
									oTd.data('dun',weights[v].price);
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
