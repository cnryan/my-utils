/*
数组扁平化: 取出嵌套数组(多维)中的所有元素放到一个新数组(一维)中
  如: [1, [3, [2, 4]]]  ==>  [1, 3, 2, 4]
*/

// 方法一: 递归 + reduce() + concat()
export function flatten1(array) {
  return array.reduce((acc, item) => {
    if (Array.isArray(item) && item.some(i => Array.isArray(i))) {
      return acc.concat(flatten1(item))
    } else {
      return acc.concat(item)
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
