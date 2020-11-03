<template>
<div class="background">
  <div class="row">
    <div class="col-2" >
      <div class="data">
        <h>Car Control</h>
        <p>hier komt data</p>
      </div>
   </div>
   <div class="col-10" >
    <div class="livefeed">
        <video mute='true' playsinline autoplay id='v'  ></video> <!--  //v-bind:style="{ 'border': '7px solid'+color1.hex+'' }" -->
    </div>
  </div>

 </div>
</div>
  
</template>


            
<script>
import osc from "osc";



 var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" // ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
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
    x: 0,
    
    
    
     
    
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

     videoPlayBack: function () {
        //var vid = document.getElementById("myVideo");
     
           //this.$refs.myVideo.currentTime=10;
           // vid.play();
  
    },
    greet: function(){
      
      port.send({
        address: "/hello",
          args: ["De slider werkt!"]
         });
    },
      sendSlider: function(){

        port.send({
        address: "/hello",
          args: [this.value]
         });

     },
      OSCMessage: function(){ 
               
        port.on("message", (oscMessage) => {
          
             console.log(oscMessage);
             this.OSCMessages(oscMessage);
          
      });
     },
      OSCMessages: function(oscMessage){ 
  
         
        var n = this.addressen.includes(oscMessage.address) // looks if address exist in the array if not N false otherwise it is true
         
        //console.log(oscMessage);
        if(n == false) {   // if n is false address dont exist en will add new adress in the array                    
            this.addressen.push(oscMessage.address);            
        }

        // first address with data
      if(oscMessage.address == this.addressen[0] ){
          this.message= 'rgb('+oscMessage.args+')'
          this.address= oscMessage.address
          //console.log(this.message); 
        }

    // second address with data
      if(oscMessage.address == this.addressen[1] ){
          this.message2= oscMessage.args
          this.address2= oscMessage.address
          //console.log(this.message); 
        }
         
     }, 
   
  },
  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.background{
  width: 100vw;
  height: 100vh;
  background: #1e3a42;
}

.row,.col-10,.col-2{
     margin: 0;
    padding:0;
  }


.data{
  position: relative;
  color: white;
   width: 100%;
  height: 100vh;
    background-color: #1e3a42;

}

.livefeed{
   width: 100%;
  height: 100%;
}

  video{
   // position: absolute;
    margin-left: 0;
     width: 100%;
     height: 100%;
    background-color: #2a2a2b;
    z-index:1;
}

</style>