import * as  sharp from 'sharp';
import { Vector } from './vector';
import { Ray } from './ray';
import { VectorMath } from './vector-math';

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

  const vm = new VectorMath();

  console.log(data.length);
  console.log(meta);

  //camera
  const llc = new Vector(-2, -1, -1);
  const hor = new Vector(4, 0, 0);
  const ver = new Vector(0, 2, 0);
  const origin = new Vector(0, 0, 0);

  if (meta.width && meta.height && meta.channels) {
    for (let i = 0; i < meta.width; i += 1) {
      for (let j = 0; j < meta.height; j++) {

        const u = i / meta.width;
        const v = j / meta.height;

        const ray: Ray = new Ray(
          origin, vm.add(vm.multiplyWithNumber(hor, u),
          vm.multiplyWithNumber(ver, v))
        );

        const vec3: Vector = color(ray);

        const offset = 3 * (meta.width * j + i);
        data[offset] = 255 * vec3.r;
        data[offset + 1] = 255 * vec3.g;
        data[offset + 2] = 255 * vec3.b;
      }
    }

    await sharp.default(data, { raw: { width: meta.width, height: meta.height, channels: meta.channels } }).toFile('test.png')

  }
})();

function color(ray: Ray) {
  const vm = new VectorMath();
  const unitDirection = vm.unit(ray.direction);
  const t = 0.5 * (unitDirection.y + 1);
  return vm.add(vm.multiplyWithNumber(new Vector(1, 1, 1), (1 - t)),
    vm.multiplyWithNumber(new Vector(0.5, 0.7, 1), t));
}
