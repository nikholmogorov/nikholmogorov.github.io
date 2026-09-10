import { useState } from "react"
import { useNavigate } from "react-router"
import { CurrencySelector } from "../components/CurrencySelector.tsx"
import { MAIN_CURRENCIES } from "../constants"
import type { CalcProps } from "../App"

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import NumberField from '../components/NumberField.tsx';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

export default function Calc(props: CalcProps) {
    const { currency, setCurrency, rates, isLoading, error } = props;

    const [value, setValue] = useState<number | null>(100);
    const [targetCurrency, setTargetCurrency] = useState(`USD`);

    const navigate = useNavigate();

    function calcCurrency(amount: number) {
        if (!amount) return `0`;
        const targetRate = rates.find(item => item?.quote === targetCurrency)?.rate;
        if (!targetRate) return `0`;
        return (amount * targetRate).toFixed(2);
    }

    function renderContent() {
        if (isLoading) return <CircularProgress aria-label="Loading…" />
        if (error) return <Alert variant="filled" severity="error">Error: {error}</Alert>;
        if (!Array.isArray(rates) || rates.length === 0) return <Alert variant="filled" severity="error">No data</Alert>;
        const calculatedResult = calcCurrency(Number(value));
        return (
            <Paper sx={{ p: 1, pt: 1.5, width: 210, height: 56, border: 1, borderColor: 'divider' }}>
                <Typography variant="h5">
                    {calculatedResult}
                </Typography>
            </Paper>
        );
    }

    const targetCurrencies = MAIN_CURRENCIES.map(item => <MenuItem value={item} key={`target-currency-${item}`}>{item}</MenuItem>)

    return (
        <Stack spacing={2} sx={{
            minHeight: '100dvh',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Button variant="contained" onClick={() => navigate("/rates")} sx={{ p: 1.5, width: 210, height: 56 }}>Rates</Button>
            <CurrencySelector currency={currency} setCurrency={setCurrency} />
            <NumberField value={value ?? undefined} onChange={(val: number | null) => setValue(val)} label="Amount" min={0} />
            <Box>
                <FormControl sx={{ width: 210 }}>
                    <InputLabel id="target-currency-select-label">Target Currency</InputLabel>
                    <Select
                        labelId="target-currency-select-label"
                        id="target-currency-select"
                        value={targetCurrency}
                        label="Target Currency"
                        onChange={(e: SelectChangeEvent) => setTargetCurrency(e.target.value)}
                    >
                        {targetCurrencies}
                    </Select>
                </FormControl>
            </Box>
            {renderContent()}
        </Stack>
    )
}