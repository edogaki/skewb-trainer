import { useEffect, useLayoutEffect, useState } from 'react';
import SkewbRenderer from './SkewbRenderer';
import { type NSCornerTrainerState, nsCornerTrainerStateToCornerOrientation, CornerOrientation, nsCornerTrainerStateToSkewbRendererState, type NSCornerTrainerOptions } from './utils/skewbUtils';
import { CubeRotation, shuffleArray } from './utils/math';
import { Sound } from './utils/sounds';
import { nonWhiteColors } from './utils/color';
import { CubeOrientation } from './utils/skewbRenderer';
import NSCornerTrainerOptionsEditor from './NSCornerTrainerOptionsEditor';
import { useLocalStorage } from './utils/useLocalStorage';

function generateNSCorners() {
    const corners = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)]
    const centers = nonWhiteColors.slice();
    shuffleArray(centers, true);
    const randomRotation = CubeRotation[Math.floor(Math.random() * CubeRotation.length)];
    const state: NSCornerTrainerState = {
        corners: corners,
        centers: centers.slice(0, 2),
        rotation: randomRotation,
    } as NSCornerTrainerState;
    return state;
}


function NSCornerTrainer() {
    const [options, setOptions] = useLocalStorage<NSCornerTrainerOptions>(
        "nsCornerTrainerOptions",
        {
            renderer: {
                cubeOrientation: CubeOrientation.UpDown,
            },
        },
        true,
    );
    const [nsCornerState, setNSCornerState] = useState(generateNSCorners());
    const cornerOrientation = nsCornerTrainerStateToCornerOrientation(nsCornerState);

    const isErrorButtonInitialState = Object.fromEntries(
        Object.keys(CornerOrientation).map(k => [k, false])
    ) as Record<keyof typeof CornerOrientation, boolean>;

    const [isErrorButton, setIsErrorButton] = useState(isErrorButtonInitialState);
    
    const [answeredCorrectButton, setAnsweredCorrectButton] = useState<keyof typeof CornerOrientation | null>(null);
    
    const [correctQuestions, setCorrectQuestions] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    
    function newState() {
        setNSCornerState(generateNSCorners());
        setIsErrorButton(isErrorButtonInitialState)
    }

    async function selectCornerOrientation(k: keyof typeof CornerOrientation) {
        if (CornerOrientation[k] === cornerOrientation) {
            Sound.correct.play();
            if (Object.values(isErrorButton).every((v) => v === false)) {
                setCorrectQuestions((q) => q + 1)
                setTotalQuestions((q) => q + 1)
            }
            setAnsweredCorrectButton(k);
            newState();
        } else {
            Sound.wrong.play();
            if (Object.values(isErrorButton).every((v) => v === false)) {
                setTotalQuestions((q) => q + 1)
            }
            setIsErrorButton((obj) => { return { ...obj, [k]: true } });
            setAnsweredCorrectButton(null);
        }
    }

    /*
    useEffect(() => {
        const cleanupFunc = bindKeysToCenterPerm(selectCenterPerm);
        return cleanupFunc;
    }, [centerPerm, isErrorButton])
    */
    
    useEffect(() => {
        if (!answeredCorrectButton)
            return;
        const id = setTimeout(() => {
            setAnsweredCorrectButton(null);
        }, 300);
        return () => clearTimeout(id);
    }, [answeredCorrectButton]);
    
    useLayoutEffect(() => {
        newState();
    }, [options]);

    return (
        <>
            <h2>NS Corner Trainer</h2>
            <div className="trainer-box">
                <div className="trainer corner">
                    <div className="trainer-left">
                        <div>
                            {`${correctQuestions}/${totalQuestions} answered correctly`}
                        </div>
                        <button onClick={async () => {
                            Sound.wrong.play();
                            if (Object.values(isErrorButton).every((v) => v === false)) {
                                setTotalQuestions((q) => q + 1);
                            }
                            setIsErrorButton((obj) => { return Object.fromEntries(
                                (Object.keys(obj) as Array<keyof typeof CornerOrientation>).map((k) => CornerOrientation[k] === cornerOrientation ? [k, false] : [k, true])
                            ) as Record<keyof typeof CornerOrientation, boolean> });
                            setAnsweredCorrectButton(null);
                        }}>I give up</button>
                        <SkewbRenderer state={nsCornerTrainerStateToSkewbRendererState(nsCornerState)} options={options.renderer}/>
                    </div>
                    {options.renderer.cubeOrientation === CubeOrientation.UpDown && (
                        <div className="trainer-right up-down">
                            <p>Pi</p>
                            <div className="pi-buttons">
                                <button
                                    className={`${isErrorButton["PiL"] ? "error" : answeredCorrectButton === "PiL" ? "correct-flash" : ""}`}
                                    onClick={() => selectCornerOrientation("PiL")}
                                >
                                    ↖️
                                </button>
                                <button
                                    className={`${isErrorButton["PiB"] ? "error" : answeredCorrectButton === "PiB" ? "correct-flash" : ""}`}
                                    onClick={() => selectCornerOrientation("PiB")}
                                >
                                    ↗️
                                </button>
                                <button
                                    className={`${isErrorButton["PiF"] ? "error" : answeredCorrectButton === "PiF" ? "correct-flash" : ""}`}
                                    onClick={() => selectCornerOrientation("PiF")}
                                >
                                    ↙️
                                </button>
                                <button
                                    className={`${isErrorButton["PiR"] ? "error" : answeredCorrectButton === "PiR" ? "correct-flash" : ""}`}
                                    onClick={() => selectCornerOrientation("PiR")}
                                >
                                    ↘️
                                </button>
                            </div>
                            <p>Peanut</p>
                            <div className="peanut-buttons">
                                <div>
                                    <button
                                        className={`${isErrorButton["PeanutLF"] ? "error" : answeredCorrectButton === "PeanutLF" ? "correct-flash" : ""}`}
                                        onClick={() => selectCornerOrientation("PeanutLF")}
                                    >
                                        ⬅️
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className={`${isErrorButton["PeanutBL"] ? "error" : answeredCorrectButton === "PeanutBL" ? "correct-flash" : ""}`}
                                        onClick={() => selectCornerOrientation("PeanutBL")}
                                    >
                                        ⬆️
                                    </button>
                                    <button
                                        className={`${isErrorButton["PeanutFR"] ? "error" : answeredCorrectButton === "PeanutFR" ? "correct-flash" : ""}`}
                                        onClick={() => selectCornerOrientation("PeanutFR")}
                                    >
                                        ⬇️
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className={`${isErrorButton["PeanutRB"] ? "error" : answeredCorrectButton === "PeanutRB" ? "correct-flash" : ""}`}
                                        onClick={() => selectCornerOrientation("PeanutRB")}
                                    >
                                        ➡️
                                    </button>
                                </div>
                            </div>
                            <br />
                            <button
                                className={`${isErrorButton["Pure"] ? "error" : answeredCorrectButton === "Pure" ? "correct-flash" : ""}`}
                                onClick={() => selectCornerOrientation("Pure")}
                            >
                                Pure/Solved
                            </button>
                        </div>
                    )}
                    {options.renderer.cubeOrientation === CubeOrientation.Sideways && (
                        <div className="trainer-right sideways">
                            <p>Pi</p>
                            <div className="pi-buttons">
                                <div className="side-buttons">
                                    <button
                                        className={`${isErrorButton["PiL"] ? "error" : answeredCorrectButton === "PiL" ? "correct-flash" : ""}`}
                                        onClick={() => selectCornerOrientation("PiL")}
                                    >
                                        ⬅️
                                    </button>
                                    <div className="empty-div"/>
                                </div>
                                <div>
                                    <button
                                        className={`${isErrorButton["PiF"] ? "error" : answeredCorrectButton === "PiF" ? "correct-flash" : ""}`}
                                        onClick={() => selectCornerOrientation("PiF")}
                                    >
                                        ⬆️
                                    </button>
                                    <button
                                        className={`${isErrorButton["PiB"] ? "error" : answeredCorrectButton === "PiB" ? "correct-flash" : ""}`}
                                        onClick={() => selectCornerOrientation("PiB")}
                                    >
                                        ⬇️
                                    </button>
                                </div>
                                <div className="side-buttons">
                                    <div className="empty-div"/>
                                    <button
                                        className={`${isErrorButton["PiR"] ? "error" : answeredCorrectButton === "PiR" ? "correct-flash" : ""}`}
                                        onClick={() => selectCornerOrientation("PiR")}
                                    >
                                        ➡️
                                    </button>
                                </div>
                            </div>
                            <p>Peanut</p>
                            <div className="peanut-buttons">
                                <div className="left-buttons">
                                    <button
                                        className={`${isErrorButton["PeanutLF"] ? "error" : answeredCorrectButton === "PeanutLF" ? "correct-flash" : ""}`}
                                        onClick={() => selectCornerOrientation("PeanutLF")}
                                    >
                                        ↖️
                                    </button>
                                    <button
                                        className={`${isErrorButton["PeanutBL"] ? "error" : answeredCorrectButton === "PeanutBL" ? "correct-flash" : ""}`}
                                        onClick={() => selectCornerOrientation("PeanutBL")}
                                    >
                                        ↙️
                                    </button>
                                    <div className="empty-div"/>
                                </div>
                                <div className="right-buttons">
                                    <div className="empty-div"/>
                                    <button
                                        className={`${isErrorButton["PeanutFR"] ? "error" : answeredCorrectButton === "PeanutFR" ? "correct-flash" : ""}`}
                                        onClick={() => selectCornerOrientation("PeanutFR")}
                                    >
                                        ↗️
                                    </button>
                                    <button
                                        className={`${isErrorButton["PeanutRB"] ? "error" : answeredCorrectButton === "PeanutRB" ? "correct-flash" : ""}`}
                                        onClick={() => selectCornerOrientation("PeanutRB")}
                                    >
                                        ↘️
                                    </button>
                                </div>
                            </div>
                            <br />
                            <button
                                className={`${isErrorButton["Pure"] ? "error" : answeredCorrectButton === "Pure" ? "correct-flash" : ""}`}
                                onClick={() => selectCornerOrientation("Pure")}
                            >
                                Pure/Solved
                            </button>
                        </div>
                    )}
                </div>
                <div className="trainer-info">
                    <NSCornerTrainerOptionsEditor options={options} setOptions={setOptions} />
                </div>
            </div>
        </>
    )
}

export default NSCornerTrainer;
