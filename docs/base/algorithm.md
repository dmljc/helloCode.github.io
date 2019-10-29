# 算法基础 

## 排序

数组排序比较常用的：冒泡排序、快速排序、sort()方法排序......

* 冒泡排序：

从数组中随便拿一个数与后一位比较，如果前者比后者大，那么两者交换位置，从而遍历数组可以得到排序的效果。

``` js
let arr = [1, 9, 4, 50, 49, 6, 3, 2];
let test = (arr) => {
    for (let i = 0, len = arr.length; i < len - 1; i++){
        for (let j = i + 1, len = arr.length; j < len; j++){
            let tempi = arr[i];     //获取第一个值，并与后一个值比较
            let tempj = arr[j];
            if (tempi > tempj){
                arr[i] = tempj;
                arr[j] = tempi; //如果前一个值比后一个值大，那么相互交换
            }
        }
    } 
    console.log(arr);   // [1, 2, 3, 4, 6, 9, 49, 50]
}
test(arr);
```  

* 快速排序：

找出数组中间那一个值，然后用这个值跟数组里面的值相比较，大于此值的放在一边，小于的也放在一边， 然后用concat()合并，再进行比较，如此反复。

``` js
let arr = [1, 9, 4, 50, 49, 6, 3, 2];
let test = (arr) => {
    if (arr.length <= 1) return arr;    //如果数组只有一位，就没有必要比较了
    let index = Math.floor(arr.length / 2);   //获取中间值的索引
    let cur = arr.splice(index, 1);   //截取中间值，如果此处使用cur=arr[index]; 那么将会出现无限递归的错误
    let left = [];
    let right = [];    //小于中间值的放在left数组里，大于的放在right数组
    for (let i = 0, len = arr.length; i < len; i++){
        if (cur > arr[i]){
            left.push(arr[i]);
        } else{
            right.push(arr[i]);
        }
    }
    return test(left).concat(cur, test(right));   //通过递归，上一轮比较好的数组合并，并且再次进行比较
}
test(arr);
```    
  
* sort()方法：简单粗暴
  
``` js
let arr = [1, 9, 4, 50, 49, 6, 3, 2];

let test = (arr) => {
    return arr.sort((a, b) => a - b);
}

test(arr);   // [1, 2, 3, 4, 6, 9, 49, 50]
```

## 整理中...