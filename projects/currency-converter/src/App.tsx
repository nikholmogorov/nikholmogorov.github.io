import { useState } from "react"
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router"
import Calc from "./pages/Calc"
import Rates from "./pages/Rates"

export interface Rate {
    date: string,
    base: string,
    quote: string,
    rate: number,
}

export interface CalcProps {
    currency: string,
    setCurrency: (value: string) => void;
    rates: Rate[],
    isLoading: boolean,
    error: string | null,
}

async function fetchRates(currency: string): Promise<Rate[]> {
    const response = await fetch(`https://api.frankfurter.dev/v2/rates?base=${currency}`);
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return response.json();
}

export default function App() {
    const [currency, setCurrency] = useState(`RUB`);

    const { data: rates = [], isLoading, error } = useQuery({
        queryKey: [`rates`, currency],
        queryFn: () => fetchRates(currency),
    })

    const errorMessage = error instanceof Error ? error.message : null;

    return (
        <BrowserRouter basename="/projects/currency-converter/">
            <Routes>
                <Route path="/" element={<Calc currency={currency} setCurrency={setCurrency} rates={rates} isLoading={isLoading} error={errorMessage} />}></Route>
                <Route path="/rates" element={<Rates currency={currency} setCurrency={setCurrency} rates={rates} isLoading={isLoading} error={errorMessage} />}></Route>
            </Routes>
        </BrowserRouter >
    )
}