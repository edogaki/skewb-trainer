import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

/**
 * Local storage hook. Works like useState but saves any
 * state changes to local storage, and retrieves from local
 * storage on first render.
 * Uses double rendering to fix hydration errors.
 * @param key Key that will be used to lookup local storage
 * @param defaultValue Default value of state
 * @param enabled Will work exactly like a useState hook if false.
 * @returns [state, setState]. Pretty self-explanatory.
 */
function useLocalStorage<V extends object>(
    key: string,
    defaultValue: V,
    enabled: boolean,
): [V, Dispatch<SetStateAction<V>>] {
    const [state, setState] = useState<V>(defaultValue);
    useEffect(() => {
        if (enabled) {
            const localStorageValue = localStorage.getItem(key);
            if (localStorageValue !== null) {
                try {
                    setState(JSON.parse(localStorageValue));
                } catch (e) {
                    console.warn(
                        "Unparseable value in local storage with key: ",
                        key,
                    );
                    console.warn(e);
                }
            }
        }
    }, [key, enabled]);
    function setValue(newValue: SetStateAction<V>) {
        const computed =
            typeof newValue === "function" ? newValue(state) : newValue;
        if (enabled) {
            localStorage.setItem(key, JSON.stringify(computed));
        }
        setState(computed);
    }
    return [state, setValue];
}

export { useLocalStorage };

