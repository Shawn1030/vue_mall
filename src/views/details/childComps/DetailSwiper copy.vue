<template>
   <swiper class="detail-swiper1">
    <swiper-item v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt="" >
    </swiper-item>
 </swiper>
</template>

<script>

import {Swiper,SwiperItem} from 'components/common/swiper/index'
export default {
  name:'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
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
  }
</style>