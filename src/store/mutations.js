import {ADDCOUNT,ADDCART} from './mutation-types'
export default {
  [ADDCOUNT](state,payload){
    payload.count+=1
  },
  [ADDCART](state,payload){
    payload.count=1
    state.cartList.push(payload)
  }
}