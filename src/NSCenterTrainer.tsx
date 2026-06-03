import { useState } from 'react';
import SkewbRenderer from './SkewbRenderer';
import { type NSCenterTrainerState, nonWhiteColors, nsCenterTrainerStateToSkewbState, nsCenterTrainerStateToCenterPerm, CenterPerm } from './skewbUtils';
import { CubeRotation } from './utils';

import correctSound from "./sounds/correct.mp3?url";
import wrongSound from "./sounds/wrong.mp3?url";

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

function NSCenterTrainer() {
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
    return (
        <div className="trainer">
            <div className="trainer-left">
                <div>
                    {`${correctQuestions}/${totalQuestions} answered correctly`}
                </div>
                <button onClick={() => {
                    const audio = new Audio(wrongSound);
                    audio.play();
                    if (Object.values(isErrorButton).every((v) => v === false)) {
                        setTotalQuestions((q) => q + 1);
                    }
                    setIsErrorButton((obj) => { return Object.fromEntries(
                        (Object.keys(obj) as Array<keyof typeof CenterPerm>).map((k) => CenterPerm[k] === centerPerm ? [k, false] : [k, true])
                    ) as Record<keyof typeof CenterPerm, boolean> });
                }}>I give up</button>
                <SkewbRenderer state={nsCenterTrainerStateToSkewbState(nsCenterState)}/>
            </div>
            <div className="trainer-right">
                {(Object.keys(CenterPerm) as Array<keyof typeof CenterPerm>).map(k => (
                    <div key={k}>
                        <button
                            className={`${isErrorButton[k] && "error"} `}
                            onClick={() => {
                                if (CenterPerm[k] === centerPerm) {
                                    if (Object.values(isErrorButton).every((v) => v === false)) {
                                        setCorrectQuestions((q) => q + 1)
                                        setTotalQuestions((q) => q + 1)
                                    }
                                    const audio = new Audio(correctSound);
                                    audio.play();
                                    newState();
                                } else {
                                    if (Object.values(isErrorButton).every((v) => v === false)) {
                                        setTotalQuestions((q) => q + 1)
                                    }
                                    setIsErrorButton((obj) => { return { ...obj, [k]: true } });
                                    const audio = new Audio(wrongSound);
                                    audio.play();
                                }
                            }}
                        >
                            {CenterPerm[k]}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NSCenterTrainer;