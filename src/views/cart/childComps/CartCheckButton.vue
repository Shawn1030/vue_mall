<template>
<div class="check-button" :class="{check:isChecked}">
  <img src="~assets/img/cart/tick.svg" alt="">
</div>
</template>
  
<script>

export default {
  name:'CartCheckButton',
  components: {},
  data() {
    return {

    };
  },
  props:{
    isChecked:{
      type:Boolean,
      default:false
    },
    
  },
  computed: {},
  methods: {
  
  },
}
</script>
<style scoped>
  .check-button {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #aaa;
    margin-right: 3px;
  }
  .check {
    background-color: orangered;
    border:none
  }
</style>