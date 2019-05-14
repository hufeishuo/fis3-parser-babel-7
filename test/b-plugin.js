const parser = require('@babel/parser');
const traverse = require('@babel/traverse');

const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

const newAST = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'd.ast.json')));

let ra = null;
let requires = [];
traverse.default(newAST, {
	Program: {
		enter(path) {
			ra = null;
			requires = [];
		},
		exit(path) {
			if (requires.length === 0) {
				return false;
			}
			const last = path.get('body').pop();

			let hasRA = path.get('body').some((n) => {
				if (
					n.type === 'ExpressionStatement' &&
					n.node.expression.type === 'CallExpression' &&
					n.node.expression.callee &&
					n.node.expression.callee.type === 'MemberExpression' &&
					n.node.expression.callee.object.name === 'require' &&
					n.node.expression.callee.property.name === 'async'
				) {
					ra = n;

					let raArgs = [],
						raCallback = null;
					if (n.node.expression.arguments[0].type === 'ArrayExpression') {
						raArgs = n.node.expression.arguments[0];
						raCallback = n.node.expression.arguments[1];
					}

					requires.reverse().forEach((n, i) => {
						let args = n.get('arguments');
						args && raArgs.elements.unshift(args[0].node);
						let varName = 'xx' + i;
						console.log(varName);
                        const varObj= {
                            "type": "Identifier",
                            "name": varName
                        };

						raCallback.params.unshift(varObj);

                        n.replaceWith(varObj);

					});

                    const box = ra.get('body');

					const allPrevs = ra.getAllPrevSiblings();
					allPrevs.reverse().forEach((n) => {
						raCallback.body.body.unshift(n.node);
						n.remove();
					});
				}
			});
		}
	},

	CallExpression: {
		exit(path) {
			if (path.get('callee').node.name === 'require') {
				console.log(path.get('arguments')[0].node.value);
				requires.push(path);
			}
		}
	}
});

fs.writeFile('from-b-plugin.js', babel.transformFromAstSync(newAST, '', {}).code, () => {});
