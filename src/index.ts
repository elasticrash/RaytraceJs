import * as  sharp from 'sharp';
import { Vector } from './models/vector.model';
import { Ray } from './models/ray.model';
import { VectorMath } from './utilities/vector-math';
import { HitRecord } from './models/hit-record.model';
import { Hitable } from './models/hitable.interface';
import { Sphere } from './models/sphere.model';
import { HitableList } from './models/hitable-list.model';
import { Camera } from './models/camera.model';
import { Lambertian } from './materials/lambertian.model';
import { Material } from './materials/material.interface';
import { Metal } from './materials/metal.model';
import { Dialectric } from './materials/dialectric.model';
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
  const ns = 100;

  //camera
  const cam = new Camera(90, 2);

  const HObjects: Hitable[] = [];
  HObjects.push(new Sphere(new Vector(0, 0, -1), 0.5, new Lambertian(new Vector(0.1, 0.2, 0.5))));
  HObjects.push(new Sphere(new Vector(0, -100.5, -1), 100, new Lambertian(new Vector(0.8, 0.8, 0))));
  HObjects.push(new Sphere(new Vector(1, 0, -1), 0.5, new Metal(new Vector(0.8, 0.6, 0.2), 0.1)));
  HObjects.push(new Sphere(new Vector(-1, 0, -1), 0.5, new Dialectric(1.5)));
  HObjects.push(new Sphere(new Vector(-1, 0, -1), 0.45, new Dialectric(1.5)));


  const world: Hitable = new HitableList(HObjects);

  if (meta.width && meta.height && meta.channels) {
    for (let j = meta.height - 1; j >= 0; j -= 1) {
      for (let i = 0; i < meta.width; i += 1) {

        if (j % 100) {
          process.stdout.write(`Rendering: ${Math.round(Math.abs(((j / meta.height) * 100) - 100)).toString()}%\r`);
        }
        let col = new Vector(0, 0, 0);
        let previous = new Vector(0, 0, 0);

        for (let s = 0; s < ns; s += 1) {
          const u = (i + Math.random()) / meta.width;
          const v = (j + Math.random()) / meta.height;
          const ray: Ray = cam.ray(u, v);
          const p: Vector = ray.pointAt(2);
          const cc = color(ray, world, 0)
          col = vm.add(cc, previous);
          previous = new Vector(col.r, col.g, col.b);
        }

        col = vm.divideWithNumber(col, ns);
        col = new Vector(Math.sqrt(col.r), Math.sqrt(col.g), Math.sqrt(col.b));
        const offset = 3 * (meta.width * j + i);
        data[offset] = 255 * col.r;
        data[offset + 1] = 255 * col.g;
        data[offset + 2] = 255 * col.b;
      }
    }

    await sharp.default(data, { raw: { width: meta.width, height: meta.height, channels: meta.channels } }).rotate(180).flop().toFile('test.png')

  }
})();

function color(ray: Ray, world: Hitable, depth: number): Vector {
  const rec: HitRecord = new HitRecord(
    0,
    new Vector(0, 0, 0),
    new Vector(0, 0, 0));
  const hit = world.hit(ray, 0.001, Number.MAX_VALUE, rec);

  if (hit && world.rec && world.rec.material) {
    const scattered = new Ray(new Vector(0, 0, 0), new Vector(0, 0, 0));
    const attenutation = new Vector(0, 0, 0);

    if (depth < 50 && world.rec.material.scatter(ray, world.rec, attenutation, scattered)) {
      if (world.rec.material.scattered && world.rec.material.attentuation) {
        return vm.multiply(world.rec.material.attentuation, color(world.rec.material.scattered, world, depth + 1));
      } else {
        return new Vector(0, 0, 0);
      }
    } else {
      return new Vector(0, 0, 0);
    }
  }
  else {
    const unitDirection = vm.unit(ray.direction);
    const t = 0.5 * (unitDirection.y + 1);
    return vm.add(vm.multiplyWithNumber(new Vector(1, 1, 1), (1 - t)),
      vm.multiplyWithNumber(new Vector(0.5, 0.7, 1), t));
  }
}
