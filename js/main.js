// $('#search').bind('keydown', function(){
// 	$('#val').html($('#search').val());
// });
$('#search').bind('keyup', function(){
	$('#val').html($('#search').val());
});
$('#search').bind('change', function(){
	console.log("hello");
	console.log($('#search').val());
	$('#val').html($('#search').val());
});

// function updateData(){
// 	chrome.notifications
// };

// chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
// 	alert(msg.action);
//    // if (msg.action == 'SendIt') {
//    //    alert("Message recieved!");
//    // }
// });

// chrome.runtime.onMessage.addListener(function (request,sender,callback) {
// 	console.log(request);
// 	console.log(sender);
//     callback('ok');
// });
// chrome.runtime.sendMessage("sendData", function (response) {
//     console.log('content get response:',response);
// });

// chrome.runtime.onMessage.addListener(
//    function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                "from the extension");
//      // if (request.greeting == "hello")//判断是否为要处理的消息
//      //        sendResponse({farewell: "goodbye"});
//      console.log(request);
// });


chrome.runtime.onConnect.addListener((port)=> {
    console.assert(port.name == "coinStatus");
    // if (port.name != "coinStatus") {
    // 	return;
    // }
    port.onDisconnect.addListener(obj => {
		console.log('disconnected port');
	});
    port.onMessage.addListener((msg)=> {
    	// alert($('#shib'));
    	// alert($('#shib').val());
    	// alert(msg.price);
    	// alert(JSON.stringify(msg));
    	if (msg.coin == 'SHIB') {
			// sendData.coin = "SHIB";
			// sendData.price = data.p;
			$('#shib').html(msg.price);
		}
		if (msg.coin == 'RVN') {
			// sendData.coin = "RVN";
			// sendData.price = data.p;
			$('#rvn').html(msg.price);
		}
		if (msg.coin == 'DOGE') {
			// sendData.coin = "RVN";
			// sendData.price = data.p;
			$('#doge').html(msg.price);
		}
		if (msg.coin == 'BTC') {
			// sendData.coin = "RVN";
			// sendData.price = data.p;
			$('#btc').html(msg.price);
		}
		if (msg.coin == 'BEAM') {
			// sendData.coin = "RVN";
			// sendData.price = data.p;
			$('#beam').html(msg.price);
		}
      // console.log(msg);
   });
});

//  var port = chrome.runtime.connect({name: "coinStatus"});//通道名称
//  // port.postMessage({joke: "Knock knock"});//发送消息
//  port.onMessage.addListener(function(msg) {//监听消息
//  	console.log(msg);
//    // if (msg.question == "Who's there?")
//    //   port.postMessage({answer: "yisheng"});
//    // else if (msg.question == "Madame who?")
//    //   port.postMessage({answer: "Madame... Bovary"});
// });

window.onload = function(){
	var bg = chrome.extension.getBackgroundPage();
	bg.createWebSocketConnection();
	
};
function myrefresh() {
	window.location.reload();
}
//指定1秒刷新一次
// setTimeout('myrefresh()', 1000);

// new Vue({
//   el: '#app',
//   data: {
//     message: 'Hello Vue.js!'
//   }
// })