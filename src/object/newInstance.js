
export function newInstance(fn, ...args) {
  // 创建一个空的object实例对象obj, 作为fn的实例对象
  const obj = {}

  // 将fn的prototype属性值赋值给obj的__proto__属性值
  obj.__proto__ = fn.prototype

  // 调用fn, 指定this为obj, 参数为args列表
  const result = fn.call(obj, ...args)

  // 如果fn返回的是一个对象类型, 那返回的就不再是obj, 而是fn返回的对象
  // 否则返回obj
  return result instanceof Object ? result : obj
}
