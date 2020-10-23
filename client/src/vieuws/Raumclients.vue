<template>

  <div class="parentBackground">
  
      <div class="row" id="title">
                 <div class="col-3"></div>
                   <div class="col-6"> RAUM - living apart together</div>
                  <div class="col-3"></div>
            </div>
      <br>
        
    <div class="row">
        
        <div class="col-2"></div>
        <div class="col-2">
           <!-- <div class="paal" v-on:mousedown="paal1down" v-on:mouseup="paal1up"> -->
          <div class="inside" v-bind:style="{ 'background-image': 'linear-gradient(0deg,'+column1color1+' 0%, '+column1color2+' '+column1_postion+'%,'+column1color1+' 100%)' }">
            <!-- kant1 -->
        
           
              <!-- </div> -->
          </div>
        </div>
        <div class="col-2">
          <div class="paal" v-on:mousedown="paal2down" v-on:mouseup="paal2up">
              <div class="inside" v-bind:style="{ 'background-image': 'linear-gradient(0deg,'+column2color1+' 0%, '+column2color2+' '+column2_postion+'%,'+column2color1+' 100%)' }">
            <!-- kant2 -->
        
      
              </div>
          </div>
        </div>  
         <div class="col-2">
            <div class="paal"  v-on:mousedown="paal3down" v-on:mouseup="paal3up">
               <div class="inside" v-bind:style="{ 'background-image': 'linear-gradient(0deg,'+column3color1+' 0%, '+column3color2+' '+column3_postion+'%,'+column3color1+' 100%)' }" >
            <!-- kant3 -->
        
         
              </div>
          </div>
        </div>
        <div class="col-2" >
          <div class="paal" v-on:mousedown="paal4down" v-on:mouseup="paal4up">
            <div class="inside" v-bind:style="{ 'background-image': 'linear-gradient(0deg,'+column4color1+' 0%, '+column4color2+' '+column4_postion+'%,'+column4color1+' 100%)' }">
            <!-- kant4 -->
        
          
              </div>
          </div>
        </div>
        <div class="col-2"></div>    
    </div>

          <div class="row">
                 <div class="col-2"></div>
                  <div class="col-4">
                      Totaal online bezoekers: {{totalClients}}
                  </div>
                  <div class="col-4" v-if="this.newUser == true">
                       Nieuwe bezoeker joined de online experience
                  </div>
                 
                 <div class="col-2">
                 </div>
            </div>

       <div class="row">
            <div class="col-3"> paal 1
               <div id="paaloutside">
                  <div id="paalinside"></div>
              </div>
            </div>
            <div class="col-3"></div>
            <div class="col-3"></div>
             <div class="col-3"></div>
        </div>

        <br>
       <div class="row">
            <div class="col-3">
            </div>
            <div class="col-3"></div>
            <div class="col-3"></div>
             <div class="col-3"></div>
        </div>
       
</div>


  
</template>
<script src="../../node_modules/osc/dist/osc-browser.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            
<script>
import osc from "osc";
import $ from 'jquery'
import io from "socket.io-client";
//import mouseRaum from '../components/mouseRaum';


 var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" //  ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();

let raum = io.connect("https://circusfamilyprojects.nl:6500/raum") // poort to connect with
//let allUsers = socket.adapter.rooms;


