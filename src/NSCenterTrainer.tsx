import { useEffect, useLayoutEffect, useState } from 'react';
import SkewbRenderer from './SkewbRenderer';
import { type NSCenterTrainerState, nsCenterTrainerStateToCenterPerm, CenterPerm, type NSCenterTrainerOptions, nsCenterTrainerStateToSkewbRendererState, NSCenterTrainerType } from './utils/skewbUtils';
import { CubeRotation, shuffleArray } from './utils/math';
import OptionsEditor from './NSCenterTrainerOptionsEditor';
import { nonWhiteColors } from './utils/color';
import { setIsMuted, Sound } from './utils/sounds';
import { CubeOrientation } from './utils/skewbRenderer';
import NSCenterTrainerAnswerButtons from './NSCenterTrainerAnswerButtons';
import { useLocalStorage } from './utils/useLocalStorage';

function generateNSCenters() {
    const centers = nonWhiteColors.slice();
    shuffleArray(centers, true);
    const randomRotation = CubeRotation[Math.floor(Math.random() * CubeRotation.length)];
    const state: NSCenterTrainerState = {
        centers: centers,
        rotation: randomRotation,
    } as NSCenterTrainerState
    return state;
}

function NSCenterTrainer({ isMuted }: { isMuted: boolean }) {
    const [options, setOptions] = useLocalStorage<NSCenterTrainerOptions>(
        "nsCenterTrainerOptions",
        {
            trainerType: NSCenterTrainerType.HorizontalU,
            showRightCornerColors: true,
            renderer: {
                cubeOrientation: CubeOrientation.UpDown,
            },
            isKeyBindChangerOn: false,
        },
        true,
    );
    const [nsCenterState, setNSCenterState] = useState(generateNSCenters());
    const centerPerm = nsCenterTrainerStateToCenterPerm(nsCenterState);
    
    const isErrorButtonInitialState = Object.fromEntries(
        Object.keys(CenterPerm).map(k => [k, false])
    ) as Record<keyof typeof CenterPerm, boolean>;

    const [isErrorButton, setIsErrorButton] = useState(isErrorButtonInitialState);
    
    const [answeredCorrectButton, setAnsweredCorrectButton] = useState<keyof typeof CenterPerm | null>(null);
    
    const [correctQuestions, setCorrectQuestions] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    
    function newState() {
        setNSCenterState(generateNSCenters());
        setIsErrorButton(isErrorButtonInitialState)
    }

    async function selectCenterPerm(k: keyof typeof CenterPerm) {
        if (CenterPerm[k] === centerPerm) {
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
    }, [options.renderer, options.showRightCornerColors, options.trainerType]);
    
    useEffect(() => {
        setIsMuted(isMuted);
    }, [isMuted]);

    return (
        <>
            <h2>NS Center Trainer</h2>
            <div className="trainer-box">
                <div className="trainer center">
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
                                (Object.keys(obj) as Array<keyof typeof CenterPerm>).map((k) => CenterPerm[k] === centerPerm ? [k, false] : [k, true])
                            ) as Record<keyof typeof CenterPerm, boolean> });
                            setAnsweredCorrectButton(null);
                        }}>I give up</button>
                        <SkewbRenderer state={nsCenterTrainerStateToSkewbRendererState(nsCenterState, options)} options={options.renderer}/>
                    </div>
                    <div className="trainer-right">
                        <NSCenterTrainerAnswerButtons
                            options={options}
                            selectCenterPerm={selectCenterPerm}
                            isErrorButton={isErrorButton}
                            answeredCorrectButton={answeredCorrectButton}
                        />
                    </div>
                </div>
                <div className="trainer-info">
                    <a target="_blank" href="https://www.youtube.com/watch?v=Sju93bAA5Wo&list=PLBdW0Yy1iGy4i4yhUsmYVnNsmpmFvR9gO&index=23">
                        Video on center recognition by Elias Malomgré
                    </a>
                    <br />
                    <br />
                    <a target="_blank" href="https://docs.google.com/spreadsheets/d/1HcICTLEa15KYq-9FwdQqencTq9m9xHZiSsSZxGsRoTk">
                        My SA/NS center recognition doc that lists all possible cases and easy-to-mistake ones
                    </a>
                    <OptionsEditor options={options} setOptions={setOptions} />
                </div>
            </div>
        </>
    )
}

export default NSCenterTrainer;