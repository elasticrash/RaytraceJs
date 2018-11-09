import { Vector } from "../models/vector.model";

export class VectorMath {

    add(v1: Vector, v2: Vector) {
        return new Vector(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b);
    }

    subtract(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.r - v2.r, v1.g - v2.g, v1.b - v2.b);
    }

    multiply(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b);
    }

    multiplyWithNumber(v1: Vector, t: number): Vector {
        return new Vector(v1.r * t, v1.g * t, v1.b * t);
    }

    divide(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.r / v2.r, v1.g / v2.g, v1.b / v2.b);
    }

    divideWithNumber(v1: Vector, t: number): Vector {
        return new Vector(v1.r / t, v1.g / t, v1.b / t);
    }

    scale(v1: Vector, scale: number): Vector {
        return new Vector(v1.r * scale, v1.g * scale, v1.b * scale);
    }

    dot(v1: Vector, v2: Vector): number {
        return v1.r * v2.r + v1.g * v2.g + v1.b * v2.b;
    }

    cross(v1: Vector, v2: Vector): Vector {
        return new Vector(
            v1.g * v2.b - v1.b * v2.g,
            -(v1.r * v2.b - v1.b * v2.r),
            v1.r * v2.g - v1.g * v2.r);
    }

    flipSign(v1: Vector) {
        return new Vector(-v1.r, -v1.g, -v1.b);
    }

    unit(v1: Vector): Vector {
        return this.divideWithNumber(v1, v1.length);
    }

    randomInUnitSphere(): Vector {
        let p = new Vector(0, 0, 0);
        do {
            p = this.subtract(this.multiplyWithNumber(new Vector(Math.random(), Math.random(), Math.random()), 2), new Vector(1, 1, 1));
        } while (p.squareLength >= 1);

        return p;
    }

    reflect(v1: Vector, v2: Vector): Vector {
        return this.subtract(
            v1,
            this.multiplyWithNumber(
                this.multiplyWithNumber(v2, this.dot(v1, v2)),
                2)
        );
    }
}