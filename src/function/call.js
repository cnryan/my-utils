/**
 * 语法: call(fn, obj, ...args)
 * 功能: 执行fn, 使this为obj, 并将后面的n个参数传给fn(功能等同于函数对象的call方法)
 */

export function call(fn, obj, ...args) {

  if (obj === undefined || obj === null) {
    obj = globalThis; // 全局对象
  }

  obj.temp = fn;
  let result = obj.temp(...args);
  delete obj.temp;
  return result;
}


// 另一种实现思路，与原生的更类似
// Function.prototype.call = function(context, ...args) {
//   context = context || globalThis;
//   context.fn = this;
//   let result = context.fn(...args);
//   delete context.fn;
//   return result;
// }