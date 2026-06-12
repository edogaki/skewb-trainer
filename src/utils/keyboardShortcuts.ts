import { useEffect, useState } from 'react';
import type { CenterPerm } from './skewbUtils'
import { useLocalStorage } from './useLocalStorage';

function toHumanReadable(eventCode: string) {
    return eventCode.replace(/^(Key|Digit)/, '').replace(/([A-Z])/g, ' $1').trim();
}

const initialKeyBinds = {
    "KeyS": "Swirl",
    "KeyW": "Wat",
    "KeyX": "X",
    "KeyU": "HorizontalU",
    "KeyV": "VerticalU",
    "KeyO": "O",
    "KeyC": "ZConj",
    "KeyT": "TripleSledge",
    "KeyH": "H",
    "KeyZ": "Z",
    "Space": "Pure",
} as Record<string, keyof typeof CenterPerm>;

function useKeyBinds(centerPermFunc: (cp: keyof typeof CenterPerm) => void, isEnabled: boolean) {
    const [keyBinds, setKeyBinds] = useLocalStorage(
        "key-binds",
        initialKeyBinds,
        true,
    );
    
    const writeNewBinds = function(newBinds: Record<string, keyof typeof CenterPerm>) {
        const bindsCopy = {...keyBinds};
        for (const newKey in newBinds) {
            const perm = newBinds[newKey];
            const oldKey = Object.keys(bindsCopy).find((k) => bindsCopy[k] === perm)!;
            if (bindsCopy[newKey]) {
                [bindsCopy[newKey], bindsCopy[oldKey]] = [bindsCopy[oldKey], bindsCopy[newKey]];
            } else {
                delete bindsCopy[oldKey];
                bindsCopy[newKey] = perm;
            }
        }
        setKeyBinds(bindsCopy);
        return true;
    }
    
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
    
    function resetKeyBinds() {
        setKeyBinds(initialKeyBinds);
    }

    return [keyBinds, writeNewBinds, resetKeyBinds] as const;
}

export {
    useKeyBinds,
    toHumanReadable,
};