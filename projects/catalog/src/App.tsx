import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalog from "@pages/Catalog/Catalog";
import ProductDetails from "@pages/ProductDetails/ProductDetails";
import ShoppingCart from "@pages/ShoppingCart/ShoppingCart";
import Header from "@components/Header/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/projects/catalog" element={<Catalog />} />
        <Route path="/projects/catalog/product/:id" element={<ProductDetails />} />
        <Route path="/projects/catalog/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </BrowserRouter>
  );
}
