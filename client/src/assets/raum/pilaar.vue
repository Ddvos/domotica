<template>   
<div id="grid" class="container">
   <canvas id="c"></canvas> 
     <div>    
      
  </div>
</div>
</template>
<script>
import osc from "osc";

var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" //  ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();

export default {
   
  data() {
  return{
       paalDetectieColor1: "none", 
       vueCanvas: null,
       rectWidth: 400,
      centerXY: null,   // pilaarpoints X and Y
      topLeft: null,
      topRight: null,
      bottomRight: null,
      bottomLeft: null,
      vak1: null,  // alle x en y coordinaten van vlak1
      vak2: null,
      vak3: null,
      vak4: null,
      drawPole:[],
      colorVlak1: ['rgb(237, 21, 21)','rgb(0, 230, 100)',0], // kleuren en positie van vlakken
      colorVlak2: ['rgb(237, 21, 21)','rgb(0, 230, 100)',0],
      colorVlak3: ['rgb(237, 21, 21)','rgb(0, 230, 100)',0],
      colorVlak4: ['rgb(237, 21, 21)','rgb(0, 230, 100)',0],
      colorsPole:[],
      width: 0,  // wdith of center point to stroke line
   }
  },
  computed: {
  
  },
  created() {
     this.OSCMessage(); 
    },
  mounted(){
     var c = document.getElementById("c");
     var ctx = c.getContext("2d");    
     this.vueCanvas = ctx;

      this.drawPilaar()
  
    },
  methods:{
       OSCMessage: function(){        
        port.on("message", (oscMessage) => {
             this.OSCMessages(oscMessage);
             //console.log(oscMessage);
      });
     },
     OSCMessages: function(oscMessage){ 
    
             if(oscMessage.address == "/color_pole1_1" ){
                 this.colorVlak1 = ['rgb('+oscMessage.args[0]+','+oscMessage.args[1]+','+oscMessage.args[2]+')','rgb('+oscMessage.args[3]+','+oscMessage.args[4]+','+oscMessage.args[5]+')',oscMessage.args[6]]//twee waardes rgb(255, 0, 0) 
                 // console.log(this.colorVlak1)
                  this.drawPilaar() 
                 }
              if(oscMessage.address == "/color_pole1_2" ){
                 this.colorVlak2 = ['rgb('+oscMessage.args[0]+','+oscMessage.args[1]+','+oscMessage.args[2]+')','rgb('+oscMessage.args[3]+','+oscMessage.args[4]+','+oscMessage.args[5]+')',oscMessage.args[6]]//twee waardes rgb(255, 0, 0) 
                 // console.log(this.colorVlak2)
                  this.drawPilaar() 
                 }
               if(oscMessage.address == "/color_pole1_3" ){
                 this.colorVlak3 = ['rgb('+oscMessage.args[0]+','+oscMessage.args[1]+','+oscMessage.args[2]+')','rgb('+oscMessage.args[3]+','+oscMessage.args[4]+','+oscMessage.args[5]+')',oscMessage.args[6]]//twee waardes rgb(255, 0, 0) 
                  //console.log(this.colorVlak3)
                  this.drawPilaar() 
                 }
               if(oscMessage.address == "/color_pole1_4" ){
                 this.colorVlak4 = ['rgb('+oscMessage.args[0]+','+oscMessage.args[1]+','+oscMessage.args[2]+')','rgb('+oscMessage.args[3]+','+oscMessage.args[4]+','+oscMessage.args[5]+')',oscMessage.args[6]]//twee waardes rgb(255, 0, 0) 
                  //console.log(this.colorVlak4)
                  this.drawPilaar() 
                 }
     },

      drawPilaar() {
        // clear canvas
          this.vueCanvas.clearRect(0, 0, 400, 400);
      
        // pilaarpoints X and Y
        this.centerXY = [80,80]
        this.topLeft = [40,40]
        this.topRight =  [120,40]
        this.bottomRight = [120,120]
        this.bottomLeft= [40,120]

        // vlak met alle punten
        this.vak1= [this.centerXY,this.topLeft,this.topRight]
        this.vak2=  [this.centerXY,this.topRight,this.bottomRight]
        this.vak3 = [this.centerXY,this.bottomRight,this.bottomLeft]
        this.vak4 = [this.centerXY,this.bottomLeft,this.topLeft]
    
        // complete paal met ale vlakken
        this.drawPole =[this.vak1,this.vak2,this.vak3,this.vak4]
        
        // loop door de paal en teken alle vlakken uit

        this.width = this.centerXY[0]+ (this.centerXY[0]-this.topLeft[0])
        //console.log("diameter paal" +this.width )
        // Create gradient for vak 1
        var grd1 = this.vueCanvas.createLinearGradient(this.topLeft[0],this.topLeft[1],this.topLeft[0],this.centerXY[1]);  // x1,y1,x2,y2,
                    grd1.addColorStop(0,this.colorVlak1[1]);  //postie en kleur
                    grd1.addColorStop(this.colorVlak1[2],this.colorVlak1[0]);  //postie tussen 0 en 100 en kleur
                    grd1.addColorStop(1,this.colorVlak1[0]);
         // Create gradient for vak 2
        var grd2 = this.vueCanvas.createLinearGradient(this.topLeft[0]+((this.topLeft[0]+this.topRight[0])/2),this.topLeft[1],this.centerXY[0],this.topRight[1]); // x1,y1,x2,y2,
                    grd2.addColorStop(0,this.colorVlak2[1]);  //postie en kleur
                    grd2.addColorStop(this.colorVlak2[2], this.colorVlak2[0]);  //postie tussen 0 en 100 en kleur
                    grd2.addColorStop(1,this.colorVlak2[0]);
         // Create gradient for vak 3
        var grd3 = this.vueCanvas.createLinearGradient(this.topLeft[0],this.centerXY[1],this.bottomLeft[0],this.bottomLeft[1]);  // x1,y1,x2,y2,
                    grd3.addColorStop(0,this.colorVlak3[0]);  //postie en kleur
                    grd3.addColorStop(this.colorVlak3[2],this.colorVlak3[0]);  //postie tussen 0 en 100 en kleur
                    grd3.addColorStop(1,this.colorVlak3[1]);
         // Create gradient for vak 4
        var grd4 = this.vueCanvas.createLinearGradient(this.topLeft[0],this.topLeft[1],this.centerXY[0],this.topLeft[1]); // x1,y1,x2,y2,
                    grd4.addColorStop(0,this.colorVlak4[1]);  //postie en kleur
                    grd4.addColorStop(this.colorVlak4[2],this.colorVlak4[0]);  //postie tussen 0 en 100 en kleur
                    grd4.addColorStop(1,this.colorVlak4[0]);

        this.colorsPole = [grd1,grd2, grd3,grd4 ]
         var i;
         for(i = 0; i < 4; i++){
             
             // console.log(this.drawPole[i][0][1])
                // pilaar draw vlakken
         this.vueCanvas.beginPath(); // note: w/o this, color does not work as expected   
         this.vueCanvas.moveTo(this.drawPole[i][0][0], this.drawPole[i][0][1]); // x, y center point
         this.vueCanvas.lineTo(this.drawPole[i][1][0], this.drawPole[i][1][1]); // x,y
         this.vueCanvas.lineTo(this.drawPole[i][2][0], this.drawPole[i][2][1]); // draw up toward 
         this.vueCanvas.closePath();
         this.vueCanvas.fillStyle =    this.colorsPole[i]// "rgb("+ this.colorsPole[i]+")";
         this.vueCanvas.fill();
      
           
         }  
         
        },


    }
}
</script>

<style lang="scss" scoped>

#app {
  padding: 20px;
  margin: 20px;
}

#c {
  height: 200px;
  width: 400px;
  border: 1px solid gray;
}


 

</style>