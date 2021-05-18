var websocket;
var id = Math.floor(Math.random()*10) + 1;
function createWebSocketConnection() {
    if('WebSocket' in window){
        chrome.storage.local.get("instance", function(data) {
            connect('wss://stream.binance.com:9443/ws/stream');
        });
    }
}

//Make a websocket connection with the server.
function connect(host) {
    if (websocket === undefined) {
        websocket = new WebSocket(host);
    }

    websocket.onopen = function() {
        // chrome.storage.local.get(["username"], function(data) {
        //     websocket.send(JSON.stringify({userLoginId: data.username}));
        // });

        data = {
		  "method":"SUBSCRIBE",
		  "params": [
		    "rvnusdt@aggTrade",
		    "shibusdt@aggTrade",
		    "dogeusdt@aggTrade",
		    "btcusdt@aggTrade",
		    "beamusdt@aggTrade"
		  ],
		  "id": id
		};
		websocket.send(JSON.stringify(data)); //将消息发送到服务端
    };

    websocket.onmessage = function (event) {
        // var received_msg = JSON.parse(event.data);
        // var demoNotificationOptions = {
        //     type: "basic",
        //     title: received_msg.subject,
        //     message: received_msg.message,
        //     iconUrl: "images/demo-icon.png"
        // }
        data = JSON.parse(event.data);
        var sendData = {
        };
		if (data.s == 'SHIBUSDT') {
			sendData.coin = "SHIB";
			sendData.price = data.p;
			// $('#shib').html(data.p);
		}
		if (data.s == 'RVNUSDT') {
			sendData.coin = "RVN";
			sendData.price = data.p;
			// $('#rvn').html(data.p);
		}
		if (data.s == 'DOGEUSDT') {
			sendData.coin = "DOGE";
			sendData.price = data.p;
			// $('#rvn').html(data.p);
		}
		if (data.s == 'BTCUSDT') {
			sendData.coin = "BTC";
			sendData.price = data.p;
			// $('#rvn').html(data.p);
		}
		if (data.s == 'BEAMUSDT') {
			sendData.coin = "BEAM";
			sendData.price = data.p;
			// $('#rvn').html(data.p);
		}
		// chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		//     chrome.tabs.sendMessage(tabs[0].id, {action: sendData}, function(response) {});  
		// });
		
		// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		//  chrome.tabs.sendMessage(tabs[0].id, sendData, function(response) { });
		// });

		// alert(JSON.stringify(sendData));
		var port = chrome.runtime.connect({name: "coinStatus"});//通道名称
		port.onDisconnect.addListener(function() {
	        var ignoreError = chrome.runtime.lastError;
	        console.log("onDisconnect");
        });

		port.postMessage(sendData);//发送消息
		//  port.onMessage.addListener(function(msg) {//监听消息
		//  	console.log(msg);
		//    // if (msg.question == "Who's there?")
		//    //   port.postMessage({answer: "yisheng"});
		//    // else if (msg.question == "Madame who?")
		//    //   port.postMessage({answer: "Madame... Bovary"});
		// });
		// chrome.runtime.onMessage.addListener(function (request,sender,callback) {
		// 	console.log(request);
		// 	console.log(sender);
		//     callback(sendData);
		// });
		// chrome.notifications.create("", sendData);
        // updateData();
    };

    //If the websocket is closed but the session is still active, create new connection again
    websocket.onclose = function() {
    	req = {
		  "method": "UNSUBSCRIBE",
		  "params": [
		    "rvnusdt@aggTrade",
		    "shibusdt@aggTrade",
		    "dogeusdt@aggTrade",
		    "btcusdt@aggTrade",
		    "beamusdt@aggTrade"
		  ],
		  "id": id
		}
		websocket.send(JSON.stringify(data));
        websocket = undefined;
        chrome.storage.local.get(['demo_session'], function(data) {
            if (data.demo_session) {
                createWebSocketConnection();
            }
        });
    };
}

//Close the websocket connection
function closeWebSocketConnection(username) {
    if (websocket != null || websocket != undefined) {
        websocket.close();
        websocket = undefined;
    }
}


function start(){
	var ws = new WebSocket("wss://stream.binance.com:9443/ws/stream"); 
	//申请一个WebSocket对象，参数是服务端地址，同http协议使用http://开头一样，WebSocket协议的url使用ws://开头，另外安全的WebSocket协议使用wss://开头
	ws.onopen = function(){
	   data = {
		  "method":"SUBSCRIBE",
		  "params": [
		    "rvnusdt@aggTrade",
		    "shibusdt@aggTrade"
		  ],
		  "id": 1
		};
	　　ws.send(JSON.stringify(data)); //将消息发送到服务端
	}
	ws.onmessage = function(e){
		console.log(e.data)
		data = JSON.parse(e.data);
		if (data.s == 'SHIBUSDT') {
			$('#shib').html(data.p);
		}
		if (data.s == 'RVNUSDT') {
			$('#rvn').html(data.p);
		}
		console.log(data.p);
	　　//当客户端收到服务端发来的消息时，触发onmessage事件，参数e.data包含server传递过来的数据
	// 　　console.log(e.data);
	}
	ws.onclose = function(e){
		req = {
		  "method": "UNSUBSCRIBE",
		  "params": [
		    "rvnusdt@aggTrade",
		    "shibusdt@aggTrade"
		  ],
		  "id": 1
		}

		ws.send(JSON.stringify(data));
	　　//当客户端收到服务端发送的关闭连接请求时，触发onclose事件
	　　console.log("close");
	}
	ws.onerror = function(e){
	　　//如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
	　　console.log(error);
	}
};