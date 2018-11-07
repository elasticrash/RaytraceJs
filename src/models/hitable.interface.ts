import { Ray } from "./ray.model";
import { HitRecord } from "./hit-record.model";

export interface Hitable {
    hit(ray: Ray, tMin: number, tMax: Number, rec: HitRecord): boolean
    rec: HitRecord | undefined;
}