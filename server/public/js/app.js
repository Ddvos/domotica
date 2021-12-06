(function(e){function t(t){for(var r,o,c=t[0],s=t[1],u=t[2],l=0,d=[];l<c.length;l++)o=c[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},o={app:0},a={app:0},i=[];function c(e){return s.p+"js/"+({livestream:"livestream"}[e]||e)+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={livestream:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({livestream:"livestream"}[e]||e)+".css",a=s.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var u=i[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===a))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){u=d[c],l=u.getAttribute("data-href");if(l===r||l===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],f.parentNode.removeChild(f),n(i)},f.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=c(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}a[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var f=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0c34":function(e,t,n){"use strict";var r=n("7a23"),o={class:"controls"};function a(e,t,n,a,i,c){return Object(r["u"])(),Object(r["e"])("div",o,[Object(r["f"])("div",{class:"vue-joystick",ref:"touchevent",style:Object(r["p"])(c.style),onMousemove:t[0]||(t[0]=function(){return c.handleMove&&c.handleMove.apply(c,arguments)}),onMousedown:t[1]||(t[1]=function(){return c.handleStart&&c.handleStart.apply(c,arguments)}),onMouseup:t[2]||(t[2]=function(){return c.handleRelease&&c.handleRelease.apply(c,arguments)}),onTouchend:t[3]||(t[3]=function(){return c.handleRelease&&c.handleRelease.apply(c,arguments)})},null,36)])}var i={props:{color:{type:String,default:"#25B"}},data:function(){return{x:0,y:0,angle:0,speed:0,isMouseDown:!1,linksX:0,linksY:0,rechtsX:0}},computed:{style:function(){return{"--x":"".concat(this.x+64,"px"),"--y":"".concat(this.y+64,"px"),"--speed":"".concat(this.speed,"px"),"--angle":"".concat(this.angle,"deg"),"--color":"".concat(this.color)}}},methods:{handleStart:function(){this.isMouseDown=!0},handleTouch:function(e){var t=e.changedTouches;this.linksX=t[0].clientX,this.linksY=t[0].clientY;var n=this.$el,r=n.offsetLeft,o=n.offsetTop,a=Math.round(this.linksX-r-64),i=Math.round(this.linksY-o-64);this.updatePosition(a,i)},handleMove:function(e){var t=e.clientX,n=e.clientY;if(this.isMouseDown){var r=this.$el,o=r.offsetLeft,a=r.offsetTop,i=Math.round(t-o-64),c=Math.round(n-a-64);this.updatePosition(i,c)}},handleRelease:function(){this.emitAll("release"),this.isMouseDown=!1,this.updatePosition(0,0)},updatePosition:function(e,t){var n=48,r=Math.atan2(t,e),o=Math.round(180*r/Math.PI,4);this.angle=o+(o>90?-270:90),this.speed=Math.min(Math.round(Math.sqrt(Math.pow(t,2)+Math.pow(e,2))),128),this.x=this.speed>n?Math.cos(r)*n:e,this.y=this.speed>=n?Math.sin(r)*n:t,this.emitAll()},emitAll:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"change";this.$emit(e,{x:this.x,y:this.y,speed:this.speed,angle:this.angle})}},mounted:function(){var e=this;this.$refs.touchevent.addEventListener("touchstart",(function(t){e.handleStart(t)}),!1),this.$refs.touchevent.addEventListener("touchend",(function(t){e.handleRelease(t)}),!1),this.$refs.touchevent.addEventListener("touchcancel",(function(t){e.handleCancel(t)}),!1),this.$refs.touchevent.addEventListener("touchleave",(function(t){e.handleEnd(t)}),!1),this.$refs.touchevent.addEventListener("touchmove",(function(t){e.handleTouch(t)}),!1),console.log("initialized."),this.emitAll()}},c=(n("fc05"),n("6b0d")),s=n.n(c);const u=s()(i,[["render",a]]);t["a"]=u},2918:function(e,t,n){"use strict";n("c15d")},"2d0a":function(e,t,n){"use strict";n("a5be")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23");function o(e,t){var n=Object(r["A"])("router-view");return Object(r["u"])(),Object(r["c"])(n)}n("2918");var a=n("6b0d"),i=n.n(a);const c={},s=i()(c,[["render",o]]);var u=s,l=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),d=(n("498a"),function(e){return Object(r["x"])("data-v-249ace20"),e=e(),Object(r["v"])(),e}),f={class:"background",ref:"mouseEvent"},p={key:0,class:"row"},h={class:"information"},v={class:"data"},b=d((function(){return Object(r["f"])("h4",null,"IP CarDesktop",-1)})),m=d((function(){return Object(r["f"])("div",{class:"livefeed"},[Object(r["f"])("video",{mute:"true",playsinline:"",autoplay:"",id:"v"})],-1)})),g={key:1,class:"row"},y={class:"information"},w={class:"data"},O=d((function(){return Object(r["f"])("h4",{class:"namecar"},"IP carv2",-1)})),j={for:"checkbox"},k=d((function(){return Object(r["f"])("div",{class:"livefeed"},[Object(r["f"])("video",{mute:"true",playsinline:"",autoplay:"",id:"v"})],-1)})),S={key:0};function x(e,t,n,o,a,i){var c=Object(r["A"])("Joystick1"),s=Object(r["A"])("Joystick2");return Object(r["u"])(),Object(r["e"])("div",f,[a.desktop?(Object(r["u"])(),Object(r["e"])("div",p,[Object(r["f"])("div",h,[Object(r["f"])("div",v,[b,Object(r["f"])("ul",null,[Object(r["f"])("li",null,"Status: "+Object(r["C"])(a.status),1),Object(r["f"])("li",null,"Snelheid: "+Object(r["C"])(a.realSpeed)+"km/h",1),Object(r["f"])("li",null,"Accu: "+Object(r["C"])(a.accu)+"%",1),Object(r["f"])("li",null,"Camera: "+Object(r["C"])(a.camera),1)]),Object(r["f"])("div",{class:Object(r["o"])({Buttonactive:a.Active,ButtonInactive:a.Inactive}),onClick:t[0]||(t[0]=function(){return i.connect&&i.connect.apply(i,arguments)})},Object(r["C"])(a.statusButton),3)])]),m])):Object(r["d"])("",!0),a.mobile?(Object(r["u"])(),Object(r["e"])("div",g,[Object(r["f"])("div",y,[Object(r["f"])("div",w,[O,Object(r["f"])("div",{class:Object(r["o"])({Buttonactive:a.Active,ButtonInactive:a.Inactive}),onClick:t[1]||(t[1]=function(){return i.connect&&i.connect.apply(i,arguments)})},Object(r["C"])(a.statusButton),3),Object(r["f"])("ul",null,[Object(r["f"])("li",null,"Status: "+Object(r["C"])(a.status),1),Object(r["f"])("li",null,"Snelheid: "+Object(r["C"])(a.realSpeed)+"km/h",1),Object(r["f"])("li",null,"Accu: "+Object(r["C"])(a.accu)+"%",1),Object(r["f"])("li",null,"Trim: "+Object(r["C"])(a.trim),1),Object(r["f"])("li",null,[Object(r["H"])(Object(r["f"])("input",{type:"checkbox",id:"checkbox",onClick:t[2]||(t[2]=function(){return i.touchSwitch&&i.touchSwitch.apply(i,arguments)}),"onUpdate:modelValue":t[3]||(t[3]=function(e){return a.touchState=e})},null,512),[[r["E"],a.touchState]]),Object(r["f"])("label",j,"Touch control: "+Object(r["C"])(a.touchState),1)])])])]),k,a.touchVisibilty?(Object(r["u"])(),Object(r["e"])("div",S,[Object(r["i"])(c,{class:"joystick1",onChange:t[4]||(t[4]=function(e){i.handleChange("left",e)})}),Object(r["i"])(s,{class:"joystick2",onChange:t[5]||(t[5]=function(e){i.handleChange("right",e)})})])):Object(r["d"])("",!0)])):Object(r["d"])("",!0)],512)}var C=n("b85c"),R=n("1da1"),L=(n("96cf"),n("ac1f"),n("00b4"),n("d81d"),n("b680"),n("4ec9"),n("e9c4"),n("0c34")),E=n("e6e5"),M=n("552e"),A=null,P=null,D={data:function(){return Object(M["b"])({meta:[{name:"viewport",content:"initial-scale=1, viewport-fit=cover"}]}),{status:"offline",statusButton:"connect",speed:0,realSpeed:0,accu:0,trim:0,light:"uit",camera:"offline",controller:"offline",xAxesLeft:0,sendSpeedValue:0,Inactive:!0,Active:!1,internetConnection:!1,desktop:!0,mobile:!1,touchState:!1,touchVisibilty:!1,optionButton:0,leftStick:{x:0,y:0,speed:0,angle:0},rightStick:{x:0,y:0,speed:0,angle:0}}},components:{Joystick1:L["a"],Joystick2:L["a"],controllerConnection:E["a"]},created:function(){this.gameController(),P=this},mounted:function(){this.$refs.mouseEvent.addEventListener("touchmove",(function(e){e.preventDefault(),e.stopImmediatePropagation()}),{passive:!1}),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(console.log("mobile device"),this.mobile=!0,this.desktop=!1):(console.log("not mobile device"),this.mobile=!1,this.desktop=!0)},computed:{},methods:{touchSwitch:function(){0==this.touchVisibilty?this.touchVisibilty=!0:this.touchVisibilty=!1},gameController:function(){var e=this;window.addEventListener("gamepadconnected",(function(){e.inputController(),e.gamepads=navigator.getGamepads()})),window.addEventListener("gamepaddisconnected",(function(){}))},handleChange:function(e,t){var n=t.x,r=t.y,o=t.speed,a=t.angle,i=this["".concat(e,"Stick")];i.speed=o,i.angle=a,"right"==e&&(i.y=r,this.speed=this.map(i.y,48,-48,1350,1650)),"left"==e&&(i.x=n,this.xAxesLeft=this.map(i.x,-48,48,500,2500)),1==this.mobile&&1==this.touchState&&(console.log(this.speed),A.send([this.xAxesLeft,this.speed]))},inputController:function(){var e=navigator.getGamepads();e[0]&&(this.gamepadState={id:e[0].id,axes:[e[0].axes[0]],buttons:[{button_1:e[0].buttons[0].value},{button_3:e[0].buttons[3].value},{button_4:e[0].buttons[4].value},{button_5:e[0].buttons[5].value},{button_6:e[0].buttons[6].value},{button_7:e[0].buttons[7].value},{button_9:e[0].buttons[7].value},{button_14:e[0].buttons[14].value},{button_15:e[0].buttons[15].value}]},this.Kruisje=e[0].buttons[0].value,this.Kruisje=e[0].buttons[3].value,this.optionButton=e[0].buttons[9].value,this.speed=this.map(e[0].buttons[7].value,0,1,1500,1600),this.reverse=this.map(e[0].buttons[6].value,0,1,1500,1400),this.xAxesLeft=this.map(e[0].axes[0],-1,1,500,2500),0==e[0].buttons[6].value&&(this.realSpeed=this.map(e[0].buttons[7].value,0,1,0,15)),0==e[0].buttons[7].value&&(this.realSpeed=this.map(e[0].buttons[6].value,0,1,0,15)),this.speed>1501?this.sendSpeedValue=this.speed:this.reverse<1501?this.sendSpeedValue=this.reverse:this.reverse<1499&&this.speed>1501&&(this.sendSpeedValue=1500),"online"==this.controller&&0==this.touchState&&A.send("steering: "+this.xAxesLeft+", speed: "+this.sendSpeedValue+", camera: "+this.optionButton)),window.requestAnimationFrame(this.inputController)},map:function(e,t,n,r,o){return((e-t)*(o-r)/(n-t)+r).toFixed(0)},connect:function(){this.carControl(),this.videoStream(),this.internetConnection=window.navigator.onLine,this.internetConnection?this.status="internet":this.status="No internet"},online:function(){"online"==this.controller&&"online"==this.camera&&(this.status="connected",this.statusButton="connected")},carControl:function(){return Object(R["a"])(regeneratorRuntime.mark((function e(){var t,n,r,o,a,i,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t={sdpSemantics:"unified-plan",iceCandidatePoolSize:4,iceServers:[{urls:"turn:turn.stepverder.nl:3478",username:"Dominique",credential:"WS7Yq_jT"}]},n="controldata",r="controller",o=new Map,i=function(){var e=Object(R["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=2;break}return e.abrupt("return",a);case 2:return e.abrupt("return",new Promise((function(e,r){try{a=new WebSocket("wss://stepverder.nl:4084/controller");var o=function r(){a.send(JSON.stringify({type:"register",peerType:n,peerId:t})),a.removeEventListener("open",r),e(a)};a.addEventListener("open",o)}catch(i){r(i),console.log(i)}})));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),e.prev=5,console.log("in controller"),e.next=9,i(n,r);case 9:c=e.sent,c.addEventListener("message",function(){var e=Object(R["a"])(regeneratorRuntime.mark((function e(r){var a,i,s,u,l,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=JSON.parse(r.data),"Raspberrypis"!==a.type){e.next=19;break}console.log("raspberry pi probeert te verbinden"),i=Object(C["a"])(a.Raspberrypis),e.prev=4,u=regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=s.value,a=new RTCPeerConnection(t),o.set(r,a),a.addEventListener("icegatheringstatechange",(function(){console.log(a.connectionState)})),A=a.createDataChannel("sendDataChannel",{ordered:!1,maxRetransmits:0}),A.onopen=function(e){P.status="controller ",P.controller="online",P.online(),console.log("hi you")},console.log(A),e.next=9,a.createOffer().then((function(e){return a.setLocalDescription(e)})).then((function(){return new Promise((function(e){if("complete"===a.iceGatheringState)P.status="complete",e();else{var t=function t(){console.log(a.iceGatheringState),P.status=" Ice gathering ","complete"===a.iceGatheringState&&(a.removeEventListener("icegatheringstatechange",t),e()),setTimeout((function(){a.removeEventListener("icegatheringstatechange",t),e()}),2500)};a.addEventListener("icegatheringstatechange",t)}}))})).then((function(){console.log(a),console.log("offer wordt gestuurd"),c.send(JSON.stringify({type:"offer",to:r,from:n,data:a.localDescription}))}));case 9:case"end":return e.stop()}}),e)})),i.s();case 7:if((s=i.n()).done){e.next=11;break}return e.delegateYield(u(),"t0",9);case 9:e.next=7;break;case 11:e.next=16;break;case 13:e.prev=13,e.t1=e["catch"](4),i.e(e.t1);case 16:return e.prev=16,i.f(),e.finish(16);case 19:if("answer"!==a.type){e.next=29;break}return console.log("antwoord van raspberrypi binnen"),l=o.get(a.from),console.log(a.data.sdp),e.next=25,l.setRemoteDescription(a.data);case 25:console.log(l),console.log(l.connectionState),console.log(l.iceConnectionState),console.log(l.signalingState);case 29:"disconnect"===a.type&&(d=o.get(a.from),P.status="controller disconnect",P.statusButton="connect",d&&(console.log("Disconnecting from",a.from),d.close(),o.delete(a.from)));case 30:case"end":return e.stop()}}),e,null,[[4,13,16,19]])})));return function(t){return e.apply(this,arguments)}}()),e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](5),console.log("error: "+e.t0);case 16:case"end":return e.stop()}}),e,null,[[5,13]])})))()},videoStream:function(){var e=this;return Object(R["a"])(regeneratorRuntime.mark((function t(){var n,r,o,a,i,c,s,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={iceServers:[{urls:"turn:turn.stepverder.nl:3478",username:"Dominique",credential:"WS7Yq_jT"}]},r=function(){return Math.floor(1e4*Math.random())},o="ipcar"+r(),a="screen",i=new Map,s=function(){var e=Object(R["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!c){e.next=2;break}return e.abrupt("return",c);case 2:return e.abrupt("return",new Promise((function(e,r){try{c=new WebSocket("wss://stepverder.nl:4084/ipcar"),console.log(t);var o=function r(){c.send(JSON.stringify({type:"register",peerType:n,peerId:t})),c.removeEventListener("open",r),e(c)};c.addEventListener("open",o)}catch(a){r(a)}})));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),t.prev=6,console.log("in screen"),t.next=10,s(o,a);case 10:u=t.sent,u.addEventListener("message",function(){var t=Object(R["a"])(regeneratorRuntime.mark((function t(r){var a,c,s,l,d;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,a=JSON.parse(r.data),console.log(a),"offer"!==a.type){t.next=20;break}return c=new RTCPeerConnection(n),i.set(a.from,c),console.log("incoming data "),e.camera="online",e.statusButton="online",e.InActive=!1,e.Active=!0,c.ontrack=function(t){e.status="camera",P.online(),console.log("on track",t),window.v.srcObject=t.streams[0],window.v.play()},c.onicecandidate=function(e){console.log("set icecandidate"),e.candidate&&u.send(JSON.stringify({type:"candidate",from:o,to:a.from,data:e.candidate}))},t.next=14,c.setRemoteDescription(a.data);case 14:return t.next=16,c.createAnswer();case 16:return s=t.sent,t.next=19,c.setLocalDescription(s);case 19:u.send(JSON.stringify({to:a.from,from:o,type:"answer",data:c.localDescription}));case 20:"disconnect"===a.type&&(l=i.get(a.from),l&&(e.status="camera disconnect",e.camera="Offline",e.statusButton="connect",e.InActive=!0,e.Active=!1,console.log("Disconnecting from",a.from),l.ontrack=null,l.onicecandidate=null,l.close(),i.delete(a.from))),"candidate"===a.type&&(console.log(a.data),d=i.get(a.from),d&&(console.log("Adding candidate to",a.from),d.addIceCandidate(new RTCIceCandidate(a.data)))),t.next=28;break;case 24:t.prev=24,t.t0=t["catch"](0),console.error(t.t0),console.log("error video beeld niet ontvangen "+t.t0);case 28:case"end":return t.stop()}}),t,null,[[0,24]])})));return function(e){return t.apply(this,arguments)}}()),t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](6),console.error(t.t0),console.log("error verbinding mislukt: "+t.t0);case 18:case"end":return t.stop()}}),t,null,[[6,14]])})))()}}};n("a0ef");const T=i()(D,[["render",x],["__scopeId","data-v-249ace20"]]);var _=T,B=[{path:"/",name:"Home",component:_},{path:"/about",name:"about",component:function(){return n.e("livestream").then(n.bind(null,"f820"))}},{path:"/broadcast/:id",name:"Broadcast",component:function(){return n.e("livestream").then(n.bind(null,"3821"))}},{path:"/webrtctest",name:"webrtctest",component:function(){return n.e("livestream").then(n.bind(null,"19a6"))}},{path:"/raspberrypi",name:"raspberrypi",component:function(){return n.e("livestream").then(n.bind(null,"0adf"))}},{path:"/controller",name:"controller",component:function(){return n.e("livestream").then(n.bind(null,"3559"))}},{path:"/chris",name:"chris",component:function(){return n.e("livestream").then(n.bind(null,"2a48"))}}],I=Object(l["a"])({history:Object(l["b"])("/"),routes:B}),N=I,J=n("9483");Object(J["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var q=Object(M["a"])();Object(r["b"])(u).use(N).use(q).mount("#app")},"805b":function(e,t,n){},a0ef:function(e,t,n){"use strict";n("805b")},a5be:function(e,t,n){},b2da:function(e,t,n){},c15d:function(e,t,n){},e6e5:function(e,t,n){"use strict";function r(e,t,n,r,o,a){return null}var o=n("b85c"),a=n("1da1"),i=(n("96cf"),n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),n("e9c4"),null),c={data:function(){return{data:1}},created:function(){},computed:{},methods:{sendData:function(){this.data=Math.floor(100*Math.random()),console.log(this.data),i.send(this.data),window.requestAnimationFrame(this.sendData)},carControl:function(){return Object(a["a"])(regeneratorRuntime.mark((function e(){var t,n,r,c,s,u,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("link naar component werktS"),t={sdpSemantics:"unified-plan",iceServers:[{urls:"turn:turn.stepverder.nl:3478",username:"Dominique",credential:"WS7Yq_jT"}]},n="controldata",r="controller",c=new Map,u=function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!s){e.next=2;break}return e.abrupt("return",s);case 2:return e.abrupt("return",new Promise((function(e,r){try{s=new WebSocket("wss://stepverder.nl:4084/controller");var o=function r(){s.send(JSON.stringify({type:"register",peerType:n,peerId:t})),s.removeEventListener("open",r),e(s)};s.addEventListener("open",o)}catch(a){r(a),console.log(a)}})));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),e.prev=6,console.log("in controller"),e.next=10,u(n,r);case 10:l=e.sent,l.addEventListener("message",function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(r){var a,s,u,d,f,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=JSON.parse(r.data),"Raspberrypis"!==a.type){e.next=19;break}console.log("raspberry pi probeert te verbinden"),s=Object(o["a"])(a.Raspberrypis),e.prev=4,d=regeneratorRuntime.mark((function e(){var r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=u.value,o=new RTCPeerConnection(t),c.set(r,o),o.addEventListener("icegatheringstatechange",(function(){console.log(o.connectionState)})),i=o.createDataChannel("sendDataChannel",{ordered:!1,maxRetransmits:0}),i.onopen=function(e){console.log("hi you"),i.send("Hi raspberrypi!")},console.log(i),e.next=9,o.createOffer().then((function(e){return o.setLocalDescription(e)})).then((function(){return new Promise((function(e){if("complete"===o.iceGatheringState)e();else{function t(){console.log(o.iceGatheringState),"complete"===o.iceGatheringState&&(o.removeEventListener("icegatheringstatechange",t),e())}o.addEventListener("icegatheringstatechange",t)}}))})).then((function(){console.log(o),console.log("offer wordt gestuurd"),l.send(JSON.stringify({type:"offer",to:r,from:n,data:o.localDescription}))}));case 9:case"end":return e.stop()}}),e)})),s.s();case 7:if((u=s.n()).done){e.next=11;break}return e.delegateYield(d(),"t0",9);case 9:e.next=7;break;case 11:e.next=16;break;case 13:e.prev=13,e.t1=e["catch"](4),s.e(e.t1);case 16:return e.prev=16,s.f(),e.finish(16);case 19:if("answer"!==a.type){e.next=29;break}return console.log("antwoord van raspberrypi binnen"),f=c.get(a.from),console.log(a.data.sdp),e.next=25,f.setRemoteDescription(a.data);case 25:console.log(f),console.log(f.connectionState),console.log(f.iceConnectionState),console.log(f.signalingState);case 29:"disconnect"===a.type&&(p=c.get(a.from),p&&(console.log("Disconnecting from",a.from),p.close(),c.delete(a.from)));case 30:case"end":return e.stop()}}),e,null,[[4,13,16,19]])})));return function(t){return e.apply(this,arguments)}}()),e.next=17;break;case 14:e.prev=14,e.t0=e["catch"](6),console.log("error: "+e.t0);case 17:case"end":return e.stop()}}),e,null,[[6,14]])})))()}}},s=(n("2d0a"),n("6b0d")),u=n.n(s);const l=u()(c,[["render",r],["__scopeId","data-v-60669cdd"]]);t["a"]=l},fc05:function(e,t,n){"use strict";n("b2da")}});
//# sourceMappingURL=app.js.map