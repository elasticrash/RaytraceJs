import { Material } from "./material.interface";
import { Vector } from "../models/vector.model";
import { Ray } from "../models/ray.model";
import { HitRecord } from "../models/hit-record.model";
import { VectorMath } from "../utilities/vector-math";

export class Dialectric implements Material {
    albedo: Vector;
    refIdx: number;
    attentuation: Vector | undefined;
    scattered: Ray | undefined;
    refracted: Vector | undefined;

    constructor(ri: number) {
        this.refIdx = ri;
        this.albedo = new Vector(0, 0, 0);
    }

    scatter(ray: Ray, rec: HitRecord, attentuation: Vector, scattered: Ray): boolean {
        const vm = new VectorMath();

        let outwardNormal = new Vector(0, 0, 0);
        const reflected = vm.reflect(ray.direction, rec.normal);
        let niOverNt;
        this.attentuation = new Vector(1, 1, 0);
        let refletProb;
        let cosine;

        if (vm.dot(ray.direction, rec.normal) > 0) {
            outwardNormal = vm.flipSign(rec.normal);
            niOverNt = this.refIdx;
            cosine = this.refIdx * vm.dot(ray.direction, rec.normal) / ray.direction.length;

        } else {
            outwardNormal = rec.normal;
            niOverNt = 1 / this.refIdx;
            cosine = -vm.dot(ray.direction, rec.normal) / ray.direction.length;
        }

        if (this.refract(ray.direction, outwardNormal, niOverNt)) {
            refletProb = this.schlick(cosine, this.refIdx);
        } else {
            this.scattered = new Ray(rec.p, reflected);
            refletProb = 1;
        }

        if (Math.random() < refletProb) {
            this.scattered = new Ray(rec.p, reflected);
        } else {
            if (this.refracted) {
                this.scattered = new Ray(rec.p, this.refracted);
            } else {
                this.scattered = new Ray(rec.p, reflected);
            }
        }
        return true;
    }

    refract(v1: Vector, v2: Vector, niOverNt: number) {
        const vm = new VectorMath();
        const uv = vm.unit(v1);
        const dt = vm.dot(uv, v2);
        const discriminant = 1 - Math.pow(niOverNt, 2) * (1 - Math.pow(dt, 2));
        if (discriminant > 0) {
            const pa = vm.subtract(uv, vm.multiplyWithNumber(v2, dt));
            const pb = vm.multiplyWithNumber(v2, Math.sqrt(discriminant));
            this.refracted = vm.subtract(vm.multiplyWithNumber(pa, niOverNt), pb);
            return true;
        } else {
            return false;
        }
    }

    schlick(cosine: number, refIdx: number): number {
        let r0 = (1 - refIdx) / (1 + refIdx);
        r0 = Math.pow(r0, 2);

        return r0 + (1 - r0) * Math.pow(1 - cosine, 5);
    }
}