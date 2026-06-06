let cartItems = [];

// ================= TOKEN CHECK =================
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// ================= DOM =================
const cartCounter = document.querySelector("#cart-count");
const cartList = document.querySelector("#cart-items-list");
const totalPriceElement = document.querySelector("#total-price");

const cartButtons = document.querySelectorAll(".add-to-cart");

// ================= LOAD CART =================
function loadCart() {
    fetch("http://localhost:5000/cart", {
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        }
    })
    .then(res => res.json())
    .then(data => {
        cartItems = data;
        renderCart();
    })
    .catch(err => console.log("Cart load error:", err));
}

// ================= RENDER CART =================
function renderCart() {
    cartList.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    cartItems.forEach((item, index) => {

        const price = Number(item.price) || 0;
        const qty = item.qty || 1;

        const itemTotal = price * qty;

        total += itemTotal;
        totalItems += qty;

        cartList.innerHTML += `
            <div style="margin-bottom:10px;">
                🛒 ${item.name} - ₹${price}

                <button class="qty-btn" data-action="minus" data-index="${index}">➖</button>

                <span> ${qty} </span>

                <button class="qty-btn" data-action="plus" data-index="${index}">➕</button>

                = ₹${itemTotal}

                <button class="remove-btn" data-index="${index}">❌</button>
            </div>
        `;
    });

    cartCounter.innerText = totalItems;
    totalPriceElement.innerText = total;

    attachEvents();
}

// ================= EVENTS =================
function attachEvents() {

    // REMOVE ITEM
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {

            const item = cartItems[btn.dataset.index];

            fetch("http://localhost:5000/cart/remove", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
                body: JSON.stringify({ name: item.name })
            })
            .then(res => res.json())
            .then(data => {
                cartItems = data;
                renderCart();
            });
        });
    });

    // QTY UPDATE
    document.querySelectorAll(".qty-btn").forEach(btn => {
        btn.addEventListener("click", () => {

            const item = cartItems[btn.dataset.index];
            const action = btn.dataset.action;

            let newQty = item.qty || 1;

            if (action === "plus") newQty++;
            if (action === "minus") newQty--;

            // remove first
            fetch("http://localhost:5000/cart/remove", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
                body: JSON.stringify({ name: item.name })
            })
            .then(() => {
                return fetch("http://localhost:5000/cart/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": token
                    },
                    body: JSON.stringify({
                        name: item.name,
                        price: item.price,
                        qty: newQty
                    })
                });
            })
            .then(res => res.json())
            .then(data => {
                cartItems = data;
                renderCart();
            });
        });
    });
}

// ================= ADD TO CART =================
cartButtons.forEach(button => {
    button.addEventListener("click", () => {

        const box = button.closest(".box");

        const name = box.querySelector("h2").innerText;

        const price = Number(
            box.querySelector(".price").innerText.replace("₹", "")
        );

        fetch("http://localhost:5000/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({
                name,
                price,
                qty: 1
            })
        })
        .then(res => res.json())
        .then(data => {
            cartItems = data;
            renderCart();
        })
        .catch(err => console.log("Add error:", err));
    });
});

// ================= PLACE ORDER =================
function placeOrder() {
    fetch("http://localhost:5000/order/place", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert("Order Placed Successfully!");
        loadCart();
    })
    .catch(err => console.log("Order error:", err));
}

// ================= LOGOUT =================
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

// ================= INIT =================
loadCart();

console.log("🚀 Cart system loaded successfully");