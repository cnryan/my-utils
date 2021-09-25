/** 函数工具 **/
export { call } from './function/call'
export { apply } from './function/apply'
export { bind } from './function/bind'
export { throttle} from './function/throttle'
export { debounce } from './function/debounce'
export { isFunction, isArray, isPlainObject, isEmptyObject, isArrayLike, isElement } from './function/type'
export { each } from './function/each'

/** 数组工具 **/
export { map, reduce, filter, find, findIndex, every, some} from './array/declares'
export { unique1, unique2, unique3, unique4 } from './array/unique'
export { concat } from './array/concat'
export { slice } from './array/slice'
export { flatten1, flatten2 } from './array/flatten'
export { chunk1, chunk2 } from './array/chunk'
export { difference } from './array/difference'
export { pull, pullAll } from './array/pull'
export { drop, dropRight } from './array/drop'

/** 对象工具 **/
export { newInstance } from'./object/newInstance'
export { myInstanceOf } from './object/myInstanceOf'
export { mergeObject } from './object/mergeObject'
export { clone1, clone2 } from './object/clone'
export { deepClone1, deepClone2, deepClone3, deepClone4 } from './object/deepClone'

/** 字符串工具 **/
export { reverseString, palindrome, truncate } from './string/index'

/** 时间绑定 **/
export { addEventListener } from './event-bind/index'

/** 事件总线 **/
export { eventBus } from './event-bus/index'

/** 消息订阅与发布 **/
export { PubSub } from './pub-sub/index'
