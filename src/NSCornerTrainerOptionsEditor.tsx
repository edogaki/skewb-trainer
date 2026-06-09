import type React from 'react';
import { type NSCornerTrainerOptions } from './utils/skewbUtils';
import { CubeOrientation } from './utils/skewbRenderer';

function NSCornerTrainerOptionsEditor({options, setOptions}: {options: NSCornerTrainerOptions, setOptions: React.Dispatch<React.SetStateAction<NSCornerTrainerOptions>>}) {
    return (
        <form>
            <h3>Options</h3>
            {(["UpDown", "Sideways"] as (keyof typeof CubeOrientation)[]).map((k) => (
                <span key={k}>
                    <input
                        id={`nsCornerTrainer-${k}`}
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
                    <label htmlFor={`nsCornerTrainer-${k}`}>
                        {CubeOrientation[k]}
                    </label>
                    &nbsp;&nbsp;
                </span>
            ))}
        </form>
    );
}

export default NSCornerTrainerOptionsEditor;