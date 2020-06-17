<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="middle">云涛购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选'] " 
      @tabClick='tabClick'
      v-show="isShowTabControl"
      class="tab-control"
      ref="tabControl2"/>
    <scroll class="content" ref="scroll" 
    @backToScroll='backToScroll' 
    @pullingUp='loadMore'
    :probeType='3'
    :pullUpLoad='true'>
      <home-swiper :banners='banners' @swiperImgLoad='swiperImgLoad'/>  
      <recommend-view :recommends='recommends'/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选'] " 
      @tabClick='tabClick'
      ref="tabControl1"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'


import TabControl from 'components/content/TabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'

import {getHomeMultiData,getHomeGoods} from 'network/home'

import {debounce} from 'common/utils'
import {BACK_POSITION} from 'common/const'
import {refreshLoadMixin,backTopMixin} from 'common/mixin'
export default {
  name:'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,

  },
  mixins: [refreshLoadMixin,backTopMixin],
  data() {
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      tabOffsetTop:0,
      isShowTabControl:false,
      saveY:0,
    }
  },
  //组件创建完毕，发送请求函数
  created(){
   this.getHomeMultiData()
   this.getHomeGoods('pop')
   this.getHomeGoods('new')
   this.getHomeGoods('sell')
   
  },
  
  activated(){
    console.log(this.saveY);
    
    this.$refs.scroll.scroll.scrollTo(0,this.saveY,50);
    this.$refs.scroll.refresh()
    
  },
  deactivated(){
    console.log(this.saveY);
    
    this.saveY=this.$refs.scroll.getScrollY()
     console.log(this.saveY);
    
    this.$bus.$off('imgOnload',this.imgOnloadListener)
  },
 
  methods:{
    /* 
      事件相关
    */
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType='pop'
          break;
        case 1:
          this.currentType='new'
          break;
        case 2:
          this.currentType='sell'
          break;
      }
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
    },
    
    backToScroll(position){
      //判断BackTop是否显示
      this.isShowBackTop=-position.y>BACK_POSITION
      //决定tabControl是否吸顶
      this.isShowTabControl= -position.y>this.tabOffsetTop
    },
    //上拉加载更多
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finshPull()
    },
    // better-scroll刷新

    swiperImgLoad(){
      this.tabOffsetTop=this.$refs.tabControl1.$el.offsetTop
    },
    /* 
      网络请求相关
    */
    getHomeMultiData(){
      getHomeMultiData().then(res=>{
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
    })
    },
    //获取首页商品数据
    getHomeGoods(type){
      const page =this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page+=1
      
      })
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },

  
}
</script>

<style scoped>
  #home {
      padding-top: 44px;
      position: relative;
      height: 100vh;
    }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    z-index: 9;
   
  }
  .tab-control {
    position:relative;
    z-index:9;
  }
  .content {
    position: absolute;
    top:43px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  
</style>