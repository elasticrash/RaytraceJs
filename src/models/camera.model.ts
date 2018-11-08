import { Vector } from "./vector.model";
import { VectorMath } from "../vector-math";
import { Ray } from "./ray.model";

export class Camera {
    origin: Vector;
    llc: Vector;
    hor: Vector;
    ver: Vector;

    constructor() {
        this.llc = new Vector(-2, -1, -1);
        this.hor = new Vector(4, 0, 0);
        this.ver = new Vector(0, 2, 0);
        this.origin = new Vector(0, 0, 0);
    }

    ray(u: number, v: number) {
        const vm = new VectorMath();
        return new Ray(
            this.origin, 
            vm.subtract(vm.add(this.llc, vm.add(vm.multiplyWithNumber(this.hor, u),
                vm.multiplyWithNumber(this.ver, v))), this.origin
            ));
    }
}