
<template>
<div class="controls">
     <ul>
          <li>linksX: {{linksX}}</li>
          <li>rightX: {{rechtsX}}</li>
        </ul>
    <canvas ref="touchevent" id="canvas" width="400" height="400" style="border:solid black 1px;">
        You really badly need to use a different browser.
    </canvas>
    <br>
    <button onclick="window.startup();">Initialize</button>
    <br>
    Log: <pre id="log" style="border: 1px solid #ccc;"></pre>

  </div>
</template>
<script>
export default {
  props: {


  },
  data() {
    return {
      linksX: 0,
      rechtsX: 0,
      angle: 0,
      speed: 0,
      isMouseDown: false,
      ongoingTouches: []
    };
  },
  computed: {

  },
  mounted() {
    
    this.$refs.touchevent.addEventListener("touchstart",(event)=>{this.handleStart(event)}, false);
    this.$refs.touchevent.addEventListener("touchend",(event)=>{this.handleEnd(event)} , false);
    this.$refs.touchevent.addEventListener("touchcancel",(event)=>{this.handleCancel(event)}, false);
    this.$refs.touchevent.addEventListener("touchleave",(event)=>{ this.handleEnd(event)}, false);
    this.$refs.touchevent.addEventListener("touchmove",(event)=>{ this.handleMove(event)}, false);
    console.log("initialized.");
  },
  methods: {
     handleStart:  function(evt) {
     
       // var el = document.getElementsByTagName("canvas")[0];
       // var ctx = el.getContext("2d");
        var touches = evt.changedTouches;
       // var offset = this.findPos(el);
 

        for (var i = 0; i < touches.length; i++) {
        
            this.ongoingTouches.push(this.copyTouch(touches[i]));
      
            //var idx = this.ongoingTouchIndexById(touches[i].identifier);
            //console.log(touches[i].clientX);
    
        }
     },
     handleMove: function(evt) {

        //var el = document.getElementsByTagName("canvas")[0];
        //var ctx = el.getContext("2d");
        var touches = evt.changedTouches;
       // var offset = this.findPos(el);

        
        for (var i = 0; i < touches.length; i++) {
            
            if(i==0){
             this.linksX= touches[i].clientX
            
            }  
            if(i==1){
             this.rechtsX= touches[i].clientX
              console.log( this.rechtsX)
            }  
          }
    },
   handleEnd: function(evt) {

    //  log("touchend/touchleave.");
    var el = document.getElementsByTagName("canvas")[0];
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;
    var offset = this.findPos(el);

    for (var i = 0; i < touches.length; i++) {
       if(touches[i].clientX-offset.x >0 && touches[i].clientX-offset.x < parseFloat(el.width) && touches[i].clientY-offset.y >0 && touches[i].clientY-offset.y < parseFloat(el.height)){
        evt.preventDefault();
        var color = "#8B0000" //colorForTouch(touches[i]);
        var idx = this.ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            ctx.lineWidth = 4;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(this.ongoingTouches[idx].clientX-offset.x, this.ongoingTouches[idx].clientY-offset.y);
            ctx.lineTo(touches[i].clientX-offset.x, touches[i].clientY-offset.y);
            ctx.fillRect(touches[i].clientX - 4-offset.x, touches[i].clientY - 4-offset.y, 8, 8); // and a square at the end
            this.ongoingTouches.splice(i, 1); // remove it; we're done
            } else {
            console.log("can't figure out which touch to end");
            }
        }
      }
    },
    handleCancel: function(evt) {
        evt.preventDefault();
        console.log("touchcancel.");
        var touches = evt.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            this.ongoingTouches.splice(i, 1); // remove it; we're done
        }
    },
    copyTouch: function (touch) {
        return {identifier: touch.identifier,clientX: touch.clientX,clientY: touch.clientY};
    },
    ongoingTouchIndexById: function(idToFind) {
        for (var i = 0; i < this.ongoingTouches.length; i++) {
            var id = this.ongoingTouches[i].identifier;

            if (id == idToFind) {
            return i;
            }
        }
        return -1; // not found
    },
    findPos: function(obj) {
        var curleft = 0,
            curtop = 0;

        if (obj.offsetParent) {
             
               curleft += obj.offsetLeft;
                 curtop += obj.offsetTop;

            return { x: curleft-document.body.scrollLeft, y: curtop-document.body.scrollTop };
        }
    },
  },

};
</script>
<style>
ul {
      color: white;
    list-style-type: none;
    text-align: left;
    padding-top: 10px;
    padding-left: 5px;
}

</style>
