import { Vector } from "./vector";
import { VectorMath } from "./vector-math";

export class Ray {
    v1: Vector;
    v2: Vector;

    constructor(v1: Vector, v2: Vector) {
        this.v1 = v1;
        this.v2 = v2;
    }

    get origin() {
        return this.v1;
    }

    get direction() {
        return this.v2;
    }

    pointAt(t: number) {
        const vm = new VectorMath();
        const scale = vm.scale(this.v2, t);
        const add = vm.add(this.v1, scale);

        return add;
    }
}