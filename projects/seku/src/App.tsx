import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stopwatch from "@/pages/Stopwatch/Stopwatch";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route
          path="/"
          element={<Stopwatch />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
