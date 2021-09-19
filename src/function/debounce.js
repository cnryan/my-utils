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
