<template>
  <div class="cart">
    <nav-bar class="cart-nav-bar">
      <span slot="middle">购物车({{carLen}})</span>
    </nav-bar>  
    <cart-list/>
   
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import {mapGetters} from 'vuex'
export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
  },
  computed:{
    ...mapGetters({
      carLen:'cartLength'
    })
   
  }
}
</script>

<style>
  .cart {
    height: 100%;
    overflow: hidden;
  }
  .cart-nav-bar {
    background-color: var(--color-high-text);
    color: azure;
  }
</style>