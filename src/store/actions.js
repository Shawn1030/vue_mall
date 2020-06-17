import {ADDCOUNT,ADDCART} from './mutation-types'
export default {
  addCart(context,payload){
    return new Promise ((resolve,reject)=>{
      let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)
      if(oldProduct){
        context.commit(ADDCOUNT,oldProduct)
        resolve('商品数量+1')
      }else {
        payload.checked=true
        context.commit(ADDCART,payload)
        resolve('商品添加成功')
      }
    })
  }
}