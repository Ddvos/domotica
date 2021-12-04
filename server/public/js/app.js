(function(e){function t(t){for(var o,r,c=t[0],s=t[1],u=t[2],l=0,d=[];l<c.length;l++)r=c[l],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&d.push(i[r][0]),i[r]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);h&&h(t);while(d.length)d.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,r=1;r<n.length;r++){var c=n[r];0!==i[c]&&(o=!1)}o&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},r={app:0},i={app:0},a=[];function c(e){return s.p+"js/"+({livestream:"livestream"}[e]||e)+".js"}function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={livestream:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var o="css/"+({livestream:"livestream"}[e]||e)+".css",i=s.p+o,a=document.getElementsByTagName("link"),c=0;c<a.length;c++){var u=a[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===o||l===i))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){u=d[c],l=u.getAttribute("data-href");if(l===o||l===i)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var o=t&&t.target&&t.target.src||i,a=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=o,delete r[e],h.parentNode.removeChild(h),n(a)},h.href=i;var f=document.getElementsByTagName("head")[0];f.appendChild(h)})).then((function(){r[e]=0})));var o=i[e];if(0!==o)if(o)t.push(o[2]);else{var a=new Promise((function(t,n){o=i[e]=[t,n]}));t.push(o[2]=a);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=c(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(h);var n=i[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+o+": "+r+")",d.name="ChunkLoadError",d.type=o,d.request=r,n[1](d)}i[e]=void 0}};var h=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var h=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0c34":function(e,t,n){"use strict";var o=n("7a23"),r={class:"controls"};function i(e,t,n,i,a,c){return Object(o["t"])(),Object(o["e"])("div",r,[Object(o["f"])("div",{class:"vue-joystick",ref:"touchevent",style:Object(o["p"])(c.style),onMousemove:t[0]||(t[0]=function(){return c.handleMove&&c.handleMove.apply(c,arguments)}),onMousedown:t[1]||(t[1]=function(){return c.handleStart&&c.handleStart.apply(c,arguments)}),onMouseup:t[2]||(t[2]=function(){return c.handleRelease&&c.handleRelease.apply(c,arguments)}),onTouchend:t[3]||(t[3]=function(){return c.handleRelease&&c.handleRelease.apply(c,arguments)})},null,36)])}var a={props:{color:{type:String,default:"#25B"}},data:function(){return{x:0,y:0,angle:0,speed:0,isMouseDown:!1,linksX:0,linksY:0,rechtsX:0}},computed:{style:function(){return{"--x":"".concat(this.x+64,"px"),"--y":"".concat(this.y+64,"px"),"--speed":"".concat(this.speed,"px"),"--angle":"".concat(this.angle,"deg"),"--color":"".concat(this.color)}}},methods:{handleStart:function(){this.isMouseDown=!0},handleTouch:function(e){var t=e.changedTouches;this.linksX=t[0].clientX,this.linksY=t[0].clientY;var n=this.$el,o=n.offsetLeft,r=n.offsetTop,i=Math.round(this.linksX-o-64),a=Math.round(this.linksY-r-64);this.updatePosition(i,a)},handleMove:function(e){var t=e.clientX,n=e.clientY;if(this.isMouseDown){var o=this.$el,r=o.offsetLeft,i=o.offsetTop,a=Math.round(t-r-64),c=Math.round(n-i-64);this.updatePosition(a,c)}},handleRelease:function(){this.emitAll("release"),this.isMouseDown=!1,this.updatePosition(0,0)},updatePosition:function(e,t){var n=48,o=Math.atan2(t,e),r=Math.round(180*o/Math.PI,4);this.angle=r+(r>90?-270:90),this.speed=Math.min(Math.round(Math.sqrt(Math.pow(t,2)+Math.pow(e,2))),128),this.x=this.speed>n?Math.cos(o)*n:e,this.y=this.speed>=n?Math.sin(o)*n:t,this.emitAll()},emitAll:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"change";this.$emit(e,{x:this.x,y:this.y,speed:this.speed,angle:this.angle})}},mounted:function(){var e=this;this.$refs.touchevent.addEventListener("touchstart",(function(t){e.handleStart(t)}),!1),this.$refs.touchevent.addEventListener("touchend",(function(t){e.handleRelease(t)}),!1),this.$refs.touchevent.addEventListener("touchcancel",(function(t){e.handleCancel(t)}),!1),this.$refs.touchevent.addEventListener("touchleave",(function(t){e.handleEnd(t)}),!1),this.$refs.touchevent.addEventListener("touchmove",(function(t){e.handleTouch(t)}),!1),console.log("initialized."),this.emitAll()}},c=(n("fc05"),n("6b0d")),s=n.n(c);const u=s()(a,[["render",i]]);t["a"]=u},2918:function(e,t,n){"use strict";n("c15d")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("7a23");function r(e,t){var n=Object(o["z"])("router-view");return Object(o["t"])(),Object(o["c"])(n)}n("2918");var i=n("6b0d"),a=n.n(i);const c={},s=a()(c,[["render",r]]);var u=s,l=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),d=(n("498a"),function(e){return Object(o["w"])("data-v-0b0d01a0"),e=e(),Object(o["u"])(),e}),h={class:"background",ref:"mouseEvent"},f={key:0,class:"row"},p={class:"information"},v={class:"data"},b=d((function(){return Object(o["f"])("h4",null,"IP Car V3 Desktop",-1)})),m=d((function(){return Object(o["f"])("div",{class:"livefeed"},[Object(o["f"])("video",{mute:"true",playsinline:"",autoplay:"",id:"v"})],-1)})),g={key:1,class:"row"},O={class:"information"},j={class:"data"},y=d((function(){return Object(o["f"])("h4",{class:"namecar"},"IP car4",-1)})),w={for:"checkbox"},k=d((function(){return Object(o["f"])("div",{class:"livefeed"},[Object(o["f"])("video",{mute:"true",playsinline:"",autoplay:"",id:"v"})],-1)}));function x(e,t,n,r,i,a){var c=Object(o["z"])("Joystick1"),s=Object(o["z"])("Joystick2");return Object(o["t"])(),Object(o["e"])("div",h,[i.desktop?(Object(o["t"])(),Object(o["e"])("div",f,[Object(o["f"])("div",p,[Object(o["f"])("div",v,[b,Object(o["f"])("ul",null,[Object(o["f"])("li",null,"Status: "+Object(o["B"])(i.status),1),Object(o["f"])("li",null,"Snelheid: "+Object(o["B"])(i.realSpeed)+"km/h",1),Object(o["f"])("li",null,"Accu: "+Object(o["B"])(i.accu)+"%",1),Object(o["f"])("li",null,"Camera: "+Object(o["B"])(i.camera),1)]),Object(o["f"])("div",{class:Object(o["o"])({Buttonactive:i.Active,ButtonInactive:i.Inactive}),onClick:t[0]||(t[0]=function(){return a.connect&&a.connect.apply(a,arguments)})},Object(o["B"])(i.statusButton),3)])]),m])):Object(o["d"])("",!0),i.mobile?(Object(o["t"])(),Object(o["e"])("div",g,[Object(o["f"])("div",O,[Object(o["f"])("div",j,[y,Object(o["f"])("div",{class:Object(o["o"])({Buttonactive:i.Active,ButtonInactive:i.Inactive}),onClick:t[1]||(t[1]=function(){return a.connect&&a.connect.apply(a,arguments)})},Object(o["B"])(i.statusButton),3),Object(o["f"])("ul",null,[Object(o["f"])("li",null,"Status: "+Object(o["B"])(i.status),1),Object(o["f"])("li",null,"Snelheid: "+Object(o["B"])(i.realSpeed)+"km/h",1),Object(o["f"])("li",null,"Accu: "+Object(o["B"])(i.accu)+"%",1),Object(o["f"])("li",null,"Trim: "+Object(o["B"])(i.trim),1),Object(o["f"])("li",null,[Object(o["F"])(Object(o["f"])("input",{type:"checkbox",id:"checkbox","onUpdate:modelValue":t[2]||(t[2]=function(e){return i.touchState=e})},null,512),[[o["D"],i.touchState]]),Object(o["f"])("label",w,"Touch control: "+Object(o["B"])(i.touchState),1)])])])]),k,Object(o["i"])(c,{class:"joystick1",onChange:t[3]||(t[3]=function(e){a.handleChange("left",e)})}),Object(o["i"])(s,{class:"joystick2",onChange:t[4]||(t[4]=function(e){a.handleChange("right",e)})})])):Object(o["d"])("",!0)],512)}var S=n("1da1"),M=(n("96cf"),n("ac1f"),n("00b4"),n("d81d"),n("b680"),n("4ec9"),n("e9c4"),n("daa8")),A=n("0c34"),B=M["a"].connect("https://stepverder.nl:6500",{reconnectionDelay:2e3,timeout:2e4}),C={data:function(){return{status:"connect",statusButton:"connect",speed:0,realSpeed:0,accu:0,trim:0,light:"uit",camera:"offline",xAxesLeft:0,sendSpeedValue:0,Inactive:!0,Active:!1,internetConnection:!1,desktop:!0,mobile:!1,touchState:!1,optionButton:0,leftStick:{x:0,y:0,speed:0,angle:0},rightStick:{x:0,y:0,speed:0,angle:0},metaInfo:{meta:[{charset:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1.0"}]}}},components:{Joystick1:A["a"],Joystick2:A["a"]},created:function(){this.gameController(),this.siteVisitor()},mounted:function(){this.$refs.mouseEvent.addEventListener("touchmove",(function(e){e.preventDefault(),e.stopImmediatePropagation()}),{passive:!1}),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(console.log("mobile device"),this.mobile=!0,this.desktop=!1):(console.log("not mobile device"),this.mobile=!1,this.desktop=!0)},computed:{},methods:{siteVisitor:function(){B.on("welcome",(function(e){console.log(e)})),B.on("clientList",(function(e){console.log(e)})),B.on("newUser",(function(e){console.log(e)})),B.on("disconnect")},gameController:function(){var e=this;window.addEventListener("gamepadconnected",(function(){e.inputController(),e.gamepads=navigator.getGamepads()})),window.addEventListener("gamepaddisconnected",(function(){}))},handleChange:function(e,t){var n=t.x,o=t.y,r=t.speed,i=t.angle,a=this["".concat(e,"Stick")];a.speed=r,a.angle=i,"right"==e&&(a.y=o,this.speed=this.map(a.y,48,-48,1350,1650)),"left"==e&&(a.x=n,this.xAxesLeft=this.map(a.x,-48,48,500,2500)),1==this.mobile&&1==this.touchState&&B.emit("controllerInput",[this.xAxesLeft,this.speed])},inputController:function(){var e=navigator.getGamepads();e[0]&&(this.gamepadState={id:e[0].id,axes:[e[0].axes[0]],buttons:[{button_1:e[0].buttons[0].value},{button_3:e[0].buttons[3].value},{button_4:e[0].buttons[4].value},{button_5:e[0].buttons[5].value},{button_6:e[0].buttons[6].value},{button_7:e[0].buttons[7].value},{button_9:e[0].buttons[7].value},{button_14:e[0].buttons[14].value},{button_15:e[0].buttons[15].value}]},this.Kruisje=e[0].buttons[0].value,this.Kruisje=e[0].buttons[3].value,this.optionButton=e[0].buttons[9].value,this.speed=this.map(e[0].buttons[7].value,0,1,1500,1600),this.reverse=this.map(e[0].buttons[6].value,0,1,1500,1400),this.xAxesLeft=this.map(e[0].axes[0],-1,1,500,2500),0==e[0].buttons[6].value&&(this.realSpeed=this.map(e[0].buttons[7].value,0,1,0,15)),0==e[0].buttons[7].value&&(this.realSpeed=this.map(e[0].buttons[6].value,0,1,0,15)),this.speed>1501?this.sendSpeedValue=this.speed:this.reverse<1501?this.sendSpeedValue=this.reverse:this.reverse<1499&&this.speed>1501&&(this.sendSpeedValue=1500),0==this.touchState&&B.volatile.emit("controllerInput",[this.xAxesLeft,this.sendSpeedValue,this.optionButton])),window.requestAnimationFrame(this.inputController)},map:function(e,t,n,o,r){return((e-t)*(r-o)/(n-t)+o).toFixed(0)},connect:function(){this.videoStream(),this.internetConnection=window.navigator.onLine,this.internetConnection?this.status="connected to internet":this.status="No internet"},videoStream:function(){var e=this;return Object(S["a"])(regeneratorRuntime.mark((function t(){var n,o,r,i,a,c,s,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={iceServers:[{urls:"turn:turn.stepverder.nl:3478",username:"Dominique",credential:"WS7Yq_jT"}]},o=function(){return Math.floor(1e4*Math.random())},r="ipcar"+o(),i="screen",a=new Map,s=function(){var e=Object(S["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!c){e.next=2;break}return e.abrupt("return",c);case 2:return e.abrupt("return",new Promise((function(e,o){try{c=new WebSocket("wss://stepverder.nl:4084/ipcar"),console.log(t);var r=function o(){c.send(JSON.stringify({type:"register",peerType:n,peerId:t})),c.removeEventListener("open",o),e(c)};c.addEventListener("open",r)}catch(i){o(i)}})));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),t.prev=6,console.log("in screen"),t.next=10,s(r,i);case 10:u=t.sent,u.addEventListener("message",function(){var t=Object(S["a"])(regeneratorRuntime.mark((function t(o){var i,c,s,l,d;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,i=JSON.parse(o.data),console.log(i),"offer"!==i.type){t.next=21;break}return console.log("hallo"),c=new RTCPeerConnection(n),a.set(i.from,c),console.log("incoming data "),e.camera="Online",e.statusButton="connected",e.InActive=!1,e.Active=!0,c.ontrack=function(e){console.log("on track",e),window.v.srcObject=e.streams[0],window.v.play()},c.onicecandidate=function(e){console.log("set icecandidate"),e.candidate&&u.send(JSON.stringify({type:"candidate",from:r,to:i.from,data:e.candidate}))},t.next=15,c.setRemoteDescription(i.data);case 15:return t.next=17,c.createAnswer();case 17:return s=t.sent,t.next=20,c.setLocalDescription(s);case 20:u.send(JSON.stringify({to:i.from,from:r,type:"answer",data:c.localDescription}));case 21:"disconnect"===i.type&&(l=a.get(i.from),l&&(e.camera="Offline",e.statusButton="connect",e.InActive=!0,e.Active=!1,console.log("Disconnecting from",i.from),l.ontrack=null,l.onicecandidate=null,l.close(),a.delete(i.from))),"candidate"===i.type&&(console.log(i.data),d=a.get(i.from),console.log(d),d&&(console.log("Adding candidate to",i.from),d.addIceCandidate(new RTCIceCandidate(i.data)))),t.next=29;break;case 25:t.prev=25,t.t0=t["catch"](0),console.error(t.t0),console.log("error video beeld niet ontvangen "+t.t0);case 29:case"end":return t.stop()}}),t,null,[[0,25]])})));return function(e){return t.apply(this,arguments)}}()),t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](6),console.error(t.t0),console.log("error verbinding mislukt: "+t.t0);case 18:case"end":return t.stop()}}),t,null,[[6,14]])})))()}}};n("b17d");const L=a()(C,[["render",x],["__scopeId","data-v-0b0d01a0"]]);var E=L,P=[{path:"/",name:"Home",component:E},{path:"/about",name:"about",component:function(){return n.e("livestream").then(n.bind(null,"f820"))}},{path:"/broadcast/:id",name:"Broadcast",component:function(){return n.e("livestream").then(n.bind(null,"3821"))}},{path:"/webrtctest",name:"webrtctest",component:function(){return n.e("livestream").then(n.bind(null,"19a6"))}},{path:"/raspberrypi",name:"raspberrypi",component:function(){return n.e("livestream").then(n.bind(null,"0adf"))}},{path:"/controller",name:"controller",component:function(){return n.e("livestream").then(n.bind(null,"3559"))}},{path:"/chris",name:"chris",component:function(){return n.e("livestream").then(n.bind(null,"2a48"))}}],_=Object(l["a"])({history:Object(l["b"])("/"),routes:P}),I=_,T=n("9483");Object(T["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),Object(o["b"])(u).use(I).mount("#app")},abf8:function(e,t,n){},b17d:function(e,t,n){"use strict";n("abf8")},b2da:function(e,t,n){},c15d:function(e,t,n){},fc05:function(e,t,n){"use strict";n("b2da")}});
//# sourceMappingURL=app.js.map