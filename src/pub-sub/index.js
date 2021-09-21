/*
自定义消息订阅与发布
*/

export const PubSub = {}

let callbacksObj = {} // 保存所有回调的容器
let id = 0 // 用于生成token的标记

// PubSub.subscribe(msg, subscriber): 订阅消息: 指定消息名和订阅者回调函数
PubSub.subscribe = function(msgName, callback) {
  // 确定token
  const token = 'token_' + ++id

  // 取出当前消息对应的callbacks
  const callbacks = callbacksObj[msgName]
  if (!callbacks) {
    callbacksObj[msgName] = {
      [token]: callback
    }
  } else {
    callbacks[token] = callback
  }
  return token
}

// PubSub.publish(msg, data): 异步发布消息: 指定消息名和数据
PubSub.publish = function(msgName, data) {
  // 取出当前消息对应的callbacks
  let callbacks = callbacksObj[msgName]
  // 如果有值
  if (callbacks) {
    // callbacks = Object.assign({}, callbacks)
    // 启动定时器, 异步执行所有的回调函数
    setTimeout(() => {
      Object.values(callbacks).forEach(callback => {
        callback(data)
      })
    }, 0)
  }
}

// PubSub.publishSync(msg, data): 同步发布消息: 指定消息名和数据
PubSub.publishSync = function(msgName, data) {
  // 取出当前消息对应的callbacks
  const callbacks = callbacksObj[msgName]
  // 如果有值
  if (callbacks) {
    // 立即同步执行所有的回调函数
    Object.values(callbacks).forEach(callback => {
      callback(data)
    })
  }
}

// PubSub.unsubscribe(flag): 取消订阅: 根据标识取消某个或某些消息的订阅
/**
 * 1) 没有传值, flag为undefined
 * 2) 传入token字符串
 * 3) msgName字符串
 */
PubSub.unsubscribe = function(flag) {
  // 如果flag没有指定或者为null, 取消所有
  if (flag === undefined) {
    callbacksObj = {}
  } else if (typeof flag === 'string') {
    if (flag.indexOf('token_') === 0) {
      // 找到flag对应的callbacks
      const callbacks = Object.values(callbacksObj).find(callbacks => callbacks.hasOwnProperty(flag))
      // 如果存在, 删除对应的属性
      if (callbacks) {
        delete callbacks[flag]
      }
    } else {
      delete callbacksObj[flag]
    }
  } else {
    throw new Error('如果传入参数, 必须是字符串类型')
  }
}
