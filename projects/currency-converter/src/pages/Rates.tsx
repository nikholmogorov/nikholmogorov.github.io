import { useNavigate } from "react-router"
import { CurrencySelector } from "../components/CurrencySelector"
import { MAIN_CURRENCIES } from "../constants"
import type { CalcProps } from "../App"

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export default function Rates(props: CalcProps) {
    const { currency, setCurrency, rates, isLoading, error } = props;

    const navigate = useNavigate();

    function renderContent() {
        if (isLoading) return <CircularProgress aria-label="Loading…" />
        if (error) return <Alert variant="filled" severity="error">Error: {error}</Alert>;
        if (!Array.isArray(rates) || rates.length === 0) return <Alert variant="filled" severity="error">No data</Alert>;
        const ratesListItems = rates
            .filter(item => MAIN_CURRENCIES.includes(item.quote) && item.quote !== item.base)
            .sort((a, b) => MAIN_CURRENCIES.indexOf(a.quote) - MAIN_CURRENCIES.indexOf(b.quote))
            .map((item) =>
                <ListItem component={Paper} key={item.quote} sx={{ mb: 1, p: 1.5, pl: 3 }}>
                    <ListItemText primary={`1 ${item.quote} = ${(1 / item.rate).toFixed(4)} ${item.base}`} />
                </ListItem>);
        return (
            <List sx={{ width: 210, mt: 0 }}>
                {ratesListItems}
            </List>
        );
    }

    return (
        <Stack spacing={2} sx={{
            minHeight: '100dvh',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Button variant="contained" onClick={() => navigate("/")} sx={{ p: 1.5, width: 210, height: 56 }}>Calc</Button>
            <Box>
                <CurrencySelector currency={currency} setCurrency={setCurrency} />
                {renderContent()}
            </Box>
        </Stack>
    )
}