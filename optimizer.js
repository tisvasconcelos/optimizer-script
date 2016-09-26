let recursive = require('recursive-readdir'),
    imageService = require('./imageService');

let svgs = [],
    pngs = [];

let images = images => {
  for (var i = 0; i < images.length; i++) {
    if(imageService.getExtension(images[i]) === "svg") {
      svgs.push(images[i]);
    }else if(imageService.getExtension(images[i]) === "png"){
      pngs.push(images[i]);
    }
  }

  console.log('png encontrado: ', pngs.length);
  console.log('svg encontrado: ', svgs.length);

  imageService.optimizeSVG(svgs);
  imageService.optimizePNG(pngs);
};

recursive('images', function (err, files) {
  images(files);
});
