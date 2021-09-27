/**
 * In mathematics and computer science, currying is the technique of
 * translating the evaluation of a function that takes multiple arguments (or a tuple of arguments)
 * into evaluating a sequence of functions, each with a single argument.
 * 函数柯里化的作用：参数复用。本质上是降低通用性，提高适用性。
 */

/**
 * 另一种定义：curry化要求被传入函数所有参数都被明确的定义，
 * 因此当使用部分参数调用时，他会返回一个新的函数，在真正调用之前等待外部提供其余的参数。
 * 可以简单的理解为，在所有参数被提供之前，挂起或延迟函数的执行
 */

/**
 * sub_curry 的作用就是用函数包裹原函数，然后给原函数传入之前的参数，
 * 当执行 fn0(...)(...) 的时候，执行包裹函数，返回原函数，
 * 然后再调用 sub_curry 再包裹原函数，然后将新的参数混合旧的参数再传入原函数，
 * 直到函数参数的数目达到要求为止。
 */
function sub_curry(fn) {
  let args = [].slice.call(arguments, 1)
  return function() {
    return fn.apply(this, args.concat([].slice.call(arguments)))
  }
}

export function curry(fn, length) {
  length = length || fn.length // 函数的长度指明函数的形参个数
  const slice = Array.prototype.slice
  return function() {
    if (arguments.length < length) {
      let combined = [fn].concat(slice.call(arguments))
      return curry(sub_curry.apply(this, combined), length - arguments.length)
    } else {
      return fn.apply(this, arguments)
    }
  }
}

// 简单实现版
export function currySimple1(fn, args) {
  let length = fn.length
  args = args || []
  return function() {
    let _args = args.slice(0)
    for (let i = 0; i < arguments.length; i++) {
      _args.push(arguments[i])
    }
    if (_args.length < length) {
      return currySimple1.call(this, fn, _args)
    } else {
      return fn.apply(this, _args)
    }
  }
}

// 简单实现版2
let judge
export const currySimple2 = fn =>
  judge = (...args) =>
    args.length === fn.length
      ? fn(...args)
      : judge.bind(this, ...args)


// 添加占位符版
// TODO: 无法理解
export function curryWithHoles(fn, _, args, holes) {
  length = fn.length
  args = args || []
  holes = holes || []
  return function() {
    let _args = args.slice(0),
      _holes = holes.slice(0),
      argsLen = args.length,
      holesLen = holes.length,
      arg, i, index = 0
    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i]
      // 处理类似 fn(1, _, _, 4)(_, 3) 这种情况，index 需要指向 holes 正确的下标
      if (arg === _ && holesLen) {
        index++
        if (index > holesLen) {
          _args.push(arg)
          _holes.push(argsLen - 1 + index - holesLen)
        }
      }
      // 处理类似 fn(1)(_) 这种情况
      else if (arg === _) {
        _args.push(arg)
        _holes.push(argsLen + i)
      }
      // 处理类似 fn(_, 2)(1) 这种情况
      else if (holesLen) {
        // fn(_, 2)(_, 3)
        if (index >= holesLen) {
          _args.push(arg)
        }
        // fn(_, 2)(1) 用参数 1 替换占位符
        else {
          _args.splice(_holes[index], 1, arg)
          _holes.splice(index, 1)
        }
      }
      else {
        _args.push(arg);
      }
    }
    if (_holes.length || _args.length < length) {
      return curryWithHoles.call(this, fn, _, _args, _holes)
    }
    else {
      return fn.apply(this, _args)
    }
  }
}
