import * as  sharp from 'sharp';
import { Vector } from './models/vector.model';
import { Ray } from './models/ray.model';
import { VectorMath } from './utilities/vector-math';
import { HitRecord } from './models/hit-record.model';
import { Hitable } from './models/hitable.interface';
import { Sphere } from './models/sphere.model';
import { HitableList } from './models/hitable-list.model';
const vm = new VectorMath();

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

  //camera
  const llc = new Vector(-2, -1, -1);
  const hor = new Vector(4, 0, 0);
  const ver = new Vector(0, 2, 0);
  const origin = new Vector(0, 0, 0);


  const HObjects: Hitable[] = [];
  HObjects.push(new Sphere(new Vector(0, 0, -1), 0.5))
  HObjects.push(new Sphere(new Vector(0, -100.5, -1), 100))

  const world: Hitable = new HitableList(HObjects);

  if (meta.width && meta.height && meta.channels) {
    for (let j = meta.height - 1; j >= 0; j -= 1) {
      for (let i = 0; i < meta.width; i += 1) {

        const u = i / meta.width;
        const v = j / meta.height;

        const ray: Ray = new Ray(
          origin, vm.add(llc, vm.add(vm.multiplyWithNumber(hor, u),
            vm.multiplyWithNumber(ver, v)))
        );

        const p: Vector = ray.pointAt(2);
        const vec3: Vector = color(ray, world);

        const offset = 3 * (meta.width * j + i);
        data[offset] = 255 * vec3.r;
        data[offset + 1] = 255 * vec3.g;
        data[offset + 2] = 255 * vec3.b;
      }
    }

    await sharp.default(data, { raw: { width: meta.width, height: meta.height, channels: meta.channels } }).rotate(180).toFile('test.png')

  }
})();

function color(ray: Ray, world: Hitable): Vector {
  const rec: HitRecord = new HitRecord(0, new Vector(0, 0, 0), new Vector(0, 0, 0));
  const hit = world.hit(ray, 0, Number.MAX_VALUE, rec);

  if (hit && world.rec) {
    return vm.multiplyWithNumber(new Vector(world.rec.normal.x + 1, world.rec.normal.y + 1, world.rec.normal.z + 1), 0.5);
  }
  else {
    const unitDirection = vm.unit(ray.direction);
    const t = 0.5 * (unitDirection.y + 1);
    return vm.add(vm.multiplyWithNumber(new Vector(1, 1, 1), (1 - t)),
      vm.multiplyWithNumber(new Vector(0.5, 0.7, 1), t));
  }

}