<template>
<div class="recommend">
  <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
   <a :href="item.link">
      <img :src="item.image" :alt="item.title">
      <div>{{item.title}}</div>
   </a>
  </div>
</div>
</template>

<script>

export default {
  name:'RecommendView',
  components: {},
  data() {
    return {

    };
  },
  props:{
    recommends:{
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
  .recommend {
    display: flex;
    text-align: center;
    padding: 10px 0 20px;
    font-size: 12px;
    border-bottom: 8px solid #eee;
    box-shadow: 1px -1px 0px rgba(100, 100, 100,.1);
  }
  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 68px;
    height: 68px;
    margin-bottom: 10px;
  }
</style>