<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Scroll',
  components: {},
  data() {
    return {
      scroll:null,
  
    };
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    if(this.probeType===2 ||this.probeType===3){
      this.scroll.on('scroll',(position)=>{
      this.$emit('backToScroll',position)
    })
    }
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp',)
    })
    }
  },
  computed: {},  
  methods: {
    backToTop(x,y,time=500){
      this.scroll.scrollTo(0,0,time)
    },
    finshPull(){
       this.scroll.finishPullUp()
    },
    refresh(){
     this.scroll&& this.scroll.refresh()
      
    },
    getScrollY(){
      return this.scroll?this.scroll.y:0
    }
  },
}
</script>
<style scoped>
 
</style>