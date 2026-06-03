import { multiply } from 'mathjs';
import type { CubeRotation, SameLength } from './utils';

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

const polygons = [
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
] as const;

for (const polygon of polygons) {
    polygon.translate(10, 10);
}

const Color = {
    Gray: "rgb(127, 127, 127)",
    Orange: "rgb(255, 166, 0)",
    Green: "rgb(0, 255, 0)",
    Yellow: "rgb(255, 255, 0)",
    White: "rgb(255, 255, 255)",
    Red: "rgb(255, 0, 0)",
    Blue: "rgb(0, 0, 255)",
} as const;

type Color = (typeof Color)[keyof typeof Color];

const validColors: Color[] = [Color.Orange, Color.Green, Color.Yellow, Color.White, Color.Red, Color.Blue];

const nonWhiteColors: Color[] = [Color.Red, Color.Green, Color.Orange, Color.Blue, Color.Yellow];

type SkewbState = SameLength<typeof polygons, Color>;

const stateLength = polygons.length;

const colorAxes = {
    [Color.White]:  [ 0, -1,  0],
    [Color.Red]:    [-1,  0,  0],
    [Color.Green]:  [ 0,  0,  1],
    [Color.Orange]: [ 1,  0,  0],
    [Color.Blue]:   [ 0,  0, -1],
    [Color.Yellow]: [ 0,  1,  0],
    [Color.Gray]: [0, 0, 0],
}

const axisToColor = Object.fromEntries(
    Object.entries(colorAxes).map(([k, v]) => [v.join(","), k])
) as Record<string, Color>;

type NSCenterTrainerState = {
    centers: [Color, Color, Color],
    rotation: CubeRotation,
}

function nsCenterTrainerStateToSkewbState(nsCenterTrainerState: NSCenterTrainerState) {
    const rotatedCenters = Object.fromEntries(
        Object.values(Color).map((c) => [c, axisToColor[multiply(nsCenterTrainerState.rotation, colorAxes[c]).toArray().join(",")]])
    ) as Record<Color, Color>;
    return [
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Red],
        rotatedCenters[Color.Red],
        rotatedCenters[nsCenterTrainerState.centers[0]],

        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Green],
        rotatedCenters[Color.Green],
        rotatedCenters[nsCenterTrainerState.centers[1]],

        rotatedCenters[Color.White],
        rotatedCenters[Color.White],
        rotatedCenters[Color.White],
        rotatedCenters[Color.White],
        rotatedCenters[Color.White],

        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],

        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Orange],
        rotatedCenters[Color.Orange],
        rotatedCenters[nsCenterTrainerState.centers[2]],

        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
    ] as readonly Color[] as SkewbState;
}

const CenterPerm = {
    Swirl: "Swirl Perm",
    Wat: "Wat Perm",
    X: "X Perm",
    HorizontalU: "Horizontal U Perm",
    VerticalU: "Vertical U Perm",
    O: "O Perm",
    ZConj: "Z Perm Conjugate",
    TripleSledge: "Triple Sledge",
    H: "H Perm",
    Z: "Z Perm",
    Pure: "Pure/Solved",
} as const;

type CenterPerm = (typeof CenterPerm)[keyof typeof CenterPerm];

// const nonWhiteColors: Color[] = [Color.Red, Color.Green, Color.Orange, Color.Blue, Color.Yellow];

