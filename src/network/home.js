import {request} from './request'
//请求首页多个数据
export function getHomeMultiData(){
  return request({
    url:'/home/multidata'
  })
}

//请求首页商品数据
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
