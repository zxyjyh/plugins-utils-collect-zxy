



import { ref, Ref, shallowRef, watch, computed } from 'vue'

import { useElementSize } from '@vueuse/core'

export interface UseVirtualListOptions {
  itemHeight: number,
  overscan?: number
}

export interface UseVirtualListItem<T> {
  data: T,
  index: number
}

export const UseVirtualList = (list: [], options: UseVirtualListOptions) => {
  const containerRef: Ref = ref()

  const size = useElementSize(containerRef)

  const currentList: Ref<UseVirtualListItem<T>[]> = ref([])
  const source = shallowRef(list)

  const state: Ref = ref({ start: 0, end: 10 })
  const { itemHeight, overscan = 5 } = options

  const getViewCapacity = (containerHeight: number) => {
    return Math.ceil(containerHeight / itemHeight)
  }

  const getOffset = (scrollTop: number) => {
    return Math.floor(scrollTop / itemHeight)
  }


  const calculateRang = () => {
    const el = containerRef.value
    if (el) {
      const offset = getOffset(el.scrollTop)
      const viewCap = getViewCapacity(el.clientHeight)

      const from = offset - overscan
      const to = offset + viewCap + overscan
      state.value = {
        start: from < 0 ? 0 : from,
        end: to > source.value.length ? source.value.length : to
      }


      currentList.value = source.value
        .slice(state.value.start, state.value.end)
        .map((el, index) => ({ data: el, index: index + state.value.start }))
    }
  }

  watch([size.width, size.height, list], () => {
    calculateRang()
  })

  const totalHeight = computed(() => {
    return itemHeight * source.value.length
  })

  const getDistanceTop = (index: number) => {
    return index * itemHeight
  }

  const scrollTo = (index: number) => {
    if (containerRef.value) {
      containerRef.value.scrollTop = getDistanceTop(index)
      calculateRang()
    }
  }

  const offsetTop = computed(() => getDistanceTop(state.value.start))

  const wrapperProps = computed(() => {
    return {
      style: {
        width: '100%',
        height: `${totalHeight.value - offsetTop.value}px`,
        marginTop: `${offsetTop.value}px`
      }
    }
  })

  const containerStyle: Partial<CSSStyleDeclaration> = { overflowY: 'auto' }



  return {
    list: currentList,
    scrollTo,
    containerProps: {
      ref: containerRef,
      onScroll: () => {
        calculateRang()
      },
      style: containerStyle,
    },
    wrapperProps
  }
}

