/**
 * 柯里化是将一个多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个一元函数。
 * 局部应用则是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数。
 */


export function partial(fn) {
  let args = [].slice.call(arguments, 1)
  return function() {
    let newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}

// 添加占位符
export function partialWithHoles(fn, _) {
  let args = [].slice.call(arguments, 2)
  return function() {
    let position = 0, len = args.length
    for(let i = 0; i < len; i++) {
      args[i] = args[i] === _ ? arguments[position++] : args[i]
    }
    while(position < arguments.length) args.push(arguments[position++])
    return fn.apply(this, args)
  }
}
