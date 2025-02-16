import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OrderTracking = () => {
    const [trackingData, setTrackingData] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/order-tracking/2", {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data && data.Status) {
                setTrackingData(data);
            } else {
                setTrackingData(null);
            }
        })
        .catch((error) => {
            console.error("Error fetching order tracking:", error);
            setTrackingData(null);
        });
    }, [token]);

    return (
        <div style={styles.container}>
            <motion.h2
                style={styles.title}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                📦 Order Tracking
            </motion.h2>

            {trackingData ? (
                <motion.div 
                    style={styles.statusBox}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <p><strong>Order ID:</strong> {trackingData.OrderID}</p>
                    <p><strong>Customer ID:</strong> {trackingData.CustomerID}</p>
                    <p><strong>Tracking Status:</strong> 
                        <span style={{...styles.status, backgroundColor: getStatusColor(trackingData.Status)}}>
                            {trackingData.Status}
                        </span>
                    </p>
                    <motion.div
                        style={styles.progressBarContainer}
                        initial={{ width: "0%" }}
                        animate={{ width: getProgressWidth(trackingData.Status) }}
                        transition={{ duration: 0.5 }}
                    />
                </motion.div>
            ) : (
                <motion.p 
                    style={styles.noData}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    No tracking data found.
                </motion.p>
            )}

            <motion.button 
                style={styles.btnBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
            >
                🏠 Back to Home
            </motion.button>
        </div>
    );
};

// ✅ ฟังก์ชันกำหนดสีของสถานะ
const getStatusColor = (status) => {
    switch (status) {
        case "Pending": return "#f4a261";
        case "Processing": return "#e9c46a";
        case "Shipped": return "#2a9d8f";
        case "Delivered": return "#264653";
        default: return "#ddd";
    }
};

// ✅ ฟังก์ชันกำหนดความกว้างของ Progress Bar
const getProgressWidth = (status) => {
    switch (status) {
        case "Pending": return "20%";
        case "Processing": return "50%";
        case "Shipped": return "80%";
        case "Delivered": return "100%";
        default: return "0%";
    }
};

// ✅ สไตล์
const styles = {
    container: { 
        maxWidth: "600px", 
        margin: "40px auto", 
        textAlign: "center", 
        padding: "20px", 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "12px",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
        color: "white",
    },
    title: { 
        fontSize: "2rem", 
        fontWeight: "bold", 
        marginBottom: "20px" 
    },
    statusBox: { 
        fontSize: "1.2rem", 
        background: "rgba(255, 255, 255, 0.1)", 
        padding: "15px", 
        borderRadius: "8px", 
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", 
    },
    status: { 
        padding: "8px 12px", 
        color: "white", 
        fontWeight: "bold", 
        borderRadius: "5px", 
        marginLeft: "10px" 
    },
    noData: { 
        fontSize: "1.2rem", 
        color: "#ffcc00", 
        fontWeight: "bold",
    },
    progressBarContainer: {
        width: "100%",
        height: "10px",
        background: "#ddd",
        borderRadius: "5px",
        marginTop: "15px",
        position: "relative",
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#ffcc00",
        borderRadius: "5px",
        transition: "width 0.5s ease-in-out",
    },
    btnBack: { 
        background: "#457b9d", 
        color: "white", 
        padding: "10px 15px", 
        borderRadius: "8px", 
        fontSize: "1rem", 
        cursor: "pointer", 
        marginTop: "20px", 
        fontWeight: "bold",
    },
};

export default OrderTracking;