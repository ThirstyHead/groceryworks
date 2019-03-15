const fs = require('fs');
const parse5 = require('parse5');
const util = require('util');


let utilOptions = {
  depth: null
}
// colors: true

let filename = 'index.html';
let htmlSrc = fs.readFileSync(filename, 'utf8');
let document = parse5.parse(htmlSrc);
console.log(util.inspect(document, utilOptions));
let html = querySelector(document, 'html'); 
let body = querySelector(html, 'body'); 
let container = querySelector(body, '.container');
let main = querySelector(container, 'main'); 
// main.childNodes = [];

//fs.writeFile(filename, parse5.serialize(document), err => {
//  if(err) throw err;
//  console.log(`Saved ${filename}`);
//});
//

function querySelector(parentElement, searchString){
  let result = undefined;
  if(searchString.startsWith('.')){
    let className = searchString.replace('.', '');
    result = parentElement.childNodes.find( element => {
      if(element.attrs){
        return element.attrs.find( attr => {
          return attr['name'] === 'class' && attr['value'] === className;
        });
      }
    });
  } else{
   result = parentElement.childNodes.find( element => element.tagName === searchString );
  }

  return result;
}
