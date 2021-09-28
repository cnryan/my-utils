/**
 * 函数记忆是指将上次的计算结果缓存起来，当下次调用时，如果遇到相同的参数，就直接返回缓存中的数据。
 * 但这种方法无法缓存object, 因为在调用join方法时object会自动调用toString方法转换成成[Object object]
 */
export function memoize1(f) {
  const cache = {};
  return function(){
    const key = arguments.length + Array.prototype.join.call(arguments, ",");
    if (key in cache) {
      return cache[key];
    }
    else {
      return cache[key] = f.apply(this, arguments);
    }
  }
}

// 来自 underscore 的实现
// hasher 可以是JSON.stringify，解决参数是对象的问题
export function memoize2(func, hasher) {
  const memoize = function(key) {
    const cache = memoize.cache;
    const address = '' + (hasher ? hasher.apply(this, arguments) : key);
    if (!cache[address]) {
      cache[address] = func.apply(this, arguments);
    }
    return cache[address];
  };
  memoize.cache = {};
  return memoize;
}
