require.async(['/components/index.js'], function(){
  const p = Promise.resolve(1);
  p.then(d=>{
      console.log(d);
  })
  .finally(()=>{
      console.log('finally');
  });
});