import { Vector } from "./vector.model";
import { Ray } from "./ray.model";
import { VectorMath } from "../utilities/vector-math";

export class Camera {
    origin: Vector;
    llc: Vector;
    hor: Vector;
    ver: Vector;

    constructor(lookFrom: Vector, lookAt: Vector, vUp: Vector, vfov: number, aspect: number) {
        const theta = vfov * Math.PI / 180;
        const halfHeight = Math.tan(theta / 2);
        const halfWidth = aspect * halfHeight;

        this.llc = new Vector(-halfWidth, -halfHeight, -1);
        this.hor = new Vector(2 * halfWidth, 0, 0);
        this.ver = new Vector(0, 2 * halfHeight, 0);
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