const sharp = require('sharp');

const makeThumbnail = async (file, thumbName) => {
  await sharp(file)
    .resize(500, 500)
    .png()
    .toFile('../uploads' + thumbName);
};

module.exports = { makeThumbnail };
