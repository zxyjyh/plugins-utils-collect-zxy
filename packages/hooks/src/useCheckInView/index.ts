import { isBrowser } from '@zxy/utils';

import {Ref,ref} from 'vue'

export const useCheckInView = (el:Ref,preLoad:number):{
  rect: Ref<DOMRect>,
  checkInView:()=>boolean
}=>{
  let rect: Ref<DOMRect>= ref({} as DOMRect)

  const getRect = ()=>{
    rect.value = el.value.getBoundingClientRect()
  }

  const checkInView = ():boolean=>{
    getRect()

    return isBrowser
    && (rect.value.top < window.innerHeight * preLoad && rect.value.bottom >0)
    && (rect.value.left < window.innerWidth * preLoad && rect.value.right >0)
  }

  return {
    rect,
    checkInView
  }
}



