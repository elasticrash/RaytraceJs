import { Vector } from "./vector";

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

    divide(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.r / v2.r, v1.g / v2.g, v1.b / v2.b);
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
}