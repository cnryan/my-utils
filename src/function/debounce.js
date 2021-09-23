/**
 * 实现函数防抖
 * 创建一个防抖动函数，该函数会从上一次被调用后，延迟 `wait` 毫秒后调用 `callback`
 * 适用场景：输入框实时搜索联想
 */
export function debounce(callback, wait) {
  // 用来保存定时器任务标识
  let timeoutId = -1

  return function (event) {
    console.log('debounce event')

    if (timeoutId !== -1) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      callback.call(this, event)
      timeoutId = -1
    }, wait)
  }
}

/**
 * 冴羽版
 * 防抖的原理就是：你尽管触发事件，但是我一定在事件触发 n 秒后才执行
 * 如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行
 * 总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行
 */

/**
 * 需要考虑的问题
 * 1. this的指向
 * 2. event对象
 * 3. 立即执行: 立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行
 * 4. 返回值
 * 5. 取消
 */
export function debounceAdvanced(func, wait, immediate) {
  let timeout, result
  const debounced = function() {
    let context = this
    let args = arguments

    if (timeout) {
      clearTimeout(timeout)
    }

    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
      if (callNow) {
        result = func.apply(context, args)
      }
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
    return result
  }

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
