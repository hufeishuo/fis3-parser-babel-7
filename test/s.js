function *g(){
  yield 1;
  yield 2;
}

let g1 = g();
g1.next();
g1.next();

let p = new Promise((resolve, reject)=>{
  let r = Math.random();
  if(r > 0.3 ){
    resolve(r)
  } else {
    reject(r);
  }
});

p.then((d)=>{
  console.log(`resolve: ${d}` )
}, (d)=>{
  console.log(`reject: ${d}` )
}).finally(()=>{
  console.log('finally');
});