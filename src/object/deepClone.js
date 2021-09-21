/*
1). 大众乞丐版
    问题1: 函数属性会丢失
    问题2: 循环引用会出错
*/
export function deepClone1(target) {
  return JSON.parse(JSON.stringify(target))
}

/*
2). 面试基础版本
    解决问题1: 函数属性没丢失
*/
export function deepClone2(target) {
  if (target !== null && typeof target === 'object') {
    const cloneTarget = Array.isArray(target) ? [] : {}
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = deepClone2(target[key])
      }
    }
    return cloneTarget
  }
  return target
}

/*
3). 面试加强版本
    解决问题2: 循环引用正常
*/
export function deepClone3(target, map = new Map()) {
  if (target !== null && typeof target === 'object') {
    // 从缓存容器中读取克隆对象
    let cloneTarget = map.get(target)
    // 如果存在, 返回前面缓存的克隆对象
    if (cloneTarget) {
      return cloneTarget
    }
    // 创建克隆对象(可能是{}或者[])
    cloneTarget = Array.isArray(target) ? [] : {}
    // 缓存到map中
    map.set(target, cloneTarget)

    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        // 递归调用, 深度克隆对象, 且传入缓存容器map
        cloneTarget[key] = deepClone3(target[key], map)
      }
    }
    return cloneTarget
  }
  return target
}

/*
4). 面试加强版本2(优化遍历性能)
    数组: while | for | forEach() 优于 for-in | keys()&forEach()
    对象: for-in 与 keys()&forEach() 差不多
*/
export function deepClone4(target, map = new Map()) {
  if (target !== null && typeof target === 'object') {
    // 从缓存容器中读取克隆对象
    let cloneTarget = map.get(target)
    // 如果存在, 返回前面缓存的克隆对象
    if (cloneTarget) {
      return cloneTarget
    }
    if (Array.isArray(target)) {
      cloneTarget = []
      map.set(target, cloneTarget)
      target.forEach((item, index) => {
        cloneTarget[index] = deepClone4(item, map)
      })
    } else {
      cloneTarget = {}
      map.set(target, cloneTarget)
      Object.keys(target).forEach(key => {
        cloneTarget[key] = deepClone4(target[key], map)
      })
    }
    return cloneTarget
  }
  return target
}
