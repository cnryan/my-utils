/**
 * 实现数组声明式处理系列工具函数
 */

// map(): 返回一个由回调函数的返回值组成的新数组
export function map(array, callback) {
  let res = []
  for (let i = 0, len = array.length; i < len; i++) {
    res.push(callback.call(this, array[i], i))
  }
  return res
}

// reduce(): 从左到右为每个数组元素执行一次回调函数
// 并把上次回调函数的返回值放在一个暂存器中传给下次回调函数
// 并返回最后一次回调函数的返回值
export function reduce(array, callback, initValue) {
  let res = initValue
  for (let i = 0, len = array.length; i < len; i++) {
    res = callback.call(this, res, array[i], i)
  }
  return res
}

// filter(): 将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回
export function filter(array, callback) {
  let res = []
  for (let i = 0, len = array.length; i < len; i++) {
    if (callback.call(this, array[i], i)) {
      res.push(array[i])
    }
  }
  return res
}

// find(): 找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。
export function find(array, callback) {
  for (let i = 0, len = array.length; i < len; i++) {
    if (callback.call(this, array[i], i)) {
      return array[i]
    }
  }
  return undefined
}

// findIndex(): 找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。
export function findIndex(array, callback) {
  for (let i = 0, len = array.length; i < len; i++) {
    if (callback.call(this, array[i], i)) {
      return i
    }
  }
  return -1
}

// every(): 如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。
export function every(array, callback) {
  for (let i = 0, len = array.length; i < len; i++) {
    if (!callback.call(this, array[i], i)) {
      return false
    }
  }
  return true
}

// some(): 如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false
export function some(array, callback) {
  for (let i = 0, len = array.length; i < len; i++) {
    if (callback.call(this, array[i], i)) {
      return true
    }
  }
  return false
}
