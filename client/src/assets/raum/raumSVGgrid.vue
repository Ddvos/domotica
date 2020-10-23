<template>   
<div id="app" class="container">


<svg xmlns="http://www.w3.org/2000/svg" id="grid" x="0" y="0" version="1.1" viewBox="0 0 684.3 271.5" xml:space="preserve">
  <g id="paal1totaal">
    <g id="paal1">
      <path d="M175 80.6v98H77v-98h98m1-1H76v100h100v-100z" class="st0"/>
      <path id="p1vlak3_1_" d="M125.8 131l47.7 47.6H78.1l47.7-47.6m0-1.4l-50.2 50H176l-50.1-50z" class="st0"/>
      <path id="p1vlak1_1_" d="M173.5 81l-47.7 47.5L78 80.9h95.4m2.4-1H75.6l50.2 50 50.1-50z" class="st0"/>
      <path id="p1vlak2_2_" d="M174.7 81.9v95.4L127 129.6 174.7 82m1-2.4l-50 50.1 50 50.2V79.5z" class="st0"/>
      <path id="p1vlak4_1_" d="M77 82.2l47.5 47.7L77 177.6V82.2m-1-2.5V180l50-50.1-50-50.2z" class="st0"/>
    </g>
    <path id="p1gradient1_2_" d="M216.6 37.8l-90.7 90.4-90.6-90.4h181.3m2.4-1H32.9l93 92.8L219 36.8z" class="st0"/>
    <path id="p1gradient2_2_" d="M217.4 39v181.3l-90.3-90.7L217.4 39m1-2.4l-92.8 93 92.8 93v-186z" class="st0"/>
    <path id="p1gradient3_2_" d="M125.7 131l90.6 90.4H35l90.7-90.4m0-1.4l-93.1 92.8h186.1l-93-92.8z" class="st0"/>
    <path id="p1gradient4_2_" d="M34.2 38.7l90.3 90.6L34.2 220V38.7m-1-2.4v186.1l92.7-93-92.7-93.1z" class="st0"/>
  </g>
  <g id="Paal2totaal">
    <path id="paal2gradient4" d="M285.4 209.6V39.1l84.8 85.3z" class="st1"/>
    <path ref="paal2gradient1" id="paal2gradient1" d="M285.5 39H456l-85.3 84.8z" class="st1"/>
    <path ref="paal2gradient2" id="paal2gradient2" d="M455.5 39.5V210l-84.8-85.2z" class="st1"/>
    <path id="paal2gradient3" d="M456 209.6H285.5l85.2-84.8z" class="st1"/>
    <g id="paal2">
      <path id="paal2vlak3" v-bind:style="{ 'fill': paalDetectieColor3 }" d="M370.4 123.9l49.6 50-98.5.8z" class="st1"/>
      <path id="paal2vlak4" v-bind:style="{ 'fill': paalDetectieColor4 }" d="M321.5 174.8l-1.7-100 50.6 49z" class="st1"/>
      <path id="paal2vlak1" v-bind:style="{ 'fill': paalDetectieColor1 }" d="M320.4 74h100l-50 49.8z" class="st1"/>
      <path id="paal2vlak2" v-bind:style="{ 'fill': paalDetectieColor2 }" d="M420.4 74.4v100l-49.7-50z" class="st1"/>
    </g>
  </g>
</svg>
</div>
 <!-- v-bind:style="{ 'fill': clientcolor }"
 v-hammer:pan="onMouseMoveMobile" v-on:mousemove="onMouseMovePc" -->
</template>
<script>

export default {
     props: {
        bigBallPosition: Array,
        clientcolor: String,  

     },
  data() {
  return{
       paalDetectieColor1: "none",
       paalDetectieColor2: "none",
       paalDetectieColor3: "none",
       paalDetectieColor4: "none",

       mouseinput: null,
       posistionAllelements1: []
  }
  },
  computed: {
  
  },
  created() {
    
    },
    mounted(){
    
    this.fillelements()
    this.ballXYposition()
    },
  methods:{
    ballXYposition: function(){
        //console.log(this.bigBallPosition)
        window.requestAnimationFrame(this.ballXYposition) 
     },
  
  fillelements: function(){
    
     var x1 = 300; // three points of the triangle
     var y1 = 100;
     var x2 = 450;
     var y2 = 300;
     var x3 = 150;
     var y3 = 300;
    

    // calculation center point every triangle
    this.posistionAllelements = this.$refs.paal2gradient2.getBoundingClientRect()  //positie bigball

   x1 = (this.posistionAllelements.x)
   y1 = (this.posistionAllelements.y)
   x2 = (this.posistionAllelements.x)+this.posistionAllelements.width
   y2 = (this.posistionAllelements.y)
   x3 = (this.posistionAllelements.x)+this.posistionAllelements.width/2
   y3 = (this.posistionAllelements.y)+this.posistionAllelements.height
   
   //console.log(this.posistionAllelements)
   //console.log("x1 positie " +x1+ "y1 positie "+y1+'\n'+"x2 positie " +x2+ "y2 positie "+y2+'\n'+"x3 positie " +x3+ "y3 positie "+y3)

   
  },

  /// hover over gradient vlak 1
     
      onMouseMobile: function(e)  {
          this.paalDetectieColor1 = this.clientcolor  

          this.paalDetectieColor2= "none"
           this.paalDetectieColor3= "none"
           this.paalDetectieColor4= "none"  

           this.mouseinput = e
      },   

    }
}
</script>

<style lang="scss" scoped>

#grid{
    width: 30vw;
}
.st0{
  fill:#ed1c24
  }
.st1{
     fill:none;
     stroke:#1d03ff;
     stroke-miterlimit:10
     }

</style>