const nsCenterPerms = {
    [[Color.Red, Color.Green, Color.Orange].join(",")]: CenterPerm.Pure,
    [[Color.Red, Color.Green, Color.Blue].join(",")]: CenterPerm.O,
    [[Color.Red, Color.Green, Color.Yellow].join(",")]: CenterPerm.O,
    [[Color.Red, Color.Orange, Color.Green].join(",")]: CenterPerm.ZConj,
    [[Color.Red, Color.Orange, Color.Blue].join(",")]: CenterPerm.HorizontalU,
    [[Color.Red, Color.Orange, Color.Yellow].join(",")]: CenterPerm.O,
    [[Color.Red, Color.Blue, Color.Green].join(",")]: CenterPerm.HorizontalU,
    [[Color.Red, Color.Blue, Color.Orange].join(",")]: CenterPerm.VerticalU,
    [[Color.Red, Color.Blue, Color.Yellow].join(",")]: CenterPerm.TripleSledge,
    [[Color.Red, Color.Yellow, Color.Green].join(",")]: CenterPerm.O,
    [[Color.Red, Color.Yellow, Color.Orange].join(",")]: CenterPerm.VerticalU,
    [[Color.Red, Color.Yellow, Color.Blue].join(",")]: CenterPerm.ZConj,

    [[Color.Green, Color.Red, Color.Orange].join(",")]: CenterPerm.ZConj,
    [[Color.Green, Color.Red, Color.Blue].join(",")]: CenterPerm.Z,
    [[Color.Green, Color.Red, Color.Yellow].join(",")]: CenterPerm.ZConj,
    [[Color.Green, Color.Orange, Color.Red].join(",")]: CenterPerm.HorizontalU,
    [[Color.Green, Color.Orange, Color.Blue].join(",")]: CenterPerm.Swirl,
    [[Color.Green, Color.Orange, Color.Yellow].join(",")]: CenterPerm.Swirl,
    [[Color.Green, Color.Blue, Color.Red].join(",")]: CenterPerm.X,
    [[Color.Green, Color.Blue, Color.Orange].join(",")]: CenterPerm.HorizontalU,
    [[Color.Green, Color.Blue, Color.Yellow].join(",")]: CenterPerm.Wat,
    [[Color.Green, Color.Yellow, Color.Red].join(",")]: CenterPerm.Wat,
    [[Color.Green, Color.Yellow, Color.Orange].join(",")]: CenterPerm.O,
    [[Color.Green, Color.Yellow, Color.Blue].join(",")]: CenterPerm.Swirl,

    [[Color.Orange, Color.Red, Color.Green].join(",")]: CenterPerm.HorizontalU,
    [[Color.Orange, Color.Red, Color.Blue].join(",")]: CenterPerm.Wat,
    [[Color.Orange, Color.Red, Color.Yellow].join(",")]: CenterPerm.X,
    [[Color.Orange, Color.Green, Color.Red].join(",")]: CenterPerm.TripleSledge,
    [[Color.Orange, Color.Green, Color.Blue].join(",")]: CenterPerm.HorizontalU,
    [[Color.Orange, Color.Green, Color.Yellow].join(",")]: CenterPerm.VerticalU,
    [[Color.Orange, Color.Blue, Color.Red].join(",")]: CenterPerm.H,
    [[Color.Orange, Color.Blue, Color.Green].join(",")]: CenterPerm.X,
    [[Color.Orange, Color.Blue, Color.Yellow].join(",")]: CenterPerm.X,
    [[Color.Orange, Color.Yellow, Color.Red].join(",")]: CenterPerm.TripleSledge,
    [[Color.Orange, Color.Yellow, Color.Green].join(",")]: CenterPerm.Wat,
    [[Color.Orange, Color.Yellow, Color.Blue].join(",")]: CenterPerm.X,

    [[Color.Blue, Color.Red, Color.Green].join(",")]: CenterPerm.Swirl,
    [[Color.Blue, Color.Red, Color.Orange].join(",")]: CenterPerm.HorizontalU,
    [[Color.Blue, Color.Red, Color.Yellow].join(",")]: CenterPerm.Swirl,
    [[Color.Blue, Color.Green, Color.Red].join(",")]: CenterPerm.HorizontalU,
    [[Color.Blue, Color.Green, Color.Orange].join(",")]: CenterPerm.O,
    [[Color.Blue, Color.Green, Color.Yellow].join(",")]: CenterPerm.ZConj,
    [[Color.Blue, Color.Orange, Color.Red].join(",")]: CenterPerm.Wat,
    [[Color.Blue, Color.Orange, Color.Green].join(",")]: CenterPerm.Z,
    [[Color.Blue, Color.Orange, Color.Yellow].join(",")]: CenterPerm.Wat,
    [[Color.Blue, Color.Yellow, Color.Red].join(",")]: CenterPerm.X,
    [[Color.Blue, Color.Yellow, Color.Green].join(",")]: CenterPerm.Swirl,
    [[Color.Blue, Color.Yellow, Color.Orange].join(",")]: CenterPerm.ZConj,

    [[Color.Yellow, Color.Red, Color.Green].join(",")]: CenterPerm.Swirl,
    [[Color.Yellow, Color.Red, Color.Orange].join(",")]: CenterPerm.O,
    [[Color.Yellow, Color.Red, Color.Blue].join(",")]: CenterPerm.Wat,
    [[Color.Yellow, Color.Green, Color.Red].join(",")]: CenterPerm.VerticalU,
    [[Color.Yellow, Color.Green, Color.Orange].join(",")]: CenterPerm.O,
    [[Color.Yellow, Color.Green, Color.Blue].join(",")]: CenterPerm.ZConj,
    [[Color.Yellow, Color.Orange, Color.Red].join(",")]: CenterPerm.X,
    [[Color.Yellow, Color.Orange, Color.Green].join(",")]: CenterPerm.ZConj,
    [[Color.Yellow, Color.Orange, Color.Blue].join(",")]: CenterPerm.Swirl,
    [[Color.Yellow, Color.Blue, Color.Red].join(",")]: CenterPerm.X,
    [[Color.Yellow, Color.Blue, Color.Green].join(",")]: CenterPerm.Wat,
    [[Color.Yellow, Color.Blue, Color.Orange].join(",")]: CenterPerm.TripleSledge,
}

function nsCenterTrainerStateToCenterPerm(nsCenterTrainerState: NSCenterTrainerState) {
    return nsCenterPerms[nsCenterTrainerState.centers.join(",")];
}

// const nonWhiteColors: Color[] = [Color.Red, Color.Green, Color.Orange, Color.Blue, Color.Yellow];

export {
    polygons,
    Color,
    type SkewbState,
    validColors,
    nonWhiteColors,
    stateLength,
    type NSCenterTrainerState,
    nsCenterTrainerStateToSkewbState,
    CenterPerm,
    nsCenterTrainerStateToCenterPerm,
}
