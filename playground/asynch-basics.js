console.log('first');

setTimeout( () =>{
console.log('inside of call-back');
},2000);     //non-blocking io we are able to wait

setTimeout( () =>{
  console.log('second time-out');
},0000);
console.log('second');


//call back function is the one that is passed as an argument to another function
