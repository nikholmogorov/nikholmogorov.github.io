import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import First from "./pages/First/First";
import Second from "./pages/Second/Second";
import Third from "./pages/Third/Third";
import Fourth from "./pages/Fourth/Fourth";

function App() {
    return (
        <BrowserRouter basename="/projects/maze">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/first" element={<First />} />
                <Route path="/second" element={<Second />} />
                <Route path="/third" element={<Third />} />
                <Route path="/fourth" element={<Fourth />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
