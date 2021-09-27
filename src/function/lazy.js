// 惰性函数就是解决每次都要进行判断的问题，解决原理很简单，重写函数。
let foo = function () {
  const t = new Date();
  foo = function () {
    return t
  }
  return foo()
};

// 应用场景
// DOM 事件添加中，为了兼容现代浏览器和 IE 浏览器，我们需要对浏览器环境进行一次判断
function addEventNormal(type, el, fn) {
  if (window.addEventListener) {
    el.addEventListener(type, fn, false)
  } else if (window.attachEvent) {
    el.attachEvent('on' + type, fn)
  }
}
// 上面的问题在于我们每当使用一次 addEvent 时都会进行一次判断。
// 利用惰性函数，我们可以这样做：
function addEventLazy(type, el, fn) {
  if (window.addEventListener) {
    addEventLazy = function (type, el, fn) {
      el.addEventListener(type, fn, false);
    }
  }
  else if(window.attachEvent){
    addEventLazy = function (type, el, fn) {
      el.attachEvent('on' + type, fn);
    }
  }
}
addEventLazy()

// 也可以用闭包的形式
const addEventLazy2 = (function(){
  if (window.addEventListener) {
    return function (type, el, fn) {
      el.addEventListener(type, fn, false);
    }
  }
  else if(window.attachEvent){
    return function (type, el, fn) {
      el.attachEvent('on' + type, fn);
    }
  }
})()

