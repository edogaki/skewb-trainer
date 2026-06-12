import { useEffect, useState } from 'react';
import type { CenterPerm } from './utils/skewbUtils'

function useKeyBinds(centerPermFunc: (cp: keyof typeof CenterPerm) => void) {
    const [keyBinds, setKeyBinds] = useState({
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
    } as Record<string, keyof typeof CenterPerm>);
    

    const writeNewBinds = function(newBinds: Record<string, keyof typeof CenterPerm>) {
        const bindsCopy = {...keyBinds};
        for (const newKey in newBinds) {
            const perm = newBinds[newKey];
            const oldKey = Object.keys(bindsCopy).find((k) => bindsCopy[k] === perm);
            if (oldKey) {
                delete bindsCopy[oldKey];
                bindsCopy[newKey] = perm;
            }
        }
        setKeyBinds(bindsCopy);
    }
    
    const [isEnabled, setIsEnabled] = useState(true);
    
    useEffect(() => {
        console.log({ keyBinds, now: Date.now() });
        if (!isEnabled) {
            return function () {}
        }

        function handleEvent(e: KeyboardEvent) {
            if (keyBinds[e.code]) {
                e.preventDefault();
                centerPermFunc(keyBinds[e.code])
            }
        }
        document.addEventListener("keypress", handleEvent);
        return function () {
            document.removeEventListener("keypress", handleEvent);
        }
    }, [keyBinds, centerPermFunc, isEnabled]);

    return [keyBinds, writeNewBinds, isEnabled, setIsEnabled];
}

export {
    useKeyBinds,
};