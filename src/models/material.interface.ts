import { Ray } from "../ray.model";
import { HitRecord } from "./hit-record.model";
import { Vector } from "./vector.model";

export interface Material {
    scatter(ray: Ray, rec: HitRecord, attentuation: Vector, scattered: Ray): boolean
}