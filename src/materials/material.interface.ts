import { HitRecord } from "../models/hit-record.model";
import { Ray } from "../models/ray.model";
import { Vector } from "../models/vector.model";

export interface Material {
    albedo: Vector;
    attentuation: Vector | undefined;
    scattered: Ray | undefined;
    scatter(ray: Ray, rec: HitRecord, attentuation: Vector, scattered: Ray): boolean
}