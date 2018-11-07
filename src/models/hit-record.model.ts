import { Vector } from "./vector.model";

export class HitRecord {
    t: number;
    p: Vector;
    normal: Vector;

    constructor(t: number, p: Vector, normal: Vector) {
        this.t = t;
        this.p = p;
        this.normal = normal;
    }
}