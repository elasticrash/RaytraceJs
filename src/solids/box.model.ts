import { Hitable } from "../models/hitable.interface";
import { Ray } from "../models/ray.model";
import { HitRecord } from "../models/hit-record.model";
import { Vector } from "../models/vector.model";
import { VectorMath } from "../utilities/vector-math";
import { Material } from "../materials/material.interface";

export class Box implements Hitable {
    rec: HitRecord | undefined;
    bounds: Vector[] = [];
    material: Material;
    sign: boolean[] = [];

    constructor(vmin: Vector, vmax: Vector, material: Material) {
        this.bounds.push(vmin);
        this.bounds.push(vmax);
        this.material = material;
    }

    hit(ray: Ray, tMin: number, tMax: Number, rec: HitRecord): boolean {
        const invdir: Vector = ray.inverse;

        this.sign.push(invdir.x < 0);
        this.sign.push(invdir.y < 0);
        this.sign.push(invdir.z < 0);

        const firstSign = this.sign[0] ? 1 : 0;
        const secondSign = this.sign[1] ? 1 : 0;
        const thirdSign = this.sign[2] ? 1 : 0;

        let tmin = (this.bounds[firstSign].x - ray.origin.x) * invdir.x;
        let tmax = (this.bounds[1 - firstSign].x - ray.origin.x) * invdir.x;
        const tymin = (this.bounds[secondSign].y - ray.origin.y) * invdir.y;
        const tymax = (this.bounds[1 - secondSign].y - ray.origin.y) * invdir.y;

        if ((tmin > tymax) || (tymin > tmax)) {
            return false;
        }
        if (tymin > tmin) {
            tmin = tymin;
        }
        if (tymax < tmax) {
            tmax = tymax;
        }

        const tzmin = (this.bounds[thirdSign].z - ray.origin.z) * invdir.z;
        const tzmax = (this.bounds[1 - thirdSign].z - ray.origin.z) * invdir.z;

        if ((tmin > tzmax) || (tzmin > tmax)) {
            return false;
        }
        if (tzmin > tmin) {
            tmin = tzmin;
        }
        if (tzmax < tmax) {
            tmax = tzmax;
        }


        if (rec.t < 0) {
            rec.t = tmax;
            if (rec.t < 0) return false;
        }

        rec.p = ray.pointAt(rec.t);
        rec.normal = ray.direction;
        this.rec = rec;
        this.rec.material = this.material;

        return true;
    }
}