import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalog from "@pages/Catalog/Catalog";
import ProductDetails from "@pages/ProductDetails/ProductDetails";
import ShoppingCart from "@pages/ShoppingCart/ShoppingCart";
import Header from "@components/Header/Header";

export default function App() {
  return (
    <BrowserRouter basename="/projects/catalog/">
      <Header />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </BrowserRouter>
  );
}
