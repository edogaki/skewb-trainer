import type { CubeRotation } from './math';
import { Color, nonWhiteColors, rotateColor } from './color';
import type { SkewbRendererState } from './skewbRenderer';


type NSCenterTrainerState = {
    centers: [Color, Color, Color],
    rotation: CubeRotation,
}

function nsCenterTrainerStateToSkewbRendererState(nsCenterTrainerState: NSCenterTrainerState, options: Options) {
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

interface Options {
    showRightCornerColors: boolean;
}

type NSCornerTrainerState = {
    corners: [Color, Color],
    rotation: CubeRotation,
};

function nsCornerTrainerStateToSkewbRendererState(nsCornerTrainerState: NSCornerTrainerState) {
    const rotatedCenters = Object.fromEntries(
        Object.values(Color).map((c) => [c, rotateColor(c, nsCornerTrainerState.rotation)])
    ) as Record<Color, Color>;
    return [
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],

        rotatedCenters[nsCornerTrainerState.corners[0]],
        rotatedCenters[nsCornerTrainerState.corners[1]],
        rotatedCenters[Color.Green],
        rotatedCenters[Color.Green],
        rotatedCenters[nonWhiteColors[Math.floor(Math.random() * nonWhiteColors.length)]],

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
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],

        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
        rotatedCenters[Color.Gray],
    ] as readonly Color[] as SkewbRendererState;
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
    [[Color.Green, Color.Green].join("|")]: CornerOrientation.Pure,
    [[Color.Green, Color.Yellow].join("|")]: CornerOrientation.PeanutLF,
    [[Color.Green, Color.Orange].join("|")]: CornerOrientation.PeanutRB,
    [[Color.Red, Color.Green].join("|")]: CornerOrientation.PeanutBL,
    [[Color.Red, Color.Yellow].join("|")]: CornerOrientation.PiL,
    [[Color.Red, Color.Orange].join("|")]: CornerOrientation.PiB,
    [[Color.Yellow, Color.Green].join("|")]: CornerOrientation.PeanutFR,
    [[Color.Yellow, Color.Yellow].join("|")]: CornerOrientation.PiF,
    [[Color.Yellow, Color.Orange].join("|")]: CornerOrientation.PiR,
} as const;

function nsCornerTrainerStateToCornerOrientation(nsCornerTrainerState: NSCornerTrainerState) {
    return nsCornerOrientations[nsCornerTrainerState.corners.join("|")];
}

export {
    type NSCenterTrainerState,
    nsCenterTrainerStateToSkewbRendererState,
    CenterPerm,
    nsCenterTrainerStateToCenterPerm,
    type Options,
    type NSCornerTrainerState,
    nsCornerTrainerStateToSkewbRendererState,
    CornerOrientation,
    nsCornerOrientations,
    nsCornerTrainerStateToCornerOrientation,
}
