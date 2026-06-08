import { useState } from 'react';
import SkewbRenderer from './SkewbRenderer';
import { nsCornerOrientations, type NSCornerTrainerState, nsCornerTrainerStateToCornerOrientation, CornerOrientation, nsCornerTrainerStateToSkewbRendererState } from './utils/skewbUtils';
import { CubeRotation } from './utils/math';

import correctSound from "./sounds/correct.mp3";
import wrongSound from "./sounds/wrong.mp3";

function generateNSCorners() {
    const corners = Object.keys(nsCornerOrientations)[Math.floor(Math.random() * Object.keys(nsCornerOrientations).length)].split("|")
    const randomRotation = CubeRotation[Math.floor(Math.random() * CubeRotation.length)];
    const state: NSCornerTrainerState = {
        corners: corners,
        rotation: randomRotation,
    } as NSCornerTrainerState;
    return state;
}

const correctAudio = new Audio(correctSound);
const wrongAudio = new Audio(wrongSound);

function play(audio: HTMLAudioElement) {
    const clone = audio.cloneNode() as HTMLAudioElement;
    return clone.play();
}


function NSCornerTrainer() {
    const [nsCornerState, setNSCornerState] = useState(generateNSCorners());
    const cornerOrientation = nsCornerTrainerStateToCornerOrientation(nsCornerState);
    console.log(nsCornerState);

    const isErrorButtonInitialState = Object.fromEntries(
        Object.keys(CornerOrientation).map(k => [k, false])
    ) as Record<keyof typeof CornerOrientation, boolean>;

    const [isErrorButton, setIsErrorButton] = useState(isErrorButtonInitialState);
    
    const [correctQuestions, setCorrectQuestions] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    
    function newState() {
        setNSCornerState(generateNSCorners());
        setIsErrorButton(isErrorButtonInitialState)
    }

    async function selectCornerOrientation(k: keyof typeof CornerOrientation) {
        if (CornerOrientation[k] === cornerOrientation) {
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

    /*
    useEffect(() => {
        const cleanupFunc = bindKeysToCenterPerm(selectCenterPerm);
        return cleanupFunc;
    }, [centerPerm, isErrorButton])
    */

    return (
        <>
            <h2>NS Corner Trainer</h2>
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
                            (Object.keys(obj) as Array<keyof typeof CornerOrientation>).map((k) => CornerOrientation[k] === cornerOrientation ? [k, false] : [k, true])
                        ) as Record<keyof typeof CornerOrientation, boolean> });
                    }}>I give up</button>
                    <SkewbRenderer state={nsCornerTrainerStateToSkewbRendererState(nsCornerState)}/>
                </div>
                <div className="trainer-right">
                    {(Object.keys(CornerOrientation) as Array<keyof typeof CornerOrientation>).map(k => (
                        <div key={k}>
                            <button
                                className={`${isErrorButton[k] && "error"} `}
                                onClick={() => selectCornerOrientation(k)}
                            >
                                {CornerOrientation[k]}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default NSCornerTrainer;
