import "../Assets/reset.css";
import "../Assets/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Products";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/products" element={<Products />} />
    </Routes>
    </BrowserRouter>
  );
}