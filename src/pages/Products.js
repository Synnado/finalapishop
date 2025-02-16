import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Products = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            alert("Unauthorized");
            navigate("/login");
            return;
        }

        axios
            .get("http://localhost:5000/api/products", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setProducts(res.data.products);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                alert("Unauthorized");
                navigate("/login");
            });
    }, [token, navigate]);

    const handleAddToCart = (product) => {
        addToCart(product);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    if (isLoading)
        return (
            <div style={styles.loadingContainer}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    style={styles.loadingSpinner}
                />
                <h2 style={{ color: "white", marginTop: "20px" }}>Loading products...</h2>
            </div>
        );

    return (
        <div style={styles.container}>
            <motion.h2
                style={styles.title}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                🛍 Our Products
            </motion.h2>
            <div style={styles.productsGrid}>
                {products.length > 0 ? (
                    products.map((p, index) => (
                        <motion.div
                            key={p.ProductID}
                            style={styles.productCard}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                            <h3 style={styles.productName}>{p.ProductName}</h3>
                            <p style={styles.description}>{p.Description}</p>
                            <p style={styles.price}>
                                ${parseFloat(p?.Price || 0).toLocaleString()}
                            </p>
                            <motion.button
                                style={styles.btnAddToCart}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAddToCart(p)}
                            >
                                🛒 Add to Cart
                            </motion.button>
                        </motion.div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>

            {/* Popup Notification */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        style={styles.popup}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        ✅ Item added to cart!
                        <button 
                            style={styles.viewCartButton}
                            onClick={() => navigate("/cart")}
                        >
                            View Cart
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "1300px",
        margin: "40px auto",
        textAlign: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px",
        borderRadius: "10px",
        color: "#fff",
    },
    title: {
        fontSize: "2.5rem",
        fontWeight: "bold",
        marginBottom: "30px",
        textTransform: "uppercase",
    },
    productsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "25px",
        padding: "20px",
    },
    productCard: {
        background: "rgba(255, 255, 255, 0.1)",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    productName: {
        fontSize: "1.4rem",
        fontWeight: "bold",
    },
    description: {
        fontSize: "1rem",
        marginBottom: "10px",
    },
    price: {
        fontSize: "1.4rem",
        fontWeight: "bold",
        color: "#ff6b6b",
        marginBottom: "15px",
    },
    btnAddToCart: {
        background: "#ff6b6b",
        color: "white",
        border: "none",
        padding: "10px 15px",
        cursor: "pointer",
        borderRadius: "8px",
        fontSize: "1rem",
        fontWeight: "bold",
        transition: "0.3s",
    },
    popup: {
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "#fff",
        color: "#333",
        padding: "10px 15px",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    viewCartButton: {
        background: "#1d3557",
        color: "white",
        border: "none",
        padding: "5px 10px",
        cursor: "pointer",
        borderRadius: "6px",
        fontSize: "0.9rem",
    },
    loadingContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    loadingSpinner: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "6px solid white",
        borderTop: "6px solid transparent",
    },
};

export default Products;