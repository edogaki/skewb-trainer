import { useEffect, useState } from 'react';
import SkewbRenderer from './SkewbRenderer';
import { type NSCenterTrainerState, nonWhiteColors, nsCenterTrainerStateToSkewbState, nsCenterTrainerStateToCenterPerm, CenterPerm, type Options } from './skewbUtils';
import { CubeRotation } from './utils';

import correctSound from "./sounds/correct.mp3";
import wrongSound from "./sounds/wrong.mp3";
import { bindKeysToCenterPerm } from './keyboardShortcuts';
import OptionsEditor from './OptionsEditor';

function shuffleArray(array: unknown[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateNSCenters() {
    const centers = nonWhiteColors.slice();
    shuffleArray(centers);
    const randomRotation = CubeRotation[Math.floor(Math.random() * CubeRotation.length)];
    const state: NSCenterTrainerState = {
        centers: centers.slice(0, 3),
        rotation: randomRotation,
    } as NSCenterTrainerState
    return state;
}

const correctAudio = new Audio(correctSound);
const wrongAudio = new Audio(wrongSound);

function play(audio: HTMLAudioElement) {
    const clone = audio.cloneNode() as HTMLAudioElement;
    return clone.play();
}


function NSCenterTrainer() {
    const [options, setOptions] = useState<Options>({
        showRightCornerColors: true,
    });
    const [nsCenterState, setNSCenterState] = useState(generateNSCenters());
    const centerPerm = nsCenterTrainerStateToCenterPerm(nsCenterState);
    
    const isErrorButtonInitialState = Object.fromEntries(
        Object.keys(CenterPerm).map(k => [k, false])
    ) as Record<keyof typeof CenterPerm, boolean>;

    const [isErrorButton, setIsErrorButton] = useState(isErrorButtonInitialState);
    
    const [correctQuestions, setCorrectQuestions] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    
    function newState() {
        setNSCenterState(generateNSCenters());
        setIsErrorButton(isErrorButtonInitialState)
    }

    async function selectCenterPerm(k: keyof typeof CenterPerm) {
        console.log({ k, centerPerm });
        if (CenterPerm[k] === centerPerm) {
            play(correctAudio);
            if (Object.values(isErrorButton).every((v) => v === false)) {
                setCorrectQuestions((q) => q + 1)
                setTotalQuestions((q) => q + 1)
            }
            newState();
        } else {
            play(wrongAudio);
            if (Object.values(isErrorButton).every((v) => v === false)) {
                setTotalQuestions((q) => q + 1)
            }
            setIsErrorButton((obj) => { return { ...obj, [k]: true } });
        }
    }

    useEffect(() => {
        const cleanupFunc = bindKeysToCenterPerm(selectCenterPerm);
        return cleanupFunc;
    }, [centerPerm, isErrorButton])

    return (
        <>
            <div className="trainer">
                <div className="trainer-left">
                    <div>
                        {`${correctQuestions}/${totalQuestions} answered correctly`}
                    </div>
                    <button onClick={async () => {
                        play(wrongAudio);
                        if (Object.values(isErrorButton).every((v) => v === false)) {
                            setTotalQuestions((q) => q + 1);
                        }
                        setIsErrorButton((obj) => { return Object.fromEntries(
                            (Object.keys(obj) as Array<keyof typeof CenterPerm>).map((k) => CenterPerm[k] === centerPerm ? [k, false] : [k, true])
                        ) as Record<keyof typeof CenterPerm, boolean> });
                    }}>I give up</button>
                    <SkewbRenderer state={nsCenterTrainerStateToSkewbState(nsCenterState, options)}/>
                </div>
                <div className="trainer-right">
                    {(Object.keys(CenterPerm) as Array<keyof typeof CenterPerm>).map(k => (
                        <div key={k}>
                            <button
                                className={`${isErrorButton[k] && "error"} `}
                                onClick={() => selectCenterPerm(k)}
                            >
                                {CenterPerm[k]}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <a target="_blank" href="https://docs.google.com/spreadsheets/d/1HcICTLEa15KYq-9FwdQqencTq9m9xHZiSsSZxGsRoTk">
                My SA/NS center recognition doc that lists all possible cases and easy-to-mistake ones
            </a>
            <p>
                Keybinds: Space for Pure/Solved, A for Swirl, S for Wat, D for X perm, F for Horizontal U perm, and so on.
            </p>
            <OptionsEditor options={options} setOptions={setOptions} />
        </>
    )
}

export default NSCenterTrainer;