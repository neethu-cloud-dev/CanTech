document.addEventListener("DOMContentLoaded", () => {
    const total = localStorage.getItem("orderTotal") || 0;
    document.getElementById("totalAmount").innerText = total;
  
    document.getElementById("gpayButton").addEventListener("click", () => {
      window.location.href = `upi://pay?pa=your-upi-id@okaxis&pn=YourName&am=${total}&cu=INR&tn=Order%20Payment`;
    });
  
    document.getElementById("phonepeButton").addEventListener("click", () => {
      window.location.href = `upi://pay?pa=your-upi-id@okhdfcbank&pn=YourName&am=${total}&cu=INR&tn=Order%20Payment`;
    });
  });
  