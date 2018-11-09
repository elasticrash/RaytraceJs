import { Vector } from "./vector.model";
import { Material } from "../materials/material.interface";

export class HitRecord {
    t: number;
    p: Vector;
    normal: Vector;
    material: Material | undefined;

    constructor(t: number, p: Vector, normal: Vector) {
        this.t = t;
        this.p = p;
        this.normal = normal;
    }
}