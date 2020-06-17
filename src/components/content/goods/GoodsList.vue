<template>
<div class="goods">
  <good-list-item v-for="(item,index) in goods" 
  :key="index" 
  :goods-item='item'/>
</div>
</template>

<script>
import GoodListItem from './GoodListItem'
export default {
  name:'GoodsList',
  components: {
    GoodListItem
  },
  data() {
    return {

    };
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    },

  },
 
  computed: {},
  methods: {

  },
}
</script>
<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly ;
    
    padding: 2px;
  }
</style>