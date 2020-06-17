<template>
<div class="cart-list">
  <scroll class="content">
     <cart-list-item v-for="(item, index) in cartList" :key="index" :itemInfo='item' />
  </scroll>
   <cart-bottom-bar/>
</div>
</template>

<script>
import cartListItem from '../childComps/CartListItem'
import CartBottomBar from './CartBottomBar'

import {mapGetters} from 'vuex'
import Scroll from 'components/common/scroll/Scroll'
export default {
  name:'CartList',
  components: {
    cartListItem,
    Scroll,
    CartBottomBar
  },
  data() {
    return {
      currentIndex:0
    };
  },
   computed:{
    ...mapGetters(['cartList'])
   },
  methods: {

  },
}
</script>
<style scoped>
  .cart-list {
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>