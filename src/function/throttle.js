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



