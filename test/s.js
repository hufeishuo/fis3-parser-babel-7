require.async('test/es2015.js', ()=>{
  const p = Promise.resolve(1);
  p.then(d=>{
      console.log(d);
  })
  .finally(()=>{
      console.log('finally|n\n');
  })
  console.log('test script end!');
})