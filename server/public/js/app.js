(function(e){function t(t){for(var o,i,c=t[0],s=t[1],u=t[2],l=0,d=[];l<c.length;l++)i=c[l],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&d.push(r[i][0]),r[i]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);h&&h(t);while(d.length)d.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,i=1;i<n.length;i++){var c=n[i];0!==r[c]&&(o=!1)}o&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},i={app:0},r={app:0},a=[];function c(e){return s.p+"js/"+({livestream:"livestream"}[e]||e)+".js"}function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={livestream:1};i[e]?t.push(i[e]):0!==i[e]&&n[e]&&t.push(i[e]=new Promise((function(t,n){for(var o="css/"+({livestream:"livestream"}[e]||e)+".css",r=s.p+o,a=document.getElementsByTagName("link"),c=0;c<a.length;c++){var u=a[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===o||l===r))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){u=d[c],l=u.getAttribute("data-href");if(l===o||l===r)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var o=t&&t.target&&t.target.src||r,a=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=o,delete i[e],h.parentNode.removeChild(h),n(a)},h.href=r;var f=document.getElementsByTagName("head")[0];f.appendChild(h)})).then((function(){i[e]=0})));var o=r[e];if(0!==o)if(o)t.push(o[2]);else{var a=new Promise((function(t,n){o=r[e]=[t,n]}));t.push(o[2]=a);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=c(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(h);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+o+": "+i+")",d.name="ChunkLoadError",d.type=o,d.request=i,n[1](d)}r[e]=void 0}};var h=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var h=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"1ba9":function(e,t,n){"use strict";n("c181")},2918:function(e,t,n){"use strict";n("c15d")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("7a23");function i(e,t){var n=Object(o["y"])("router-view");return Object(o["s"])(),Object(o["c"])(n)}n("2918");var r=n("6b0d"),a=n.n(r);const c={},s=a()(c,[["render",i]]);var u=s,l=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),d=(n("498a"),function(e){return Object(o["v"])("data-v-5a3f9bfc"),e=e(),Object(o["t"])(),e}),h={class:"background",ref:"mouseEvent"},f={key:0,class:"row"},p={class:"information"},v={class:"data"},b=d((function(){return Object(o["f"])("h4",null,"IP Car V3 Desktop",-1)})),m=d((function(){return Object(o["f"])("div",{class:"livefeed"},[Object(o["f"])("video",{mute:"true",playsinline:"",autoplay:"",id:"v"})],-1)})),g={key:1,class:"row"},O={class:"information"},j={class:"data"},y=d((function(){return Object(o["f"])("h4",{class:"namecar"},"IP car4",-1)})),w={for:"checkbox"},k=d((function(){return Object(o["f"])("div",{class:"livefeed"},[Object(o["f"])("video",{mute:"true",playsinline:"",autoplay:"",id:"v"})],-1)}));function x(e,t,n,i,r,a){var c=Object(o["y"])("Joystick1"),s=Object(o["y"])("Joystick2");return Object(o["s"])(),Object(o["e"])("div",h,[r.desktop?(Object(o["s"])(),Object(o["e"])("div",f,[Object(o["f"])("div",p,[Object(o["f"])("div",v,[b,Object(o["f"])("ul",null,[Object(o["f"])("li",null,"Status: "+Object(o["A"])(r.status),1),Object(o["f"])("li",null,"Snelheid: "+Object(o["A"])(r.realSpeed)+"km/h",1),Object(o["f"])("li",null,"Accu: "+Object(o["A"])(r.accu)+"%",1),Object(o["f"])("li",null,"Camera: "+Object(o["A"])(r.camera),1)]),Object(o["f"])("div",{class:Object(o["n"])({Buttonactive:r.Active,ButtonInactive:r.Inactive}),onClick:t[0]||(t[0]=function(){return a.connect&&a.connect.apply(a,arguments)})},Object(o["A"])(r.statusButton),3)])]),m])):Object(o["d"])("",!0),r.mobile?(Object(o["s"])(),Object(o["e"])("div",g,[Object(o["f"])("div",O,[Object(o["f"])("div",j,[y,Object(o["f"])("div",{class:Object(o["n"])({Buttonactive:r.Active,ButtonInactive:r.Inactive}),onClick:t[1]||(t[1]=function(){return a.connect&&a.connect.apply(a,arguments)})},Object(o["A"])(r.statusButton),3),Object(o["f"])("ul",null,[Object(o["f"])("li",null,"Status: "+Object(o["A"])(r.status),1),Object(o["f"])("li",null,"Snelheid: "+Object(o["A"])(r.realSpeed)+"km/h",1),Object(o["f"])("li",null,"Accu: "+Object(o["A"])(r.accu)+"%",1),Object(o["f"])("li",null,"Trim: "+Object(o["A"])(r.trim),1),Object(o["f"])("li",null,[Object(o["E"])(Object(o["f"])("input",{type:"checkbox",id:"checkbox","onUpdate:modelValue":t[2]||(t[2]=function(e){return r.touchState=e})},null,512),[[o["C"],r.touchState]]),Object(o["f"])("label",w,"Touch control: "+Object(o["A"])(r.touchState),1)])])])]),k,Object(o["h"])(c,{class:"joystick1",onChange:t[3]||(t[3]=function(e){a.handleChange("left",e)})}),Object(o["h"])(s,{class:"joystick2",onChange:t[4]||(t[4]=function(e){a.handleChange("right",e)})})])):Object(o["d"])("",!0)],512)}var S=n("1da1"),A=(n("96cf"),n("ac1f"),n("00b4"),n("d81d"),n("b680"),n("4ec9"),n("e9c4"),n("daa8")),M={class:"controls"};function C(e,t,n,i,r,a){return Object(o["s"])(),Object(o["e"])("div",M,[Object(o["f"])("div",{class:"vue-joystick",ref:"touchevent",style:Object(o["o"])(a.style),onMousemove:t[0]||(t[0]=function(){return a.handleMove&&a.handleMove.apply(a,arguments)}),onMousedown:t[1]||(t[1]=function(){return a.handleStart&&a.handleStart.apply(a,arguments)}),onMouseup:t[2]||(t[2]=function(){return a.handleRelease&&a.handleRelease.apply(a,arguments)}),onTouchend:t[3]||(t[3]=function(){return a.handleRelease&&a.handleRelease.apply(a,arguments)})},null,36)])}var L={props:{color:{type:String,default:"#25B"}},data:function(){return{x:0,y:0,angle:0,speed:0,isMouseDown:!1,linksX:0,linksY:0,rechtsX:0}},computed:{style:function(){return{"--x":"".concat(this.x+64,"px"),"--y":"".concat(this.y+64,"px"),"--speed":"".concat(this.speed,"px"),"--angle":"".concat(this.angle,"deg"),"--color":"".concat(this.color)}}},methods:{handleStart:function(){this.isMouseDown=!0},handleTouch:function(e){var t=e.changedTouches;this.linksX=t[0].clientX,this.linksY=t[0].clientY;var n=this.$el,o=n.offsetLeft,i=n.offsetTop,r=Math.round(this.linksX-o-64),a=Math.round(this.linksY-i-64);this.updatePosition(r,a)},handleMove:function(e){var t=e.clientX,n=e.clientY;if(this.isMouseDown){var o=this.$el,i=o.offsetLeft,r=o.offsetTop,a=Math.round(t-i-64),c=Math.round(n-r-64);this.updatePosition(a,c)}},handleRelease:function(){this.emitAll("release"),this.isMouseDown=!1,this.updatePosition(0,0)},updatePosition:function(e,t){var n=48,o=Math.atan2(t,e),i=Math.round(180*o/Math.PI,4);this.angle=i+(i>90?-270:90),this.speed=Math.min(Math.round(Math.sqrt(Math.pow(t,2)+Math.pow(e,2))),128),this.x=this.speed>n?Math.cos(o)*n:e,this.y=this.speed>=n?Math.sin(o)*n:t,this.emitAll()},emitAll:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"change";this.$emit(e,{x:this.x,y:this.y,speed:this.speed,angle:this.angle})}},mounted:function(){var e=this;this.$refs.touchevent.addEventListener("touchstart",(function(t){e.handleStart(t)}),!1),this.$refs.touchevent.addEventListener("touchend",(function(t){e.handleRelease(t)}),!1),this.$refs.touchevent.addEventListener("touchcancel",(function(t){e.handleCancel(t)}),!1),this.$refs.touchevent.addEventListener("touchleave",(function(t){e.handleEnd(t)}),!1),this.$refs.touchevent.addEventListener("touchmove",(function(t){e.handleTouch(t)}),!1),console.log("initialized."),this.emitAll()}};n("fc05");const E=a()(L,[["render",C]]);var P=E,_=A["a"].connect("https://stepverder.nl:6500",{reconnectionDelay:2e3,timeout:2e4}),I={data:function(){return{status:"connect",statusButton:"connect",speed:0,realSpeed:0,accu:0,trim:0,light:"uit",camera:"offline",xAxesLeft:0,sendSpeedValue:0,Inactive:!0,Active:!1,internetConnection:!1,desktop:!0,mobile:!1,touchState:!1,optionButton:0,leftStick:{x:0,y:0,speed:0,angle:0},rightStick:{x:0,y:0,speed:0,angle:0},metaInfo:{meta:[{charset:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1.0"}]}}},components:{Joystick1:P,Joystick2:P},created:function(){this.gameController(),this.siteVisitor()},mounted:function(){this.$refs.mouseEvent.addEventListener("touchmove",(function(e){e.preventDefault(),e.stopImmediatePropagation()}),{passive:!1}),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(console.log("mobile device"),this.mobile=!0,this.desktop=!1):(console.log("not mobile device"),this.mobile=!1,this.desktop=!0)},computed:{},methods:{siteVisitor:function(){_.on("welcome",(function(e){console.log(e)})),_.on("clientList",(function(e){console.log(e)})),_.on("newUser",(function(e){console.log(e)})),_.on("disconnect")},gameController:function(){var e=this;window.addEventListener("gamepadconnected",(function(){e.inputController(),e.gamepads=navigator.getGamepads()})),window.addEventListener("gamepaddisconnected",(function(){}))},handleChange:function(e,t){var n=t.x,o=t.y,i=t.speed,r=t.angle,a=this["".concat(e,"Stick")];a.speed=i,a.angle=r,"right"==e&&(a.y=o,this.speed=this.map(a.y,48,-48,1350,1650)),"left"==e&&(a.x=n,this.xAxesLeft=this.map(a.x,-48,48,500,2500)),1==this.mobile&&1==this.touchState&&_.emit("controllerInput",[this.xAxesLeft,this.speed])},inputController:function(){var e=navigator.getGamepads();e[0]&&(this.gamepadState={id:e[0].id,axes:[e[0].axes[0]],buttons:[{button_1:e[0].buttons[0].value},{button_3:e[0].buttons[3].value},{button_4:e[0].buttons[4].value},{button_5:e[0].buttons[5].value},{button_6:e[0].buttons[6].value},{button_7:e[0].buttons[7].value},{button_9:e[0].buttons[7].value},{button_14:e[0].buttons[14].value},{button_15:e[0].buttons[15].value}]},this.Kruisje=e[0].buttons[0].value,this.Kruisje=e[0].buttons[3].value,this.optionButton=e[0].buttons[9].value,this.speed=this.map(e[0].buttons[7].value,0,1,1500,1600),this.reverse=this.map(e[0].buttons[6].value,0,1,1500,1400),this.xAxesLeft=this.map(e[0].axes[0],-1,1,500,2500),0==e[0].buttons[6].value&&(this.realSpeed=this.map(e[0].buttons[7].value,0,1,0,15)),0==e[0].buttons[7].value&&(this.realSpeed=this.map(e[0].buttons[6].value,0,1,0,15)),this.speed>1501?this.sendSpeedValue=this.speed:this.reverse<1501?this.sendSpeedValue=this.reverse:this.reverse<1499&&this.speed>1501&&(this.sendSpeedValue=1500),0==this.touchState&&_.volatile.emit("controllerInput",[this.xAxesLeft,this.sendSpeedValue,this.optionButton])),window.requestAnimationFrame(this.inputController)},map:function(e,t,n,o,i){return((e-t)*(i-o)/(n-t)+o).toFixed(0)},connect:function(){this.videoStream(),this.internetConnection=window.navigator.onLine,this.internetConnection?this.status="connected to internet":this.status="No internet"},videoStream:function(){var e=this;return Object(S["a"])(regeneratorRuntime.mark((function t(){var n,o,i,r,a,c,s,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={iceServers:[{urls:"turn:turn.stepverder.nl:3478",username:"Dominique",credential:"WS7Yq_jT"}]},o=function(){return Math.floor(1e4*Math.random())},i="ipcar"+o(),r="screen",a=new Map,s=function(){var e=Object(S["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!c){e.next=2;break}return e.abrupt("return",c);case 2:return e.abrupt("return",new Promise((function(e,o){try{c=new WebSocket("wss://stepverder.nl:4084/ipcar"),console.log(t);var i=function o(){c.send(JSON.stringify({type:"register",peerType:n,peerId:t})),c.removeEventListener("open",o),e(c)};c.addEventListener("open",i)}catch(r){o(r)}})));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),t.prev=6,console.log("in screen"),t.next=10,s(i,r);case 10:u=t.sent,u.addEventListener("message",function(){var t=Object(S["a"])(regeneratorRuntime.mark((function t(o){var r,c,s,l,d;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,r=JSON.parse(o.data),console.log("camera and selected car are the same "+r.from),"offer"!==r.type){t.next=20;break}return c=new RTCPeerConnection(n),a.set(r.from,c),console.log("incoming data "+o),e.camera="Online",e.statusButton="connected",e.InActive=!1,e.Active=!0,c.ontrack=function(e){console.log("on track",e),window.v.srcObject=e.streams[0],window.v.play()},c.onicecandidate=function(e){e.candidate&&u.send(JSON.stringify({type:"candidate",from:i,to:r.from,data:e.candidate}))},t.next=14,c.setRemoteDescription(r.data);case 14:return t.next=16,c.createAnswer();case 16:return s=t.sent,t.next=19,c.setLocalDescription(s);case 19:u.send(JSON.stringify({to:r.from,from:i,type:"answer",data:c.localDescription}));case 20:"disconnect"===r.type&&(l=a.get(r.from),l&&(e.camera="Offline",e.statusButton="connect",e.InActive=!0,e.Active=!1,console.log("Disconnecting from",r.from),l.ontrack=null,l.onicecandidate=null,l.close(),a.delete(r.from))),"candidate"===r.type&&(d=a.get(r.from),d&&(console.log("Adding candidate to",r.from),d.addIceCandidate(new RTCIceCandidate(r.data)))),t.next=28;break;case 24:t.prev=24,t.t0=t["catch"](0),console.error(t.t0),console.log("error niewe verbiding openen lukt niet");case 28:case"end":return t.stop()}}),t,null,[[0,24]])})));return function(e){return t.apply(this,arguments)}}()),t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](6),console.error(t.t0),console.log("error niewe verbiding openen lukt niet");case 18:case"end":return t.stop()}}),t,null,[[6,14]])})))()}}};n("1ba9");const B=a()(I,[["render",x],["__scopeId","data-v-5a3f9bfc"]]);var T=B,R=[{path:"/",name:"Home",component:T},{path:"/broadcast/:id",name:"Broadcast",component:function(){return n.e("livestream").then(n.bind(null,"3821"))}}],D=Object(l["a"])({history:Object(l["b"])("/"),routes:R}),J=D;Object(o["b"])(u).use(J).mount("#app")},b2da:function(e,t,n){},c15d:function(e,t,n){},c181:function(e,t,n){},fc05:function(e,t,n){"use strict";n("b2da")}});
//# sourceMappingURL=app.js.map