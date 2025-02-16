import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Cart = ({ cart, setCart }) => {
    const navigate = useNavigate();

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (parseFloat(item.Price) * item.Quantity), 0).toLocaleString();
    };

    const removeItem = (productID) => {
        const updatedCart = cart.filter(item => item.ProductID !== productID);
        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("❌ Your cart is empty!");
            return;
        }

        const orderData = {
            orderItems: cart,
            totalAmount: getTotalPrice(),
            status: "Pending",
        };

        localStorage.setItem("order", JSON.stringify(orderData));
        setCart([]);
        navigate("/orders");
    };

    return (
        <div style={styles.container}>
            <motion.h2
                style={styles.title}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                🛒 Shopping Cart
            </motion.h2>
            
            {cart.length === 0 ? (
                <motion.p 
                    style={styles.emptyCart}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Your cart is empty.
                </motion.p>
            ) : (
                <>
                    <div style={styles.cartList}>
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    key={item.ProductID}
                                    style={styles.card}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div style={styles.cardInfo}>
                                        <h3 style={styles.productName}>{item.ProductName}</h3>
                                        <p style={styles.productPrice}>${parseFloat(item.Price).toLocaleString()} x {item.Quantity}</p>
                                        <p style={styles.productTotal}>Total: ${(parseFloat(item.Price) * item.Quantity).toLocaleString()}</p>
                                    </div>
                                    <motion.button 
                                        style={styles.btnRemove} 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => removeItem(item.ProductID)}
                                    >
                                        ❌ Remove
                                    </motion.button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <h3 style={styles.total}>Total: ${getTotalPrice()}</h3>

                    <div style={styles.buttonContainer}>
                        <motion.button 
                            style={styles.btnBack} 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/products")}
                        >
                            🔙 Back
                        </motion.button>
                        <motion.button 
                            style={styles.btnClear} 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={clearCart}
                        >
                            🗑 Clear
                        </motion.button>
                        <motion.button 
                            style={styles.btnCheckout} 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCheckout}
                        >
                            💳 Checkout
                        </motion.button>
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        textAlign: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
        color: "white",
    },
    title: {
        fontSize: "2.2rem",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    emptyCart: {
        fontSize: "1.2rem",
        color: "#f8f9fa",
    },
    cartList: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    card: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px",
        borderRadius: "10px",
        background: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
        transition: "0.3s",
    },
    cardInfo: {
        textAlign: "left",
    },
    productName: {
        fontSize: "1.2rem",
        fontWeight: "bold",
    },
    productPrice: {
        fontSize: "1rem",
    },
    productTotal: {
        fontSize: "1rem",
        fontWeight: "bold",
        color: "#ff6b6b",
    },
    btnRemove: {
        background: "#e63946",
        color: "white",
        border: "none",
        padding: "8px 12px",
        cursor: "pointer",
        borderRadius: "8px",
        fontSize: "0.9rem",
        transition: "0.3s",
    },
    total: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginTop: "20px",
        color: "#f8f9fa",
    },
    buttonContainer: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between",
    },
    btnBack: {
        background: "#457b9d",
        color: "white",
        border: "none",
        padding: "12px 18px",
        cursor: "pointer",
        borderRadius: "10px",
        fontSize: "1rem",
        transition: "0.3s",
    },
    btnClear: {
        background: "#f4a261",
        color: "white",
        border: "none",
        padding: "12px 18px",
        cursor: "pointer",
        borderRadius: "10px",
        fontSize: "1rem",
        transition: "0.3s",
    },
    btnCheckout: {
        background: "#2a9d8f",
        color: "white",
        border: "none",
        padding: "12px 18px",
        cursor: "pointer",
        borderRadius: "10px",
        fontSize: "1rem",
        transition: "0.3s",
    },
};

export default Cart;