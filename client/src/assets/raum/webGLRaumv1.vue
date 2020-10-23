<template>   
 <div id="container"></div>

</template>
<script>
import osc from "osc";
 import { TweenMax} from 'gsap'
//import * as Three from 'three';

var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" //  ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();

export default {

  props: {
        bigBallPosition: Array,
        smallBallPosition: Array,
     },
   
  data() {
  return{
      camera: null,
      scene: null,
      renderer: null,
      idPole:[1,2,3,4],
      widthPole: null,
      x: null,
      y: null,
      mesh1: null, // vlak bovenkant
      mesh2: null, // vlak rechterkant
      mesh3: null, // vlak onderkant
      mesh4: null, // vlak linkerkant
      testMesh: null, // vlak linkerkant
      groundMesh: null,
      meshPilaar: null, // kruis pilaar
      light: null,
      mouseMesh: null,
      mouseSmallMesh: null,
      bigBall: null,
      smallBall: null,
      //colorvlakken
      colorVlak1: ['rgb(222, 60, 49)','rgb(13, 212, 209)',0.5
      ], // kleuren en positie van vlakken
      colorVlak2: ['rgb(222, 60, 49)','rgb(13, 212, 209)',0.5], // kleuren en positie van vlakken
      colorVlak3: ['rgb(222, 60, 49)','rgb(13, 212, 209)',0.5], // kleuren en positie van vlakken
      colorVlak4: ['rgb(222, 60, 49)','rgb(13, 212, 209)',0.5], // kleuren en positie van vlakken
      // breedite driehoeken
      width: null,
      // detection
      mesh1Detection: null,
      mesh2Detection: null,
      mesh3Detection: null,
      mesh4Detection: null,
      detectionArray: [],
      meshPoleDetection: null,
      collisionPole: false,
      vlak1Position: null,
      posSmall: null, // positie van de kleine muis
      posBig: null,
      hitTop: false, // deze variabele komen op true als de grote bal de betreffende kant raakt
      hitRight: false,
      hitBottom: false,
      hitLeft: false,
      sendPole:[false,false,false,false,false],
       xposistieSpeed: 0.1,
       speed: 0,

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
             //console.log(oscMessage);
        });
     },
      OSCMessages: function(oscMessage){ 
            // put incoming OSC data in colorvlakken
             if(oscMessage.address == "/color_pole1" ){
                 this.colorVlak1 = ['rgb('+oscMessage.args[0]+','+oscMessage.args[1]+','+oscMessage.args[2]+')','rgb('+oscMessage.args[3]+','+oscMessage.args[4]+','+oscMessage.args[5]+')',oscMessage.args[6]]//twee waardes rgb(255, 0, 0) 
                 this.mesh1.material.uniforms.vlak1color1.value = new this.$three.Color(this.colorVlak1[0])
                 this.mesh1.material.uniforms.vlak1color2.value = new this.$three.Color(this.colorVlak1[1])
                 this.mesh1.material.uniforms.positionVlak1.value = (this.width)/1*this.colorVlak1[2]

                 this.colorVlak2 = ['rgb('+oscMessage.args[7]+','+oscMessage.args[8]+','+oscMessage.args[9]+')','rgb('+oscMessage.args[10]+','+oscMessage.args[11]+','+oscMessage.args[12]+')',oscMessage.args[13]]//twee waardes rgb(255, 0, 0) 
                 this.mesh2.material.uniforms.vlak2color1.value = new this.$three.Color(this.colorVlak2[0])
                 this.mesh2.material.uniforms.vlak2color2.value = new this.$three.Color(this.colorVlak2[1])
                 this.mesh2.material.uniforms.positionVlak2.value = (this.width)/1*this.colorVlak2[2]

                 this.colorVlak3 = ['rgb('+oscMessage.args[14]+','+oscMessage.args[15]+','+oscMessage.args[16]+')','rgb('+oscMessage.args[17]+','+oscMessage.args[18]+','+oscMessage.args[19]+')',oscMessage.args[20]]//twee waardes rgb(255, 0, 0) 
                 this.mesh3.material.uniforms.vlak3color1.value = new this.$three.Color(this.colorVlak3[0])
                 this.mesh3.material.uniforms.vlak3color2.value = new this.$three.Color(this.colorVlak3[1])
                 this.mesh3.material.uniforms.positionVlak3.value = (this.width)/1*this.colorVlak3[2]

                 this.colorVlak4 = ['rgb('+oscMessage.args[21]+','+oscMessage.args[22]+','+oscMessage.args[23]+')','rgb('+oscMessage.args[24]+','+oscMessage.args[25]+','+oscMessage.args[26]+')',oscMessage.args[27]]//twee waardes rgb(255, 0, 0) 
                //console.log( oscMessage)
                this.mesh4.material.uniforms.vlak4color1.value = new this.$three.Color(this.colorVlak4[0])
                 this.mesh4.material.uniforms.vlak4color2.value = new this.$three.Color(this.colorVlak4[1])
                 this.mesh4.material.uniforms.positionVlak4.value = (this.width)/1*this.colorVlak4[2]


                 }
            
                 
              
                  
                 
     },
    

    init: function() {
       
        let container = document.getElementById('container');
         // renderer
         this.renderer = new this.$three.WebGLRenderer({antialias: true});
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = this.$three.PCFShadowMap;

        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);

        //camera
        this.camera = new this.$three.PerspectiveCamera(100, container.clientWidth/container.clientHeight, 0.1, 100);
        this.camera.position.z = 10;
       //console.log(container.clientWidth)
        //scene
        this.scene = new this.$three.Scene();

         // variable to make 1 pole
        this.widthPole = 6.0
        this.x =-1.0
        this.y = 0.0
        

         var ground = new this.$three.BoxGeometry( 20,20, 0 );
         var Color1Geometry = new this.$three.Geometry();  // color vlakken 
         var Color2Geometry = new this.$three.Geometry();
         var Color3Geometry = new this.$three.Geometry();
         var Color4Geometry = new this.$three.Geometry();
         var PilaarGeometry = new this.$three.Geometry();


          //detection
         var detection1 = new this.$three.PlaneGeometry( this.widthPole/2.5, this.widthPole/3, 1);
         var poleDetection = new this.$three.PlaneGeometry(this.widthPole/1.6, this.widthPole/1.6, 1);
     
      
       // var normal = triangle1.normal();

         // grote bal
        var mouseGeometry = new this.$three.CircleGeometry( 0.5, 100 );

         // kleine bal
        var mouseSmallGeometry = new this.$three.CircleGeometry( 0.15, 100 );

         var cornerRightTop = [this.x+(this.widthPole/2),this.y+(this.widthPole/2)]
         var cornerRightBottom = [this.x+(this.widthPole/2),this.y-(this.widthPole/2)]
         var cornerLeftBottom = [this.x-(this.widthPole/2),this.y-(this.widthPole/2)]
         var cornerLeftTop = [this.x-( this.widthPole/2),this.y+(this.widthPole/2)]
         
         console.log(cornerRightTop[0]/2 )
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
        PilaarGeometry.vertices.push(new this.$three.Vector3(this.x+(this.widthPole/4), this.y+(this.widthPole/4),   0.001));  // x,y,z  1 topright
        PilaarGeometry.vertices.push(new this.$three.Vector3(this.x-(this.widthPole/4), this.y+(this.widthPole/4),   0.001));  // x,y,z  2 lefttop
        PilaarGeometry.vertices.push(new this.$three.Vector3(this.x+(this.widthPole/4), this.y-(this.widthPole/4),   0.001));  // x,y,z  3 right bottoom
        PilaarGeometry.vertices.push(new this.$three.Vector3(this.x-(this.widthPole/4), this.y-(this.widthPole/4),  0.001));  // x,y,z  4 leftbottom


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
        console.log(this.width)
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
                   positionVlak1: {value: vlak1Position.toFixed(2)},
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
                        float colorMix = smoothstep(Yas, YhalfTop, vUv.y-positionVlak1); // Yas, de helft van het bovenstevlak1, positionVlak1

                        gl_FragColor = vec4(mix(vlak1color1, vlak1color2, colorMix), alpha);
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
                        float colorMix = smoothstep(Xas, XhalfRight, vUv.x-positionVlak2); // example 0.0, 2.0

                        gl_FragColor = vec4(mix(vlak2color1, vlak2color2, colorMix), alpha);
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
                        float colorMix = smoothstep(Yas, YhalfBottom, vUv.y+(width/2.0)+positionVlak3); //2.0 voor de afwijking example 0.0, 2.0, vUv.y+2.0+positionVlak3

                        gl_FragColor = vec4(mix(vlak3color2, vlak3color1, colorMix), alpha);
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
                        float colorMix = smoothstep(Xas, XhalfLeft, vUv.x+(width/2.0)+positionVlak4); // +2.0 voor de afwijking en + de postie

                        gl_FragColor = vec4(mix(vlak4color2, vlak4color1, colorMix), alpha);
                   }
                   `,transparent: true,
              });        

         /// einde test vertexshader en fragmentshade

         //detection material/field
        var materialDetection = new this.$three.MeshLambertMaterial( {color: 0xffff00, transparent: true, opacity: 0.7  } ); 
        
        this.mesh1 = new this.$three.Mesh( Color1Geometry,  custom1Material );
        this.mesh2 = new this.$three.Mesh( Color2Geometry,  custom2Material );
        this.mesh3 = new this.$three.Mesh( Color3Geometry,  custom3Material );
        this.mesh4 = new this.$three.Mesh( Color4Geometry,  custom4Material );

      
        this.mesh1Detection = new this.$three.Mesh( detection1, materialDetection );
        this.mesh1Detection.position.x += this.x
        this.mesh1Detection.position.y = this.mesh1.geometry.vertices[1].y-(this.widthPole/8);

        this.mesh2Detection = new this.$three.Mesh( detection1, materialDetection );
        this.mesh2Detection.position.x = this.mesh2.geometry.vertices[1].x-(this.widthPole/8);
        this.mesh2Detection.position.y += this.y
        this.mesh2Detection.rotation.z = ( Math.PI / 2 );

        this.mesh3Detection = new this.$three.Mesh( detection1, materialDetection );
        this.mesh3Detection.position.y = this.mesh3.geometry.vertices[1].y+(this.widthPole/8);
        this.mesh3Detection.position.x += this.x
        this.mesh3Detection.rotation.z = ( Math.PI);

        this.mesh4Detection = new this.$three.Mesh( detection1, materialDetection );
        this.mesh4Detection.position.x= this.mesh4.geometry.vertices[1].x+(this.widthPole/8);
        this.mesh4Detection.position.y += this.y
        this.mesh4Detection.rotation.z = ( Math.PI/2);

        // paal detectie
        this.meshPoleDetection = new this.$three.Mesh( poleDetection, materialDetection );
        this.meshPoleDetection.position.x += this.x
        this.meshPoleDetection.position.y += this.y
       
        
 

       // console.log(this.mesh1.Color1Geometry.computeBoundingBox())

          //this.mesh.rotation.x += -0.8
          //this.mesh.rotation.y += 3.1

           // pilaar outline
          var materialPilaar = new this.$three.MeshBasicMaterial({ color: '#FFFFFF',    wireframe: true, linewidth: 4 });  //vertexColors: this.$three.FaceColors, side: this.$three.DoubleSide
          this.meshPilaar = new this.$three.Mesh( PilaarGeometry, materialPilaar  );

           // grond
          var groundMaterial = new  this.$three.MeshBasicMaterial( {color: '#484a4a'} );
          this.groundMesh = new this.$three.Mesh( ground, groundMaterial );
          this.groundMesh.position.set(0, 0, -1)
          //this.groundMesh.rotation.x += -0.2
          //this.groundMesh.rotation.y += 3.1        

          // mouse big
          var mouseMaterial = new  this.$three.MeshBasicMaterial( { color: 0xffff00 } );
          this.mouseMesh = new  this.$three.Mesh( mouseGeometry, mouseMaterial );
          this.mouseMesh.position.x = 8  
          // mouse small
          var mouseSmallMaterial = new  this.$three.MeshBasicMaterial( { color: '#222526' } );
          this.mouseSmallMesh = new  this.$three.Mesh( mouseSmallGeometry, mouseSmallMaterial );
          this.mouseSmallMesh.position.x = 8  
          this.mouseSmallMesh.position.z = 0.01
          this.scene.add(this.mouseSmallMesh) 
         

          this.scene.add(this.mesh1,this.mesh2, this.mesh3, this.mesh4,this.groundMesh,this.meshPilaar, this.mouseMesh, ); //   this.meshPoleDetection this.mesh1,this.mesh2

  
    },

    mousePosition:function(){
       let container = document.getElementById('container');
        // three.js mouseposition small ball
        if(this.$props.smallBallPosition !=null){
           var vectorSmall = new this.$three.Vector3(((this.$props.smallBallPosition.x/container.clientWidth)* 2 -1), (this.$props.smallBallPosition.y/container.clientHeight) *2-1, 0.1);
                vectorSmall.unproject( this.camera );
                var dirSmall = vectorSmall.sub( this.camera.position ).normalize();
                var distanceSmall = - this.camera.position.z / dirSmall.z;
                this.posSmall = this.camera.position.clone().add( dirSmall.multiplyScalar( distanceSmall ) );

          this.mouseSmallMesh.position.x =this.posSmall.x -2.8
          this.mouseSmallMesh.position.y =(this.posSmall.y)*-1 +3.7
                  // TweenMax.to(this.mouseSmallMesh.position, .01, {
                  //     x:  this.posSmall.x -3,
                  //     y:  (this.posSmall.y)*-1 
                  //   }) 
           }
           
        //console.log(  mouseCollision.isIntersectionBox(mesh1Collision))
        //console.log(this.$props.bigBallPosition.x)
        if(this.$props.bigBallPosition !=null){ // als bigball niet 0 is
         if(this.collisionPole==false){
            
              // standaard code om 2de muis positie om te zetten naar een 3D object in three.js
               var vector = new this.$three.Vector3(((this.$props.bigBallPosition.x/container.clientWidth)* 2 -1), (this.$props.bigBallPosition.y/container.clientHeight) *2-1, 0.1);
                vector.unproject( this.camera );
                  var dir = vector.sub( this.camera.position ).normalize();
                  var distance = - this.camera.position.z / dir.z;
                  this.posBig = this.camera.position.clone().add( dir.multiplyScalar( distance ) );
                 // console.log(pos.x)
                  // geeft de grote ball in three.js vertraging
                  TweenMax.to(this.mouseMesh.position, 3
                  ,{
                      x: this.posBig.x -2.5,
                      y: (this.posBig.y - 3.5)*-1     
                      })
                  //this.mouseMesh.position.copy(pos);
            }
          }
      
          /// collision detection
          
          
          //collision detection ball with vlak1
           var mesh1Collision = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               mesh1Collision.setFromObject(this.mesh1Detection);
           //collision detection ball with vlak2
           var mesh2Collision = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               mesh2Collision.setFromObject(this.mesh2Detection);
           //collision detection ball with vlak3
           var mesh3Collision = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               mesh3Collision.setFromObject(this.mesh3Detection);
           //collision detection ball with vlak4
           var mesh4Collision = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               mesh4Collision.setFromObject(this.mesh4Detection);
            //collision with pole
           var poleDetection = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               poleDetection.setFromObject(this.meshPoleDetection );
            //array with all detection meshes
          
        this.detectionArray=[ mesh1Collision,mesh2Collision,mesh3Collision,mesh4Collision]
            
          // console.log(  testmesh.intersectsTriangle(testmesh))
           var mouseCollision = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               mouseCollision.setFromObject(this.mouseMesh)

           var mouseSmallCollision = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               mouseSmallCollision.setFromObject(this.mouseSmallMesh)
              //console.log(  testmesh)
          
              for(var i = 1; i<5; i++){ // loops through every side 
                   // console.log( 'mesh'+i+'Collision')
               
               if(mouseCollision.intersectsBox( this.detectionArray[i-1]) && this.sendPole[i] == false){ // this.sendPole zorgt dat de waarde 1 en 0 eenmaal wordt gestuurd
             
                   //console.log("side"+i+" pole1 active")
                   port.send({
                        address: "/pole1_"+i,
                        args:  [1]
                    });  
                      this.sendPole[i] =true              
               }
               if(this.sendPole[i] ==true && mouseCollision.intersectsBox( this.detectionArray[i-1]) == false) {
               // console.log("side"+i+" pole1 dissable")
                    port.send({
                        address: "/pole1_"+i,
                        args:  [0]
                    });
                this.sendPole[i] =false
               }

              }
                 
               //console.log("paal Y positie boven: "+poleDetection.max.y +"  Grote bal Y positie onder: " +(this.mouseMesh.position.y)-(this.mouseMesh.geometry.boundingBox.max.y))
             // console.log(this.mouseSmallMesh.position.x+ "  "+poleDetection.max.x )
              // detect if mouse touches pole
              if(mouseCollision.intersectsBox( poleDetection)){

                 //stop bigball
                  this.collisionPole = true

                  if(this.collisionPole == true){
                         var halfx = (poleDetection.max.x+poleDetection.min.x)/2 // postie helft op de x as 
                         var distanceYas = this.mouseSmallMesh.position.y-poleDetection.max.y // afstand tot de kleine ball op de y as

                         var halfy = (poleDetection.max.y+poleDetection.min.y)/2 // postie helft op de y as 
                         var distanceXas = this.mouseSmallMesh.position.x-poleDetection.max.x // afstand tot de kleine ball op de x as
                         //console.log(distanceXas)

                          // als de bodem of bovenkant is geraakt
                          if(this.hitBottom == true || this.hitTop== true){ 
                            this.speed = 0.0009*(-distanceYas>0 ? -distanceYas : distanceYas)*20 // maakt de snelheid op de X as altijd een positief getal
                            if(this.mouseSmallMesh.position.x>halfx){
                                //big ball is going to the right
                                 //console.log("move to right")
                                TweenMax.to(this.mouseMesh.position,   this.speed
                                  ,{x: this.mouseMesh.position.x += 0.03, }) 
                            }else{
                                //big ball is going to the left
                                  TweenMax.to(this.mouseMesh.position, this.speed
                                  ,{ x: this.mouseMesh.position.x -= 0.03,}) 
                            }
                               // hold Y possition // hover
                                TweenMax.to(this.mouseMesh.position, 30
                                ,{y: this.mouseMesh.position.y })
                             /// afrol naar rechts
                             if(this.mouseMesh.position.x>poleDetection.max.x) {
                              // console.log("draaien")
                               this.hitTop= false; this.hitBottom =false
                               this.hitRight=true
                             }
                             /// afrol naar links
                             if(this.mouseMesh.position.x<poleDetection.min.x) {
                               //console.log("draaien")
                                this.hitTop= false; this.hitBottom =false
                                this.hitLeft=true
                             }
                          }

                          // als de rechter of linker kant is geraakt
                          if(this.hitLeft == true || this.hitRight== true){ 
                            this.speed = 0.0009*(-distanceXas>0 ? -distanceXas : distanceXas)*20 // maakt de snelheid op de X as altijd een positief getal
                            if(this.mouseSmallMesh.position.y>halfy){
                                //big ball is going to the top
                                TweenMax.to(this.mouseMesh.position,   this.speed
                                  ,{y: this.mouseMesh.position.y += 0.03, }) 
                            }else{
                                //big ball is going to the bottom
                                  TweenMax.to(this.mouseMesh.position, this.speed
                                  ,{ y: this.mouseMesh.position.y -= 0.03,}) 
                            }
                               // hold x possition // hover
                                TweenMax.to(this.mouseMesh.position, 10
                                ,{x: this.mouseMesh.position.x }) 

                                  /// afrol naar boven
                             if(this.mouseMesh.position.y>poleDetection.max.y) {
                               //console.log("draaien")
                               this.hitLeft= false; this.hitRight =false
                               this.hitTop=true
                             }
                             /// afrol naar onder
                             if(this.mouseMesh.position.y<poleDetection.min.y) {
                              // console.log("draaien")
                                this.hitLeft= false; this.hitRight =false
                                this.hitBottom=true
                             }
                          }
             

                    //hit top
                    if((this.mouseMesh.position.y-poleDetection.max.y>-1) && this.hitBottom == false){
                      // console.log("hit top")
                       this.hitTop= true;
                          
                     }
                    // hit right
                    if((this.mouseMesh.position.x-poleDetection.max.x>-1) && this.hitLeft == false && this.hitTop == false){
                      // console.log("hit Right")
                       this.hitRight= true;
                     }
                    // hit bottom
                      if((this.mouseMesh.position.y-poleDetection.min.y<1)&& this.hitTop == false){ //this.mouseSmallMesh.position.y>this.mouseMesh.position.y
                      // console.log("hit bottom")
                       this.hitBottom= true;
                     }
                    //hit left
                      if((this.mouseMesh.position.x-poleDetection.min.x<1)&& this.hitRight == false && this.hitTop == false){ //this.mouseSmallMesh.position.y>this.mouseMesh.position.y
                      // console.log("hit Left")
                       this.hitLeft= true;
                     }


                  // code voor los komen bal van paal
                  // bij hit boven komt hij los met de volgende if statment
                  if(this.mouseSmallMesh.position.y>poleDetection.max.y && this.hitTop ==true && this.hitBottom ==false){ //
                     // console.log("komlos boven!")
                      //this.mouseMesh.position.y += 0.02
                      this.collisionPole = false 
                  } 
                   // bij hit rechts komt hij los met de volgende if statment
                  if(this.mouseSmallMesh.position.x>poleDetection.max.x && this.hitRight==true && this.hitLeft==false){ //
                      //console.log("komlos rechts!")
                      this.collisionPole = false 
                  } 
                   // bij hit onder komt hij los met de volgende if statment
                   if(this.mouseSmallMesh.position.y<poleDetection.min.y&& this.hitBottom== true && this.hitTop ==false){
                    //console.log("komlos onder!")
                      this.collisionPole = false 
                   }
                     // bij hit links  komt hij los met de volgende if statment
                      if(this.mouseSmallMesh.position.x<poleDetection.min.x&& this.hitLeft== true && this.hitRight ==false){
                     // console.log("komlos links!")
                          this.collisionPole = false 
                      }
                     }                               
                    
                  }else{
                    this.hitTop= false;
                    this.hitRight= false;
                    this.hitBottom=  false;
                    this.hitLeft= false;
                    this.collisionPole = false 
              }
     
      
    },
    animate: function() {
        requestAnimationFrame(this.animate);
      
       //this.mesh.rotation.x += 0.01;    
      //this.mesh.rotation.y += 0.02;
       this.mousePosition()
      
        this.renderer.render(this.scene, this.camera);
    },

    drawPole: function(){

      //this.pole(x,y,id){}

    }
    }
}
</script>

<style lang="scss" scoped>

#container {
  
  height: 100%;
  width: 100%;

} 

</style>