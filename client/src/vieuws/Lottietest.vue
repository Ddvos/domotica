<template>
    <div>
           <lottie :options="defaultOptions" :height="150" :width="900" v-on:animCreated="handleAnimation"/>
         <div>hello</div>
    </div>
</template>
<script>
 import Lottie from '../lottie';
 import * as animationData from '../assets/carcontrol/pinjump.json';

  export default {

    data () {
      return {
       defaultOptions: {animationData: animationData},
        animationSpeed: 1,
      
      }
    },
   
     components: {
    
   'lottie': Lottie,
     

    },
    methods:{

       handleAnimation: function (anim) {
        this.anim = anim;
       },
       stop: function () {
         this.anim.stop();
       },
       play: function () {
         this.anim.play();
     },
       pause: function () {
         this.anim.pause();
       },
       onSpeedChange: function () {
         this.anim.setSpeed(this.animationSpeed);
       },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

html {
    height: 100%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.wrapper{
  padding-top: 20px;
}

.btn-primary{
    margin-top: 20px;
}

.color {
  margin: auto;
  width: 50%;
  width: 80px;
  background-color: rgba(71, 255, 178, 0.699);
  height: 80px;
  
}

</style>