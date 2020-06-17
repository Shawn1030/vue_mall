<template>
<div class="nav-bar">
  <div class="nav-bar-left"><slot name="left"></slot></div>
  <div class="nav-bar-middle"><slot name="middle"></slot></div>
  <div class="nav-bar-right"><slot name="right"></slot></div>
</div>
</template>

<script>

export default {
  name:'NavBar',
  components: {},
  data() {
    return {

    };
  },
  computed: {},
  methods: {

  },
}
</script>
<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0px 1px 1px rgba(100,100,100,.1);
  }
  .nav-bar-left,.nav-bar-right{
    width: 60px;

  }
  .nav-bar-middle {
    flex: 1;

  }
</style>