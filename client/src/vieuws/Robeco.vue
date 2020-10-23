<template>

<div>

    
    
   <br>
    <div class="container">
      <div class="row">
        <div class="col-sm-2"></div> 
        <div class="col-sm-8">
            <!-- <transition name="fade">
                <div class="oscswitch" v-if="!hideElement">
                    <h3>info</h3>
                </div>
                  </transition> -->
        </div>
        <div class="col-sm-2"></div>
      </div>
    </div>
    
  <br>
  <br>
      <transition name="fade">
          <video v-if="!hideVideo1" class="animatieVideo" v-on:mousemove="updateCoordinates1" v-on:click="sendtoStudio" id="myVideo1" ref="myVideo1">
              <source src="../assets/SLDER.mp4" type="video/mp4"> 
                  Your browser does not support the video tag.
              </video>
      </transition>
      <br>
      <br>
  
      <transition name="fade">
          <video v-if="!hideVideo2" class="animatieVideo" v-on:mousemove="updateCoordinates2"  id="myVideo2" ref="myVideo2">
              <source src="../assets/WORLD_50fps_1_keyframe.mp4" type="video/mp4"> 
                  Your browser does not support the video tag.
              </video>
      </transition>
      <br>
      <br>
  
       <transition name="fade">
          <video v-if="!hideVideo3" class="animatieVideo" v-on:mousemove="updateCoordinates3"  id="myVideo3" ref="myVideo3">
              <source src="../assets/ROBECO_3D_WEBSITE_50FPS_1_KEYFRAME_1.mp4" type="video/mp4"> 
                  Your browser does not support the video tag.
              </video>
      </transition>
      
</div>
  
</template>

<script src="../../node_modules/osc/dist/osc-browser.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            
<script>
import osc from "osc";
import $ from 'jquery';


 var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" //ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();


export default {
  

  data() {
  return{
    value: 60,
    addressen:[],
    message:'',
    address:'',
    message2:'',
    address2:'',
    videoTime: 30,
    x1: 0,
    x2: 0,
    x3: 0,
    hideVideo1: false,
    hideVideo2: false,
    hideVideo3: false,
    click: 1
    
    
    
     
    
  }},
   created: function(){
             this.OSCMessage();      
          //console.log(message);

     },
  computed: {
   

   
    total: function () {
        
      return this.value 
    }
  },
  methods:{
      updateCoordinates1: function(event) {

      var rect = myVideo1.getBoundingClientRect(); // postion of video element 
      //console.log(rect.right, rect.left);
     
      this.x1 =(event.clientX-rect.left)*((5)/(rect.right-rect.left));
      this.x1 =  this.x1.toFixed(2)
       console.log( this.x1);
      
       this.$refs.myVideo1.currentTime =this.x1; 
        //this.$refs.myVideo.play();

        //sending mouse postion value over OSC to the studio
         port.send({
          address: "/mousePosition1",
          args: [this.x1]
         });
    
    },
    
    updateCoordinates2: function(event) {

      var rect = myVideo2.getBoundingClientRect(); // postion of video element 
      //console.log(rect.right, rect.left);
     
      this.x2 =(event.clientX-rect.left)*((5)/(rect.right-rect.left));
      this.x2 =  this.x2.toFixed(2)
       console.log( this.x2);
      
       this.$refs.myVideo2.currentTime =this.x2; 
        //this.$refs.myVideo.play();

       
    
    },
     updateCoordinates3: function(event) {

      var rect = myVideo3.getBoundingClientRect(); // postion of video element 
      //console.log(rect.right, rect.left);
     
      this.x3 =(event.clientX-rect.left)*((1)/(rect.right-rect.left));
      this.x3 =  this.x3.toFixed(2)
       console.log( this.x3);
      
       this.$refs.myVideo3.currentTime =this.x3; 
        //this.$refs.myVideo.play();    
    },
      OSCMessage: function(){ 
               
        port.on("message", (oscMessage) => {
          
             //console.log(oscMessage);
             this.OSCMessages(oscMessage);
          
      });
     },
      OSCMessages: function(oscMessage){ 
  
    // console.log(oscMessage); 

        //hide and show video 1
      if(oscMessage.address == "/hideVideo1" && oscMessage.args == 1){
          this.hideVideo1 = true;   // element is not vissible
        }
        else if(oscMessage.address == "/hideVideo1" && oscMessage.args == 0){
               this.hideVideo1 = false; // element is  vissible
        }

          //hide and show video 2
      if(oscMessage.address == "/hideVideo2" && oscMessage.args == 1){
          this.hideVideo2 = true;   // element is not vissible
        }
        else if(oscMessage.address == "/hideVideo2" && oscMessage.args == 0){
               this.hideVideo2 = false; // element is  vissible
        }
        
        //hide and show video 3
      if(oscMessage.address == "/hideVideo3" && oscMessage.args == 1){
          this.hideVideo3 = true;   // element is not vissible
        }
        else if(oscMessage.address == "/hideVideo3" && oscMessage.args == 0){
               this.hideVideo3 = false; // element is  vissible
        }

 

          
     },
      sendtoStudio: function(){
      

        if(this.click  == 1){
            port.send({
            address: "/videoClick",
            args: [this.click]
            });
            
            console.log(this.click); 
            this.click =0;
            return;
        }
          if(this.click  == 0){
            port.send({
            address: "/videoClick",
            args: []
            });
            
            console.log(this.click); 
            this.click =1
            return;
        }
      },
   
  },
  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.animatieVideo{
  width: 100vw;

}

.oscswitch{
    color: white;
     margin: auto;
     width: 50%;
    height: 250px;
    background-color: rgba(70, 0, 128, 0.925);
}

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

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>