/**
 * ES5之前共有6个基本类型，分别是：Undefined、Null、Boolean、Number、String、Object
 * 对应的typeof运算值为 undefined、object、boolean、number、string、object，此外typeof还能返回function
 */

/**
 * 常见的 toString
 * var number = 1;          // [object Number]
 * var string = '123';      // [object String]
 * var boolean = true;      // [object Boolean]
 * var und = undefined;     // [object Undefined]
 * var nul = null;          // [object Null]
 * var obj = {a: 1}         // [object Object]
 * var array = [1, 2, 3];   // [object Array]
 * var date = new Date();   // [object Date]
 * var error = new Error(); // [object Error]
 * var reg = /a/g;          // [object RegExp]
 * var func = function a(){}; // [object Function]
 * console.log(Object.prototype.toString.call(Math)); // [object Math]
 * console.log(Object.prototype.toString.call(JSON)); // [object JSON]
 * console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
 */


const class2type = {}

'Boolean Number String Function Array Date RegExp Object Error Null Undefined'.split(' ').map((item) => {
  class2type['[object ' + item + ']'] = item.toLowerCase()
})

function type(obj) {
  return typeof obj === 'object' || typeof obj === 'function' ?
    class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj
}

export const isFunction = function(obj) {
  return type(obj) === 'function'
}

export const isArray = Array.isArray || function(obj) {
  return type(obj) === 'array'
}

export const isPlainObject = function(obj) {
  let proto, Ctor

  // 排除掉明显不是obj的以及一些宿主对象如Window
  if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") {
    return false
  }

  /**
   * getPrototypeOf es5 方法，获取 obj 的原型
   * 以 new Object 创建的对象为例的话
   * obj.__proto__ === Object.prototype
   */
  proto = Object.getPrototypeOf(obj)

  // 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true
  if (!proto) {
    return true
  }

  /**
   * 以下判断通过 new Object 方式创建的对象
   * 判断 proto 是否有 constructor 属性，如果有就让 Ctor 的值为 proto.constructor
   * 如果是 Object 函数创建的对象，Ctor 在这里就等于 Object 构造函数
   */
  Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor

  // 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数
  // 这里用了函数的 toString方法。
  // Function 对象覆盖了从 Object 继承来的 Object.prototype.toString 方法。函数的 toString 方法会返回一个表示函数源代码的字符串。
  // 具体来说，包括 function关键字，形参列表，大括号，以及函数体中的内容。
  return typeof Ctor === "function"
    && Object.prototype.hasOwnProperty.toString.call(Ctor) === Object.prototype.hasOwnProperty.toString.call(Object)
}

export const isEmptyObject = function(obj) {
  for (let name in obj) {
    return false
  }
  return true
}

export const isObject = function(obj) {
  return obj !== null && typeof obj === 'object'
}

export const isWindow = function(obj) {
  return obj != null && obj === obj.window
}

export const isArrayLike = function(obj) {
  // obj 必须有 length属性
  let length = !!obj && "length" in obj && obj.length
  let typeRes = type(obj)

  // 排除掉函数和 Window 对象
  if (typeRes === "function" || isWindow(obj)) {
    return false;
  }

  return typeRes === "array" || length === 0 ||
    typeof length === "number" && length > 0 && (length - 1) in obj
}

// 判断是否为DOM元素
export const isElement = function(obj) {
  return !!(obj && obj.nodeType === 1)
}
