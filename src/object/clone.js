/*
实现浅拷贝
  方法一: 利用ES6语法
  方法二: 利用ES5语法: for...in
*/

/* 方法一: 利用ES6语法*/
export function clone1(target) {
  // target为对象或者数组
  if (target !== null && typeof target === 'object') {
    if (Array.isArray(target)) {
      // return target.slice()
      // return target.filter(() => true)
      // return target.map(i => i)
      return [...target]
    } else {
      // return Object.assign({}, target)
      return {...target}
    }
  }
  // 如果是基本类型或者函数，直接返回
  return target
}

/* 方法二: 利用ES5语法: for...in */
export function clone2(target) {
  if (target !== null && typeof target === 'object') {
    const cloneTarget = Array.isArray(target) ? [] : {}
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = target[key]
      }
    }
    return cloneTarget
  } else {
    return target
  }
}
