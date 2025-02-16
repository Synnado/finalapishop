import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("");
    const navigate = useNavigate();

    const handlePayment = () => {
        if (!paymentMethod) {
            alert("❌ Please select a payment method!");
            return;
        }
        alert(`✅ Payment Successful via ${paymentMethod}!`);
        navigate("/"); // ✅ กลับไปหน้า Home หลังจากชำระเงินสำเร็จ
    };

    return (
        <div style={styles.container}>
            <motion.h2 
                style={styles.title}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                💳 Payment Page
            </motion.h2>
            <motion.p 
                style={styles.subtitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Please select your preferred payment method:
            </motion.p>

            <motion.div 
                style={styles.paymentOptions}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                {["Credit Card", "PayPal", "Bank Transfer"].map((method, index) => (
                    <motion.label 
                        key={method} 
                        style={styles.option}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <input 
                            type="radio" 
                            name="paymentMethod" 
                            value={method}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        /> 
                        {method === "Credit Card" ? "💳" : method === "PayPal" ? "🅿️" : "🏦"} {method}
                    </motion.label>
                ))}
            </motion.div>

            <motion.button 
                style={styles.btnPayment} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePayment}
            >
                ✅ Complete Payment
            </motion.button>
        </div>
    );
};

// ✅ CSS Style
const styles = {
    container: {
        maxWidth: "600px",
        margin: "40px auto",
        textAlign: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
        color: "white",
    },
    title: {
        fontSize: "2rem",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    subtitle: {
        fontSize: "1.2rem",
        marginBottom: "15px",
        color: "#f8f9fa",
    },
    paymentOptions: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        textAlign: "left",
        marginBottom: "20px",
    },
    option: {
        fontSize: "1.2rem",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        background: "rgba(255, 255, 255, 0.1)",
        padding: "10px",
        borderRadius: "8px",
        transition: "0.3s",
    },
    btnPayment: {
        background: "#1d3557",
        color: "white",
        border: "none",
        padding: "12px 20px",
        cursor: "pointer",
        borderRadius: "8px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        transition: "0.3s",
    },
};

export default Payment;