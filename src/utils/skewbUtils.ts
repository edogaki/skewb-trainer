import { CubeRotation } from './math';
import { Color, rotateColor } from './color';
import type { RendererOptions, SkewbRendererState } from './skewbRenderer';
import { mod } from 'mathjs';

type NSCenterTrainerState = {
    centers: [Color, Color, Color],
    rotation: CubeRotation,
}

interface NSCenterTrainerOptions {
    showRightCornerColors: boolean;
    renderer: RendererOptions;
}

function nsCenterTrainerStateToSkewbRendererState(nsCenterTrainerState: NSCenterTrainerState, options: NSCenterTrainerOptions) {
    const rotatedCenters = Object.fromEntries(
        Object.values(Color).map((c) => [c, rotateColor(c, nsCenterTrainerState.rotation)])
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
        rotatedCenters[options.showRightCornerColors ? Color.Orange : Color.Gray],
        rotatedCenters[options.showRightCornerColors ? Color.Orange : Color.Gray],
        rotatedCenters[nsCenterTrainerState.centers[2]],

        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
    ] as readonly Color[] as SkewbRendererState;
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
};

function nsCenterTrainerStateToCenterPerm(nsCenterTrainerState: NSCenterTrainerState) {
    return nsCenterPerms[nsCenterTrainerState.centers.join(",")];
}

// const nonWhiteColors: Color[] = [Color.Red, Color.Green, Color.Orange, Color.Blue, Color.Yellow];

type NSCornerTrainerState = {
    corners: [0|1|2, 0|1|2],
    centers: [Color, Color],
    rotation: CubeRotation,
};

function nsCornerTrainerStateToSkewbRendererState(nsCornerTrainerState: NSCornerTrainerState) {
    const rotatedCenters = Object.fromEntries(
        Object.values(Color).map((c) => [c, rotateColor(c, nsCornerTrainerState.rotation)])
    ) as Record<Color, Color>;
    
    const [co1, co2] = nsCornerTrainerState.corners
    
    const corner1Colors = [Color.Yellow, Color.Green, Color.Red];
    const corner2Colors = [Color.Yellow, Color.Orange, Color.Green];
    const corner3Colors = [Color.Yellow, Color.Blue, Color.Orange];

    return [
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],

        rotatedCenters[corner1Colors[mod(1 + co1, 3)]],
        rotatedCenters[corner2Colors[mod(2 + co2, 3)]],
        rotatedCenters[Color.Green],
        rotatedCenters[Color.Green],
        rotatedCenters[nsCornerTrainerState.centers[0]],

        rotatedCenters[Color.White],
        rotatedCenters[Color.White],
        rotatedCenters[Color.White],
        rotatedCenters[Color.White],
        rotatedCenters[Color.White],

        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray], // corner3Colors[mod(0 - co1, 3)]],
        rotatedCenters[Color.Gray], // corner2Colors[mod(0 + co2, 3)]],
        rotatedCenters[Color.Gray], // corner1Colors[mod(0 + co1, 3)]],
        rotatedCenters[Color.Gray],

        rotatedCenters[corner2Colors[mod(1 + co2, 3)]],
        rotatedCenters[corner3Colors[mod(2 - co1, 3)]],
        rotatedCenters[Color.Orange],
        rotatedCenters[Color.Orange],
        rotatedCenters[nsCornerTrainerState.centers[1]],

        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
    ] as SkewbRendererState;
}

const CornerOrientation = {
    PiF: "Pi ↙️",
    PiR: "Pi ↘️",
    PiB: "Pi ↗️",
    PiL: "Pi ↖️",
    PeanutLF: "Peanut ⬅️",
    PeanutFR: "Peanut ⬇️",
    PeanutRB: "Peanut ➡️",
    PeanutBL: "Peanut ⬆️",
    Pure: "Pure/Solved",
}

type CornerOrientation = (typeof CornerOrientation)[keyof typeof CornerOrientation];

const nsCornerOrientations = {
    "0|0": CornerOrientation.Pure,
    "0|1": CornerOrientation.PeanutLF,
    "0|2": CornerOrientation.PeanutRB,
    "1|0": CornerOrientation.PeanutBL,
    "1|1": CornerOrientation.PiL,
    "1|2": CornerOrientation.PiB,
    "2|0": CornerOrientation.PeanutFR,
    "2|1": CornerOrientation.PiF,
    "2|2": CornerOrientation.PiR,
} as const;

function nsCornerTrainerStateToCornerOrientation(nsCornerTrainerState: NSCornerTrainerState) {
    return nsCornerOrientations[nsCornerTrainerState.corners.join("|") as (keyof typeof nsCornerOrientations)];
}

export {
    type NSCenterTrainerState,
    type NSCenterTrainerOptions,
    nsCenterTrainerStateToSkewbRendererState,
    CenterPerm,
    nsCenterTrainerStateToCenterPerm,
    type NSCornerTrainerState,
    nsCornerTrainerStateToSkewbRendererState,
    CornerOrientation,
    nsCornerOrientations,
    nsCornerTrainerStateToCornerOrientation,
}
