import { Hitable } from "./hitable.interface";
import { Ray } from "./ray.model";
import { HitRecord } from "./hit-record.model";
import { Vector } from "./vector.model";

export class HitableList implements Hitable {

    list: Hitable[];
    listSize: number;
    rec: HitRecord | undefined;

    constructor(list: Hitable[]) {
        this.list = list;
        this.listSize = list.length;
    }

    hit(ray: Ray, tMin: number, tMax: Number, rec: HitRecord): boolean {
        const tempRec: HitRecord = new HitRecord(0,
            new Vector(0, 0, 0),
            new Vector(0, 0, 0));
        let hitAnything: boolean = false;
        let closestSoFar = tMax;

        for (let i = 0; i < this.listSize; i++) {
            const tempHit = this.list[i].hit(ray, tMin, closestSoFar, tempRec)
            if (tempHit) {
                hitAnything = true;
                closestSoFar = tempRec.t;
                rec = tempRec;
                this.rec = rec;
            }
        }

        return hitAnything;
    }

}