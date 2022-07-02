
type Callback = (argv?:any)=>void


/**
 * @param  {any[]} sourceArr
 * @param  {(argv:any)=>void} cb
 * @param  {number} count=1
 * @param  {number} wait=200
 */
export const timerChunk = (sourceArr:any[],cb:Callback,count=1,wait=200)=>{
  let ret :any
  let timer:any = null

  const renderData = ()=>{
    for (let index = 0; index < Math.min(count,sourceArr.length); index++) {
      ret = sourceArr.shift();
    }
    cb(ret)
  }

  return ()=>{
    if(!timer){
      timer = setInterval(()=>{
        if(sourceArr.length===0){
          clearImmediate(timer)
          ret = null
          return
        }

        renderData()
      },wait)
    }
  }
}

/**
 * @param  {()=>void} callback
 */
export const memorize = (callback:Callback | null)=>{
let cache = false
let result:unknown= null

return ()=>{
  if(cache){
    return result
  }else {
    result = (callback as Callback)()
    cache = true
    callback = null
    return result
  }
}
}
/**
 * @param  {string|number|object|any[]} val
 */
export const isType = (val: string | number |object | any[])=>{
  return (type:string)=>{
    return Object.prototype.toString.call(val) === `[object ${type}]`;
  }
}



/**
 * @param  {string} params
 */
export const formateUrl = (params: string) => {
  if (isType(params)('String')) {
    if (/^http(s)?/.test(params)) {
      const url = new URL(params);
      // 将参数转换成http://localhost:8080?a=1&b=2   -> {a:1,b:2}
      return Object.fromEntries(url.searchParams.entries());
    }
    // params如果为a=1&b=2,则转换成{a:1,b:2}
    return Object.fromEntries(new URLSearchParams(params).entries());
  }
};

/**
 * @description 懒加载可执行函数
 * @param  {Callback} cb
 */
export const lazyFunction = (factory:Callback)=>{
  const fac:any = memorize(factory)

  const f = (...args:any[])=>fac(...args)

  return f
}