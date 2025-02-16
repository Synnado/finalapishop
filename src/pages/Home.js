import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <motion.h1
          style={styles.title}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🛒 Welcome to MyShop
        </motion.h1>
        <motion.p
          style={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Your one-stop shop for amazing products!
        </motion.p>
      </header>

      <nav style={styles.nav}>
        {["/products", "/orders", "/login", "/register"].map((path, index) => (
          <motion.div
            key={path}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Link to={path} style={styles.navLink}>
              {path === "/products" ? "🛍 View Products" : ""}
              {path === "/orders" ? "📦 My Orders" : ""}
              {path === "/login" ? "🔑 Login" : ""}
              {path === "/register" ? "📝 Register" : ""}
            </Link>
          </motion.div>
        ))}
      </nav>

      <section style={styles.features}>
        {featureData.map((feature, index) => (
          <motion.div
            key={index}
            style={styles.featureCard}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <h3>{feature.icon} {feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </section>

      <footer style={styles.footer}>
        <p>© 2025 MyShop. All rights reserved.</p>
      </footer>
    </div>
  );
}

const featureData = [
  { icon: "🔥", title: "Best Deals", description: "Find the best products at unbeatable prices." },
  { icon: "🚀", title: "Fast Shipping", description: "Get your orders delivered in record time." },
  { icon: "💳", title: "Secure Payment", description: "100% safe and secure checkout process." }
];

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    color: "#fff",
    paddingBottom: "20px"
  },
  header: {
    padding: "40px 0",
  },
  title: {
    fontSize: "2.5rem",
    margin: "10px 0",
  },
  subtitle: {
    fontSize: "1.2rem",
    margin: "5px 0",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
  },
  navLink: {
    textDecoration: "none",
    backgroundColor: "#ff6b6b",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "40px 20px",
  },
  featureCard: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(5px)",
  },
  footer: {
    marginTop: "40px",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
};

export default Home;