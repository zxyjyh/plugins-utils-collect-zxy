//@ts-nocheck

import { UseVirtualListOptions, UseVirtualList } from './index';



import { defineComponent, h, toRefs } from "vue";

export interface UseVirtualListProps {
  list:[]
  options:UseVirtualListOptions
  height:string
}

export const UseVirtualListComp = defineComponent({
  name:'UseVirtualList',
  props:['list','options','height'],
  setup(props,ctx){
    const {list :listRef} = toRefs(props)
    const { list, containerProps, wrapperProps } = UseVirtualList(listRef,props.options)

    return ()=>h('div',{
      ...containerProps
    },[
      h('div',
      {...wrapperProps.value},
      list.value.map((item:any)=>h('div',
      {style:{overFlow:'hidden',height:item.height}},
        ctx.slots.default?ctx.slots.default(item): 'Please set content!'
      )))
    ])
  }
})

