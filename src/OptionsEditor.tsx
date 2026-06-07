import type React from 'react';
import type { Options } from './skewbUtils';

function OptionsEditor({options, setOptions}: {options: Options, setOptions: React.Dispatch<React.SetStateAction<Options>>}) {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setOptions(values => ({...values, [name]: value}))
    }
    return (
        <div>
            <h3>Options</h3>
            <input
                type="checkbox"
                checked={options.showRightCornerColors}
                name="showRightCornerColors"
                onChange={handleChange}
            />
            <label>
                Show Right Corner Colors
            </label>
        </div>
    );
}

export default OptionsEditor;