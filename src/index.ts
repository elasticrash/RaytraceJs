import * as  sharp from 'sharp';
import { Vector } from './vector';

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
        const vec3: Vector = new Vector(
          j / meta.height,
          i / meta.width,
          0.2
        );

        const offset = 3 * (meta.width * j + i);
        data[offset] = 255 * vec3.r;
        data[offset + 1] = 255 * vec3.g;
        data[offset + 2] = 255 * vec3.b;
      }
    }

    await sharp.default(data, { raw: { width: meta.width, height: meta.height, channels: meta.channels } }).toFile('test.png')

  }


})();