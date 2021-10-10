/** 函数工具 **/
export { call } from './function/call'
export { apply } from './function/apply'
export { bind } from './function/bind'
export { throttle} from './function/throttle' // 节流
export { debounce } from './function/debounce' // 防抖
export { isFunction, isArray, isPlainObject, isEmptyObject, isArrayLike, isElement } from './function/type'
export { each } from './function/each'
export { curry, currySimple1, currySimple2, curryWithHoles } from './function/curry'
export { partial, partialWithHoles } from './function/partial' // 偏函数
export { compose } from './function/compose' // 组合
export { memoize1, memoize2 } from './function/memoize' // 函数记忆
export { parseUrlParam } from './function/parseUrlParam' // 解析URL参数为对象

/** 数组工具 **/
export { map, reduce, filter, find, findIndex, every, some} from './array/declares'
export { unique1, unique2, unique3, unique4 } from './array/unique'
export { concat } from './array/concat'
export { slice } from './array/slice'
export { flatten1, flatten2, flattenUnderscore } from './array/flatten'
export { chunk1, chunk2 } from './array/chunk'
export { difference } from './array/difference'
export { pull, pullAll } from './array/pull'
export { drop, dropRight } from './array/drop'
export { shuffle } from './array/shuffle'

/** 对象工具 **/
export { newInstance } from'./object/newInstance'
export { myInstanceOf } from './object/myInstanceOf'
export { mergeObject } from './object/mergeObject'
export { clone1, clone2 } from './object/clone'
export { deepClone1, deepClone2, deepClone3, deepClone4 } from './object/deepClone'
export { myExtend } from './object/extend'

/** 字符串工具 **/
export { reverseString, palindrome, truncate } from './string/index'

/** 时间绑定 **/
export { addEventListener } from './event-bind/index'

/** 事件总线 **/
export { eventBus } from './event-bus/index'

/** 消息订阅与发布 **/
export { PubSub } from './pub-sub/index'
