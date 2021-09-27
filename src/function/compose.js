/**
 * 将 fn3, fn2, fn1, fn0 传入compose函数实现类似 fn3(fn2(fn1(fn0(x)))) 的效果
 */

export function compose() {
  let args = arguments
  let start = arguments.length - 1
  return function() {
    let i = start
    let result = args[start].apply(this, arguments)
    while (i--) result = args[i].call(this, result)
    return result
  }
}
