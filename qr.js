// Create a persistent QRCodeStyling instance ONCE
const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    data: "", // Will be set later
    dotsOptions: {
      color: "#000",
      type: "rounded"
    },
    backgroundOptions: {
      color: "#ffffff"
    }
  });
  
  // Generate and display QR code with payment link
  function makePayment(method) {
    const totalAmount = localStorage.getItem("orderTotal") || "1"; // fallback ₹1
    const upiID = "yourupiid@okaxis"; // Replace with real UPI ID
    const name = "Canteen";
    const note = "Canteen Order";
  
    const upiLink = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&tn=${encodeURIComponent(note)}&am=${totalAmount}&cu=INR`;
  
    // Update the QR code with new data
    qrCode.update({ data: upiLink });
  
    // Append only once
    const qrContainer = document.getElementById("qr-code");
    qrContainer.innerHTML = ""; // Clear previous QR
    qrCode.append(qrContainer);
  
    document.getElementById("payment-status").innerText =
      `Scan the QR with ${method === 'gpay' ? 'Google Pay' : 'PhonePe'} to complete the payment.`;
  
    // Optional: redirect to UPI link on mobile
    if (/Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = upiLink;
    }
  }
  function closeModal() {
    document.getElementById("confirmationModal").style.display = "none";
  }
  
  // You can simulate confirmation modal after 10 seconds for demo/testing
  function makePayment(method) {
    const totalAmount = localStorage.getItem("orderTotal") || "1";
    const upiID = "yourupiid@okaxis";
    const name = "Canteen";
    const note = "Canteen Order";
  
    const upiLink = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&tn=${encodeURIComponent(note)}&am=${totalAmount}&cu=INR`;
  
    qrCode.update({ data: upiLink });
  
    const qrContainer = document.getElementById("qr-code");
    qrContainer.innerHTML = "";
    qrCode.append(qrContainer);
  
    document.getElementById("payment-status").innerText =
      `Scan the QR with ${method === 'gpay' ? 'Google Pay' : 'PhonePe'} to complete the payment.`;
  
    if (/Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = upiLink;
    }
  
    // Simulate confirmation after 10 seconds
    setTimeout(() => {
      document.getElementById("confirmationModal").style.display = "flex";
    }, 10000);
  }
  