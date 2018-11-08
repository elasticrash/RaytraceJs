import { Material } from "./material.interface";
import { Ray } from "./ray.model";
import { Vector } from "./vector.model";
import { HitRecord } from "./hit-record.model";
import { VectorMath } from "../utilities/vector-math";

export class Lambertian implements Material {
    albedo: Vector;

    constructor(a: Vector) {
        this.albedo = a;
    }
    scatter(ray: Ray, rec: HitRecord, attentuation: Vector, scattered: Ray): boolean {
        const vm = new VectorMath();
        const target = vm.add(vm.add(rec.p, rec.normal), vm.randomInUnitSphere());
        scattered = new Ray(rec.p, target);
        attentuation = this.albedo;
        return true;
    }

}