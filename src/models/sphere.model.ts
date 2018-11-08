import { Hitable } from "./hitable.interface";
import { Ray } from "./ray.model";
import { HitRecord } from "./hit-record.model";
import { Vector } from "./vector.model";
import { VectorMath } from "../utilities/vector-math";

export class Sphere implements Hitable {
    rec: HitRecord | undefined;
    center: Vector;
    radius: number;

    constructor(center: Vector, radius: number) {
        this.center = center;
        this.radius = radius;
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
                return true;
            }
            temp = (-b + Math.sqrt(d)) / a;
            if (temp < tMax && temp > tMin) {
                rec.t = temp;
                rec.p = ray.pointAt(rec.t);
                rec.normal = vm.divideWithNumber(vm.subtract(rec.p, this.center), this.radius);
                this.rec = rec;
                return true;
            }
        }

        return false;
    }

}