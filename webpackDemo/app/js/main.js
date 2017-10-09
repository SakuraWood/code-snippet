$('div').each(function(index,element){
  $(this).addClass('test')
})






// let divList = document.querySelectorAll('div');   //divList不是数组，而是nodeList
//
// //进行转换后再遍历
// [].slice.call(divList).forEach(function(element,index){
//   element.classList.add('test')
// })
//
//
// Array.prototype.slice.call(divList).forEach(function(element,index){
//   element.classList.remove('test')
// })
//
// [...divList].forEach(function(element,index){
//   //do something
// })




// Array.forEach(function(value , index , array){
//   //do something
// },thisArg)



//
// let array1 = ['a','b','c'];
//
// for (let i = 0;i < array1.length;i++){
//   console.log(array1[i]);  // a  b  c
// }

/*var b = 1

function test(){

  console.log(typeof b)  //b is not defined
  console.log(typeof sss)  //不报错
  let b = 2
}

test()*/

/*
var a = []
var b = []
for(var i = 0;i<10;i++){
  (function(i){
    a[i] = function(){
      console.log(i);
    }
  })(i)  //采用闭包的方式 增加一层作用域 以达到缓存变量的目的
}


for(let j = 0;j<10;j++){
  b[j] = () => {
    console.log(j);
  }
}

a[6]()   //10
b[5]()   //5
*/
