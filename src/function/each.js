import { isArrayLike } from "./type"

/**
 * 需求1：可以遍历对象与数组
 * 需求2：遍历过程中可以退出循环
 * 需求3：this
 */
export function each(obj, callback) {
  let length, i = 0

  if (isArrayLike(obj)) {
    length = obj.length
    for (; i < length; i++) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  }
  return obj
}