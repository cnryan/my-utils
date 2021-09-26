/*
数组扁平化: 取出嵌套数组(多维)中的所有元素放到一个新数组(一维)中
  如: [1, [3, [2, 4]]]  ==>  [1, 3, 2, 4]
*/

// 方法一: 递归 + reduce() + concat()
export function flatten1(array) {
  return array.reduce((prev, item) => {
    if (Array.isArray(item) && item.some(i => Array.isArray(i))) {
      return prev.concat(flatten1(item))
    } else {
      return prev.concat(item)
    }
  }, [])
}

// 方法二: ... + some() + concat()
export function flatten2(array) {
  let arr = [].concat(...array)
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

/**
 * 数组扁平化，借鉴了underscore
 * @param  {Array} input   要处理的数组
 * @param  {boolean} shallow 是否只扁平一层
 * @param  {boolean} strict  是否严格处理元素，下面有解释
 * @param  {Array} output  这是为了方便递归而传递的参数
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */
export function flattenUnderscore(input, shallow, strict, output) {

  // 递归使用的时候会用到output
  output = output || []
  let idx = output.length

  for (let i = 0, len = input.length; i < len; i++) {

    let value = input[i]
    // 如果是数组，就进行处理
    if (Array.isArray(value)) {
      // 如果是只扁平一层，遍历该数组，依此填入 output
      if (shallow) {
        let j = 0, length = value.length
        while (j < length) output[idx++] = value[j++]
      }
      // 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output
      else {
        flattenUnderscore(value, shallow, strict, output)
        idx = output.length
      }
    }
    // 不是数组，根据 strict 的值判断是跳过不处理还是放入 output
    else if (!strict){
      output[idx++] = value
    }
  }
  return output
}
