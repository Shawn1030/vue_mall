<template>
   <swipe class="detail-swiper1" :autoplay="3000" indicator-color="red" >
    <swipe-item v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt="" >
    </swipe-item>
 </swipe>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';
export default {
  name:'DetailSwiper',
  components: {
    Swipe, 
    SwipeItem
  },
  data() {
    return {
      isLoad:false
    };
  },
  mounted(){
   
    // this.detailMounted()
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  computed: {},
  methods: {
   

  },
}
</script>
<style scoped>
  .detail-swiper1 {
    height: 300px;
    overflow: hidden;
      color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    
  }
  .detail-swiper1 img {
    width: 100%;
  }
  
</style>