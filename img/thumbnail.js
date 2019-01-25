// Author: Scott Davis <scott.davis@thoughtworks.com>
//
// This will create thumbnails of all images in a directory
// You supply a width in pixels and a path to a directory 
// USAGE: node thumbnails 200 /path/*.jpg 
// NOTE: This assumes that you have ImageMagick installed.
// https://www.imagemagick.org/script/index.php

const { exec } = require('child_process');
const path = require('path');

if(process.argv.length <= 3){
  console.log(`USAGE: node thumbnails 200 /path/\*.jpg `);
  process.exit(-1);
}

let nodePath, scriptPath, pixelSize, imgs;
[nodePath, scriptPath, pixelSize, ...imgs] = process.argv;

for(let i=0; i<imgs.length; i++){
  let originalFile = imgs[i];
  let file = path.parse(originalFile);
  let newFile = path.join(file.dir, `${file.name}_200px${file.ext}`);

  // convert -resize 200 lentils.jpg lentils_200px.jpg
  exec(`convert -verbose -resize 200 ${originalFile} ${newFile}`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log(err);
      console.log(`stderr: ${stderr}`);
      return;
    }

    // the *entire* stdout (buffered)
    console.log(`stdout: ${stdout}`);
  });
}
