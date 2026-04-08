import { BrowserRouter, Routes, Route } from "react-router-dom"
import Stopwatch from "@/pages/Stopwatch/Stopwatch"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Stopwatch />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
