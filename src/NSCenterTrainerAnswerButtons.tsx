import { useKeyBinds } from './utils/keyboardShortcuts';
import { CenterPerm, type NSCenterTrainerOptions } from './utils/skewbUtils';
import { toHumanReadable } from './utils/keyboardShortcuts';
import { useEffect, useState } from 'react';

function NSCenterTrainerAnswerButtons({
    options,
    selectCenterPerm,
    isErrorButton,
    answeredCorrectButton,
}: {
    options: NSCenterTrainerOptions,
    selectCenterPerm: (k: keyof typeof CenterPerm) => void,
    isErrorButton: Record<keyof typeof CenterPerm, boolean>,
    answeredCorrectButton: keyof typeof CenterPerm | null,
}) {

    const [keyBinds, writeNewBinds, resetKeyBinds] = useKeyBinds(selectCenterPerm, !options.isKeyBindChangerOn);
    const keyBindsReverse = Object.fromEntries(
        Object.entries(keyBinds).map(([k, v]) => [v, k])
    ) as Record<keyof typeof CenterPerm, string>;
    
    const [isEditing, setIsEditing] = useState<keyof typeof CenterPerm | null>(null);
    
    useEffect(() => {
        setIsEditing(null);
    }, [options.isKeyBindChangerOn]);
    
    useEffect(() => {
        if (!isEditing) {
            return;
        }
        function handleSetKeyBind(e: KeyboardEvent) {
            e.preventDefault();
            if (!isEditing) {
                return;
            }
            writeNewBinds({ [e.code]: isEditing });
            setIsEditing(null);
            document.removeEventListener("keypress", handleSetKeyBind);
        }
        document.addEventListener("keypress", handleSetKeyBind);
        return () => {
            document.removeEventListener("keypress", handleSetKeyBind);
        }
    }, [isEditing]);
    
    const [watPressCounter, setWatPressCounter] = useState(0);
    
    console.log({watPressCounter})

    return (
        <>
            {(Object.keys(CenterPerm) as Array<keyof typeof CenterPerm>).map(k => (
                <div key={k} className="perm-buttons">
                    {options.isKeyBindChangerOn ? (
                        <>
                            <span>
                                &nbsp;
                                {CenterPerm[k]}
                                :&nbsp;
                                {toHumanReadable(keyBindsReverse[k])}
                                &nbsp;key&nbsp;
                            </span>
                            <button
                                onClick={(e) => {
                                    e.currentTarget.blur();
                                    setIsEditing(k);
                                }}
                                disabled={isEditing !== null && isEditing !== k}
                            >{isEditing === k ? "Press!" : "Edit"}</button>
                        </>
                    ) : (
                        <button
                            className={`${isErrorButton[k] ? "error" : answeredCorrectButton === k ? "correct-flash" : ""}`}
                            onClick={() => {
                                selectCenterPerm(k);
                                if (CenterPerm[k] === CenterPerm.Wat) {
                                    setWatPressCounter((n) => n + 1);
                                } else if (watPressCounter < 20) {
                                    setWatPressCounter(0);
                                }
                            }}
                        >
                            {CenterPerm[k] !== CenterPerm.Wat || watPressCounter < 20 ? CenterPerm[k] : (
                                // easter egg that turns wat button into wat img after clicking it for more than 20 times consecutively
                                <img
                                    src={`${import.meta.env.BASE_URL}/favicon.png`}
                                    className="wat-img"
                                />
                            )}
                        </button>
                    )}
                </div>
            ))}
            {options.isKeyBindChangerOn && (
                <button onClick={() => resetKeyBinds()} disabled={!!isEditing}>
                    Reset Keybinds
                </button>
            )}
        </>
    );
}

export default NSCenterTrainerAnswerButtons;