import type { CenterPerm } from './utils/skewbUtils'

const keyboardShortcuts = {
    "KeyA": "Swirl",
    "KeyS": "Wat",
    "KeyD": "X",
    "KeyF": "HorizontalU",
    "KeyG": "VerticalU",
    "KeyH": "O",
    "KeyJ": "ZConj",
    "KeyK": "TripleSledge",
    "KeyL": "H",
    "Semicolon": "Z",
    "Space": "Pure",
} as Record<string, keyof typeof CenterPerm>;

function bindKeysToCenterPerm(centerPermFunc: (cp: keyof typeof CenterPerm) => void) {
    function handleEvent(e: KeyboardEvent) {
        if (keyboardShortcuts[e.code]) {
            e.preventDefault();
            centerPermFunc(keyboardShortcuts[e.code])
        }
    }
    document.addEventListener("keypress", handleEvent);
    return function () {
        document.removeEventListener("keypress", handleEvent);
    }
}

export {
    bindKeysToCenterPerm
};