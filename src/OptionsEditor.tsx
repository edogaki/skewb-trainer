import type React from 'react';
import { type Options } from './utils/skewbUtils';
import { CubeOrientation } from './utils/skewbRenderer';

function OptionsEditor({options, setOptions}: {options: Options, setOptions: React.Dispatch<React.SetStateAction<Options>>}) {
    return (
        <form>
            <h3>Options</h3>
            <input
                type="checkbox"
                checked={options.showRightCornerColors}
                name="showRightCornerColors"
                id="nsCenterTrainer-showRightCornerColors"
                onChange={(e) => setOptions(values => ({
                    ...values,
                    showRightCornerColors: e.target.checked,
                }))}
            />
            <label htmlFor="nsCenterTrainer-showRightCornerColors">
                Show Right Corner Colors
            </label>
            <br />
            {(Object.keys(CubeOrientation) as (keyof typeof CubeOrientation)[]).map((k) => (
                <span key={k}>
                    <input
                        id={`nsCenterTrainer-${k}`}
                        type="radio"
                        name="cubeOrientation"
                        value={CubeOrientation[k]}
                        checked={options.renderer.cubeOrientation === CubeOrientation[k]}
                        onChange={() => setOptions(values => ({
                            ...values,
                            renderer: {
                                ...values.renderer,
                                cubeOrientation: CubeOrientation[k]
                            }
                        }))}
                    />
                    <label htmlFor={`nsCenterTrainer-${k}`}>
                        {CubeOrientation[k]}
                    </label>
                    &nbsp;&nbsp;
                </span>
            ))}
        </form>
    );
}

export default OptionsEditor;