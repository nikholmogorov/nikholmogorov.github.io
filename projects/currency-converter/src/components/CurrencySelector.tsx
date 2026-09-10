import { MAIN_CURRENCIES } from "../constants"

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export interface CurrencySelectorProps {
    currency: string;
    setCurrency: (currency: string) => void;
}

export function CurrencySelector(props: CurrencySelectorProps) {
    const { currency, setCurrency } = props;

    const basicCurrencies = MAIN_CURRENCIES.map(item => <MenuItem value={item} key={`basic-currency-${item}`}>{item}</MenuItem>)

    return (
        <Box>
            <FormControl sx={{ width: 210 }}>
                <InputLabel id="basic-currency-select-label">Basic Currency</InputLabel>
                <Select
                    labelId="basic-currency-select-label"
                    id="basic-currency-select"
                    value={currency}
                    label="Basic Currency"
                    onChange={(e) => setCurrency(e.target.value)}
                >
                    {basicCurrencies}
                </Select>
            </FormControl>
        </Box>
    )
}