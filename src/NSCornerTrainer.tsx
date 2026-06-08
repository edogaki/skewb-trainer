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
correctAudio.load();
const wrongAudio = new Audio(wrongSound);
wrongAudio.load();

function play(audio: HTMLAudioElement) {
    if (audio.paused) {
        audio.play();
    } else {
        audio.currentTime = 0;
    }
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
                    <p>Pi</p>
                    <div className="pi-buttons">
                        <button
                            className={`${isErrorButton["PiL"] && "error"} `}
                            onClick={() => selectCornerOrientation("PiL")}
                        >
                            ↖️
                        </button>
                        <button
                            className={`${isErrorButton["PiB"] && "error"} `}
                            onClick={() => selectCornerOrientation("PiB")}
                        >
                            ↗️
                        </button>
                        <button
                            className={`${isErrorButton["PiF"] && "error"} `}
                            onClick={() => selectCornerOrientation("PiF")}
                        >
                            ↙️
                        </button>
                        <button
                            className={`${isErrorButton["PiR"] && "error"} `}
                            onClick={() => selectCornerOrientation("PiR")}
                        >
                            ↘️
                        </button>
                    </div>
                    <p>Peanut</p>
                    <div className="peanut-buttons">
                        <div>
                            <button
                                className={`${isErrorButton["PeanutLF"] && "error"} `}
                                onClick={() => selectCornerOrientation("PeanutLF")}
                            >
                                ⬅️
                            </button>
                        </div>
                        <div>
                            <button
                                className={`${isErrorButton["PeanutBL"] && "error"} `}
                                onClick={() => selectCornerOrientation("PeanutBL")}
                            >
                                ⬆️
                            </button>
                            <button
                                className={`${isErrorButton["PeanutFR"] && "error"} `}
                                onClick={() => selectCornerOrientation("PeanutFR")}
                            >
                                ⬇️
                            </button>
                        </div>
                        <div>
                            <button
                                className={`${isErrorButton["PeanutRB"] && "error"} `}
                                onClick={() => selectCornerOrientation("PeanutRB")}
                            >
                                ➡️
                            </button>
                        </div>
                    </div>
                    <br />
                    <button
                        className={`${isErrorButton["Pure"] && "error"} `}
                        onClick={() => selectCornerOrientation("Pure")}
                    >
                        Pure/Solved
                    </button>
                </div>
            </div>
        </>
    )
}

export default NSCornerTrainer;
