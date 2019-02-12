const fs = require('fs');
const parse5 = require('parse5');

let filename = 'index.html';
let html = fs.readFileSync(filename, 'utf8');
let document = parse5.parse(html);
// console.log(document);

// let main = JSON.stringify(document.childNodes, null, 2);
// console.log(main);

fs.writeFile(filename, parse5.serialize(document), err => {
  if(err) throw err;
  console.log(`Saved ${filename}`);
});
