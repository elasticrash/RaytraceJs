import { Vector } from "./vector.model";
import { Ray } from "./ray.model";
import { VectorMath } from "../utilities/vector-math";

export class Camera {
    origin: Vector;
    llc: Vector;
    hor: Vector;
    ver: Vector;
    u: Vector;
    v: Vector;
    w: Vector;
    lenseRadius: number;

    constructor(lookFrom: Vector, lookAt: Vector, vUp: Vector, vfov: number, aspect: number, aperture: number, focusDist: number) {
        const vm = new VectorMath();
        this.lenseRadius = aperture / 2;

        const theta = vfov * Math.PI / 180;
        const halfHeight = Math.tan(theta / 2);
        const halfWidth = aspect * halfHeight;

        this.origin = lookFrom;

        this.w = vm.unit(vm.subtract(lookFrom, lookAt));
        this.u = vm.unit(vm.cross(vUp, this.w));
        this.v = vm.cross(this.w, this.u);


        const focusxW = vm.multiplyWithNumber(this.w, focusDist);
        const hwxfocusxU = vm.multiplyWithNumber(this.u, halfWidth * focusDist);
        const hhxfocusxV = vm.multiplyWithNumber(this.v, halfHeight * focusDist);

        this.llc = vm.subtract(
            this.origin,
            vm.add(
                vm.add(hwxfocusxU, hhxfocusxV),
                focusxW));

        this.hor = vm.multiplyWithNumber(this.u, 2 * halfWidth * focusDist);
        this.ver = vm.multiplyWithNumber(this.v, 2 * halfHeight * focusDist);

        // this.llc = new Vector(-2, -1, -1);
        console.log("camera ok");
    }

    ray(s: number, t: number) {
        const vm = new VectorMath();
        const rd = vm.multiplyWithNumber(vm.randomInUnitDisk(), this.lenseRadius);
        const offset = new Vector(0, 0, 0);//vm.add(vm.multiplyWithNumber(this.u, rd.x), vm.multiplyWithNumber(this.v, rd.y));
        return new Ray(
            vm.add(this.origin, offset),
            vm.subtract(vm.add(this.llc, vm.add(vm.multiplyWithNumber(this.hor, s),
                vm.multiplyWithNumber(this.ver, t))),
                vm.subtract(this.origin, offset)
            ));
    }
}