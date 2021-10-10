// 解析URL参数为对象
export function parseUrlParam(url) {
  // 将 ? 后面的字符串取出来
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // exec和match在正则不带g时效果一样
  // 将字符串以 & 分割后存到数组中
  const paramsArr = paramsStr.split('&');
  let paramsObj = {};
  paramsArr.forEach(param => {
    if (/=/.test(param)) {
      // 处理有 value 的参数
      let [key, val] = param.split('=');
      val = decodeURIComponent(val);
      val = /^\d+$/.test(val) ? parseFloat(val) : val;

      if (paramsObj.hasOwnProperty(key)) {
        // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else {
        // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else {
      // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  })
  return paramsObj;
}
