const fs = require('fs');
const parse5 = require('parse5');
const htmlparser2Adapter = require('parse5-htmlparser2-tree-adapter');
let parserOptions = {
  treeAdapter: htmlparser2Adapter
}
const CSSselect = require('css-select');




let filename = 'index.html';
let htmlSrc = fs.readFileSync(filename, 'utf8');
let document = parse5.parse(htmlSrc, parserOptions);
let main = CSSselect.selectOne(document, 'main');
console.log(main);


// let html = querySelector(document, 'html'); 
// let body = querySelector(html, 'body'); 
// let container = querySelector(body, '.container');
// let main = querySelector(container, 'main'); 
// main.childNodes = [];

fs.writeFile(filename, parse5.serialize(document), err => {
  if(err) throw err;
  console.log(`Saved ${filename}`);
});


// function querySelector(parentElement, searchString){
//   let result = undefined;
//   if(searchString.startsWith('.')){
//     let className = searchString.replace('.', '');
//     console.log(parentElement);
//     result = parentElement.children.find( element => {
//       if(element.attrs){
//         return element.attrs.find( attr => {
//           return attr['name'] === 'class' && attr['value'] === className;
//         });
//       }
//     });
//   } else{
//    result = parentElement.children.find( element => element.tagName === searchString );
//   }

//   return result;
// }
