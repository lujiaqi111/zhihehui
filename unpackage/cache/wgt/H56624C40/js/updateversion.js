document.addEventListener("pause", function(){  
    mui.plusReady(function() {
		plus.runtime.getProperty(plus.runtime.appid,function(inf){
		 // 当前版本
	     var wgtVersion = inf.version;
	     alert(wgtVersion);
	     var type = '';
	     if(mui.os.android){
	     	type = 1;
	     }else if(mui.os.ios){
	     	type = 2
	     }
//	     go_to_view('update.html',{version:'2.0',type:1,log:'最近版本'});
//	    
		alert(wgtVersion);
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
						
//						go_to_view('update.html',{version:res.result.version,log:res.result.log});
						
//						var btnArray = ['确定'];
//                      mui.confirm('最新version是：' + res.result.version+',是否更新', '发现最新版本', btnArray, function(z) {
//                          if (z.index == 0) {
//                              plus.runtime.openURL("https://www.pgyer.com/HQx8");
//							var u = navigator.userAgent;
//							if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
//                              mui.toast('正在下载...');
//                              plus.nativeUI.showWaiting();
//                              dtask = plus.downloader.createDownload(res.result.filePath, {method:'GET'}, function(d, status) {
//                              	console.log(d+'----'+status);
//                              	
//                                  if (status == 200) {
//                                      plus.nativeUI.toast("正在准备环境，请稍后！");
//                                      var path = d.filename;//_downloads yijietong.apk
//                                      console.log(d.filename);
//                  					mui.toast('下载完成...');
//                  					var nwaiting = plus.nativeUI.showWaiting()
//                  					nwaiting.close();
//                                      plus.runtime.install(path); // 安装下载的apk文件
//                                  } else {
//                                      alert('Download failed:' + status);
//                                  }
//                              });
//                              dtask.start();
//                              dtask.addEventListener("statechanged",function(task,status){
//					            if(!dtask){return;}
//						        switch(task.state){
//						            case 1: mui.toast('开始下载...');break;//开始
//						            case 2: mui.toast('链接到服务器...');break;//链接到服务器
//						            case 3:mui.toast('正在下载...');
//						                break;
//						            case 4: mui.toast('下载完成');break;
//						            }
//						        });
//						        } else if (u.indexOf('iPhone') > -1) {
//						        	plus.runtime.openURL("https://www.pgyer.com/HQx8");
//						        }
                                
//                         } 
//                      });	
					}else{
//						alert(res.message);
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
	     var url = ajaxUrlPath + 'mobile/apk/getApkInfo';
//	     var url = base_url + '/mobile/test/apk/getApkInfo';
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
//						go_to_view('update.html',{version:res.result.version,log:res.result.log});
//						var btnArray = ['确定'];
//                      mui.confirm('最新version是：' + res.result.version+',是否更新', '发现最新版本', btnArray, function(z) {
//                          if (z.index == 0) {
//                              plus.runtime.openURL("https://www.pgyer.com/HQx8");
//							var u = navigator.userAgent;
//							if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
//                              mui.toast('正在下载...');
//                              plus.nativeUI.showWaiting();
//                              dtask = plus.downloader.createDownload(res.result.filePath, {method:'GET'}, function(d, status) {
//                              	console.log(d+'----'+status);
//                              	
//                                  if (status == 200) {
//                                      plus.nativeUI.toast("正在准备环境，请稍后！");
//                                      var path = d.filename;//_downloads yijietong.apk
//                                      console.log(d.filename);
//                  					mui.toast('下载完成...');
//                  					var nwaiting = plus.nativeUI.showWaiting()
//                  					nwaiting.close();
//                                      plus.runtime.install(path); // 安装下载的apk文件
//                                  } else {
//                                      alert('Download failed:' + status);
//                                  }
//                              });
//                              dtask.start();
//                              dtask.addEventListener("statechanged",function(task,status){
//					            if(!dtask){return;}
//						        switch(task.state){
//						            case 1: mui.toast('开始下载...');break;//开始
//						            case 2: mui.toast('链接到服务器...');break;//链接到服务器
//						            case 3:mui.toast('正在下载...');
//						                break;
//						            case 4: mui.toast('下载完成');break;
//						            }
//						        });
//						        } else if (u.indexOf('iPhone') > -1) {
//						        	plus.runtime.openURL("https://www.pgyer.com/HQx8");
//						        }
                                
//                         } else {
//                              return;
//                          }
//                      });	
					}else{
//						alert(res.message);
					}
						
				}
				})
		  })
	})
}, false);