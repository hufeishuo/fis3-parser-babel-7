const babel = require('@babel/core');

const extend = require('extend');
const fs = require('fs');



const parsedAst = JSON.parse(fs.readFileSync('s.ast.json')) ; 

const {code, map, ast} = babel.transformFromAstSync(parsedAst, '', {
  sourceMaps: 'inline'
});

fs.writeFileSync('fromast.js', code+'\n\n'+map, ()=>{});