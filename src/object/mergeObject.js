export function mergeObject(...objs) {
  const result = {}

  objs.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (!result.hasOwnProperty(key)) {
        result[key] = obj[key]
      } else {
        result[key] = [].concat(result[key], obj[key])
      }
    })
  })

  // 可以使用reduce来代替forEach手动添加
  return result
}
