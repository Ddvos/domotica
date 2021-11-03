
<template>
<div class="controls">
  <div class="vue-joystick"  ref="touchevent"
    :style="style"
    
    @mousemove="handleMove"
    @mousedown="handleStart"
    @mouseup="handleRelease"
    @touchend="handleRelease"
  >
  </div>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: "#25B"
    }
  },
  data() {
    return {
      x: 0,
      y: 0,
      angle: 0,
      speed: 0,
      isMouseDown: false,
      linksX: 0,
      linksY: 0,
      rechtsX:0,
    };
  },
  computed: {
    style() {
      return {
        "--x": `${this.x + 64}px`,
        "--y": `${this.y + 64}px`,
        "--speed": `${this.speed}px`,
        "--angle": `${this.angle}deg`,
        "--color": `${this.color}`
      };
    }
  },
  methods: {
    handleStart() {
      this.isMouseDown = true;
    },
    handleTouch( evt) {
      var touches = evt.changedTouches;
      
             this.linksX= touches[0].clientX
              this.linksY= touches[0].clientY
              //console.log( this.linksY)
      
      //const { clientX, clientY } = touches;
      const { offsetLeft, offsetTop } = this.$el;
  
      const x = Math.round(this.linksX - offsetLeft -64);
      const y = Math.round(this.linksY - offsetTop - 64);
      this.updatePosition(x, y);
  //  console.log(this.$el)
     
    },
    handleMove({ clientX, clientY }) {
      if (!this.isMouseDown) {
        return;
      }
      const { offsetLeft, offsetTop } = this.$el;
      const x = Math.round(clientX - offsetLeft - 64);
      const y = Math.round(clientY - offsetTop - 64);
      this.updatePosition(x, y);
    },
    handleRelease() {
      this.emitAll("release");
      this.isMouseDown = false;
      this.updatePosition(0, 0);
    },
    updatePosition(x, y) {
      const offset = 64 - 16;
      const radians = Math.atan2(y, x);
      const angle = Math.round((radians * 180) / Math.PI, 4);
      this.angle = angle + (angle > 90 ? -270 : 90);
      this.speed = Math.min(
        Math.round(Math.sqrt(Math.pow(y, 2) + Math.pow(x, 2))),
        128
      );
      this.x = this.speed > offset ? Math.cos(radians) * offset : x;
      this.y = this.speed >= offset ? Math.sin(radians) * offset : y;
      //console.log(this.y)
      this.emitAll();
    },
    emitAll(name = "change") {
      this.$emit(name, {
        x: this.x,
        y: this.y,
        speed: this.speed,
        angle: this.angle
      });
    }
  },
  mounted() {
    
    this.$refs.touchevent.addEventListener("touchstart",(event)=>{this.handleStart(event)}, false);
    this.$refs.touchevent.addEventListener("touchend",(event)=>{this.handleRelease(event)} , false);
    this.$refs.touchevent.addEventListener("touchcancel",(event)=>{this.handleCancel(event)}, false);
    this.$refs.touchevent.addEventListener("touchleave",(event)=>{ this.handleEnd(event)}, false);
    this.$refs.touchevent.addEventListener("touchmove",(event)=>{ this.handleTouch(event)}, false);
    console.log("initialized.");

    this.emitAll();
  }
};
</script>
<style>

.vue-joystick {
  display: inline-block;
  background: rgba(255, 255, 255, 0.5);
  height: 128px;
  width: 128px;
  border-radius: 50%;
  position: relative;
  border: solid 4px var(--color);
}
.vue-joystick::before,
.vue-joystick::after {
  content: "";
  position: absolute;
}
.vue-joystick::before {
  left: 0;
  right: 0;
  margin: -16px;
  background: var(--color);
  height: 32px;
  width: 32px;
  border-radius: 50%;
  transform: translateX(var(--x)) translateY(var(--y));
}
.vue-joystick::after {
  left: 63px;
  bottom: 64px;
  border-radius: 5px;
  width: 2px;
  background: var(--color);
  transform: rotate(var(--angle));
  transform-origin: bottom center;
  height: var(--speed);
}
</style>
