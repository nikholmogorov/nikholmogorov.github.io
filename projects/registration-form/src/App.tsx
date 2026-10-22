import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { AppThemeProvider } from "./AppThemeProvider";
import First from "./pages/First";
import Second from "./pages/Second";
import Third from "./pages/Third";
import { store } from "./store/store";

export default function App() {
  return (
    <AppThemeProvider>
      <Provider store={store}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<First />} />
            <Route path="/second" element={<Second />} />
            <Route path="/third" element={<Third />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AppThemeProvider>
  );
}
