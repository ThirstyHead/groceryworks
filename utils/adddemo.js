const fs = require('fs-extra');
const path = require('path');

if(process.argv.length <= 2){
  console.log('USAGE: npm run adddemo webcomponents');
  process.exit(1);
}

const demoDir = process.argv[2];
const rootDir = 'demo';
const destDir = path.join(rootDir, demoDir);
fs.mkdir(destDir);
console.log(`Created ${destDir}`);

copyDir('css');
copyDir('img');
copyDir('js');
copyDir('index.html');
copyDir('items.json');
copyDir('favicon.ico');
copyDir('apple-touch-icon.png');


function copyDir(srcDir){
  fs.copy(srcDir, `${destDir}/${srcDir}`, (err) => {
    if(err) throw err;
    console.log(`Copied ${srcDir} to ${destDir}`);
  });
}
