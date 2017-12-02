var asyncAdd = (a,b) => {
  return new Promise((resolve,reject) => {
    setTimeout (() => {
      if(typeof a === 'number' && typeof b === 'number') {
        resolve(a+b);
      }else{
        reject('argumnets must be of type numbers')
      }
    },1500);
  });
};

asyncAdd(5,7).then((res) => {
    console.log('Results: ',res);
    return asyncAdd(res,33);
}).then((res) => {
  console.log('should be 45', res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});

// var somePromise = new Promise((resolve,reject) => {
//   setTimeout(() => {
//       //resolve('hey this is working');
//       reject('hey unable to fullfill promise');
// //it does what is given first...it cant do both it does only one thing
//   },3000);
//
// });
//
// somePromise.then((message) =>{S
//   console.log('success',message);
// },(errorMessage) => {
//   console.log('Error: ',errorMessage);
// });
