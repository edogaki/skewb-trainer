import { multiply } from 'mathjs';
import type { CubeRotation } from './math';

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

function rotateColor(color: Color, rotation: CubeRotation) {
    return axisToColor[multiply(rotation, colorAxes[color]).toArray().join(",")];
}

export {
    Color,
    validColors,
    nonWhiteColors,
    rotateColor,
}