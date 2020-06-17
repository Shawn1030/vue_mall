import {debounce} from 'common/utils'
import BackTop from 'components/content/backtop/BackTop'
import {POP, NEW, SELL} from "./const";
export const refreshLoadMixin={
  data(){
    return {
      imgOnloadListener:null,
      newRefresh:null
    }
  },
 
  mounted(){
       this.newRefresh =debounce(this.$refs.scroll.refresh,500) 
       this.imgOnloadListener=()=>{
        this.newRefresh()
}
    this.$bus.$on('imgOnload',this.imgOnloadListener) 
 }
}
export const backTopMixin={
  components:{
    BackTop
  },
  data(){
    return {
      isShowBackTop:false,
    }
  },
  methods: {
    backTopClick(){
      this.$refs.scroll.backToTop()
    }
  },
}
export const tabControlMixin = {
	data: function () {
		return {
			currentType: POP
		}
	},
	methods: {
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = POP
					break
				case 1:
					this.currentType = NEW
					break
				case 2:
					this.currentType = SELL
					break
			}
			console.log(this.currentType);
		}
	}
}