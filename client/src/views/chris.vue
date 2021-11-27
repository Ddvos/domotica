<template>
<div class="background" ref="mouseEvent">
  <h1>Hallo Chris</h1>
    <p> Hierbij ontvang je een Binance gift card ter waarde van 0.0019 BNB!</p>
    <!-- <MultiTouch  class="multitouch"/>       -->
    <p>Gift card code:</p>
    <p class="code">AF2KE2YGQYAURC3U</p>
    <div class="explenation">
        <ol>
        <li>Open de Binance App</li>
        <li>Klik op het profielpictogram in de linkerbovenhoek</li>
        <li>Klik op Gift Card</li>
        <li>Klik “Receive</li>
        <li>Klik “redeem” > Enter gift card code</li>
        <li>Geniet van je BNB :)</li>
      </ol>
    </div>
   <p class="signment">Sint en Piet</p>

    <img :src="img"   alt="">

</div>
  
</template>


            
<script>



export default {
  

  data() {
  return{
    img: "https://bin.bnbstatic.com/image/giftcard/02_53_26.jpg",
  
     
    
  }},
    components: {
    //  'MultiTouch': MultiTouch,
     
  
  },
   created: function(){
           

     },
  computed: {
   

   
  },
  methods:{ 
  }
  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');

.background{
  width: 100vw;
  height: 100vh;
  background: #1e3a42;
  overflow-x: hidden;
  color: white;
  
}

.row,.col-9,.col-3{
     margin: 0;
    padding:0;
  }
  .code{
    margin:auto;
    padding-bottom: 5px;
    padding-top: 5px;
    text-align: center;
    width: 75%;
    background-color: red;
  }
.explenation{
   text-align: left;
    margin: auto;
  width: 100%;
  padding: 10px;

}
.signment{
  font-family: 'Dancing Script', cursive;
  font-size: 250%;
}
ul {
    list-style-type: none;
    text-align: left;
    padding-top: 10px;
    padding-left: 5px;
}
.information{
    width: 20vw;
  height: 100vh;
   z-index: 1;
   overflow: hidden;
   float:left;
}








</style>