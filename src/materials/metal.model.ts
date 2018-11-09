import { Material } from "./material.interface";
import { Ray } from "../models/ray.model";
import { HitRecord } from "../models/hit-record.model";
import { Vector } from "../models/vector.model";
import { VectorMath } from "../utilities/vector-math";

export class Metal implements Material {
    albedo: Vector;
    attentuation: Vector | undefined;
    scattered: Ray | undefined;
    fuzz: number | undefined;

    constructor(a: Vector, f: number) {
        this.albedo = a;
        this.fuzz = (f < 1) ? f : 1;
    }

    scatter(ray: Ray, rec: HitRecord, attentuation: Vector, scattered: Ray): boolean {
        const vm = new VectorMath();
        const reflected = vm.reflect(vm.unit(ray.direction), rec.normal);
        scattered = new Ray(rec.p, vm.add(reflected, vm.multiplyWithNumber(vm.randomInUnitSphere(), this.fuzz ? this.fuzz : 1)));
        attentuation = this.albedo;
        this.attentuation = attentuation;
        this.scattered = scattered;
        return (vm.dot(scattered.direction, rec.normal) > 0)
    }

}