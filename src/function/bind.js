/**
 * 语法: bind(fn, obj, ...args)
 * 功能: 给fn绑定this为obj, 并指定参数为后面的n个参数 (功能等同于函数对象的bind方法)
 */

import { call } from './call'

export function bind(fn, obj, ...args1) {
  return function(...args2) {
    return call(fn, obj, ...args1, ...args2);
  }
}