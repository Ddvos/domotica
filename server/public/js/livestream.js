(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["livestream"],{"0adf":function(e,t,n){"use strict";n.r(t);var r=n("7a23"),o=function(e){return Object(r["w"])("data-v-4f6348e6"),e=e(),Object(r["u"])(),e},a={class:"background",ref:"mouseEvent"},c=o((function(){return Object(r["f"])("h2",null,"RaspberryPI",-1)}));function i(e,t,n,o,i,s){return Object(r["t"])(),Object(r["e"])("div",a,[c,Object(r["f"])("button",{onClick:t[0]||(t[0]=function(){return s.carControl&&s.carControl.apply(s,arguments)})},"connect"),Object(r["f"])("button",{onClick:t[1]||(t[1]=function(){return s.sendData&&s.sendData.apply(s,arguments)})},"send")],512)}var s=n("1da1"),u=(n("96cf"),n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),n("e9c4"),null),l=null,d={data:function(){return{data:1,sendChannel:null}},created:function(){var e={iceServers:[{urls:"turn:turn.stepverder.nl:3478",username:"Dominique",credential:"WS7Yq_jT"}]};l=new RTCPeerConnection(e)},computed:{},methods:{sendData:function(){console.log(this.sendChannel),u.send(this.data)},carControl:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n,r,o,a,c,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n="controldataipcar",r="Raspberrypi",o=new Map,c=function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=2;break}return e.abrupt("return",a);case 2:return e.abrupt("return",new Promise((function(e,r){try{a=new WebSocket("wss://stepverder.nl:4084/controller"),console.log(t);var o=function r(){a.send(JSON.stringify({type:"register",peerType:n,peerId:t})),a.removeEventListener("open",r),e(a)};a.addEventListener("open",o)}catch(c){r(c)}})));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),t.prev=4,console.log("Websocket gelukt"),t.next=8,c(n,r);case 8:i=t.sent,i.addEventListener("message",function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(r){var a,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,a=JSON.parse(r.data),console.log(a),"offer"!==a.type){t.next=15;break}return console.log("hallo"),o.set(a.from,l),console.log("incoming data "),l.ondatachannel=function(e){console.log(e);var t=e.channel;t.onopen=function(){console.log("Verbonden")},t.onmessage=function(e){console.log(e)}},console.log(l),t.next=11,l.setRemoteDescription(a.data);case 11:return t.next=13,l.createAnswer().then((function(e){return l.setLocalDescription(e)})).then((function(){return new Promise((function(e){if("complete"===l.iceGatheringState)e();else{function t(){"complete"===l.iceGatheringState&&(l.removeEventListener("icegatheringstatechange",t),e())}l.addEventListener("icegatheringstatechange",t)}}))}));case 13:console.log(l.localDescription.sdp),i.send(JSON.stringify({to:a.from,from:n,type:"answer",data:l.localDescription}));case 15:"disconnect"===a.type&&(c=o.get(a.from),c&&(e.camera="Offline",e.statusButton="connect",e.InActive=!0,e.Active=!1,console.log("Disconnecting from",a.from),c.ontrack=null,c.onicecandidate=null,c.close(),o.delete(a.from))),t.next=22;break;case 18:t.prev=18,t.t0=t["catch"](0),console.error(t.t0),console.log("error video beeld niet ontvangen "+t.t0);case 22:case"end":return t.stop()}}),t,null,[[0,18]])})));return function(e){return t.apply(this,arguments)}}()),t.next=16;break;case 12:t.prev=12,t.t0=t["catch"](4),console.error(t.t0),console.log("error verbinding mislukt: "+t.t0);case 16:case"end":return t.stop()}}),t,null,[[4,12]])})))()}}},f=(n("530e"),n("6b0d")),p=n.n(f);const v=p()(d,[["render",i],["__scopeId","data-v-4f6348e6"]]);t["default"]=v},"19a6":function(e,t,n){"use strict";n.r(t);var r=n("7a23"),o=function(e){return Object(r["w"])("data-v-55ab975e"),e=e(),Object(r["u"])(),e},a={class:"background",ref:"mouseEvent"},c=o((function(){return Object(r["f"])("h2",null,"controller",-1)}));function i(e,t,n,o,i,s){return Object(r["t"])(),Object(r["e"])("div",a,[c,Object(r["f"])("button",{onClick:t[0]||(t[0]=function(){return s.carControl&&s.carControl.apply(s,arguments)})},"connect"),Object(r["f"])("button",{onClick:t[1]||(t[1]=function(){return s.sendData&&s.sendData.apply(s,arguments)})},"send")],512)}var s=n("b85c"),u=n("1da1"),l=(n("96cf"),n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),n("e9c4"),null),d={data:function(){return{data:1}},created:function(){},computed:{},methods:{sendData:function(){this.data=Math.floor(100*Math.random()),console.log(this.data),l.send(this.data),window.requestAnimationFrame(this.sendData)},carControl:function(){return Object(u["a"])(regeneratorRuntime.mark((function e(){var t,n,r,o,a,c,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t={sdpSemantics:"unified-plan",iceServers:[{urls:"turn:turn.stepverder.nl:3478",username:"Dominique",credential:"WS7Yq_jT"}]},n="controldata",r="controller",o=new Map,c=function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=2;break}return e.abrupt("return",a);case 2:return e.abrupt("return",new Promise((function(e,r){try{a=new WebSocket("wss://stepverder.nl:4084/controller");var o=function r(){a.send(JSON.stringify({type:"register",peerType:n,peerId:t})),a.removeEventListener("open",r),e(a)};a.addEventListener("open",o)}catch(c){r(c),console.log(c)}})));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),e.prev=5,console.log("in controller"),e.next=9,c(n,r);case 9:i=e.sent,i.addEventListener("message",function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(r){var a,c,u,d,f,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=JSON.parse(r.data),"Raspberrypis"!==a.type){e.next=19;break}console.log("raspberry pi probeert te verbinden"),c=Object(s["a"])(a.Raspberrypis),e.prev=4,d=regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=u.value,a=new RTCPeerConnection(t),o.set(r,a),a.addEventListener("icegatheringstatechange",(function(){console.log(a.connectionState)})),l=a.createDataChannel("sendDataChannel",{ordered:!1,maxRetransmits:0}),l.onopen=function(e){console.log("hi you"),l.send("Hi raspberrypi!")},console.log(l),e.next=9,a.createOffer().then((function(e){return a.setLocalDescription(e)})).then((function(){return new Promise((function(e){if("complete"===a.iceGatheringState)e();else{function t(){console.log(a.iceGatheringState),"complete"===a.iceGatheringState&&(a.removeEventListener("icegatheringstatechange",t),e())}a.addEventListener("icegatheringstatechange",t)}}))})).then((function(){console.log(a),console.log("offer wordt gestuurd"),i.send(JSON.stringify({type:"offer",to:r,from:n,data:a.localDescription}))}));case 9:case"end":return e.stop()}}),e)})),c.s();case 7:if((u=c.n()).done){e.next=11;break}return e.delegateYield(d(),"t0",9);case 9:e.next=7;break;case 11:e.next=16;break;case 13:e.prev=13,e.t1=e["catch"](4),c.e(e.t1);case 16:return e.prev=16,c.f(),e.finish(16);case 19:if("answer"!==a.type){e.next=29;break}return console.log("antwoord van raspberrypi binnen"),f=o.get(a.from),console.log(a.data.sdp),e.next=25,f.setRemoteDescription(a.data);case 25:console.log(f),console.log(f.connectionState),console.log(f.iceConnectionState),console.log(f.signalingState);case 29:"disconnect"===a.type&&(p=o.get(a.from),p&&(console.log("Disconnecting from",a.from),p.close(),o.delete(a.from))),"candidate"===a.type&&(console.log("Adding candidate to",a.from),o.get(a.from));case 31:case"end":return e.stop()}}),e,null,[[4,13,16,19]])})));return function(t){return e.apply(this,arguments)}}()),e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](5),console.log("error: "+e.t0);case 16:case"end":return e.stop()}}),e,null,[[5,13]])})))()}}},f=(n("1e3d"),n("6b0d")),p=n.n(f);const v=p()(d,[["render",i],["__scopeId","data-v-55ab975e"]]);t["default"]=v},"1e3d":function(e,t,n){"use strict";n("6ecc")},"223c":function(e,t,n){"use strict";n("9526")},"2a48":function(e,t,n){"use strict";n.r(t);var r=n("7a23"),o={class:"background",ref:"mouseEvent"},a=Object(r["g"])('<h1 data-v-7d53575c>Hallo Chris</h1><p data-v-7d53575c> Hierbij ontvang je een Binance gift card ter waarde van 0.0019 BNB!</p><p data-v-7d53575c>Gift card code:</p><p class="code" data-v-7d53575c>AF2KE2YGQYAURC3U</p><div class="explenation" data-v-7d53575c><ol data-v-7d53575c><li data-v-7d53575c>Open de Binance App</li><li data-v-7d53575c>Klik op het profielpictogram in de linkerbovenhoek</li><li data-v-7d53575c>Klik op Gift Card</li><li data-v-7d53575c>Klik “Receive</li><li data-v-7d53575c>Klik “redeem” &gt; Enter gift card code</li><li data-v-7d53575c>Geniet van je BNB :)</li></ol></div><p class="signment" data-v-7d53575c>Sint en Piet</p>',6),c=["src"];function i(e,t,n,i,s,u){return Object(r["t"])(),Object(r["e"])("div",o,[a,Object(r["f"])("img",{src:s.img,alt:""},null,8,c)],512)}var s={data:function(){return{img:"https://bin.bnbstatic.com/image/giftcard/02_53_26.jpg"}},components:{},created:function(){},computed:{},methods:{}},u=(n("401e"),n("6b0d")),l=n.n(u);const d=l()(s,[["render",i],["__scopeId","data-v-7d53575c"]]);t["default"]=d},"2d0a":function(e,t,n){"use strict";n("a5be")},3559:function(e,t,n){"use strict";n.r(t);n("498a");var r=n("7a23"),o=function(e){return Object(r["w"])("data-v-9359c86e"),e=e(),Object(r["u"])(),e},a={class:"background",ref:"mouseEvent"},c={key:0,class:"row"},i={class:"information"},s={class:"data"},u=o((function(){return Object(r["f"])("h4",null,"IP CarDesktop",-1)})),l=o((function(){return Object(r["f"])("div",{class:"livefeed"},[Object(r["f"])("video",{mute:"true",playsinline:"",autoplay:"",id:"v"})],-1)})),d={key:1,class:"row"},f={class:"information"},p={class:"data"},v=o((function(){return Object(r["f"])("h4",{class:"namecar"},"IP car",-1)})),b={for:"checkbox"},g=o((function(){return Object(r["f"])("div",{class:"livefeed"},[Object(r["f"])("video",{mute:"true",playsinline:"",autoplay:"",id:"v"})],-1)}));function h(e,t,n,o,h,m){var y=Object(r["z"])("Joystick1"),w=Object(r["z"])("Joystick2");return Object(r["t"])(),Object(r["e"])("div",a,[h.desktop?(Object(r["t"])(),Object(r["e"])("div",c,[Object(r["f"])("div",i,[Object(r["f"])("div",s,[u,Object(r["f"])("ul",null,[Object(r["f"])("li",null,"Status: "+Object(r["B"])(h.status),1),Object(r["f"])("li",null,"Snelheid: "+Object(r["B"])(h.realSpeed)+"km/h",1),Object(r["f"])("li",null,"Accu: "+Object(r["B"])(h.accu)+"%",1),Object(r["f"])("li",null,"Camera: "+Object(r["B"])(h.camera),1)]),Object(r["f"])("div",{class:Object(r["o"])({Buttonactive:h.Active,ButtonInactive:h.Inactive}),onClick:t[0]||(t[0]=function(){return m.connect&&m.connect.apply(m,arguments)})},Object(r["B"])(h.statusButton),3)])]),l])):Object(r["d"])("",!0),h.mobile?(Object(r["t"])(),Object(r["e"])("div",d,[Object(r["f"])("div",f,[Object(r["f"])("div",p,[v,Object(r["f"])("div",{class:Object(r["o"])({Buttonactive:h.Active,ButtonInactive:h.Inactive}),onClick:t[1]||(t[1]=function(){return m.connect&&m.connect.apply(m,arguments)})},Object(r["B"])(h.statusButton),3),Object(r["f"])("ul",null,[Object(r["f"])("li",null,"Status: "+Object(r["B"])(h.status),1),Object(r["f"])("li",null,"Snelheid: "+Object(r["B"])(h.realSpeed)+"km/h",1),Object(r["f"])("li",null,"Accu: "+Object(r["B"])(h.accu)+"%",1),Object(r["f"])("li",null,"Trim: "+Object(r["B"])(h.trim),1),Object(r["f"])("li",null,[Object(r["F"])(Object(r["f"])("input",{type:"checkbox",id:"checkbox","onUpdate:modelValue":t[2]||(t[2]=function(e){return h.touchState=e})},null,512),[[r["D"],h.touchState]]),Object(r["f"])("label",b,"Touch control: "+Object(r["B"])(h.touchState),1)])])])]),g,Object(r["i"])(y,{class:"joystick1",onChange:t[3]||(t[3]=function(e){m.handleChange("left",e)})}),Object(r["i"])(w,{class:"joystick2",onChange:t[4]||(t[4]=function(e){m.handleChange("right",e)})})])):Object(r["d"])("",!0)],512)}var m=n("b85c"),y=n("1da1"),w=(n("96cf"),n("ac1f"),n("00b4"),n("d81d"),n("e9c4"),n("b680"),n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),n("0c34"));function O(e,t,n,r,o,a){return null}var j=null,S={data:function(){return{data:1}},created:function(){},computed:{},methods:{sendData:function(){this.data=Math.floor(100*Math.random()),console.log(this.data),j.send(this.data),window.requestAnimationFrame(this.sendData)},carControl:function(){return Object(y["a"])(regeneratorRuntime.mark((function e(){var t,n,r,o,a,c,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("link naar component werktS"),t={sdpSemantics:"unified-plan",iceServers:[{urls:"turn:turn.stepverder.nl:3478",username:"Dominique",credential:"WS7Yq_jT"}]},n="controldata",r="controller",o=new Map,c=function(){var e=Object(y["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=2;break}return e.abrupt("return",a);case 2:return e.abrupt("return",new Promise((function(e,r){try{a=new WebSocket("wss://stepverder.nl:4084/controller");var o=function r(){a.send(JSON.stringify({type:"register",peerType:n,peerId:t})),a.removeEventListener("open",r),e(a)};a.addEventListener("open",o)}catch(c){r(c),console.log(c)}})));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),e.prev=6,console.log("in controller"),e.next=10,c(n,r);case 10:i=e.sent,i.addEventListener("message",function(){var e=Object(y["a"])(regeneratorRuntime.mark((function e(r){var a,c,s,u,l,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=JSON.parse(r.data),"Raspberrypis"!==a.type){e.next=19;break}console.log("raspberry pi probeert te verbinden"),c=Object(m["a"])(a.Raspberrypis),e.prev=4,u=regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=s.value,a=new RTCPeerConnection(t),o.set(r,a),a.addEventListener("icegatheringstatechange",(function(){console.log(a.connectionState)})),j=a.createDataChannel("sendDataChannel",{ordered:!1,maxRetransmits:0}),j.onopen=function(e){console.log("hi you"),j.send("Hi raspberrypi!")},console.log(j),e.next=9,a.createOffer().then((function(e){return a.setLocalDescription(e)})).then((function(){return new Promise((function(e){if("complete"===a.iceGatheringState)e();else{function t(){console.log(a.iceGatheringState),"complete"===a.iceGatheringState&&(a.removeEventListener("icegatheringstatechange",t),e())}a.addEventListener("icegatheringstatechange",t)}}))})).then((function(){console.log(a),console.log("offer wordt gestuurd"),i.send(JSON.stringify({type:"offer",to:r,from:n,data:a.localDescription}))}));case 9:case"end":return e.stop()}}),e)})),c.s();case 7:if((s=c.n()).done){e.next=11;break}return e.delegateYield(u(),"t0",9);case 9:e.next=7;break;case 11:e.next=16;break;case 13:e.prev=13,e.t1=e["catch"](4),c.e(e.t1);case 16:return e.prev=16,c.f(),e.finish(16);case 19:if("answer"!==a.type){e.next=29;break}return console.log("antwoord van raspberrypi binnen"),l=o.get(a.from),console.log(a.data.sdp),e.next=25,l.setRemoteDescription(a.data);case 25:console.log(l),console.log(l.connectionState),console.log(l.iceConnectionState),console.log(l.signalingState);case 29:"disconnect"===a.type&&(d=o.get(a.from),d&&(console.log("Disconnecting from",a.from),d.close(),o.delete(a.from)));case 30:case"end":return e.stop()}}),e,null,[[4,13,16,19]])})));return function(t){return e.apply(this,arguments)}}()),e.next=17;break;case 14:e.prev=14,e.t0=e["catch"](6),console.log("error: "+e.t0);case 17:case"end":return e.stop()}}),e,null,[[6,14]])})))()}}},k=(n("2d0a"),n("6b0d")),x=n.n(k);const R=x()(S,[["render",O],["__scopeId","data-v-60669cdd"]]);var C=R,D=null,E=null,L={data:function(){return{status:"offline",statusButton:"connect",speed:0,realSpeed:0,accu:0,trim:0,light:"uit",camera:"offline",controller:"offline",xAxesLeft:0,sendSpeedValue:0,Inactive:!0,Active:!1,internetConnection:!1,desktop:!0,mobile:!1,touchState:!1,optionButton:0,leftStick:{x:0,y:0,speed:0,angle:0},rightStick:{x:0,y:0,speed:0,angle:0},metaInfo:{meta:[{charset:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1.0"}]}}},components:{Joystick1:w["a"],Joystick2:w["a"],controllerConnection:C},created:function(){this.gameController(),E=this},mounted:function(){this.$refs.mouseEvent.addEventListener("touchmove",(function(e){e.preventDefault(),e.stopImmediatePropagation()}),{passive:!1}),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(console.log("mobile device"),this.mobile=!0,this.desktop=!1):(console.log("not mobile device"),this.mobile=!1,this.desktop=!0)},computed:{},methods:{gameController:function(){var e=this;window.addEventListener("gamepadconnected",(function(){e.inputController(),e.gamepads=navigator.getGamepads()})),window.addEventListener("gamepaddisconnected",(function(){}))},handleChange:function(e,t){var n=t.x,r=t.y,o=t.speed,a=t.angle,c=this["".concat(e,"Stick")];c.speed=o,c.angle=a,"right"==e&&(c.y=r,this.speed=this.map(c.y,48,-48,1350,1650)),"left"==e&&(c.x=n,this.xAxesLeft=this.map(c.x,-48,48,500,2500)),1==this.mobile&&1==this.touchState&&(console.log(this.speed),D.send([this.xAxesLeft,this.speed]))},inputController:function(){var e=navigator.getGamepads();e[0]&&(this.gamepadState={id:e[0].id,axes:[e[0].axes[0]],buttons:[{button_1:e[0].buttons[0].value},{button_3:e[0].buttons[3].value},{button_4:e[0].buttons[4].value},{button_5:e[0].buttons[5].value},{button_6:e[0].buttons[6].value},{button_7:e[0].buttons[7].value},{button_9:e[0].buttons[7].value},{button_14:e[0].buttons[14].value},{button_15:e[0].buttons[15].value}]},this.Kruisje=e[0].buttons[0].value,this.Kruisje=e[0].buttons[3].value,this.optionButton=e[0].buttons[9].value,this.speed=this.map(e[0].buttons[7].value,0,1,1500,1600),this.reverse=this.map(e[0].buttons[6].value,0,1,1500,1400),this.xAxesLeft=this.map(e[0].axes[0],-1,1,500,2500),0==e[0].buttons[6].value&&(this.realSpeed=this.map(e[0].buttons[7].value,0,1,0,15)),0==e[0].buttons[7].value&&(this.realSpeed=this.map(e[0].buttons[6].value,0,1,0,15)),this.speed>1501?this.sendSpeedValue=this.speed:this.reverse<1501?this.sendSpeedValue=this.reverse:this.reverse<1499&&this.speed>1501&&(this.sendSpeedValue=1500),"online"==this.controller&&0==this.touchState&&(D.send(JSON.stringify({steering:this.xAxesLeft,speed:this.sendSpeedValue,camera:this.optionButton})),console.log(this.sendSpeedValue))),window.requestAnimationFrame(this.inputController)},map:function(e,t,n,r,o){return((e-t)*(o-r)/(n-t)+r).toFixed(0)},connect:function(){this.carControl(),this.videoStream(),this.internetConnection=window.navigator.onLine,this.internetConnection?this.status="internet":this.status="No internet"},online:function(){console.log("Wat is online? "+this.controller+" "+this.camera),"online"==this.controller&&"online"==this.camera&&(this.status="connected",this.statusButton="connected")},carControl:function(){return Object(y["a"])(regeneratorRuntime.mark((function e(){var t,n,r,o,a,c,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t={sdpSemantics:"unified-plan",iceServers:[{urls:"turn:turn.stepverder.nl:3478",username:"Dominique",credential:"WS7Yq_jT"}]},n="controldata",r="controller",o=new Map,c=function(){var e=Object(y["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=2;break}return e.abrupt("return",a);case 2:return e.abrupt("return",new Promise((function(e,r){try{a=new WebSocket("wss://stepverder.nl:4084/controller");var o=function r(){a.send(JSON.stringify({type:"register",peerType:n,peerId:t})),a.removeEventListener("open",r),e(a)};a.addEventListener("open",o)}catch(c){r(c),console.log(c)}})));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),e.prev=5,console.log("in controller"),e.next=9,c(n,r);case 9:i=e.sent,i.addEventListener("message",function(){var e=Object(y["a"])(regeneratorRuntime.mark((function e(r){var a,c,s,u,l,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=JSON.parse(r.data),"Raspberrypis"!==a.type){e.next=19;break}console.log("raspberry pi probeert te verbinden"),c=Object(m["a"])(a.Raspberrypis),e.prev=4,u=regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=s.value,a=new RTCPeerConnection(t),o.set(r,a),a.addEventListener("icegatheringstatechange",(function(){console.log(a.connectionState)})),D=a.createDataChannel("sendDataChannel",{ordered:!1,maxRetransmits:0}),D.onopen=function(e){E.status="controller ",E.controller="online",E.online(),console.log("hi you"),D.send("Hi raspberrypi!")},console.log(D),e.next=9,a.createOffer().then((function(e){return a.setLocalDescription(e)})).then((function(){return new Promise((function(e){if("complete"===a.iceGatheringState)E.status="complete",e();else{var t=function t(){console.log(a.iceGatheringState),E.status=" Ice gathering ","complete"===a.iceGatheringState&&(a.removeEventListener("icegatheringstatechange",t),e())};a.addEventListener("icegatheringstatechange",t)}}))})).then((function(){console.log(a),console.log("offer wordt gestuurd"),i.send(JSON.stringify({type:"offer",to:r,from:n,data:a.localDescription}))}));case 9:case"end":return e.stop()}}),e)})),c.s();case 7:if((s=c.n()).done){e.next=11;break}return e.delegateYield(u(),"t0",9);case 9:e.next=7;break;case 11:e.next=16;break;case 13:e.prev=13,e.t1=e["catch"](4),c.e(e.t1);case 16:return e.prev=16,c.f(),e.finish(16);case 19:if("answer"!==a.type){e.next=29;break}return console.log("antwoord van raspberrypi binnen"),l=o.get(a.from),console.log(a.data.sdp),e.next=25,l.setRemoteDescription(a.data);case 25:console.log(l),console.log(l.connectionState),console.log(l.iceConnectionState),console.log(l.signalingState);case 29:"disconnect"===a.type&&(d=o.get(a.from),E.status="controller disconnect",E.statusButton="connect",d&&(console.log("Disconnecting from",a.from),d.close(),o.delete(a.from)));case 30:case"end":return e.stop()}}),e,null,[[4,13,16,19]])})));return function(t){return e.apply(this,arguments)}}()),e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](5),console.log("error: "+e.t0);case 16:case"end":return e.stop()}}),e,null,[[5,13]])})))()},videoStream:function(){var e=this;return Object(y["a"])(regeneratorRuntime.mark((function t(){var n,r,o,a,c,i,s,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={iceServers:[{urls:"turn:turn.stepverder.nl:3478",username:"Dominique",credential:"WS7Yq_jT"}]},r=function(){return Math.floor(1e4*Math.random())},o="ipcar"+r(),a="screen",c=new Map,s=function(){var e=Object(y["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!i){e.next=2;break}return e.abrupt("return",i);case 2:return e.abrupt("return",new Promise((function(e,r){try{i=new WebSocket("wss://stepverder.nl:4084/ipcar"),console.log(t);var o=function r(){i.send(JSON.stringify({type:"register",peerType:n,peerId:t})),i.removeEventListener("open",r),e(i)};i.addEventListener("open",o)}catch(a){r(a)}})));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),t.prev=6,console.log("in screen"),t.next=10,s(o,a);case 10:u=t.sent,u.addEventListener("message",function(){var t=Object(y["a"])(regeneratorRuntime.mark((function t(r){var a,i,s,l,d;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,a=JSON.parse(r.data),console.log(a),"offer"!==a.type){t.next=20;break}return i=new RTCPeerConnection(n),c.set(a.from,i),console.log("incoming data "),e.camera="online",e.statusButton="online",e.InActive=!1,e.Active=!0,i.ontrack=function(t){e.status="camera",E.online(),console.log("on track",t),window.v.srcObject=t.streams[0],window.v.play()},i.onicecandidate=function(e){console.log("set icecandidate"),e.candidate&&u.send(JSON.stringify({type:"candidate",from:o,to:a.from,data:e.candidate}))},t.next=14,i.setRemoteDescription(a.data);case 14:return t.next=16,i.createAnswer();case 16:return s=t.sent,t.next=19,i.setLocalDescription(s);case 19:u.send(JSON.stringify({to:a.from,from:o,type:"answer",data:i.localDescription}));case 20:"disconnect"===a.type&&(l=c.get(a.from),l&&(e.status="camera disconnect",e.camera="Offline",e.statusButton="connect",e.InActive=!0,e.Active=!1,console.log("Disconnecting from",a.from),l.ontrack=null,l.onicecandidate=null,l.close(),c.delete(a.from))),"candidate"===a.type&&(console.log(a.data),d=c.get(a.from),d&&(console.log("Adding candidate to",a.from),d.addIceCandidate(new RTCIceCandidate(a.data)))),t.next=28;break;case 24:t.prev=24,t.t0=t["catch"](0),console.error(t.t0),console.log("error video beeld niet ontvangen "+t.t0);case 28:case"end":return t.stop()}}),t,null,[[0,24]])})));return function(e){return t.apply(this,arguments)}}()),t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](6),console.error(t.t0),console.log("error verbinding mislukt: "+t.t0);case 18:case"end":return t.stop()}}),t,null,[[6,14]])})))()}}};n("f667");const A=x()(L,[["render",h],["__scopeId","data-v-9359c86e"]]);t["default"]=A},3821:function(e,t,n){"use strict";n.r(t);var r=n("7a23"),o=function(e){return Object(r["w"])("data-v-f995e1d0"),e=e(),Object(r["u"])(),e},a=o((function(){return Object(r["f"])("h3",null,"Live Video Stream (broadcast)",-1)})),c=o((function(){return Object(r["f"])("video",{mute:"true",playsinline:"",autoplay:"",id:"v",width:"50%",height:"50%"},null,-1)}));function i(e,t,n,o,i,s){return Object(r["t"])(),Object(r["e"])("div",null,[a,c,Object(r["h"])(" "+Object(r["B"])(e.$route.params.id),1)])}var s=n("b85c"),u=n("1da1"),l=(n("96cf"),n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),n("e9c4"),{data:function(){return{user:"hello"}},created:function(){this.user=this.$route.params.id,this.videoStream()},mounted:function(){},computed:{},methods:{videoStream:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var n,r,o,a,c,i,l,d;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(e.user),n={iceServers:[{urls:"turn:turn.stepverder.nl:3478",username:"Dominique",credential:"WS7Yq_jT"}]},r=e.user,o="camera",a=new Map,i=function(){var t=Object(u["a"])(regeneratorRuntime.mark((function t(n,r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!c){t.next=2;break}return t.abrupt("return",c);case 2:return t.abrupt("return",new Promise((function(t,o){try{window.location.protocol;c=new WebSocket("wss://stepverder.nl:4084/"+e.user),console.log(c);var a=function e(){c.send(JSON.stringify({type:"register",peerType:r,peerId:n})),c.removeEventListener("open",e),t(c)};c.addEventListener("open",a)}catch(i){o(i)}})));case 3:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),t.prev=6,console.log("in camera"),t.next=10,navigator.mediaDevices.getUserMedia({video:{width:{exact:1280},height:{exact:720},frameRate:{min:30,max:120}},audio:!1});case 10:return l=t.sent,window.v.srcObject=l,window.v.play(),t.next=15,i(r,o);case 15:d=t.sent,d.addEventListener("message",function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(t){var o,c,i,u,f,p,v;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(o=JSON.parse(t.data),console.log("msg",o),"screens"!==o.type){e.next=20;break}console.log("vraag om beeld voor candidaten"),c=Object(s["a"])(o.screens),e.prev=5,u=regeneratorRuntime.mark((function e(){var t,o,c,u,f,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=i.value,o=new RTCPeerConnection(n),a.set(t,o),c=Object(s["a"])(l.getTracks());try{for(c.s();!(u=c.n()).done;)f=u.value,o.addTrack(f,l)}catch(v){c.e(v)}finally{c.f()}return console.log(o),e.next=8,o.createOffer();case 8:return p=e.sent,e.next=11,o.setLocalDescription(p);case 11:o.onicecandidate=function(e){e.candidate&&(console.log("set ice candidate"),console.log(e),d.send(JSON.stringify({type:"candidate",from:r,to:t,data:e.candidate})))},d.send(JSON.stringify({type:"offer",to:t,from:r,data:o.localDescription})),console.log(o.connectionState);case 14:case"end":return e.stop()}}),e)})),c.s();case 8:if((i=c.n()).done){e.next=12;break}return e.delegateYield(u(),"t0",10);case 10:e.next=8;break;case 12:e.next=17;break;case 14:e.prev=14,e.t1=e["catch"](5),c.e(e.t1);case 17:return e.prev=17,c.f(),e.finish(17);case 20:if("answer"!==o.type){e.next=25;break}return f=a.get(o.from),e.next=24,f.setRemoteDescription(o.data);case 24:console.log(f);case 25:"disconnect"===o.type&&(p=a.get(o.from),p&&(p.close(),a.delete(o.from))),"candidate"===o.type&&(v=a.get(o.from),v&&(v.addIceCandidate(new RTCIceCandidate(o.data)),console.log(v.connectionState)));case 27:case"end":return e.stop()}}),e,null,[[5,14,17,20]])})));return function(t){return e.apply(this,arguments)}}()),t.next=22;break;case 19:t.prev=19,t.t0=t["catch"](6),console.log("error: "+t.t0);case 22:case"end":return t.stop()}}),t,null,[[6,19]])})))()}}}),d=(n("223c"),n("6b0d")),f=n.n(d);const p=f()(l,[["render",i],["__scopeId","data-v-f995e1d0"]]);t["default"]=p},"39d3":function(e,t,n){},"401e":function(e,t,n){"use strict";n("6161")},"428f":function(e,t,n){var r=n("da84");e.exports=r},"4df4":function(e,t,n){"use strict";var r=n("da84"),o=n("0366"),a=n("c65b"),c=n("7b0b"),i=n("9bdd"),s=n("e95a"),u=n("68ee"),l=n("07fa"),d=n("8418"),f=n("9a1f"),p=n("35a1"),v=r.Array;e.exports=function(e){var t=c(e),n=u(this),r=arguments.length,b=r>1?arguments[1]:void 0,g=void 0!==b;g&&(b=o(b,r>2?arguments[2]:void 0));var h,m,y,w,O,j,S=p(t),k=0;if(!S||this==v&&s(S))for(h=l(t),m=n?new this(h):v(h);h>k;k++)j=g?b(t[k],k):t[k],d(m,k,j);else for(w=f(t,S),O=w.next,m=n?new this:[];!(y=a(O,w)).done;k++)j=g?i(w,b,[y.value,k],!0):y.value,d(m,k,j);return m.length=k,m}},"530e":function(e,t,n){"use strict";n("39d3")},6161:function(e,t,n){},"6ecc":function(e,t,n){},"746f":function(e,t,n){var r=n("428f"),o=n("1a2d"),a=n("e538"),c=n("9bf2").f;e.exports=function(e){var t=r.Symbol||(r.Symbol={});o(t,e)||c(t,e,{value:a.f(e)})}},8418:function(e,t,n){"use strict";var r=n("a04b"),o=n("9bf2"),a=n("5c6c");e.exports=function(e,t,n){var c=r(t);c in e?o.f(e,c,a(0,n)):e[c]=n}},9526:function(e,t,n){},"9bdd":function(e,t,n){var r=n("825a"),o=n("2a62");e.exports=function(e,t,n,a){try{return a?t(r(n)[0],n[1]):t(n)}catch(c){o(e,"throw",c)}}},a4d3:function(e,t,n){"use strict";var r=n("23e7"),o=n("da84"),a=n("d066"),c=n("2ba4"),i=n("c65b"),s=n("e330"),u=n("c430"),l=n("83ab"),d=n("4930"),f=n("d039"),p=n("1a2d"),v=n("e8b5"),b=n("1626"),g=n("861d"),h=n("3a9b"),m=n("d9b5"),y=n("825a"),w=n("7b0b"),O=n("fc6a"),j=n("a04b"),S=n("577e"),k=n("5c6c"),x=n("7c73"),R=n("df75"),C=n("241c"),D=n("057f"),E=n("7418"),L=n("06cf"),A=n("9bf2"),I=n("d1e7"),B=n("f36a"),P=n("6eeb"),J=n("5692"),_=n("f772"),T=n("d012"),N=n("90e3"),G=n("b622"),M=n("e538"),q=n("746f"),W=n("d44e"),Y=n("69f3"),F=n("b727").forEach,V=_("hidden"),K="Symbol",$="prototype",H=G("toPrimitive"),U=Y.set,z=Y.getterFor(K),Q=Object[$],X=o.Symbol,Z=X&&X[$],ee=o.TypeError,te=o.QObject,ne=a("JSON","stringify"),re=L.f,oe=A.f,ae=D.f,ce=I.f,ie=s([].push),se=J("symbols"),ue=J("op-symbols"),le=J("string-to-symbol-registry"),de=J("symbol-to-string-registry"),fe=J("wks"),pe=!te||!te[$]||!te[$].findChild,ve=l&&f((function(){return 7!=x(oe({},"a",{get:function(){return oe(this,"a",{value:7}).a}})).a}))?function(e,t,n){var r=re(Q,t);r&&delete Q[t],oe(e,t,n),r&&e!==Q&&oe(Q,t,r)}:oe,be=function(e,t){var n=se[e]=x(Z);return U(n,{type:K,tag:e,description:t}),l||(n.description=t),n},ge=function(e,t,n){e===Q&&ge(ue,t,n),y(e);var r=j(t);return y(n),p(se,r)?(n.enumerable?(p(e,V)&&e[V][r]&&(e[V][r]=!1),n=x(n,{enumerable:k(0,!1)})):(p(e,V)||oe(e,V,k(1,{})),e[V][r]=!0),ve(e,r,n)):oe(e,r,n)},he=function(e,t){y(e);var n=O(t),r=R(n).concat(je(n));return F(r,(function(t){l&&!i(ye,n,t)||ge(e,t,n[t])})),e},me=function(e,t){return void 0===t?x(e):he(x(e),t)},ye=function(e){var t=j(e),n=i(ce,this,t);return!(this===Q&&p(se,t)&&!p(ue,t))&&(!(n||!p(this,t)||!p(se,t)||p(this,V)&&this[V][t])||n)},we=function(e,t){var n=O(e),r=j(t);if(n!==Q||!p(se,r)||p(ue,r)){var o=re(n,r);return!o||!p(se,r)||p(n,V)&&n[V][r]||(o.enumerable=!0),o}},Oe=function(e){var t=ae(O(e)),n=[];return F(t,(function(e){p(se,e)||p(T,e)||ie(n,e)})),n},je=function(e){var t=e===Q,n=ae(t?ue:O(e)),r=[];return F(n,(function(e){!p(se,e)||t&&!p(Q,e)||ie(r,se[e])})),r};if(d||(X=function(){if(h(Z,this))throw ee("Symbol is not a constructor");var e=arguments.length&&void 0!==arguments[0]?S(arguments[0]):void 0,t=N(e),n=function(e){this===Q&&i(n,ue,e),p(this,V)&&p(this[V],t)&&(this[V][t]=!1),ve(this,t,k(1,e))};return l&&pe&&ve(Q,t,{configurable:!0,set:n}),be(t,e)},Z=X[$],P(Z,"toString",(function(){return z(this).tag})),P(X,"withoutSetter",(function(e){return be(N(e),e)})),I.f=ye,A.f=ge,L.f=we,C.f=D.f=Oe,E.f=je,M.f=function(e){return be(G(e),e)},l&&(oe(Z,"description",{configurable:!0,get:function(){return z(this).description}}),u||P(Q,"propertyIsEnumerable",ye,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!d,sham:!d},{Symbol:X}),F(R(fe),(function(e){q(e)})),r({target:K,stat:!0,forced:!d},{for:function(e){var t=S(e);if(p(le,t))return le[t];var n=X(t);return le[t]=n,de[n]=t,n},keyFor:function(e){if(!m(e))throw ee(e+" is not a symbol");if(p(de,e))return de[e]},useSetter:function(){pe=!0},useSimple:function(){pe=!1}}),r({target:"Object",stat:!0,forced:!d,sham:!l},{create:me,defineProperty:ge,defineProperties:he,getOwnPropertyDescriptor:we}),r({target:"Object",stat:!0,forced:!d},{getOwnPropertyNames:Oe,getOwnPropertySymbols:je}),r({target:"Object",stat:!0,forced:f((function(){E.f(1)}))},{getOwnPropertySymbols:function(e){return E.f(w(e))}}),ne){var Se=!d||f((function(){var e=X();return"[null]"!=ne([e])||"{}"!=ne({a:e})||"{}"!=ne(Object(e))}));r({target:"JSON",stat:!0,forced:Se},{stringify:function(e,t,n){var r=B(arguments),o=t;if((g(t)||void 0!==e)&&!m(e))return v(t)||(t=function(e,t){if(b(o)&&(t=i(o,this,e,t)),!m(t))return t}),r[1]=t,c(ne,null,r)}})}if(!Z[H]){var ke=Z.valueOf;P(Z,H,(function(e){return i(ke,this)}))}W(X,K),T[V]=!0},a5be:function(e,t,n){},a630:function(e,t,n){var r=n("23e7"),o=n("4df4"),a=n("1c7e"),c=!a((function(e){Array.from(e)}));r({target:"Array",stat:!0,forced:c},{from:o})},b0c0:function(e,t,n){var r=n("83ab"),o=n("5e77").EXISTS,a=n("e330"),c=n("9bf2").f,i=Function.prototype,s=a(i.toString),u=/^\s*function ([^ (]*)/,l=a(u.exec),d="name";r&&!o&&c(i,d,{configurable:!0,get:function(){try{return l(u,s(this))[1]}catch(e){return""}}})},b85c:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0"),n("fb6a"),n("b0c0"),n("a630"),n("ac1f"),n("00b4");function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function o(e,t){if(e){if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}function a(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=o(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,i=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,c=e},f:function(){try{i||null==n["return"]||n["return"]()}finally{if(s)throw c}}}}},d28b:function(e,t,n){var r=n("746f");r("iterator")},e01a:function(e,t,n){"use strict";var r=n("23e7"),o=n("83ab"),a=n("da84"),c=n("e330"),i=n("1a2d"),s=n("1626"),u=n("3a9b"),l=n("577e"),d=n("9bf2").f,f=n("e893"),p=a.Symbol,v=p&&p.prototype;if(o&&s(p)&&(!("description"in v)||void 0!==p().description)){var b={},g=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:l(arguments[0]),t=u(v,this)?new p(e):void 0===e?p():p(e);return""===e&&(b[t]=!0),t};f(g,p),g.prototype=v,v.constructor=g;var h="Symbol(test)"==String(p("test")),m=c(v.toString),y=c(v.valueOf),w=/^Symbol\((.*)\)[^)]+$/,O=c("".replace),j=c("".slice);d(v,"description",{configurable:!0,get:function(){var e=y(this),t=m(e);if(i(b,e))return"";var n=h?j(t,7,-1):O(t,w,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:g})}},e538:function(e,t,n){var r=n("b622");t.f=r},f667:function(e,t,n){"use strict";n("f862")},f820:function(e,t,n){"use strict";n.r(t);var r=n("7a23"),o={class:"about"},a=Object(r["f"])("h1",null,"This is an about page",-1),c=[a];function i(e,t){return Object(r["t"])(),Object(r["e"])("div",o,c)}var s=n("6b0d"),u=n.n(s);const l={},d=u()(l,[["render",i]]);t["default"]=d},f862:function(e,t,n){},fb6a:function(e,t,n){"use strict";var r=n("23e7"),o=n("da84"),a=n("e8b5"),c=n("68ee"),i=n("861d"),s=n("23cb"),u=n("07fa"),l=n("fc6a"),d=n("8418"),f=n("b622"),p=n("1dde"),v=n("f36a"),b=p("slice"),g=f("species"),h=o.Array,m=Math.max;r({target:"Array",proto:!0,forced:!b},{slice:function(e,t){var n,r,o,f=l(this),p=u(f),b=s(e,p),y=s(void 0===t?p:t,p);if(a(f)&&(n=f.constructor,c(n)&&(n===h||a(n.prototype))?n=void 0:i(n)&&(n=n[g],null===n&&(n=void 0)),n===h||void 0===n))return v(f,b,y);for(r=new(void 0===n?h:n)(m(y-b,0)),o=0;b<y;b++,o++)b in f&&d(r,o,f[b]);return r.length=o,r}})}}]);
//# sourceMappingURL=livestream.js.map