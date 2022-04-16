const fs = require('fs');
const path = require('path');

const copyAssets = (from, to) => {
  fs.mkdirSync(to);
  fs.readdirSync(from).forEach((element) => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else {
      copyAssets(path.join(from, element), path.join(to, element));
    }
  });
};

const copyFiles = () => {
  try {
    fs.copyFileSync('./src/manifest.json', './dist/manifest.json');

    copyAssets('./src/assets/', './dist/assets/');
  } catch (err) {
    console.error(err);
  }
};

copyFiles();
