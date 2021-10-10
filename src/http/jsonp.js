// script 标签不受同源策略约束，所以可以用来进行跨域请求，优点是兼容性好，但是只能用于 GET 请求
export function jsonp(url, params, callbackName) {
  const generateUrl = function() {
    let dataSrc = '';
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        dataSrc += `${key}=${params[key]}&`
      }
    }
    dataSrc += `callback=${callbackName}`
    return `${url}?${dataSrc}`
  }
  return new Promise(resolve => {
    const scriptEle = document.createElement('script');
    scriptEle.src = generateUrl();
    document.body.appendChild(scriptEle);
    // callbackName: 由远程请求返回结果中直接调用
    // 因此需要在script加载完毕之前，先在window对象上添加这个callback函数，用于接受远程数据
    window[callbackName] = function(data) {
      resolve(data)
      document.removeChild(scriptEle)
    }
  })
}

// jsonp('http://localhost/api/user', { id: 100 }, 'showUser').then(data => {
//   console.log(data)
// })
