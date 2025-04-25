const meals = {
    breakfast: [
        { name: "Puri Masala", price: 10 }
    ],
    lunch: [
        { name: "Meals", price: 50 },
        { name: "Chapati", price: 10 },
        { name: "Half chicken biriyani", price: 60 },
        { name: "Full chicken biriyani", price: 120 },
        { name: "Chicken fry", price: 45 },
        { name: "Omlet", price: 10 }
    ],
    snacks: [
        { name: "Tea", price: 10 },
        { name: "Coffee", price: 15 },
        { name: "Cutlet", price: 15 }
    ],
    dinner: [
        { name: "Biriyani Rice & veg Curry", price: 40 },
        { name: "Chicken Curry", price: 40 }

    ]
};

let quantities = {};

function toggleMenu(meal) {
    const menuDiv = document.getElementById(meal);

    // Toggle the display of the menu
    if (menuDiv.style.display === 'block') {
        menuDiv.style.display = 'none'; // Hide the menu
    } else {
        if (menuDiv.innerHTML.trim() === '') {
            loadMenu(meal);  // Load the menu if not already loaded
        }
        menuDiv.style.display = 'block'; // Show the menu
    }
}


function loadMenu(meal) {
    const container = document.getElementById(meal);
    meals[meal].forEach(item => {
        const id = `${meal}_${item.name.replace(/\s/g, '')}`;
        quantities[id] = 0;

        container.innerHTML += `
            <div class="menu-item">
                <span class="food-name">${item.name} - ₹${item.price}</span>
                <div class="controls">
                    <button onclick="changeQuantity('${id}', -1)">-</button>
                    <span id="${id}_qty">0</span>
                    <button onclick="changeQuantity('${id}', 1)">+</button>
                </div>
            </div>
        `;
    });
}

function changeQuantity(id, delta) {
    quantities[id] = Math.max(0, quantities[id] + delta);
    document.getElementById(`${id}_qty`).innerText = quantities[id];
}

function calculateTotal() {
    let total = 0;
    for (let meal in meals) {
        meals[meal].forEach(item => {
            const id = `${meal}_${item.name.replace(/\s/g, '')}`;
            const qty = quantities[id] || 0;
            total += qty * item.price;
        });
        let orderDetails = [];

for (let meal in meals) {
  meals[meal].forEach(item => {
    const id = `${meal}_${item.name.replace(/\s/g, '')}`;
    const qty = quantities[id] || 0;
    if (qty > 0) {
      orderDetails.push({ name: item.name, qty: qty, price: item.price });
    }
  });
}

localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
window.location.href = "payment.html";

    }

    document.getElementById("totalAmount").innerText = `Total Amount: ₹${total}`;
    document.getElementById("totalBox").style.display = "block";
}
function closeTotalBox() {
    document.getElementById("totalBox").style.display = "none";
}


function dineNow() {
    alert("Proceeding to dine...");
}

function goBack() {
    window.history.back();
}
function proceedToPay() {
    // Store order in localStorage to use in next page
    const order = [];
    let total = 0;

    for (let meal in meals) {
        meals[meal].forEach(item => {
            const id = `${meal}_${item.name.replace(/\s/g, '')}`;
            const qty = quantities[id] || 0;
            if (qty > 0) {
                const subtotal = qty * item.price;
                order.push({ name: item.name, qty: qty, price: item.price, subtotal: subtotal });
                total += subtotal;
            }
        });
    }

    localStorage.setItem("orderDetails", JSON.stringify(order));
    localStorage.setItem("orderTotal", total);

    // Redirect to payment page
    window.location.href = "payment.html";
}

