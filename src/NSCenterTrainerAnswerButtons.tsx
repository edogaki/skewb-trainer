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

    const [keyBinds, writeNewBinds] = useKeyBinds(selectCenterPerm, !options.isKeyBindChangerOn);
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

    return (Object.keys(CenterPerm) as Array<keyof typeof CenterPerm>).map(k => (
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
                    onClick={() => selectCenterPerm(k)}
                >
                    {CenterPerm[k]}
                </button>
            )}
        </div>
    ));
}

export default NSCenterTrainerAnswerButtons;