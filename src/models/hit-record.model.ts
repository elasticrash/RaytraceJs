import { Vector } from "./vector.model";
import { Material } from "./material.interface";

export class HitRecord {
    t: number;
    p: Vector;
    normal: Vector;
    material: Material;

    constructor(t: number, p: Vector, normal: Vector, material: Material) {
        this.t = t;
        this.p = p;
        this.normal = normal;
        this.material = material;
    }
}