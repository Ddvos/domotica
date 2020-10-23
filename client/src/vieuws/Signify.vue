<template>


  <div class="parentBackground">
     {{color1Position}}
    <div class="backgroundGradient" v-bind:style="{ 'background-image': 'linear-gradient(0deg,'+color1.hex+' 0%,'+color1.hex+' '+color1Position+'%, '+color2.hex+' '+color2Position+'%,'+color2.hex+' 100%)' }">
    </div>     <!-- <chrome-picker :value="colors" @input="updateValue"></chrome-picker> -->
  <div class="colorPicker">
    <div class="row">
          <div  v-on:click="colorOne" class="colorSelector1"></div>
        <div class="col-4"></div>
        <div class="col-4">
            <chrome-picker v-if="selectColor1" :value="color2" @input="updateColor2"></chrome-picker>     
        </div>
        <div class="col-4"></div>     
    </div>
    <div class="row">
        <div  v-on:click="colorTwo" class="colorSelector2"></div>
      <div class="col-4"></div>
      <div class="col-4">
              <chrome-picker v-if="selectColor2" :value="color1" @input="updateColor1"></chrome-picker>
      </div>
      <div class="col-4"></div>
    </div>
  </div>       
</div>


  
</template>
<script src="../../node_modules/osc/dist/osc-browser.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            
<script>
import osc from "osc";
import $ from 'jquery'
import { Chrome } from 'vue-color'

 var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" //  ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();

let color1Props = {
  hex: '#5FA7B4E6',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 0.9
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 0.9
  },
  rgba: {
    r: 159,
    g: 96,
    b: 43,
    a: 0.9
  },
  a: 0.9
}

let color2Props = {
  hex: '#0B2BF1E6',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 0.9
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 0.9
  },
  rgba: {
    r: 159,
    g: 96,
    b: 43,
    a: 0.9
  },
  a: 0.9
}

export default {
  

  data() {
  return{
    value: 60,
    addressen:[],
    address:'',
    address2:'',
    color:'',
    color1: color1Props,
    color2: color2Props,
    color1Position: 40,
    color2Position: 40,
    selectColor1: true,
    selectColor2: true,
    
    
     
    
  }},
   created: function(){
             this.OSCMessage();      
          //console.log(message);

     },
     components:{
    'chrome-picker': Chrome,
     },
  computed: {

      bgc () {
      return this.colors.hex
    },
  },
  methods:{

      colorPicker1: function(){

      

     },
      OSCMessage: function(){ 
               
        port.on("message", (oscMessage) => {
          
            // console.log(oscMessage);
             this.OSCMessages(oscMessage);
          
      });
     },
      OSCMessages: function(oscMessage){ 
        //console.log(oscMessage); 
         
      if(oscMessage.address == "/color1" ){
          this.color1Position= oscMessage.args[0]
          //console.log(this.rood); 
        }

    // second address with data
      if(oscMessage.address == "/color2" ){
          this.color2Position= oscMessage.args[0]
          //console.log(this.color2Position); 
        }
        

     },
     onOk () {
      console.log('ok')
    },
    onCancel () {
      console.log('cancel')
    },
    updateColor1 (value) {
      this.color1 = value
      // console.log(this.color1.rgba.r+','+this.color1.rgba.g+','+this.color1.rgba.b)

         port.send({
        address: "/color1",
          args: [this.color1.rgba.r,this.color1.rgba.g,this.color1.rgba.b],
         });
    },
     updateColor2 (value) {
      this.color2 = value
      // console.log(this.color2.hex)

       port.send({
        address: "/color2",
          args: [this.color2.rgba.r,this.color2.rgba.g,this.color2.rgba.b]
         });
    },
    colorOne(){
       //console.log("button click")
       if(this.selectColor1 == false){
         this.selectColor1 = true;
       }else ( this.selectColor1 = false)
    },
      colorTwo(){
       //console.log("button click")
       if(this.selectColor2 == false){
         this.selectColor2 = true;
       }else ( this.selectColor2 = false)
    },
   
  },
  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parentBackground{
    position: relative;
       z-index: 1; 

}

.backgroundGradient {
 
  width: 100%;
  /* background-color: rgba(71, 255, 178, 0.699); */
    height: 100vh;
  
      position: absolute;
       z-index: 2; 
  
}
.row{
   width: 100%;
  /* background-color: rgba(71, 255, 178, 0.699); */
    height: 50vh;

}

.colorPicker {
   position: absolute;
  margin: auto;

/* background: linear-gradient(0deg, rgba(0,255,64,1) 0%, rgba(0,255,64,1) 32%, rgba(0,212,255,1) 64%, rgba(0,212,255,1) 100%); */
  /* //background-image: linear-gradient(#25BA70E6, #FF09F7); */
   height: 50%;
    
  
  
}
.colorSelector1{
   position: absolute;
  width: 100vh;
   height: 45vh;
     z-index: 3; 

}
.colorSelector2{
   position: absolute;
   margin: 10px;
  width:  100vh;
   height: 45vh;
    z-index: 3;  

}

.vc-chrome { 
  margin-top: 50px;
 position: relative;
     z-index: 4; 


 
}

@media screen and (max-width: 600px) {
  .col-1 {
    visibility: hidden;
    display: none;
  }
}

</style>