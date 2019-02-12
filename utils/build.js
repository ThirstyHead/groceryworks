const fs = require('fs');
const parse5 = require('parse5');

let filename = 'index.html';
let htmlSrc = fs.readFileSync(filename, 'utf8');
let document = parse5.parse(htmlSrc);
let html = querySelector(document, 'html'); 
let body = querySelector(html, 'body'); 
let container = body.childNodes.find( element => {
  if(element.attrs){
    return element.attrs.find( attr => attr.value === 'container');
  }
});
let main = querySelector(container, 'main'); 
main.childNodes = [];

fs.writeFile(filename, parse5.serialize(document), err => {
  if(err) throw err;
  console.log(`Saved ${filename}`);
});


function querySelector(parentElement, searchString){
  return parentElement.childNodes.find( element => element.tagName === searchString );
}
