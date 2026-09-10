import { memo } from 'react';

interface Option {
    value: string;
    label: string;
}

interface FieldsetProps {
    groupName: string;
    label: string;
    options: readonly Option[];
    selectedValue: string | null;
    customText: string;
    disabledValues: ReadonlySet<string>;
    helpImageSrc?: string;
    onRadioChange: (groupName: string, value: string) => void;
    onTextChange: (groupName: string, text: string) => void;
}

function Fieldset (props: FieldsetProps) {
    const {
        groupName,
        label,
        options,
        selectedValue,
        customText,
        disabledValues,
        helpImageSrc,
        onRadioChange,
        onTextChange,
    } = props;

    return (
        <fieldset className="form__fieldset fieldset">
            <div className="fieldset__top">
                <legend className="fieldset__legend">{label}</legend>
                {helpImageSrc && (<a className="fieldset__help-link" href={helpImageSrc} target="_blank" aria-label="Показать справочную информацию">?</a>)}
            </div>
            <div className="fieldset__input-wrapper">
                {options.map((option) => {
                    const isDisabled = disabledValues.has(option.value);
                    return (
                        <label className="fieldset__label" key={option.value}>
                            <input
                                className="fieldset__input-radio"
                                type="radio"
                                name={groupName}
                                value={option.value}
                                checked={selectedValue === option.value}
                                disabled={isDisabled}
                                onChange={() => onRadioChange(groupName, option.value)}
                            />{' '}
                            {option.label}
                        </label>
                    );
                })}
            </div>
            <label className="fieldset__label" htmlFor={`${groupName}-custom-value`}>
                <input
                    id={`${groupName}-custom-value`}
                    className="fieldset__input-text"
                    type="text"
                    name={groupName}
                    value={customText}
                    onChange={(e) => onTextChange(groupName, e.target.value)}
                    placeholder="Своё значение"
                    aria-label="Своё значение"
                />
            </label>
        </fieldset >
    );
};

export default memo(Fieldset);