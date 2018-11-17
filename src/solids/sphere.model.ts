import { Hitable } from "../models/hitable.interface";
import { Ray } from "../models/ray.model";
import { HitRecord } from "../models/hit-record.model";
import { Vector } from "../models/vector.model";
import { VectorMath } from "../utilities/vector-math";
import { Material } from "../materials/material.interface";

export class Sphere implements Hitable {
    rec: HitRecord | undefined;
    center: Vector;
    radius: number;
    material: Material;

    constructor(center: Vector, radius: number, material: Material) {
        this.center = center;
        this.radius = radius;
        this.material = material;
    }

    hit(ray: Ray, tMin: number, tMax: Number, rec: HitRecord): boolean {
        const vm = new VectorMath();
        const oc: Vector = vm.subtract(ray.origin, this.center);
        const a: number = vm.dot(ray.direction, ray.direction);
        const b: number = vm.dot(oc, ray.direction);
        const c: number = vm.dot(oc, oc) - Math.pow(this.radius, 2);
        const d: number = Math.pow(b, 2) - (a * c);

        if (d > 0) {
            let temp = (-b - Math.sqrt(d)) / a;
            if (temp < tMax && temp > tMin) {
                rec.t = temp;
                rec.p = ray.pointAt(rec.t);
                rec.normal = vm.divideWithNumber(vm.subtract(rec.p, this.center), this.radius);
                this.rec = rec;
                this.rec.material = this.material;
                return true;
            }
            temp = (-b + Math.sqrt(d)) / a;
            if (temp < tMax && temp > tMin) {
                rec.t = temp;
                rec.p = ray.pointAt(rec.t);
                rec.normal = vm.divideWithNumber(vm.subtract(rec.p, this.center), this.radius);
                this.rec = rec;
                this.rec.material = this.material;
                return true;
            }
        }

        return false;
    }

}