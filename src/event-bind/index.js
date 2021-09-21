/*
语法：addEventListener(element, type, fn, selector)
说明：如果selector没有，直接给element绑定事件，
  如果selector有，将selector对应的多个元素的事件委托绑定给父元素element
*/
export function addEventListener(element, type, fn, selector) {
  // 如果没有指定selector, 普通的事件绑定
  if (!selector) {
    element.addEventListener(type, fn)
  } else {
    element.addEventListener(type, function(event) {
      const target = event.target
      // Element.matches(): checks to see if the Element would be selected by the provided selectorString
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
      if (target.matches(selector)) {
        fn.call(target, event)
      }
    })
  }
}
