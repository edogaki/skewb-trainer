import type { Color } from './color';
import type { FixedLengthArray } from './helperTypes';

const xsc = Math.sqrt(3) * 10;
const ysc = 10;

class Point {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

class Polygon {
    points: Point[];

    constructor(pointsArr: [number, number][]) {
        this.points = pointsArr.map(pArr => new Point(pArr[0], pArr[1]));
    }
    
    translate(x: number, y: number) {
        for (const point of this.points) {
            point.x += x;
            point.y += y;
        }
        return this;
    }
    
    toSVGPointsString() {
        return this.points.map(p => `${p.x} ${p.y}`).join(" ");
    }
}
const CubeOrientation = {
    UpDown: "Up-down Orientation",
    Sideways: "Sideways Orientation",
} as const;
type CubeOrientation = (typeof CubeOrientation)[keyof typeof CubeOrientation];


const polygons = {
    [CubeOrientation.UpDown]: [
        // L FACE
        new Polygon([
            [xsc * 0, ysc * 0],
            [xsc * 1, ysc * 1],
            [xsc * 0, ysc * 2],
        ]),
        new Polygon([
            [xsc * 1, ysc * 1],
            [xsc * 2, ysc * 2],
            [xsc * 2, ysc * 4],
        ]),
        new Polygon([
            [xsc * 1, ysc * 5],
            [xsc * 2, ysc * 4],
            [xsc * 2, ysc * 6],
        ]),
        new Polygon([
            [xsc * 0, ysc * 2],
            [xsc * 1, ysc * 5],
            [xsc * 0, ysc * 4],
        ]),
        new Polygon([
            [xsc * 1, ysc * 1],
            [xsc * 2, ysc * 4],
            [xsc * 1, ysc * 5],
            [xsc * 0, ysc * 2],
        ]),
        // F FACE
        new Polygon([
            [xsc * 2, ysc * 2],
            [xsc * 3, ysc * 3],
            [xsc * 2, ysc * 4],
        ]),
        new Polygon([
            [xsc * 3, ysc * 3],
            [xsc * 4, ysc * 4],
            [xsc * 4, ysc * 6],
        ]),
        new Polygon([
            [xsc * 3, ysc * 7],
            [xsc * 4, ysc * 6],
            [xsc * 4, ysc * 8],
        ]),
        new Polygon([
            [xsc * 2, ysc * 4],
            [xsc * 3, ysc * 7],
            [xsc * 2, ysc * 6],
        ]),
        new Polygon([
            [xsc * 3, ysc * 3],
            [xsc * 4, ysc * 6],
            [xsc * 3, ysc * 7],
            [xsc * 2, ysc * 4],
        ]),
        // D FACE
        new Polygon([
            [xsc * 2, ysc * 6],
            [xsc * 3, ysc * 7],
            [xsc * 2, ysc * 8],
        ]),
        new Polygon([
            [xsc * 3, ysc * 7],
            [xsc * 4, ysc * 8],
            [xsc * 4, ysc * 10],
        ]),
        new Polygon([
            [xsc * 3, ysc * 11],
            [xsc * 4, ysc * 10],
            [xsc * 4, ysc * 12],
        ]),
        new Polygon([
            [xsc * 2, ysc * 8],
            [xsc * 3, ysc * 11],
            [xsc * 2, ysc * 10],
        ]),
        new Polygon([
            [xsc * 3, ysc * 7],
            [xsc * 4, ysc * 10],
            [xsc * 3, ysc * 11],
            [xsc * 2, ysc * 8],
        ]),
        // U FACE
        new Polygon([
            [xsc * 4, ysc * 0],
            [xsc * 5, ysc * 1],
            [xsc * 3, ysc * 1],
        ]),
        new Polygon([
            [xsc * 5, ysc * 1],
            [xsc * 6, ysc * 2],
            [xsc * 5, ysc * 3],
        ]),
        new Polygon([
            [xsc * 5, ysc * 3],
            [xsc * 4, ysc * 4],
            [xsc * 3, ysc * 3],
        ]),
        new Polygon([
            [xsc * 3, ysc * 3],
            [xsc * 2, ysc * 2],
            [xsc * 3, ysc * 1],
        ]),
        new Polygon([
            [xsc * 3, ysc * 1],
            [xsc * 5, ysc * 1],
            [xsc * 5, ysc * 3],
            [xsc * 3, ysc * 3],
        ]),
        // R FACE
        new Polygon([
            [xsc * 4, ysc * 6],
            [xsc * 4, ysc * 4],
            [xsc * 5, ysc * 3],
        ]),
        new Polygon([
            [xsc * 6, ysc * 2],
            [xsc * 6, ysc * 4],
            [xsc * 5, ysc * 3],
        ]),
        new Polygon([
            [xsc * 6, ysc * 4],
            [xsc * 6, ysc * 6],
            [xsc * 5, ysc * 7],
        ]),
        new Polygon([
            [xsc * 5, ysc * 7],
            [xsc * 4, ysc * 8],
            [xsc * 4, ysc * 6],
        ]),
        new Polygon([
            [xsc * 5, ysc * 3],
            [xsc * 6, ysc * 4],
            [xsc * 5, ysc * 7],
            [xsc * 4, ysc * 6],
        ]),
        // B FACE
        new Polygon([
            [xsc * 6, ysc * 4],
            [xsc * 6, ysc * 2],
            [xsc * 7, ysc * 1],
        ]),
        new Polygon([
            [xsc * 8, ysc * 0],
            [xsc * 8, ysc * 2],
            [xsc * 7, ysc * 1],
        ]),
        new Polygon([
            [xsc * 8, ysc * 2],
            [xsc * 8, ysc * 4],
            [xsc * 7, ysc * 5],
        ]),
        new Polygon([
            [xsc * 7, ysc * 5],
            [xsc * 6, ysc * 6],
            [xsc * 6, ysc * 4],
        ]),
        new Polygon([
            [xsc * 7, ysc * 1],
            [xsc * 8, ysc * 2],
            [xsc * 7, ysc * 5],
            [xsc * 6, ysc * 4],
        ]),
    ].map(p => p.translate(10, 10)),
    [CubeOrientation.Sideways]: [
        // L FACE
        new Polygon([
            [xsc * 2, ysc * -2],
            [xsc * 3, ysc * -1],
            [xsc * 1, ysc * -1],
        ]),
        new Polygon([
            [xsc * 3, ysc * -1],
            [xsc * 4, ysc * 0],
            [xsc * 3, ysc * 1],
        ]),
        new Polygon([
            [xsc * 3, ysc * 1],
            [xsc * 2, ysc * 2],
            [xsc * 1, ysc * 1],
        ]),
        new Polygon([
            [xsc * 1, ysc * 1],
            [xsc * 0, ysc * 0],
            [xsc * 1, ysc * -1],
        ]),
        new Polygon([
            [xsc * 1, ysc * -1],
            [xsc * 3, ysc * -1],
            [xsc * 3, ysc * 1],
            [xsc * 1, ysc * 1],
        ]),
        // F FACE
        new Polygon([
            [xsc * 4, ysc * 0],
            [xsc * 5, ysc * 1],
            [xsc * 3, ysc * 1],
        ]),
        new Polygon([
            [xsc * 5, ysc * 1],
            [xsc * 6, ysc * 2],
            [xsc * 5, ysc * 3],
        ]),
        new Polygon([
            [xsc * 5, ysc * 3],
            [xsc * 4, ysc * 4],
            [xsc * 3, ysc * 3],
        ]),
        new Polygon([
            [xsc * 3, ysc * 3],
            [xsc * 2, ysc * 2],
            [xsc * 3, ysc * 1],
        ]),
        new Polygon([
            [xsc * 3, ysc * 1],
            [xsc * 5, ysc * 1],
            [xsc * 5, ysc * 3],
            [xsc * 3, ysc * 3],
        ]),
        // D FACE
        new Polygon([
            [xsc * 2, ysc * 2],
            [xsc * 3, ysc * 3],
            [xsc * 2, ysc * 4],
        ]),
        new Polygon([
            [xsc * 3, ysc * 3],
            [xsc * 4, ysc * 4],
            [xsc * 4, ysc * 6],
        ]),
        new Polygon([
            [xsc * 3, ysc * 7],
            [xsc * 4, ysc * 6],
            [xsc * 4, ysc * 8],
        ]),
        new Polygon([
            [xsc * 2, ysc * 4],
            [xsc * 3, ysc * 7],
            [xsc * 2, ysc * 6],
        ]),
        new Polygon([
            [xsc * 3, ysc * 3],
            [xsc * 4, ysc * 6],
            [xsc * 3, ysc * 7],
            [xsc * 2, ysc * 4],
        ]),
        // U FACE
        new Polygon([
            [xsc * 8, ysc * 2],
            [xsc * 8, ysc * 4],
            [xsc * 7, ysc * 5],
        ]),
        new Polygon([
            [xsc * 7, ysc * 5],
            [xsc * 6, ysc * 6],
            [xsc * 6, ysc * 4],
        ]),
        new Polygon([
            [xsc * 6, ysc * 4],
            [xsc * 6, ysc * 2],
            [xsc * 7, ysc * 1],
        ]),
        new Polygon([
            [xsc * 8, ysc * 0],
            [xsc * 8, ysc * 2],
            [xsc * 7, ysc * 1],
        ]),
        new Polygon([
            [xsc * 7, ysc * 1],
            [xsc * 8, ysc * 2],
            [xsc * 7, ysc * 5],
            [xsc * 6, ysc * 4],
        ]),
        // R FACE
        new Polygon([
            [xsc * 6, ysc * 2],
            [xsc * 6, ysc * 4],
            [xsc * 5, ysc * 3],
        ]),
        new Polygon([
            [xsc * 6, ysc * 4],
            [xsc * 6, ysc * 6],
            [xsc * 5, ysc * 7],
        ]),
        new Polygon([
            [xsc * 5, ysc * 7],
            [xsc * 4, ysc * 8],
            [xsc * 4, ysc * 6],
        ]),
        new Polygon([
            [xsc * 4, ysc * 6],
            [xsc * 4, ysc * 4],
            [xsc * 5, ysc * 3],
        ]),
        new Polygon([
            [xsc * 5, ysc * 3],
            [xsc * 6, ysc * 4],
            [xsc * 5, ysc * 7],
            [xsc * 4, ysc * 6],
        ]),
        // B FACE
        new Polygon([
            [xsc * 6, ysc * 6],
            [xsc * 6, ysc * 8],
            [xsc * 5, ysc * 7],
        ]),
        new Polygon([
            [xsc * 6, ysc * 8],
            [xsc * 6, ysc * 10],
            [xsc * 5, ysc * 11],
        ]),
        new Polygon([
            [xsc * 5, ysc * 11],
            [xsc * 4, ysc * 12],
            [xsc * 4, ysc * 10],
        ]),
        new Polygon([
            [xsc * 4, ysc * 10],
            [xsc * 4, ysc * 8],
            [xsc * 5, ysc * 7],
        ]),
        new Polygon([
            [xsc * 5, ysc * 7],
            [xsc * 6, ysc * 8],
            [xsc * 5, ysc * 11],
            [xsc * 4, ysc * 10],
        ]),
    ].map(p => p.translate(10, 21))
} as const as Record<CubeOrientation, FixedLengthArray<Polygon, 30>>;

type SkewbRendererState = FixedLengthArray<Color, 30>;

const stateLength = polygons[CubeOrientation.UpDown].length;

interface RendererOptions {
    cubeOrientation: CubeOrientation,
}

export {
    CubeOrientation,
    polygons,
    type SkewbRendererState,
    stateLength,
    type RendererOptions,
}
