import * as React from 'react';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export interface NumberFieldProps {
    id?: string;
    label?: string;
    min?: number;
    max?: number;
    value?: string | number;
    defaultValue?: number;
    size?: 'small' | 'medium';
    error?: boolean;
    onChange?: (val: number | null) => void;
}

export default function NumberField({
    id: idProp,
    label,
    min,
    max,
    value,
    defaultValue,
    size = 'medium',
    error = false,
    onChange,
}: NumberFieldProps) {
    const generatedId = React.useId();
    const id = idProp || generatedId;

    const numericValue = React.useMemo(() => {
        if (value === undefined) return undefined;
        if (value === '' || value === null) return null;
        const parsed = Number(value);
        return Number.isNaN(parsed) ? null : parsed;
    }, [value]);

    return (
        <BaseNumberField.Root
            min={min}
            max={max}
            value={numericValue}
            defaultValue={defaultValue}
            onValueChange={(val) => onChange?.(val)}
            render={(props, state) => (
                <FormControl
                    size={size}
                    ref={props.ref}
                    disabled={state.disabled}
                    required={state.required}
                    focused={state.focused}
                    error={error}
                    variant="outlined"
                    sx={{ width: 210 }}
                >
                    {props.children}
                </FormControl>
            )}
        >
            <BaseNumberField.Input
                id={id}
                render={(props, state) => (
                    <>
                        {label && (
                            <InputLabel
                                htmlFor={id}
                                shrink={Boolean(state.inputValue) || state.focused}
                            >
                                {label}
                            </InputLabel>
                        )}
                        <OutlinedInput
                            label={label}
                            value={state.inputValue}
                            inputProps={props}
                            endAdornment={
                                <InputAdornment
                                    position="end"
                                    sx={{
                                        flexDirection: 'column',
                                        maxHeight: 'unset',
                                        alignSelf: 'stretch',
                                        borderLeft: '1px solid',
                                        borderColor: 'divider',
                                        ml: 0,
                                        '& button': {
                                            py: 0,
                                            flex: 1,
                                            borderRadius: 0.5,
                                        },
                                    }}
                                >
                                    <BaseNumberField.Increment
                                        render={<IconButton size={size} aria-label="Increase" />}
                                    >
                                        <KeyboardArrowUpIcon
                                            fontSize={size}
                                            sx={{ transform: 'translateY(2px)' }}
                                        />
                                    </BaseNumberField.Increment>

                                    <BaseNumberField.Decrement
                                        render={<IconButton size={size} aria-label="Decrease" />}
                                    >
                                        <KeyboardArrowDownIcon
                                            fontSize={size}
                                            sx={{ transform: 'translateY(-2px)' }}
                                        />
                                    </BaseNumberField.Decrement>
                                </InputAdornment>
                            }
                            sx={{ pr: 0 }}
                        />
                    </>
                )}
            />
        </BaseNumberField.Root>
    );
}