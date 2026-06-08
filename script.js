let cartItems = [];

// ================= API BASE =================
const API_BASE = "https://amazonclone-htzt.onrender.com";

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
  fetch(`${API_BASE}/cart`, {
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => {

    console.log("Cart API Response:", data);

    if (!Array.isArray(data)) {
      console.log("Cart error:", data);
      cartItems = [];
      renderCart();
      return;
    }

    cartItems = data;
    renderCart();
  })
  .catch(err => console.log("Cart load error:", err));
}

// ================= RENDER CART =================
function renderCart() {
    console.log("Cart Data:", cartItems);

    cartList.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    cartItems.forEach((item) => {

        const price = Number(item.price) || 0;
        const qty = item.qty || 1;

        const itemTotal = price * qty;

        total += itemTotal;
        totalItems += qty;

        cartList.innerHTML += `
            <div style="margin-bottom:10px;">
                🛒 ${item.name} - ₹${price}

                <button class="qty-btn" data-action="minus" data-id="${item._id}">➖</button>

                <span> ${qty} </span>

                <button class="qty-btn" data-action="plus" data-id="${item._id}">➕</button>

                = ₹${itemTotal}

                <button class="remove-btn" data-id="${item._id}">❌</button>
            </div>
        `;
    });

    cartCounter.innerText = totalItems;
    totalPriceElement.innerText = total;
}

// ================= EVENT DELEGATION (FINAL FIX) =================
document.addEventListener("click", async (e) => {

    const id = e.target.dataset.id;
    const action = e.target.dataset.action;

    // ================= REMOVE ITEM =================
    if (e.target.classList.contains("remove-btn")) {

        try {
            const res = await fetch(`${API_BASE}/cart/${id}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
    }
})

            await loadCart();

        } catch (err) {
            console.log("Remove error:", err);
        }
    }

    // ================= QTY UPDATE =================
    if (e.target.classList.contains("qty-btn")) {

        const item = cartItems.find(i => i._id === id);
        if (!item) return;

        let newQty = item.qty || 1;

        if (action === "plus") newQty++;
        if (action === "minus") newQty--;

        if (newQty <= 0) return;

        try {
            const res = await fetch(`${API_BASE}/cart/update/${id}`, {
    method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    id,
                    qty: newQty
                })
            });

            await loadCart();

        } catch (err) {
            console.log("Qty update error:", err);
        }
    }
});

// ================= ADD TO CART =================
cartButtons.forEach(button => {
    button.addEventListener("click", () => {

        const box = button.closest(".box");

        const name = box.querySelector("h2").innerText;

        const price = Number(
            box.querySelector(".price").innerText.replace("₹", "")
        );

        fetch(`${API_BASE}/cart/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                price,
                qty: 1
            })
        })
        .then(res => res.json())
        .then(() => {
            loadCart();
        })
        .catch(err => console.log("Add error:", err));
    });
});

// ================= PLACE ORDER =================
function placeOrder() {
    fetch(`${API_BASE}/order/place`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(() => {
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

console.log("🚀 FINAL CART SYSTEM READY (BUG FREE)");