import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import OrderTracking from "./pages/OrderTracking";
import Payment from "./pages/Payment"; // ✅ เพิ่ม Payment Page
import { AuthContext } from "./AuthContext";

function App() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // ✅ ฟังก์ชันเพิ่มสินค้าไปยังตะกร้า
    const addToCart = (product) => {
        let updatedCart;
        const existingItem = cart.find(item => item.ProductID === product.ProductID);

        if (existingItem) {
            updatedCart = cart.map(item =>
                item.ProductID === product.ProductID
                    ? { ...item, Quantity: item.Quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...product, Quantity: 1 }];
        }

        updateCart(updatedCart);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">MyShop</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            {user ? (
                                <>
                                    <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/orders">Orders</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/OrderTracking">OrderTracking</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/cart">Cart ({cart.reduce((acc, item) => acc + item.Quantity, 0)})</Link></li>
                                    <li className="nav-item"><button onClick={handleLogout} className="btn btn-danger">Logout</button></li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* ✅ Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products addToCart={addToCart} />} /> {/* ✅ ส่ง addToCart ไป */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/cart" element={<Cart cart={cart} setCart={updateCart} />} />
                <Route path="/OrderTracking" element={<OrderTracking />} />
                <Route path="/payment" element={<Payment />} /> {/* ✅ เพิ่ม Payment Page */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;