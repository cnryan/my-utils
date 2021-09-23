/**
 * 实现函数节流，创建一个节流函数在wait毫秒内最多执行callback一次
 * 适用场景：
 * - 窗口调整（resize）
 * - 页面滚动（scroll）
 * - DOM 元素的拖拽功能实现（mousemove）
 * - 抢购疯狂点击（click）
 * @param callback
 * @param wait
 */

export function throttle(callback, wait) {
  let start = 0
  // 返回一个事件监听函数（也就是节流函数）
  return function (event) {
    // 返回一个事件监听函数(也就是节流函数)
    console.log('throttle event')
    // 只有当距离上次处理的时间间隔超过了wait时, 才执行处理事件的函数
    const current = Date.now()
    if (current - start > wait) {
      callback.call(this, event) // 需要指定this和参数
      start = current
    }
  }
}

/**
 * 冴羽版: 如果你持续触发事件，每隔一段时间，只执行一次事件
 * 根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同
 * 我们用 leading 代表首次是否执行，trailing 代表结束后是否再执行一次
 */

// 方式1：使用时间戳
// 立刻执行, 停止触发后没有办法再执行事件
function throttleAdvanced1(func, wait) {
  let context, args
  let previous = 0

  return function() {
    let now = +new Date()
    context = this
    args = arguments
    if (now - previous > wait) {
      func.apply(context, args)
      previous = now
    }
  }
}
// 方式2：使用定时器
// 在 n 秒后第一次执行, 停止触发后依然会再执行一次事件
function throttleAdvanced2(func, wait) {
  let timeout
  let context, args

  return function() {
    context = this
    args = arguments
    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}

// 方式1和2结合
// 头部立即执行一次，尾部停止触发后还会再执行一次
function throttleAdvanced(func, wait) {
  let timeout, context, args, result
  let previous = 0

  const later = function() {
    previous = +new Date()
    timeout = null
    func.apply(context, args)
  }

  return function() {
    let now = +new Date()
    // 下次触发 func 剩余的时间
    let remaining = wait - (now - previous)
    context = this
    args = arguments
    // 如果没有剩余的时间了或者你改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
  }
}

// options.leading：false 和 options.trailing: false 不能同时设置
function throttleAdvancedWithOption(func, wait, options) {
  let timeout, context, args, result
  let previous = 0
  options = options || {}

  const later = function() {
    previous = options.leading === false ? 0 : +new Date()
    timeout = null
    func.apply(context, args)
    context = args = null // 垃圾回收
  }

  const throttled =  function() {
    let now = +new Date()
    if (!previous && options.leading === false) previous = now
    // 下次触发 func 剩余的时间
    let remaining = wait - (now - previous)
    context = this
    args = arguments
    // 如果没有剩余的时间了或者你改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = function() {
    clearTimeout(timeout)
    previous = 0
    timeout = null
  }

  return throttled
}
