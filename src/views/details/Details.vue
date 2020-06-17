<template>
<div id="detail">
  <detail-nav-bar class="detail-nav-bar" @itemClick="itemClick" ref="navBar"/>
  <scroll class="content" ref="scroll" :probeType='3' @backToScroll='contentScroll'>
    <detail-swiper :topImages='topImages'/>
    <detail-base-info :goods='goods'/>
    <detail-shop-info :shop='shop'/>
    <detail-goods-info :detailInfo='detailInfo' @imageLoad='imageLoad'/>
    <detail-param-info :paramInfo='paramInfo' ref="params"/>
    <detail-comment-info :commentInfo='commentInfo' ref="comment"/>
    <goods-list :goods='recommend' ref="recommend"/>
  </scroll>
  <back-top @click.native="backTopClick" v-show="isShowBackTop "/>
  <detail-button-bar @addToCart='addToCart'/>
  <toast :message='message' :isShow='isShow'></toast>
</div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailButtonBar from './childComps/DetailButtonBar'

import Scroll from 'components/common/scroll/Scroll'
import Toast from 'components/common/toast/Toast'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'

import {getProductDetails,Goods,Shop,GoodsParam,getGoodsRecommend} from 'network/detail'

import {debounce} from 'common/utils'
import {BACK_POSITION} from 'common/const'
import {refreshLoadMixin,backTopMixin} from 'common/mixin'

import {mapActions} from 'vuex'
export default {
  name:'Details',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailButtonBar,
    GoodsList,
    Toast
  },
  data() {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommend:[],
      themeTopYs:[],
      navBarOffsetTop:null,
      currentIndex:0,
      message:'',
      isShow:false
    };
  },
    mixins: [refreshLoadMixin,backTopMixin],
  created(){
    this.iid=this.$route.params.iid
    //获取商品细节
    this.__getProductDetails(this.iid)
    //获取商品推荐
    this.__getGoodsRecommend()
   
  },
 mounted(){
   this.navBarOffsetTop=this.$refs.navBar.$el.offsetHeight
 },
  destroyed(){
    this.$bus.$off('imgOnload',this.imgOnloadListener)
  },
  computed: {},
  methods: {
    ...mapActions(['addCart']),
    imageLoad(){
      this.$refs.scroll.refresh()
       let paramsOffsetTop=this.$refs.params.$el.offsetTop-this.navBarOffsetTop 
       let commentOffsetTop=this.$refs.comment.$el.offsetTop-this.navBarOffsetTop 
       let recommendOffsetTop=this.$refs.recommend.$el.offsetTop-this.navBarOffsetTop 
      this.themeTopYs.push(0)
      this.themeTopYs.push(paramsOffsetTop)
      this.themeTopYs.push(commentOffsetTop)
      this.themeTopYs.push(recommendOffsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    __getProductDetails(iid){
      getProductDetails(iid).then(res=>{
      //获取数据
      const data=res.result
      //获取顶部图片数据
      this.topImages=data.itemInfo.topImages
      //获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo)
      //获取店铺信息
      this.shop=new Shop(data.shopInfo)
      //获取商品详细信息
      this.detailInfo=data.detailInfo
      //获取商品参数信息
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //保存评论数据
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    })
    },
    __getGoodsRecommend(){
      getGoodsRecommend().then(res=>{
     this.recommend=res.data.list;
    })
    },
    itemClick(index){
      this.$refs.scroll.scroll.scrollTo(0,- this.themeTopYs[index],500)
      
    },
    contentScroll(position){
      //如果position.y
      
      const positionY=-position.y
      for (let i in this.themeTopYs){
          i=i*1
          const length=this.themeTopYs.length-1
        if(this.currentIndex!==i && (positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
          this.currentIndex=i
          this.$refs.navBar.currentIndex=this.currentIndex
        }
      }
      this.isShowBackTop=-position.y>BACK_POSITION
    },

    backToScroll(position){
      //判断BackTop是否显示
      this.isShowBackTop=-position.y>BACK_POSITION
      
    },
    addToCart(){
        const product={};
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice;
        product.iid=this.iid;
        // this.$store.dispatch('addCart',product).then(res=>{console.log(res);
        // })
        this.addCart(product).then(res=>{
            this.$toast.show(res,1000)
        })  
    }
  }
}
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    height:calc(100% - 44px - 49px);  
  }
  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>