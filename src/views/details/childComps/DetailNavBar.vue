<template>
<div>
  <NavBar>
    <div slot="left" class="back">
      <img src="~assets/img/common/back.svg" alt="" @click="backClick">
    </div>
    <div class="title" slot="middle" >
      <span class="title-item" 
      v-for="(item,index) in title" 
      :key="index"
      :class="{active:index===currentIndex}"
      @click="itemClick(index)"
      >{{item}}
      </span>
    </div>
  </NavBar> 
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:'',
  components: {
    NavBar
  },
  data() {
    return {
      title:['商品','参数','评论','推荐'],
      currentIndex:0
    };
  },
  computed: {},
  methods: {
    itemClick(index){
      this.currentIndex=index
      this.$emit('itemClick',index)
    },
    backClick(){
      this.$router.back()
    }
  },
}
</script>
<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex:1
  }
  .active {
    color: var(--color-high-text);
  }
  .back img {
    padding-top: 12px;
  }
</style>