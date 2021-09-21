/*
将数组拆分成多个 size 长度的区块，每个区块组成小数组,整体组成一个二维数组
*/

export function chunk1(array, size) {
  if (array.length === 0) return []

  size = size || 1;

  size = Math.min(size, array.length)

  let chunkCount = Math.ceil(array.length/size)

  let result = []
  for (let i = 0; i < chunkCount; i++) {
    let start = i * size
    let end = Math.min(start + size, array.length)
    result.push(array.slice(start, end))
  }
  return result;
}

export function chunk2(array, size) {
  if (array.length === 0) return []

  size = size || 1;

  let result = []
  let temp = []

  array.forEach(item => {
    // 先push到result，再push到temp
    // 解决array遍历到底时的边界问题
    if (temp.length === 0) {
      result.push(temp)
    }
    temp.push(item)
    if (temp.length === size) {
      temp = []
    }
  })
  return result
}
