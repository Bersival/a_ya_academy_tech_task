import React, { useState, useEffect } from "react";
import ProductsList from "./components/ProductsList";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CartPage from "./components/CartPage";
import { Button } from "antd";
import { ShoppingCartOutlined, HomeOutlined } from "@ant-design/icons";
import { useAppSelector } from "./hooks/redux";

export default function App() {
  const cart = useAppSelector((state) => state.cart);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    setCartCount(cart.items.length ?? 0);
  }, [cart]);
  return (
    <div className="App">
      <Router>
        <header className="fixed z-50 top-0 bg-slate-400 app-header w-full flex items-center justify-center">
          <Link to="/">
            <Button
              type="link"
              className="mr-5"
              icon={<HomeOutlined />}
              size="large"
            >
              Home
            </Button>
          </Link>
          <Link to="/cart">
            <Button type="link" icon={<ShoppingCartOutlined />} size="large">
              Cart <b className="ml-3">{cartCount}</b>
            </Button>
          </Link>
        </header>
        <Routes>
          <Route path="/" Component={ProductsList} />
          <Route path="/cart" Component={CartPage} />
        </Routes>
      </Router>
    </div>
  );
}
