/**
 * Merge the contents of two or more objects together into the first object.
 * extend( [deep], target, object1 [, objectN ] )
 * 需要根据第一个参数的类型，确定 target 和要合并的对象的下标起始值。
 * 如果是深拷贝，根据 copy 的类型递归 extend。
 */
import { isFunction, isPlainObject } from "../function/type";

export function myExtend() {
  let deep = false // 默认不深拷贝
  let name, options, src, copy, clone, copyIsArray
  const length = arguments.length
  let i = 1
  // 第一个参数不传布尔值的情况下，target默认是第一个参数
  let target = arguments[0] || {}
  // 如果第一个参数是布尔值，第二个参数是才是target
  if (typeof target === 'boolean') {
    deep = target
    target = arguments[i] || {}
    i++
  }
  // 如果target不是对象，我们是无法进行复制的，所以设为{}
  // target也可以是函数
  if (typeof target !== 'object' && !isFunction(target)) {
    target = {}
  }

  for (; i < length; i++) {
    options = arguments[i]
    if (options != null) {
      for (name in options) {
        // 目标属性值
        src = target[name]
        // 要复制的对象的属性值
        copy = options[name]

        // 解决循环引用
        if (target === copy) continue

        // 要递归的对象必须是 plainObject 或者数组
        if (deep
          && copy
          && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

          // 要复制的对象属性值类型需要与目标属性值相同
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];

          } else {
            clone = src && isPlainObject(src) ? src : {};
          }

          target[name] = myExtend(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }
  return target
}
