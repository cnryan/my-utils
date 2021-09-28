/**
 * Fisher–Yates算法，实现真正的随机
 * 遍历数组元素，然后将当前元素与以后随机位置的元素进行交换
 */
export function shuffle() {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}


// 伪随机，因为V8在处理 sort 方法时，当目标数组长度小于 10 时，使用插入排序；反之，使用快速排序和插入排序的混合排序。
// 而在插入排序的算法中，当待排序元素跟有序元素进行比较时，一旦确定了位置，就不会再跟位置前面的有序元素进行比较，所以就乱序的不彻底。
// var values = [1, 2, 3, 4, 5];
//
// values.sort(function(){
//     return Math.random() - 0.5;
// });

// function InsertionSort(a, from, to) {
//   for (var i = from + 1; i < to; i++) {
//     var element = a[i];
//     for (var j = i - 1; j >= from; j--) {
//       var tmp = a[j];
//       var order = comparefn(tmp, element);
//       if (order > 0) {
//         a[j + 1] = tmp;
//       } else {
//         break;
//       }
//     }
//     a[j + 1] = element;
//   }
// }
