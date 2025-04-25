// This should be called when navigating from the main meals page
const savedOrder = JSON.parse(localStorage.getItem("orderDetails")) || [];

function populateOrderSummary() {
  const orderList = document.getElementById("orderList");
  let total = 0;
  orderList.innerHTML = "";

  savedOrder.forEach(item => {
    const line = document.createElement("div");
    line.className = "order-item";
    line.innerHTML = `
      <span>${item.name} x ${item.qty}</span>
      <span>₹${item.qty * item.price}</span>
    `;
    total += item.qty * item.price;
    orderList.appendChild(line);
  });

  document.getElementById("totalAmountDisplay").innerText = `Total: ₹${total}`;
}

function confirmOrder() {
  document.getElementById("confirmationPopup").style.display = "block";
}

function goToPayment() {
  window.location.href = "qr.html"; // Redirect to your final payment page
}

window.onload = populateOrderSummary;

