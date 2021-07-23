
//在 IOS 上，监听输入框的 focus 事件来获知软键盘弹起，监听输入框的 blur 事件获知软键盘收起。
//在 Android 上，监听 webview 高度会变化，高度变小获知软键盘弹起，否则软键盘收起。
 
//问题描述：在IOS12以上的微信端，iPhoneX的型号和华为保时捷的型号的微信购物，出现input弹出后结算按钮点击无反应的情况。
//分析：是由于IOS端第三方输入法的软键盘弹出后，焦点无法复位。
 
//判断设备类型
var judgeDeviceType = function(){
  var ua = window.navigator.userAgent.toLocaleLowerCase();
  var isIOS = /iphone|ipad|ipod/.test(ua);
  var isAndroid = /android/.test(ua);
  return {isIOS: isIOS, isAndroid: isAndroid};
}();
 
//监听输入框的软键盘弹起和收起事件
function listenKeybord($input){
  if(judgeDeviceType.isIOS){
    //IOS 键盘弹起
    $input.focus(function(){
        //IOS 键盘弹起后操作
    });
    //IOS 键盘收起：IOS 点击输入框以外区域或点击收起按钮，输入框都会失去焦点，键盘会收起，
    $input.blur(function(){
        //IOS 键盘收起后操作
    	var wechatInfo = window.navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
        if(!wechatInfo){ 
        	return;
        }
        var wechatVersion = wechatInfo[1];
        var version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        if(+wechatVersion.replace(/\./g, '') >= 674 && +version[1] >= 12){
        	window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
        }
    });
  }
 
  // Andriod 键盘收起：Andriod 键盘弹起或收起页面高度会发生变化，以此为依据获知键盘收起
  if(judgeDeviceType.isAndroid){
    var originHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window.addEventListener('resize', function(){
      var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
      if(originHeight < resizeHeight){
        // Android 键盘收起后操作
      }else{
        // Android 键盘弹起后操作
      }
      originHeight = resizeHeight;
    }, false);
  }
}
 
$(function(){
	$("input").each(function(){
	    listenKeybord($(this));
	});
});