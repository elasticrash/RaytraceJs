export class Vector {
    public e: number[]

    constructor(e1: number, e2: number, e3: number) {
        this.e = [
            e1, e2, e3
        ]
    }

    get x() {
        return this.e[0];
    }

    set x(x: number) {
        this.e[0] = x;
    }

    get y() {
        return this.e[1];
    }

    set y(y: number) {
        this.e[1] = y;
    }

    get z() {
        return this.e[2];
    }

    set z(z: number) {
        this.e[2] = z;
    }

    get r() {
        return this.e[0];
    }

    get g() {
        return this.e[1];
    }

    get b() {
        return this.e[2];
    }

    get positive() {
        return this.e;
    }

    get negative() {
        return [-this.r, this.g, this.b];
    }

    get length() {
        return Math.sqrt(Math.pow(this.r, 2) + Math.pow(this.g, 2) + Math.pow(this.b, 2));
    }

    get squareLength() {
        return Math.pow(this.r, 2) + Math.pow(this.g, 2) + Math.pow(this.b, 2);
    }

    get unitVector() {
        const k = 1 / this.length;
        return [k, k, k];
    }
}