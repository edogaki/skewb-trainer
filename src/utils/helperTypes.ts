type SameLength<T extends readonly unknown[], NewType> = {
    [K in keyof T]: NewType;
};

type FixedLengthArray<T, N extends number> = T[] & { length: N };

export {
    type SameLength,
    type FixedLengthArray,
};