import { Vector } from "./vector.model";
import { Ray } from "./ray.model";
import { VectorMath } from "../utilities/vector-math";

export class Camera {
    origin: Vector;
    llc: Vector;
    hor: Vector;
    ver: Vector;

    constructor(lookFrom: Vector, lookAt: Vector, vUp: Vector, vfov: number, aspect: number) {
        const vm = new VectorMath();
        const theta = vfov * Math.PI / 180;
        const halfHeight = Math.tan(theta / 2);
        const halfWidth = aspect * halfHeight;

        this.origin = lookFrom;
        const w = vm.unit(vm.subtract(lookFrom, lookAt));
        const u = vm.unit(vm.cross(vUp, w));
        const v = vm.cross(w, u);

        this.llc = vm.subtract(vm.multiplyWithNumber(u, halfWidth), vm.multiplyWithNumber(v, halfHeight));
        this.hor = new Vector(2 * halfWidth, 0, 0);
        this.ver = new Vector(0, 2 * halfHeight, 0);
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