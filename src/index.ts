import * as  sharp from 'sharp';

(async () => {
  const image = sharp.default({
    create: {
      width: 200,
      height: 100,
      channels: 3,
      background: { r: 255, g: 0, b: 0 }
    }
  }).png();


  const data = await image.raw().toBuffer();
  const meta: sharp.Metadata = await image.metadata();


  console.log(data.length);
  console.log(meta);


  if (meta.width && meta.height && meta.channels) {
    for (let i = 0; i < meta.width; i += 1) {
      for (let j = 0; j < meta.height; j++) {
        const offset = 3 * (meta.width * j + i);
        data[offset] = 255 * (j / meta.height);
        data[offset + 1] = 255 * (i / meta.width);
        data[offset + 2] = 255 * 0.2;
      }
    }

    await sharp.default(data, { raw: { width: meta.width, height: meta.height, channels: meta.channels } }).toFile('test.png')

  }


})();