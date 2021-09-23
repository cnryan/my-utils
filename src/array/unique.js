
/*
根据当前数组产生一个去除重复元素后的新数组
*/

// 方法1: 利用forEach()和indexOf()
// 本质是双重遍历, 效率差些
export function unique1(array) {
  const arr = []
  array.forEach(item => {
    if (arr.indexOf(item) === -1) {
      arr.push(item)
    }
  })
  return arr
}

// 方法2: 利用forEach() + 对象容器
// 只需一重遍历, 效率高些
// 需要考虑 item 可能是1和"1"的问题，也要考虑item可能是个对象
export function unique2(array) {
  // const arr = []
  // const obj = {}
  // array.forEach(item => {
  //   if (!obj.hasOwnProperty(typeof item + JSON.stringify(item))) {
  //     obj[typeof item + JSON.stringify(item)] = true
  //     arr.push(item)
  //   }
  // })
  // return arr

  const obj = {}
  return array.filter((item, index, array) => {
    return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ?
      false :
      (obj[typeof item + JSON.stringify(item)] = true)
  })
}

// 方法3：利用ES6语法from+Set, ...+Set
// 编码简洁
export function unique3(array) {
  return [...new Set(array)]
}


// 方法4：利用 filter 方法
export function unique4(array) {
  return array.filter((item, index, array) => {
    return array.indexOf(item) === index
  })
}
