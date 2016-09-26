"use strict";

let FS = require('fs'),
    PATH = require('path'),
    tinify = require("tinify"),
    SVGO = require('svgo'),
    svgo = new SVGO();

class ImageService {
  getExtension(filename) {
    var arr = filename.split('.');
    return arr[arr.length - 1];
  }

  optimizePNG(files) {
    tinify.key = "70cl3sa3biHXONMyocD0BB-ilnHpDtf2";
    for (var i = 0; i < files.length; i++) {
      let file = PATH.resolve(files[i]);
      FS.readFile(file, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        console.log(file);
        tinify.fromBuffer(data).toBuffer(function(err, resultData) {
          if (err) {
              throw err;
          }
          console.log(resultData);
        });
      });
    }
  }

  optimizeSVG(files) {
    for (var i = 0; i < files.length; i++) {
      let file = PATH.resolve(files[i]);
      FS.readFile(file, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        svgo.optimize(data, function(result) {
          console.log(file);
          FS.writeFile(file, result.data, function(err) {
              if(err) {
                  return console.log(err);
              }
          });
        });
      });
    }
  }
}

module.exports = new ImageService();
