/**
 * 语法: apply(fn, obj, args)
 * 功能: 执行fn, 使this为obj, 并将args数组中的元素传给fn(功能等同于函数对象的apply方法)
 */

export function apply(fn, obj, args) {
  if (obj === undefined || obj === null) {
    obj = globalThis; // 全局对象
  }

  obj.temp = fn;
  let result = obj.temp(...args);
  delete obj.temp;
  return result;
}