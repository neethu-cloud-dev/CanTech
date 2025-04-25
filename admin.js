const correctCredentials = {
    name: "cantech",
    password: "tist"
};

function login() {
    const inputName = document.getElementById("adminName").value.trim();
    const inputPassword = document.getElementById("adminPassword").value;
    const errorMsg = document.getElementById("errorMsg");

    if (inputName === correctCredentials.name && inputPassword === correctCredentials.password) {
        document.querySelector(".login-container").style.display = "none";
        document.getElementById("adminDashboard").style.display = "block";
        displayOrderCounts();
    } else {
        errorMsg.textContent = "Incorrect name or password. Please try again.";
    }
}

function displayOrderCounts() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const counts = {};

    orders.forEach(order => {
        order.forEach(item => {
            counts[item] = (counts[item] || 0) + 1;
        });
    });

    const orderList = document.getElementById("orderList");
    orderList.innerHTML = "";

    for (let item in counts) {
        const li = document.createElement("li");
        li.textContent = `${item}: ${counts[item]}`;
        orderList.appendChild(li);
    }
}

function saveMenu(day) {
    const menuInput = document.getElementById(`${day}Menu`).value;
    localStorage.setItem(day, menuInput); // Saving the menu input for each day in localStorage
    alert(`${day.charAt(0).toUpperCase() + day.slice(1)}'s menu saved.`);
}

function finaliseOrder() {
    alert("Order has been finalised.");
    // Add any other finalization logic if necessary
}
function finaliseOrder() {
    window.location.href = "newhome.html"; // Redirect to your final payment page
  }