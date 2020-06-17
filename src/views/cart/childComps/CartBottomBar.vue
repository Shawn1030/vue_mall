<template>
<div class="bottom-bar">
  <div class="select">
    <cart-check-button class="cart-check-button" :isChecked='isSellectAll' @click.native="checkClick" />
    <span>全选</span>
  </div>
  <div class="total">
    <span >合计：{{totalPrice}}</span>
  </div>
  <div class="caculate">去计算({{checkedLength}})</div>
</div>
</template>

<script>
import CartCheckButton from './CartCheckButton'
import {mapGetters} from 'vuex'
export default {
  name:'CartBottomBar',
  components: {
    CartCheckButton
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥'+this.cartList.filter(
        item=>{
          return item.checked
        }).reduce((pre,item)=>{
          return pre + item.price * item.count
        },0).toFixed(2)
    },
    checkedLength(){
      return this.cartList.filter(item=>item.checked).length
    },
    isSellectAll(){
      if (this.cartList.length===0) return false
      return !this.cartList.find(item=>!item.checked)
    }
  },
  methods: {
    checkClick(){
      if(this.isSellectAll){
        this.cartList.forEach(item=>item.checked=false)
      }else {
         this.cartList.forEach(item=>item.checked=true)
      }
    }
  },
}
</script>
<style scoped>
  .bottom-bar {
    display: flex;
    align-items: center;
    height: 40px;
    background-color: #eee;
    position: relative;
    
  }
  .cart-check-button {
    margin-right: 10px;
    height: 18px;
    width: 18px;
  }
  .select {
    margin-left: 10px;
    display: flex;
    width: 100px;

  }
  .total {
    flex: 1;
  }
  .caculate {
    width:90px;
    height: 40px;
    color: #fff;
    line-height: 40px;
    text-align: center;
    background-color: orangered;
  }
</style>