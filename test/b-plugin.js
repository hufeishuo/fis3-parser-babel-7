const parser = require("@babel/parser");
const traverse = require("@babel/traverse");

const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

const newAST = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'd.ast.json')));

traverse.default(newAST, {
    enter(path) {
        if (path.isIdentifier({ name: "require" })
            && path.parent.type === 'MemberExpression'
            && path.parent.property
            && path.parent.property.name === 'async'
        ) {
            console.log(1);

            const p = path.findParent((path) => path.isExpressionStatement());
            const callEx = path.findParent((path) => path.isCallExpression());
            const fn = callEx.get('arguments').pop();
            p.getAllPrevSiblings().reverse().forEach(n=>{
                fn.get('body').unshiftContainer(
                    'body', n.node); 
                    n.remove();
            });

        }
    }
});


fs.writeFile('from-b-plugin.js', babel.transformFromAstSync(newAST, '', {}).code, () => { })