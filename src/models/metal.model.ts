import { Material } from "./material.interface";
import { Ray } from "./ray.model";
import { HitRecord } from "./hit-record.model";
import { Vector } from "./vector.model";
import { VectorMath } from "../utilities/vector-math";

export class Metal implements Material {
    albedo: Vector;

    constructor(a: Vector) {
        this.albedo = a;
    }

    scatter(ray: Ray, rec: HitRecord, attentuation: Vector, scattered: Ray): boolean {
        const vm = new VectorMath();
        const reflected = vm.reflect(vm.unit(ray.direction), rec.normal);
        scattered = new Ray(rec.p, reflected);
        attentuation = this.albedo;
        return (dot)
    }

}