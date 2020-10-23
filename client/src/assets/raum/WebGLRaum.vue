<template>   
 <div id="container"></div>

</template>
<script>
import osc from "osc";
 import { TweenMax} from 'gsap'
 import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';

//import * as Three from 'three';

var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" //  ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();

export default {

  props: {
        bigBallPosition: Array,
        smallBallPosition: Array,
        raumid: String,
     },
   
  data() {
  return{
      camera: null,
      scene: null,
      renderer: null,
      widthPole: null,
      x: null,
      y: null,
      mesh1: [], // vlak bovenkant
      mesh2: [], // vlak rechterkant
      mesh3: [], // vlak onderkant
      mesh4: [], // vlak linkerkant
      testMesh: null, // vlak linkerkant
      groundMesh: null,
      meshPilaar: null, // kruis pilaar
      light: null,
      mouseMesh: null,
      mouseSmallMesh: null,
      bigBall: null,
      smallBall: null,
      //colorvlakken
      colorVlak1: ['rgb(35, 100, 233)','rgb(202, 26, 47)',0.3
      ], // kleuren en positie van vlakken
      colorVlak2: ['rgb(35, 100, 233)','rgb(202, 26, 47)',0.3], // kleuren en positie van vlakken
      colorVlak3: ['rgb(35, 100, 233)','rgb(202, 26, 47)',0.3], // kleuren en positie van vlakken
      colorVlak4: ['rgb(35, 100, 233)','rgb(202, 26, 47)',0.3], // kleuren en positie van vlakken
      // breedite driehoeken
      width: null,
      mousecolor:[255,125,10],
      // detection
      mesh1Detection:[],
      mesh2Detection: [],
      mesh3Detection: [],
      mesh4Detection:[],
      detectionArray: [],
      meshPoleDetection:[],
      collisionPole: false,
      vlak1Position: null,
      posSmall: null, // positie van de kleine muis
      posBig: null,
      hitTop: false, // deze variabele komen op true als de grote bal de betreffende kant raakt
      hitRight: false,
      hitBottom: false,
      hitLeft: false,
      sendSide:[false,false,false,false,false],
      sendPole:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
      hitside:false,
       xposistieSpeed: 0.1,
       speed: 0,
       id: null,
       totalPole:[],
       OSCconnectionStatus: false,
       mouse: null, 
       raycaster: null,
       mobile: false,
       desktop: true,
       ypostion: 0,
       line1: null,
       matLine: null,
        
   }
  },
  computed: {
  
  },
  created() {
     this.OSCMessage(); 
    },
  mounted(){
   // this.Three = window.Three = require('Three');
    this.init();
    this.animate();


    },
  methods:{
    OSCMessage: function(){        
        port.on("message", (oscMessage) => {
             this.OSCMessages(oscMessage);
           // console.log(oscMessage);
        });
     },
      OSCMessages: function(oscMessage){ 
            // put incoming OSC data in colorvlakken
            for(var p = 1; p<17; p++){
             if(oscMessage.address == "/color_pole"+p ){
                this.OSCconnectionStatus = true
                 this.colorVlak1 = ['rgb('+oscMessage.args[0]+','+oscMessage.args[1]+','+oscMessage.args[2]+')','rgb('+oscMessage.args[3]+','+oscMessage.args[4]+','+oscMessage.args[5]+')',oscMessage.args[6]]//twee waardes rgb(255, 0, 0) 
                 this.mesh1[p].material.uniforms.vlak1color1.value = new this.$three.Color(this.colorVlak1[0])
                 this.mesh1[p].material.uniforms.vlak1color2.value = new this.$three.Color(this.colorVlak1[1])
                 this.mesh1[p].material.uniforms.positionVlak1.value = (this.width)/1*this.colorVlak1[2]

                 this.colorVlak2 = ['rgb('+oscMessage.args[7]+','+oscMessage.args[8]+','+oscMessage.args[9]+')','rgb('+oscMessage.args[10]+','+oscMessage.args[11]+','+oscMessage.args[12]+')',oscMessage.args[13]]//twee waardes rgb(255, 0, 0) 
                 this.mesh2[p].material.uniforms.vlak2color1.value = new this.$three.Color(this.colorVlak2[0])
                 this.mesh2[p].material.uniforms.vlak2color2.value = new this.$three.Color(this.colorVlak2[1])
                 this.mesh2[p].material.uniforms.positionVlak2.value = (this.width)/1*this.colorVlak2[2]

                 this.colorVlak3 = ['rgb('+oscMessage.args[14]+','+oscMessage.args[15]+','+oscMessage.args[16]+')','rgb('+oscMessage.args[17]+','+oscMessage.args[18]+','+oscMessage.args[19]+')',oscMessage.args[20]]//twee waardes rgb(255, 0, 0) 
                 this.mesh3[p].material.uniforms.vlak3color1.value = new this.$three.Color(this.colorVlak3[0])
                 this.mesh3[p].material.uniforms.vlak3color2.value = new this.$three.Color(this.colorVlak3[1])
                 this.mesh3[p].material.uniforms.positionVlak3.value = (this.width)/1*this.colorVlak3[2]

                 this.colorVlak4 = ['rgb('+oscMessage.args[21]+','+oscMessage.args[22]+','+oscMessage.args[23]+')','rgb('+oscMessage.args[24]+','+oscMessage.args[25]+','+oscMessage.args[26]+')',oscMessage.args[27]]//twee waardes rgb(255, 0, 0) 
                 this.mesh4[p].material.uniforms.vlak4color1.value = new this.$three.Color(this.colorVlak4[0])
                 this.mesh4[p].material.uniforms.vlak4color2.value = new this.$three.Color(this.colorVlak4[1])
                 this.mesh4[p].material.uniforms.positionVlak4.value = (this.width)/1*this.colorVlak4[2]
                 }
            }
          if(oscMessage.address == this.$props.raumid){
              // hierbij zet hij de kleur van de muis naar de binnengekomden waarde
            //console.log( this.mouseMesh)
           this.mouseMesh.material.color.set('rgb('+oscMessage.args[0]+','+oscMessage.args[1]+', '+oscMessage.args[2]+')')
            // console.log("ids kloppen " this.$props.mousecolor[1])
       }
                 
              
                  
                 
     },
    

    init: function() {
       
        let container = document.getElementById('container');
         // renderer
         this.renderer = new this.$three.WebGLRenderer({antialias: true});
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = this.$three.PCFShadowMap;

        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);

        // point of view
       // console.log("resize: " + container.clientWidth)
        var pointofview = 100

        if(container.clientWidth<501){
          this.mobile = true
          this.desktop = false
          pointofview = ((100/container.clientWidth)*70) +100
            console.log( "point: "+pointofview)
        }
        //camera
        this.camera = new this.$three.PerspectiveCamera(pointofview, container.clientWidth/container.clientHeight, 0.1, 100);
        //console.log( container.clientWidth)
    
        
        this.camera.position.z = 11
        this.camera.aspect =container.clientWidth/container.clientHeight
        this.camera.updateProjectionMatrix()
       //console.log(container.clientWidth)
        //scene
        this.scene = new this.$three.Scene();

        this.raycaster = new this.$three.Raycaster();
				this.mouse = new this.$three.Vector2();


        var ground = new this.$three.BoxGeometry( 40,60, 0 );
        
        this.pole(-9,9,1) // paal variable x,y,id change value in  mousePosition() function forloop to total poles +1
        this.pole(-9,3,2) // paal variable x,y,id
        this.pole(-9,-3,3) // paal variable x,y,id
        this.pole(-9,-9,4) // paal variable x,y,id
        this.pole(-3,9,5) // paal variable x,y,id change value in  mousePosition() function forloop to total poles +1
        this.pole(-3,3,6) // paal variable x,y,id
        this.pole(-3,-3,7) // paal variable x,y,id
        this.pole(-3,-9,8) // paal variable x,y,id
        this.pole(3,9,9) // paal variable x,y,id change value in  mousePosition() function forloop to total poles +1
        this.pole(3,3,10) // paal variable x,y,id
        this.pole(3,-3,11) // paal variable x,y,id
        this.pole(3,-9,12) // paal variable x,y,id
        this.pole(9,9,13) // paal variable x,y,id change value in  mousePosition() function forloop to total poles +1
        this.pole(9,3,14) // paal variable x,y,id
        this.pole(9,-3,15) // paal variable x,y,id
        this.pole(9,-9,16) // paal variable x,y,id
      
       // console.log("this je id: "+this.$props.raumid)

         // grote bal
       // var mouseGeometry = new this.$three.CircleGeometry( 0.4, 60 );
            // Remove center vertex
            //mouseGeometry.vertices.shift();
         // kleine bal
        var mouseSmallGeometry = new this.$three.CircleGeometry( 0.1, 100 );

       
           // grond
          var groundMaterial = new  this.$three.MeshBasicMaterial( {color: '#0d0d0d'} );
          this.groundMesh = new this.$three.Mesh( ground, groundMaterial );
          this.groundMesh.position.set(0, 0, -1)
          //this.groundMesh.rotation.x += -0.2
          //this.groundMesh.rotation.y += 3.1   
          
          ////////////////////extra code voor grote bal////////////////////////////////////////
        var points = [];
         var radius =0.35

      for(let i = 0; i <= 360; i++){
        points.push(Math.sin(i*(Math.PI/180))*radius, Math.cos(i*(Math.PI/180))*radius, 0);
    }
     
				// Line2 ( LineGeometry, LineMaterial )
        var mouseGeometry = new LineGeometry();
        mouseGeometry.setPositions( points );
			
				var mouseMaterial = new LineMaterial( { color: '#80ffdd', linewidth: 0.003 } )

        this.mouseMesh = new Line2( mouseGeometry, mouseMaterial );



          // mouse big
          //var mouseMaterial = new  this.$three.LineBasicMaterial( { color: '#FFFFFF', linewidth: 2.0} );
          //this.mouseMesh = new  this.$three.LineLoop( mouseGeometry, mouseMaterial );
          
          this.mouseMesh.position.x = 8
          this.mouseMesh.position.z = 0.01  

          ////////////////////extra code////////////////////////////////////////
          // mouse small
          var mouseSmallMaterial = new  this.$three.MeshBasicMaterial( { color: '#FFFFFF' } );
          this.mouseSmallMesh = new  this.$three.Mesh( mouseSmallGeometry, mouseSmallMaterial );
          this.mouseSmallMesh.position.x = 8  
          this.mouseSmallMesh.position.z = 0.02
          this.scene.add(this.mouseSmallMesh, this.mouseMesh) 
         

          this.scene.add(this.groundMesh, ); //   this.meshPoleDetection this.mesh1,this.mesh2

      window.addEventListener( 'resize', this.onWindowResize(), false );
    },
   onWindowResize: function() {
        //console.log("resize: " + container.clientWidth)
			//	this.scamera.aspect = window.innerWidth / window.innerHeight;
			//	this.camera.updateProjectionMatrix();

				//this.renderer.setSize( window.innerWidth, window.innerHeight );

			},
    

    mousePosition:function(){ // mouse position and  collision detection
     
       let container = document.getElementById('container');
        // three.js mouseposition small ball
        if(this.$props.smallBallPosition !=null){

           //(((this.$props.smallBallPosition.x/container.clientWidth)* 2 -1), (this.$props.smallBallPosition.y/container.clientHeight) *2-1, 0.3)
      var vectorSmall = new this.$three.Vector3(((this.$props.smallBallPosition.x/container.clientWidth)* 2 -1), (this.$props.smallBallPosition.y/container.clientHeight) *2-1 ,0.0);
                vectorSmall.unproject( this.camera );
                var dirSmall = vectorSmall.sub( this.camera.position ).normalize();
                var distanceSmall = - this.camera.position.z / dirSmall.z;
                this.posSmall = this.camera.position.clone().add( dirSmall.multiplyScalar( distanceSmall ) );

            
                if(this.mobile ==true){
                  this.ypostion = 16
                }

            
          //  console.log(intersects )
          this.mouseSmallMesh.position.x =this.posSmall.x -0.0000*container.clientWidth
          this.mouseSmallMesh.position.y =(this.posSmall.y)*-1 +this.ypostion
                  // TweenMax.to(this.mouseSmallMesh.position, .01, {
                  //     x:  this.posSmall.x -3,
                  //     y:  (this.posSmall.y)*-1 
                  //   }) 
           }
    
        //console.log(  mouseCollision.isIntersectionBox(mesh1Collision))
        //console.log(this.$props.bigBallPosition.x)
        if(this.$props.bigBallPosition !=null){ // als bigball niet 0 is
         if(this.collisionPole ==false){


           
            
              // standaard code om 2de muis positie om te zetten naar een 3D object in three.js
               var vector = new this.$three.Vector3(((this.$props.bigBallPosition.x/container.clientWidth)* 2 -1), (this.$props.bigBallPosition.y/container.clientHeight) *2-1, 0.0)
                vector.unproject( this.camera );
                  var dir = vector.sub( this.camera.position ).normalize();
                  var distance = - this.camera.position.z / dir.z;
                  this.posBig = this.camera.position.clone().add( dir.multiplyScalar( distance ) );
                 // console.log(pos.x)
                  // geeft de grote ball in three.js vertraging
                  TweenMax.to(this.mouseMesh.position, 3
                  ,{
                      x: this.posBig.x -0.0000*container.clientWidth,
                      y: (this.posBig.y - this.ypostion)*-1     
                      })
                  //this.mouseMesh.position.copy(pos);
            }
          }
      
          /// collision detection
          
          for(var p = 1; p<17; p++){// loops till all poles
        
          //collision detection ball with vlak1
           var mesh1Collision = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               mesh1Collision.setFromObject(this.mesh1Detection[p]);
           //collision detection ball with vlak2
           var mesh2Collision = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               mesh2Collision.setFromObject(this.mesh2Detection[p]);
           //collision detection ball with vlak3
           var mesh3Collision = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               mesh3Collision.setFromObject(this.mesh3Detection[p]);
           //collision detection ball with vlak4
           var mesh4Collision = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               mesh4Collision.setFromObject(this.mesh4Detection[p]);
            //collision with pole
              var poleDetection =[]
               poleDetection[p] = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               poleDetection[p].setFromObject(this.meshPoleDetection[p] );
       
            //array with all detection meshes
          
        this.detectionArray=[ mesh1Collision,mesh2Collision,mesh3Collision,mesh4Collision]
           
          // collision detectuon bigball
           var mouseCollision = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               mouseCollision.setFromObject(this.mouseMesh)

           var mouseSmallCollision = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               mouseSmallCollision.setFromObject(this.mouseSmallMesh)
              //console.log(  testmesh)
          
              for(var i = 1; i<5; i++){ // loops through every side 
                   // console.log( 'mesh'+i+'Collision')
               
               if(mouseCollision.intersectsBox( this.detectionArray[i-1])  && this.sendSide[i] == false && this.sendPole[i] == false && this.OSCconnectionStatus == true ){ // this.sendPole zorgt dat de waarde 1 en 0 eenmaal wordt gestuurd &&  this.OSCconnectionStatus == true && this.sendPole[i] == false 
                //console.log(mouseCollision.intersectsBox( this.detectionArray[i-1]))
                
                console.log("side"+i+" pole"+p+" active")
                    port.send({
                       address: "/pole"+p+"_"+i,
                        args:  [1,this.$props.raumid]
                      });  
                      this.sendSide[i] =true
                      this.sendPole[p] =true
               
                              
               }else
               
               if((mouseCollision.intersectsBox( this.detectionArray[i-1]) == false) &&   this.sendSide[i] ==true &&  this.sendPole[p] ==true && this.OSCconnectionStatus == true ) {
                 //console.log(i+"wordt niet aangeraakt")
               console.log("side"+i+" pole"+p+" dissable")
                     port.send({
                         address: "/pole"+p+"_"+i,
                        args:  [0,this.$props.raumid]
                     });
                this.sendSide[i] =false
                this.sendPole[p] =false
                
               }

              }
                 
               //console.log("paal Y positie boven: "+poleDetection.max.y +"  Grote bal Y positie onder: " +(this.mouseMesh.position.y)-(this.mouseMesh.geometry.boundingBox.max.y))
             // console.log(this.mouseSmallMesh.position.x+ "  "+poleDetection.max.x )
              // detect if mouse touches pole
              if(mouseCollision.intersectsBox( poleDetection[p])){
                
                 //stop bigball
                  this.collisionPole = true
  
                  if(this.collisionPole== true){
                         var halfx = (poleDetection[p].max.x+poleDetection[p].min.x)/2 // postie helft op de x as 
                         var distanceYas = this.mouseSmallMesh.position.y-poleDetection[p].max.y // afstand tot de kleine ball op de y as

                         var halfy = (poleDetection[p].max.y+poleDetection[p].min.y)/2 // postie helft op de y as 
                         var distanceXas = this.mouseSmallMesh.position.x-poleDetection[p].max.x // afstand tot de kleine ball op de x as
                         //console.log(distanceXas)

                         
             

                    //hit top
                    if((mouseCollision.min.y-poleDetection[p].max.y>-1) && this.hitBottom == false && this.hitLeft == false && this.hitRight ==false){
                     // console.log("hit top"+ this.mouseMesh.position.y)
                       this.hitTop= true;
                          
                     }
                    // hit right
                    if((mouseCollision.min.x-poleDetection[p].max.x>-1) &&(mouseCollision.min.y>poleDetection[p].min.y) && this.hitLeft == false && this.hitTop == false && this.hitBottom ==false ){
                     // console.log("hit Right")
                       this.hitRight= true;
                     }
                    // hit bottom
                      if((mouseCollision.max.y-poleDetection[p].min.y<1)&&(mouseCollision.max.y>poleDetection[p].min.y)&& this.hitTop == false && this.hitRight == false && this.hitLeft ==false){ //this.mouseSmallMesh.position.y>this.mouseMesh.position.y
                       //console.log("hit bottom" + poleDetection[p].min.y)
                       this.hitBottom= true;
                     }
                    //hit left
                      if((mouseCollision.max.x-poleDetection[p].min.x<1)&& this.hitRight == false && this.hitTop == false && this.hitBottom ==false ){ //this.mouseSmallMesh.position.y>this.mouseMesh.position.y
                       //console.log("hit Left")
                       this.hitLeft= true;
                     }

                      // als de bodem of bovenkant is geraakt
                          if(this.hitBottom == true || this.hitTop== true){ 
                           
                           //console.log(1/(-distanceYas>0 ? -distanceYas : distanceYas))
                            this.speed = 0.5/(-distanceYas>0 ? -distanceYas : distanceYas) // maakt de snelheid op de X as altijd een positief getal
                        
                            if(this.mouseSmallMesh.position.x>halfx){
                                //big ball is going to the right
                                //console.log("move to right")
                                TweenMax.to(this.mouseMesh.position,   this.speed
                                  ,{x: this.mouseMesh.position.x += 0.02, }) 
                            }else{
                                //big ball is going to the left
                                 //console.log("move to left")
                                  TweenMax.to(this.mouseMesh.position, this.speed
                                  ,{ x: this.mouseMesh.position.x -= 0.02,}) 
                            }
                               // hold Y possition // hover
                                TweenMax.to(this.mouseMesh.position, 10
                                ,{y: this.mouseMesh.position.y })
                             /// afrol naar rechts
                             if(this.mouseMesh.position.x>poleDetection[p].max.x) {
                               //console.log("draaien rechts")
                               this.hitTop= false; this.hitBottom =false
                               this.collisionPole = false 
                             
                             }
                             /// afrol naar links
                             if(this.mouseMesh.position.x<poleDetection[p].min.x) {
                               //console.log("draaien")
                                this.hitTop= false; this.hitBottom =false
                                 this.collisionPole = false 
                                
                             }
                          }

                          // als de rechter of linker kant is geraakt
                          if(this.hitLeft == true || this.hitRight== true){ 
                            this.speed = 0.5/(-distanceXas>0 ? -distanceXas : distanceXas) // maakt de snelheid op de X as altijd een positief getal
                            if(this.mouseSmallMesh.position.y>halfy){
                                //big ball is going to the top
                                //console.log("rol to top")
                                TweenMax.to(this.mouseMesh.position,   this.speed
                                  ,{y: this.mouseMesh.position.y += 0.02, }) 
                            }else{
                                //big ball is going to the bottom
                                  TweenMax.to(this.mouseMesh.position, this.speed
                                  ,{ y: this.mouseMesh.position.y -= 0.02,}) 
                            }
                               // hold x possition // hover
                                TweenMax.to(this.mouseMesh.position, 10
                                ,{x: this.mouseMesh.position.x }) 

                                  /// afrol naar boven
                             if(this.mouseMesh.position.y>poleDetection[p].max.y) {
                               //console.log("R> bovendraaien")   
                               this.hitLeft= false; this.hitRight =false
                               this.collisionPole = false 
                          
                             }
                             /// afrol naar onder
                             if(this.mouseMesh.position.y<poleDetection[p].min.y) {
                             //console.log("L > Onder draaien")
                                this.hitLeft= false; this.hitRight =false
                                this.collisionPole = false 
                                
                             }
                          }


                  // code voor los komen bal van paal
                  // bij hit boven komt hij los met de volgende if statment
                  if(this.mouseSmallMesh.position.y>poleDetection[p].max.y && this.hitTop ==true && this.hitBottom ==false){ //
                     //console.log("komlos boven!")
                      //this.mouseMesh.position.y += 0.02
                      this.hitTop= false;this.hitRight= false;this.hitBottom=  false;this.hitLeft= false
                      this.collisionPole = false 
                  } 
                   // bij hit rechts komt hij los met de volgende if statment
                  if(this.mouseSmallMesh.position.x>poleDetection[p].max.x && this.hitRight==true && this.hitLeft==false){ //
                      //console.log("komlos rechts!")
                      this.hitTop= false;this.hitRight= false;this.hitBottom=  false;this.hitLeft= false
                      this.collisionPole = false 
                  } 
                   // bij hit onder komt hij los met de volgende if statment
                   if(this.mouseSmallMesh.position.y<poleDetection[p].min.y&& this.hitBottom== true && this.hitTop ==false){
                   // console.log("komlos onder!")
                      this.hitTop= false;this.hitRight= false;this.hitBottom=  false;this.hitLeft= false
                      this.collisionPole= false 
                   }
                     // bij hit links  komt hij los met de volgende if statment
                      if(this.mouseSmallMesh.position.x<poleDetection[p].min.x&& this.hitLeft== true && this.hitRight ==false){
                    // console.log("komlos links!")
                          this.hitTop= false;this.hitRight= false;this.hitBottom=  false;this.hitLeft= false
                          this.collisionPole = false 
                      }
                     }                               
                    
                  }
          }
      
    },
    animate: function() {
        requestAnimationFrame(this.animate);
      
       //this.mesh.rotation.x += 0.01;    
      //this.mesh.rotation.y += 0.02;
      this.mousePosition()
      
        this.renderer.render(this.scene, this.camera);
    },

    pole: function(x,y,id){
      this.totalPole=[id]
     // console.log("aantal palen: "+ this.totalPole )
         // variable to make 1 pole
        this.widthPole =5.9
        this.x = x
        this.y = y
        //this.id = id

       
       
         var Color1Geometry = new this.$three.Geometry();  // color vlakken 
         var Color2Geometry = new this.$three.Geometry();
         var Color3Geometry = new this.$three.Geometry();
         var Color4Geometry = new this.$three.Geometry();
         var PilaarGeometry = new this.$three.Geometry(); // wit kruis


          //detection
         var detection1 = new this.$three.PlaneGeometry( this.widthPole/4.2, this.widthPole/4.2, 1); // dit is detectie met een specifiek vlak bv vlak1
         var poleDetection = new this.$three.PlaneGeometry(this.widthPole/2.4, this.widthPole/2.4, 1);  // afrol van bal en detectie tussen bal en algemene paal

           var cornerRightTop = [this.x+(this.widthPole/2),this.y+(this.widthPole/2)]
         var cornerRightBottom = [this.x+(this.widthPole/2),this.y-(this.widthPole/2)]
         var cornerLeftBottom = [this.x-(this.widthPole/2),this.y-(this.widthPole/2)]
         var cornerLeftTop = [this.x-( this.widthPole/2),this.y+(this.widthPole/2)]
         
         //console.log(cornerRightTop[0]/2 )
         //vlak bovenkant kleur
        Color1Geometry.vertices.push(new this.$three.Vector3(this.x, this.y,  0.0));  // x,y,z  0  // 0 is de hoogte
        Color1Geometry.vertices.push(new this.$three.Vector3(cornerRightTop[0], cornerRightTop[1],  0.0));  // x,y,z  1
        Color1Geometry.vertices.push(new this.$three.Vector3(cornerLeftTop[0], cornerLeftTop[1],  0.0));  // x,y,z  2

        // rechterkant
        Color2Geometry.vertices.push(new this.$three.Vector3(this.x, this.y,  0.0));  // x,y,z  0  // 0 is de hoogte
        Color2Geometry.vertices.push(new this.$three.Vector3(cornerRightTop[0], cornerRightTop[1],  0.0));  // x,y,z  3
        Color2Geometry.vertices.push(new this.$three.Vector3(cornerRightBottom [0], cornerRightBottom [1],  0.0));  // x,y,z  4

        // onderkant 
        Color3Geometry.vertices.push(new this.$three.Vector3(this.x, this.y,  0.0));  // x,y,z  0  // 0 is de hoogte
        Color3Geometry.vertices.push(new this.$three.Vector3(cornerLeftBottom[0], cornerLeftBottom[1],  0.0));  // x,y,z  3
        Color3Geometry.vertices.push(new this.$three.Vector3(cornerRightBottom [0], cornerRightBottom [1],  0.0));  // x,y,z  4

        // linkerkant
        Color4Geometry.vertices.push(new this.$three.Vector3(this.x, this.y,  0.0));  // x,y,z  0  // 0 is de hoogte
        Color4Geometry.vertices.push(new this.$three.Vector3(cornerLeftBottom[0], cornerLeftBottom[1],  0.0));  // x,y,z  3
        Color4Geometry.vertices.push(new this.$three.Vector3(cornerLeftTop[0], cornerLeftTop[1],  0.0));  // x,y,z  4
        
             //vlak bovenkant paal outline
        PilaarGeometry.vertices.push(new this.$three.Vector3(this.x, this.y,  0.001));  // x,y,z  0  // 0 is de hoogte
        PilaarGeometry.vertices.push(new this.$three.Vector3(this.x+(this.widthPole/6), this.y+(this.widthPole/6),   0.001));  // x,y,z  1 topright
        PilaarGeometry.vertices.push(new this.$three.Vector3(this.x-(this.widthPole/6), this.y+(this.widthPole/6),   0.001));  // x,y,z  2 lefttop
        PilaarGeometry.vertices.push(new this.$three.Vector3(this.x+(this.widthPole/6), this.y-(this.widthPole/6),   0.001));  // x,y,z  3 right bottoom
        PilaarGeometry.vertices.push(new this.$three.Vector3(this.x-(this.widthPole/6), this.y-(this.widthPole/6),  0.001));  // x,y,z  4 leftbottom


        Color1Geometry.faces.push(
        // top
        new this.$three.Face3(0, 1, 2), // vlak 1
              )
        Color2Geometry.faces.push(
          // rechterkant
          new this.$three.Face3(0, 2, 1), // vlak 1
              )
        Color3Geometry.faces.push(
            // onderkant
            new this.$three.Face3(0, 1, 2), // vlak 1
              )
        Color4Geometry.faces.push(
            // onderkant
            new this.$three.Face3(0, 2, 1), // vlak 1
              )

               
              // top outline
            PilaarGeometry.faces.push(
              // top
              new this.$three.Face3(0, 1, 2), // vlak 1
              new this.$three.Face3(0, 3, 1), // vlak 2
              new this.$three.Face3(0, 4, 3), // vlak 3
              new this.$three.Face3(0, 2, 4), //vlak 4

              )
          

             Color1Geometry.colorsNeedUpdate = true;
             Color1Geometry.computeFaceNormals();
             Color1Geometry.computeVertexNormals();

             Color2Geometry.colorsNeedUpdate = true;
             Color2Geometry.computeFaceNormals();
             Color2Geometry.computeVertexNormals();

             Color3Geometry.colorsNeedUpdate = true;
             Color3Geometry.computeFaceNormals();
             Color3Geometry.computeVertexNormals()

             Color4Geometry.colorsNeedUpdate = true;
             Color4Geometry.computeFaceNormals();
             Color4Geometry.computeVertexNormals()

            // pilaar kleur 
          //var material = new this.$three.MeshBasicMaterial({ vertexColors: this.$three.VertexColors, side: this.$three.DoubleSide});  //vertexColors: this.$three.FaceColors, side: this.$three.DoubleSide 


          // calculation height and width triangle for dynamic blur in procent % 0 to 1
        // console.log()

          this.width = this.widthPole/2
        //console.log(this.width)
          var vlak1Position = (this.width)/1*this.colorVlak1[2]
          var vlak2Position = (this.width)/1*this.colorVlak2[2]
          var vlak3Position = (this.width)/1*this.colorVlak3[2]
          var vlak4Position = (this.width)/1*this.colorVlak4[2]
            
          //Color1Geometry.vertices[0].y
          /// test vertexshader en fragmentshader
      var custom1Material = new this.$three.ShaderMaterial({
                 uniforms: {
                   vlak1color1: { value: new this.$three.Color(this.colorVlak1[0])},
                   vlak1color2: { value: new this.$three.Color(this.colorVlak1[1])},
                   positionVlak1: {value: vlak1Position.toFixed(2)},  //positie afgerond op 2 decimalen
                   YhalfTop:{value: (this.widthPole/4)+this.y}, // example 8/4+y is 2 bij Y = 0 
                   Yas: {value:  this.y}          
                },
                 vertexShader: `
                
                  varying vec3 vUv; 

                   void main() {
                     vUv = position; 

                  
                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                   }
                 `,
                fragmentShader: `
                   uniform vec3 vlak1color1;
                   uniform vec3 vlak1color2;
                   uniform float positionVlak1;
                   uniform float YhalfTop;
                   uniform float Yas;

                
                   varying vec3 vUv;
                  
                   void main() {     
                    
                       float alpha = smoothstep(YhalfTop, Yas, vUv.y-(YhalfTop-Yas)); // example 2.0 , 0.0, vUv.y-2.0

                        // y < 1 = color1, > 2 = color2   // positie tussen boven en onderkant kleur mix
                        float colorMix = smoothstep(Yas-1.0, YhalfTop+1.0, vUv.y-positionVlak1); // Yas, de helft van het bovenstevlak1, positionVlak1 -1 en 1+ om de gradient meer smooth te maken

                        gl_FragColor = vec4(mix(vlak1color1, vlak1color2, colorMix), 1.0); // of alpha voor de blur aan de uiteindes 
                   }
                   `,transparent: true,
               });
               /// vertexshader en fragmentshader rechterkant
         var custom2Material = new this.$three.ShaderMaterial({
                 uniforms: {
                   vlak2color1: { value: new this.$three.Color(this.colorVlak2[0])},
                   vlak2color2: { value: new this.$three.Color(this.colorVlak2[1])},
                   positionVlak2: {value: vlak2Position.toFixed(2)},
                   XhalfRight:{value: (this.widthPole/4)+this.x}, // example 8/4+x is 2 bij x = 0 
                   Xas: {value:  this.x} 
                 },
                 vertexShader: `
                
                   varying vec3 vUv; 

                   void main() {
                     vUv = position; 
                 
                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                   }
                 `,
                 fragmentShader: `
                    
                  uniform vec3 vlak2color1;
                   uniform vec3 vlak2color2;
                   uniform float positionVlak2;
                   uniform float XhalfRight;
                   uniform float Xas;
               
                   varying vec3 vUv;
                  
                   void main() {     
                      float alpha = smoothstep(XhalfRight, Xas, vUv.x-(XhalfRight-Xas)); // eample 2.0, 0.0, vUv.x-2.0);

                        // y < 1 = color1, > 2 = color2
                        float colorMix = smoothstep(Xas-1.0, XhalfRight+1.0, vUv.x-positionVlak2); // example 0.0, 2.0

                        gl_FragColor = vec4(mix(vlak2color1, vlak2color2, colorMix), 0.95); // of alpha voor de blur aan de uiteindes 
                   }
                   `,transparent: true,
              });
                /// vertexshader en fragmentshaderonderkant
               var custom3Material = new this.$three.ShaderMaterial({
                 uniforms: {
                   vlak3color1: { value: new this.$three.Color(this.colorVlak3[0])},
                   vlak3color2: { value: new this.$three.Color(this.colorVlak3[1])},
                   positionVlak3: {value: vlak3Position.toFixed(2)},
                   YhalfBottom:{value: (this.widthPole/4)+this.y}, // example 8/4+y is 2 bij Y = 0 
                   Yas: {value:  this.y},
                   width: {value:    this.widthPole/2} 
                 },
                 vertexShader: `
                
                   varying vec3 vUv; 

                   void main() {
                     vUv = position; 
                  
                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                   }
                 `,
                 fragmentShader: `
                    
                  uniform vec3 vlak3color1;
                   uniform vec3 vlak3color2;
                   uniform float positionVlak3;
                   uniform float YhalfBottom;
                   uniform float Yas;
                   uniform float width;
              
                   varying vec3 vUv;
                  
                   void main() {     
                    
                      float alpha = smoothstep(Yas, YhalfBottom, vUv.y+(width)); // example 0.0 , 2.0, vUv.y+4.0

                        // y < 1 = color1, > 2 = color2
                        float colorMix = smoothstep(Yas-1.0, YhalfBottom+1.0, vUv.y+(width/2.0)+positionVlak3); //2.0 voor de afwijking example 0.0, 2.0, vUv.y+2.0+positionVlak3

                        gl_FragColor = vec4(mix(vlak3color2, vlak3color1, colorMix), 0.95); // of alpha voor de blur aan de uiteindes 
                   }
                   `,transparent: true,
              });
               /// vertexshader en fragmentshaderonderkant
               var custom4Material = new this.$three.ShaderMaterial({
                 uniforms: {
                   vlak4color1: { value: new this.$three.Color(this.colorVlak4[0])},
                   vlak4color2: { value: new this.$three.Color(this.colorVlak4[1])},
                   positionVlak4: {value: vlak4Position.toFixed(2)},
                   XhalfLeft:{value: (this.widthPole/4)+this.x}, // example 8/4+y is 2 bij Y = 0 
                   Xas: {value:  this.x},
                   width: {value: this.widthPole/2} 
                 },
                 vertexShader: `
                
                   varying vec3 vUv; 

                   void main() {
                     vUv = position; 
                  
                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                   }
                 `,
                 fragmentShader: `
                    
                   uniform vec3 vlak4color1;
                   uniform vec3 vlak4color2;
                   uniform float positionVlak4;
                   uniform float XhalfLeft;
                   uniform float Xas;
                   uniform float width;
              
                   varying vec3 vUv;
                  
                   void main() {     
                    
                       float alpha = smoothstep(Xas, XhalfLeft, vUv.x+width); // example 0.0, 2.0, vUv.x+4.0

                        // y < 1 = color1, > 2 = color2
                        float colorMix = smoothstep(Xas-1.0, XhalfLeft+1.0, vUv.x+(width/2.0)+positionVlak4); // +2.0 voor de afwijking en + de postie

                        gl_FragColor = vec4(mix(vlak4color2, vlak4color1, colorMix), 0.95); // of alpha voor de blur aan de uiteindes 
                   }
                   `,transparent: true,
              });        

         /// einde test vertexshader en fragmentshade

         //detection material/field
        var materialDetection = new this.$three.MeshLambertMaterial( {color: 0xffff00, transparent: true, opacity: 0.7  } ); 
        
        this.mesh1[id] = new this.$three.Mesh( Color1Geometry,  custom1Material );
        this.mesh2[id] = new this.$three.Mesh( Color2Geometry,  custom2Material );
        this.mesh3[id] = new this.$three.Mesh( Color3Geometry,  custom3Material );
        this.mesh4[id] = new this.$three.Mesh( Color4Geometry,  custom4Material );

      
        this.mesh1Detection[id] = new this.$three.Mesh( detection1, materialDetection );
        this.mesh1Detection[id].position.x += this.x
        this.mesh1Detection[id].position.z = 0.01  
        this.mesh1Detection[id].position.y = this.mesh1[id].geometry.vertices[1].y-(this.widthPole/5);

        this.mesh2Detection[id] = new this.$three.Mesh( detection1, materialDetection );
        this.mesh2Detection[id].position.x = this.mesh2[id].geometry.vertices[1].x-(this.widthPole/5);
        this.mesh2Detection[id].position.y += this.y
        this.mesh2Detection[id].position.z = 0.01  
        this.mesh2Detection[id].rotation.z = ( Math.PI / 2 );

        this.mesh3Detection[id] = new this.$three.Mesh( detection1, materialDetection );
        this.mesh3Detection[id].position.y = this.mesh3[id].geometry.vertices[1].y+(this.widthPole/5);
        this.mesh3Detection[id].position.x += this.x
        this.mesh3Detection[id].position.z = 0.01  
        this.mesh3Detection[id].rotation.z = ( Math.PI);

        this.mesh4Detection[id] = new this.$three.Mesh( detection1, materialDetection );
        this.mesh4Detection[id].position.x= this.mesh4[id].geometry.vertices[1].x+(this.widthPole/5);
        this.mesh4Detection[id].position.y += this.y
        this.mesh4Detection[id].position.z = 0.01  
        this.mesh4Detection[id].rotation.z = ( Math.PI/2);

        // paal detectie
        this.meshPoleDetection[id] = new this.$three.Mesh( poleDetection, materialDetection );
        this.meshPoleDetection[id].position.x += this.x
        this.meshPoleDetection[id].position.y += this.y
        this.meshPoleDetection[id].position.z = 0.01  
       
        
 

       // console.log(this.mesh1.Color1Geometry.computeBoundingBox())

          //this.mesh.rotation.x += -0.8
          //this.mesh.rotation.y += 3.1

           // pilaar outline
          var materialPilaar = new this.$three.MeshBasicMaterial({ color: '#FFFFFF',    wireframe: true, });  //vertexColors: this.$three.FaceColors, side: this.$three.DoubleSide
          this.meshPilaar = new this.$three.Mesh( PilaarGeometry, materialPilaar  );
        

         this.scene.add(this.mesh1[id],this.mesh2[id], this.mesh3[id], this.mesh4[id],this.meshPilaar,)
      

    }
    }
}
</script>

<style lang="scss" scoped>

#container {
     margin: auto;
     
  height: 100%;
  width: 100%;
  
  cursor: none;

} 

canvas{
  margin: auto;
  height: 70%;
  width: 100%;
  cursor: none;
}

@media screen and (max-width: 700px) {

#container {
     margin: auto;
     
  height: 100%;
  width: 100%;
  
  cursor: none;

} 
}

</style>