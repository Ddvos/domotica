<template>


  <div class="parentBackground">
     {{color1Position}}
      <div class="row">
        
        <div class="col-2"></div>
        <div class="col-2">
           <div class="paal" v-on:mousedown="paal1down" v-on:mouseup="paal1up">
          <div class="inside" v-bind:style="{ 'background-image': 'linear-gradient(0deg,'+colum1color1+' 0%, '+colum1color2+' '+column1_postion+'%,'+colum1color1+' 100%)' }">
            <!-- kant1 -->
        
              <div  v-on:click="colorOne" class="colorSelector1"></div>
              </div>
          </div>
        </div>
        <div class="col-2">
          <div class="paal" v-on:mousedown="paal2down" v-on:mouseup="paal2up">
              <div class="inside" >
            <!-- kant2 -->
        
      
              </div>
          </div>
        </div>  
         <div class="col-2">
            <div class="paal">
               <div class="inside" >
            <!-- kant3 -->
        
         
              </div>
          </div>
        </div>
        <div class="col-2" >
          <div class="paal">
            <div class="inside">
            <!-- kant4 -->
        
          
              </div>
          </div>
        </div>
        <div class="col-2"></div>    
    </div>
      
</div>


  
</template>
<script src="../../node_modules/osc/dist/osc-browser.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            
<script>
import osc from "osc";
import $ from 'jquery'


 var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" //  ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();



export default {
  

  data() {
  return{
    value: 60,
    addressen:[],
    address:'',
    address2:'',
    color:'',
    
    color1Position: 40,
    color2Position: 40,
    selectColor1: true,
    selectColor2: true,
    
    
     
    
  }},
   created: function(){
             this.OSCMessage();      
          //console.log(message);

     },
    
  computed: {

   
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







</style>