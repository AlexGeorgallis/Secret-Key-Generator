import React, { useState } from "react";
import axios from "axios";

function App() {
  const [bits, setBits] = useState(256);
  const [key, setKey] = useState("");
  const [copied, setCopied] = useState(false);

  const generateKey = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/generate-key?bits=${bits}`
      );
      setKey(response.data);
      setCopied(false);
    } catch (error) {
      alert("Error generating key! Please try again.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h3 style={styles.navTitle}>🔑 Secret Key Generator</h3>
        <div style={styles.navLinkContainer}>
          <a
            href="https://github.com/alexgeorgallis"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.navLink}
          >
            About Me
          </a>
          <a
            href="https://github.com/alexgeorgallis/Secret-Key-Generator"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.navLink}
          >
            GitHub Repo
          </a>
        </div>
      </nav>


      {/* Main Content */}
      <div style={styles.card}>
        <h2 style={styles.title}>🔑 Secret Key Generator</h2>
        <p style={styles.subtitle}>Generate secure keys for encryption.</p>

        <label style={styles.label}>Choose Key Size (bits):</label>
        <select
          value={bits}
          onChange={(e) => setBits(parseInt(e.target.value))}
          style={styles.select}
        >
          {[64, 128, 256, 512, 1024, 2048, 4096].map((size) => (
            <option key={size} value={size}>
              {size} bits
            </option>
          ))}
        </select>

        <button onClick={generateKey} style={styles.button}>
          Generate Key
        </button>

        {key && (
          <div style={styles.resultBox}>
            <textarea value={key} readOnly style={styles.textarea} />
            <button onClick={copyToClipboard} style={styles.copyButton}>
              {copied ? "✅ Copied!" : "📋 Copy Key"
              }
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>Alexandros Georgallis {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  navbar: {
    width: "97.2%",
    padding: "15px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#333",
    color: "white",
    position: "absolute",
    top: 0,
    left: 0,
    flexWrap: "wrap",
    gap: "5px", 
  },
  navTitle: {
    margin: 0,
    fontSize: "18px",
    flex: "1",
    whiteSpace: "nowrap", 
  },
  navLinkContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap", 
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
    padding: "8px 12px",
    background: "#555",
    borderRadius: "5px",
    transition: "0.3s",
    whiteSpace: "nowrap",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
    marginTop: "60px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  select: {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  },
  button: {
    background: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
    marginBottom: "10px",
    transition: "0.3s",
  },
  resultBox: {
    marginTop: "20px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "none",
  },
  copyButton: {
    background: "#007BFF",
    color: "white",
    padding: "10px",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
    transition: "0.3s",
  },
  footer: {
    position: "absolute",
    bottom: "10px",
    textAlign: "center",
    fontSize: "14px",
    color: "white",
    width: "100%",
  },
};

export default App;