export default {
  

  data() {
  return{

    color1: 40,
    column1color1: '#3f87a6',
    column1color2: '#ebf8e1',
    column2color1: '#3f87a6',
    column2color2: '#ebf8e1',
    column3color1: '#3f87a6',
    column3color2: '#ebf8e1',
    column4color1: '#3f87a6',
    column4color2: '#ebf8e1',
    column1_postion: 50,
    column2_postion: 50,
    column3_postion: 50,
    column4_postion: 50,
    color1Position: 40,
    newUser: false,
    totalClients: null,
    clientsIDArray: []
    
  }},
   created: function(){
             this.OSCMessage(); 
             this.siteVisitor();    
          //console.log(message);

     },
   components: {
      
    //  'mouseRaum': mouseRaum,
    

    },
  methods:{
     siteVisitor: function(){

       raum.on("welcome",(data)=>{
         this.siteVisitors(data);
        })

         raum.on("clientList",(clients)=>{
         this.someAllClients(clients);
        })

        raum.emit("joinRaum", "clientRoom");

        raum.on("newUser",(res) =>{
          console.log(res)
          this.newUser = true;

          setTimeout(() => this.newUser= false, 3000);
        })

       raum.on("err",(err)=> console.log(err))
       raum.on("succes",(res)=> console.log(res))
     },
     siteVisitors: function(data) {
      
      console.log(data);
       //console.log(raum.id);

     },
     someAllClients: function(clients){
       this.totalClients = clients.length
       this.clientsIDArray =clients
       console.log( this.clientsIDArray)

          port.send({
            address: "/clientsID",
            args:  this.clientsIDArray
         });
     },
      OSCMessage: function(){ 
               
        port.on("message", (oscMessage) => {
          
    
             this.OSCMessages(oscMessage);
            //console.log(oscMessage);
      });
     },
      OSCMessages: function(oscMessage){ 
        //console.log(oscMessage); 
         
         //// column 1
             if(oscMessage.address == "/column1_color1" ){
                 this.column1color1 = 'rgb('+oscMessage.args[0]+','+oscMessage.args[1]+','+oscMessage.args[2]+')'//rgb(255, 0, 0) 
                 }
             if(oscMessage.address == "/column1_color2" ){
                 this.column1color2 = 'rgb('+oscMessage.args[0]+','+oscMessage.args[1]+','+oscMessage.args[2]+')'//rgb(255, 0, 0)
                 }
             if(oscMessage.address == "/column1_position" ){
                 this.column1_postion = oscMessage.args[0]
                 }

            //// column 2
                if(oscMessage.address == "/column2_color1" ){
                 this.column2color1 = 'rgb('+oscMessage.args[0]+','+oscMessage.args[1]+','+oscMessage.args[2]+')'//rgb(255, 0, 0)
               }
             if(oscMessage.address == "/column2_color2" ){
                 this.column2color2 = 'rgb('+oscMessage.args[0]+','+oscMessage.args[1]+','+oscMessage.args[2]+')'//rgb(255, 0, 0)
                 }
             if(oscMessage.address == "/column2_position" ){
                 this.column2_postion = oscMessage.args[0]
                 }

            //// column 3
                if(oscMessage.address == "/column3_color1" ){
                 this.column3color1 = 'rgb('+oscMessage.args[0]+','+oscMessage.args[1]+','+oscMessage.args[2]+')'//rgb(255, 0, 0)
                 }
                if(oscMessage.address == "/column3_color2" ){
                    this.column3color2 = 'rgb('+oscMessage.args[0]+','+oscMessage.args[1]+','+oscMessage.args[2]+')'//rgb(255, 0, 0)
                    }
                if(oscMessage.address == "/column3_position" ){
                    this.column3_postion = oscMessage.args[0]
                }

            //// column 4
                if(oscMessage.address == "/column4_color1" ){
                 this.column4color1 = 'rgb('+oscMessage.args[0]+','+oscMessage.args[1]+','+oscMessage.args[2]+')'//rgb(255, 0, 0)
                }
                 if(oscMessage.address == "/column4_color2" ){
                    this.column4color2 = 'rgb('+oscMessage.args[0]+','+oscMessage.args[1]+','+oscMessage.args[2]+')'//rgb(255, 0, 0)
                 }
                if(oscMessage.address == "/column4_position" ){
                    this.column4_postion = oscMessage.args[0]
                 }


           
     },
   paal1down(){
     console.log("paal1_"+raum.id)
         port.send({
            address: "/paal1_"+raum.id,
            args:  [1]
         });
     },
    paal1up(){
       console.log("paal1_"+raum.id)
         port.send({
            address: "/paal1_"+raum.id,
            args: [0]
         });
     },
   paal2down(){
      console.log("paal2_"+raum.id)
         port.send({
            address: "/paal2_"+raum.id,
            args: [1]
         });
     },
    paal2up(){
       console.log("paal2c_"+raum.id)
         port.send({
            address: "/paal2_"+raum.id,
            args: [0]
         });
     },
     paal3down(){
         port.send({
            address: "/paal3_"+raum.id,
            args: [1]
         });
     },
     paal3up(){
         port.send({
            address: "/paal3_"+raum.id,
            args: [0]
         });
     },
     paal4down(){
         port.send({
            address: "/paal4_"+raum.id,
            args: [1]
         });
     },
     paal4up(){
         port.send({
            address: "/paal4_"+raum.id,
            args: [0]
         });
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
    height: 100vh;
    position: absolute;     
}





.row {
        width:100%;
}
.paal{
    width:  70px;
    margin: 50px;
    height: 60vh;
    border: 1px solid black;
    background: black; 
    z-index: 3; 
}

.inside{
  border-radius: 15px;
  width: 30px;
    margin: 20px;
    margin-top: 5vh;
    height: 50vh;
    border: 5px solid black;
    z-index: 3; 
}

#paaloutside {
  width: 0;
  height: 0;
  position: relative;
  border: 10px solid black;
  border-top: 80px solid #06e99d;
  border-right: 80px solid #ee0f0f5e;
  border-bottom: 80px solid #96903b;
  border-left: 80px solid #8c00ff3a;
   margin: 0 auto;
}


#paalinside {
  position: absolute;
  border: 10px solid black;
  border-top: 50px solid #FF1E66;
  border-right: 50px solid #eec90f;
  border-bottom: 50px solid #1ef2ff;
  border-left: 50px solid #FF9700;
  margin: 0 auto;


}



</style>