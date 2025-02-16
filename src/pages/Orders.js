import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Orders = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/orders/2", {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data && Array.isArray(data.orders) && data.orders.length > 0) {
                setOrderDetails({
                    CustomerID: data.orders[0].CustomerID,
                    OrderDate: data.orders[0].OrderDate,
                    Status: data.orders[0].Status
                });
            } else {
                setOrderDetails(null);
            }
        });

        const savedOrder = JSON.parse(localStorage.getItem("order"));
        if (savedOrder) {
            setOrderItems(savedOrder.orderItems);
        }
    }, [token]);

    const handleOrderConfirm = () => {
        setOrderItems([]);
        setOrderDetails(null);
        localStorage.removeItem("order");
        navigate("/payment");
    };

    return (
        <div style={styles.container}>
            <motion.h2 
                style={styles.title}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                📦 My Orders
            </motion.h2>

            {orderDetails && orderItems.length > 0 ? (
                <>
                    <motion.table 
                        style={styles.table}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Order Date</th>
                                <th>Status</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map((item, index) => (
                                <motion.tr 
                                    key={index}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                >
                                    {index === 0 && (
                                        <>
                                            <td rowSpan={orderItems.length}>{orderDetails.CustomerID}</td>
                                            <td rowSpan={orderItems.length}>{new Date(orderDetails.OrderDate).toLocaleString()}</td>
                                            <td rowSpan={orderItems.length} style={styles.statusCell}>
                                                {orderDetails.Status}
                                            </td>
                                        </>
                                    )}
                                    <td>{item.ProductName}</td>
                                    <td>{item.Quantity}</td>
                                    <td>${parseFloat(item.Price).toLocaleString()}</td>
                                    <td>${(parseFloat(item.Price) * item.Quantity).toLocaleString()}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </motion.table>

                    <h3 style={styles.totalAmount}>Total Amount: ${orderItems.reduce((total, item) => total + (parseFloat(item.Price) * item.Quantity), 0).toLocaleString()}</h3>

                    <motion.button 
                        style={styles.btnOrder}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOrderConfirm}
                    >
                        🛒 Confirm Order
                    </motion.button>
                </>
            ) : (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={styles.noOrderText}
                >
                    No orders found.
                </motion.p>
            )}
        </div>
    );
};

// ✅ สไตล์ UI
const styles = {
    container: { 
        maxWidth: "1200px", 
        margin: "40px auto", 
        textAlign: "center", 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "30px", 
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
        color: "white",
    },
    title: { 
        fontSize: "2.5rem", 
        fontWeight: "bold", 
        marginBottom: "25px" 
    },
    table: { 
        width: "95%", 
        margin: "auto", 
        borderCollapse: "separate", 
        borderSpacing: "0px 10px", 
        background: "rgba(255, 255, 255, 0.1)", 
        borderRadius: "10px", 
        overflow: "hidden", 
        fontSize: "1.2rem",
        color: "white",
    },
    statusCell: { 
        backgroundColor: "#f4a261", 
        color: "white", 
        padding: "10px", 
        borderRadius: "8px",
    },
    totalAmount: { 
        fontSize: "2rem", 
        fontWeight: "bold", 
        marginTop: "20px", 
        color: "#ffcc00" 
    },
    btnOrder: { 
        background: "#1d3557", 
        color: "white", 
        border: "none", 
        padding: "15px 25px", 
        cursor: "pointer", 
        borderRadius: "10px", 
        fontSize: "1.3rem", 
        transition: "0.3s", 
        fontWeight: "bold",
        marginTop: "20px",
    },
    noOrderText: {
        fontSize: "1.5rem",
        color: "#ffcc00",
        fontWeight: "bold",
    },
};

export default Orders;