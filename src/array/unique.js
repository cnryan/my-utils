
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
export function unique2(array) {
  const arr = []
  const obj = {}
  array.forEach(item => {
    if (!obj.hasOwnProperty(item)) {
      obj[item] = true
      arr.push(item)
    }
  })
  return arr
}

// 方法3：利用ES6语法from+Set, ...+Set
// 编码简洁
export function unique3(array) {
  return [...new Set(array)]
}
