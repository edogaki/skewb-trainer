import { matrix, multiply } from 'mathjs';

/**
 * Computes sin(90 degrees * n) avoiding weirdness of floats.
 * @param n integer or float. If n is float, defaults to Math.sin
 */
const sin90 = (n: number) => {
    switch (mod(n, 4)) {
        case 0:
        case 2:
            return 0;
        case 1:
            return 1;
        case 3:
            return -1;
        default:
            return Math.sin((n * Math.PI) / 2);
    }
};

/**
 * Computes cos(90 degrees * n) avoiding weirdness of floats.
 * @param n integer or float. If n is float, defaults to Math.cos
 */
const cos90 = (n: number) => {
    switch (mod(n, 4)) {
        case 0:
            return 1;
        case 1:
        case 3:
            return 0;
        case 2:
            return -1;
        default:
            return Math.cos((n * Math.PI) / 2);
    }
};

const mod = (a: number, b: number) => ((a % b) + b) % b;

/**
 * Function that generates rotation matrix.
 * @param axis rotation axis
 * @param th rotation angle, in 90-degree units.
 */
const rotationMatrix = (axis: [number, number, number], th: number) => {
    // biome-ignore format: matrix
    const mat = matrix([
        [axis[0] * axis[0] * (1 - cos90(th)) + cos90(th), axis[0] * axis[1] * (1 - cos90(th)) - axis[2] * sin90(th), axis[0] * axis[2] * (1 - cos90(th)) + axis[1] * sin90(th)],
        [axis[0] * axis[1] * (1 - cos90(th)) + axis[2] * sin90(th), axis[1] * axis[1] * (1 - cos90(th)) + cos90(th), axis[1] * axis[2] * (1 - cos90(th)) - axis[0] * sin90(th)],
        [axis[0] * axis[2] * (1 - cos90(th)) - axis[1] * sin90(th), axis[1] * axis[2] * (1 - cos90(th)) + axis[0] * sin90(th), axis[2] * axis[2] * (1 - cos90(th)) + cos90(th)],
    ]);
    return mat;
};

const CubeRotation = [
    rotationMatrix([1, 0, 0], 0),
    rotationMatrix([1, 0, 0], 1),
    rotationMatrix([1, 0, 0], 2),
    rotationMatrix([1, 0, 0], 3),
    
    rotationMatrix([0, 1, 0], 1),
    multiply(rotationMatrix([1, 0, 0], 1), rotationMatrix([0, 1, 0], 1)),
    multiply(rotationMatrix([1, 0, 0], 2), rotationMatrix([0, 1, 0], 1)),
    multiply(rotationMatrix([1, 0, 0], 3), rotationMatrix([0, 1, 0], 1)),
    
    rotationMatrix([0, 1, 0], 2),
    multiply(rotationMatrix([1, 0, 0], 1), rotationMatrix([0, 1, 0], 2)),
    multiply(rotationMatrix([1, 0, 0], 2), rotationMatrix([0, 1, 0], 2)),
    multiply(rotationMatrix([1, 0, 0], 3), rotationMatrix([0, 1, 0], 2)),
    
    rotationMatrix([0, 1, 0], 3),
    multiply(rotationMatrix([1, 0, 0], 1), rotationMatrix([0, 1, 0], 3)),
    multiply(rotationMatrix([1, 0, 0], 2), rotationMatrix([0, 1, 0], 3)),
    multiply(rotationMatrix([1, 0, 0], 3), rotationMatrix([0, 1, 0], 3)),
    
    rotationMatrix([0, 0, 1], 1),
    multiply(rotationMatrix([1, 0, 0], 1), rotationMatrix([0, 0, 1], 1)),
    multiply(rotationMatrix([1, 0, 0], 2), rotationMatrix([0, 0, 1], 1)),
    multiply(rotationMatrix([1, 0, 0], 3), rotationMatrix([0, 0, 1], 1)),
    
    rotationMatrix([0, 0, 1], 3),
    multiply(rotationMatrix([1, 0, 0], 1), rotationMatrix([0, 0, 1], 3)),
    multiply(rotationMatrix([1, 0, 0], 2), rotationMatrix([0, 0, 1], 3)),
    multiply(rotationMatrix([1, 0, 0], 3), rotationMatrix([0, 0, 1], 3)),
] as const;

type CubeRotation = typeof CubeRotation[number];

export {
    rotationMatrix,
    CubeRotation,
}
