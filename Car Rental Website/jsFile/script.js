// =========================================================
// 
//DRIVENOW CAR RENTAL — MAIN JAVASCRIPT
// 
// =========================================================



// =========================================================
// MOBILE NAVIGATION TOGGLE
// =========================================================
function toggleMenu() {
    var menu = document.getElementById("nav-menu");
    if (menu) {
        menu.classList.toggle("open");
    }
}



// =========================================================
// EMAIL VALIDATION HELPER
// =========================================================
function isValidEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}



// =========================================================
// SHOW / HIDE ALERT MESSAGES
// =========================================================
function showError(id, msg) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.style.display = "block";
}

function showSuccess(id, msg) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.style.display = "block";
}

function hideMsg(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = "none";
}



// =========================================================
// LOGIN FORM VALIDATION
// =========================================================
function validateLoginForm() {

    var email    = document.getElementById("login-email").value.trim();
    var password = document.getElementById("login-password").value.trim();

    hideMsg("login-error");

    if (!email || !password) {
        showError("login-error", "Please fill in all fields.");
        return false;
    }

    if (!isValidEmail(email)) {
        showError("login-error", "Please enter a valid email address.");
        return false;
    }

    if (password.length < 6) {
        showError("login-error", "Password must be at least 6 characters.");
        return false;
    }

    alert("Login successful! Welcome back to DriveNow.");
    return true;
}



// =========================================================
// SIGNUP FORM VALIDATION
// =========================================================
function validateSignupForm() {

    var name     = document.getElementById("signup-name").value.trim();
    var email    = document.getElementById("signup-email").value.trim();
    var phone    = document.getElementById("signup-phone").value.trim();
    var password = document.getElementById("signup-password").value.trim();
    var confirm  = document.getElementById("signup-confirm").value.trim();
    var terms    = document.getElementById("terms-check").checked;

    hideMsg("signup-error");

    if (!name || !email || !phone || !password || !confirm) {
        showError("signup-error", "All fields are required.");
        return false;
    }

    if (!isValidEmail(email)) {
        showError("signup-error", "Enter a valid email address.");
        return false;
    }

    if (password.length < 6) {
        showError("signup-error", "Password must be at least 6 characters.");
        return false;
    }

    if (password !== confirm) {
        showError("signup-error", "Passwords do not match.");
        return false;
    }

    if (!terms) {
        showError("signup-error", "You must agree to the Terms & Conditions.");
        return false;
    }

    alert("Account created successfully! Welcome to DriveNow.");
    return true;
}



// =========================================================
// CONTACT FORM SUBMISSION
// =========================================================
function submitContactForm() {

    var name    = document.getElementById("contact-name").value.trim();
    var email   = document.getElementById("contact-email").value.trim();
    var subject = document.getElementById("contact-subject").value.trim();
    var message = document.getElementById("contact-message").value.trim();

    hideMsg("contact-error");
    hideMsg("contact-success");

    if (!name || !email || !subject || !message) {
        showError("contact-error", "Please fill in all fields.");
        return false;
    }

    if (!isValidEmail(email)) {
        showError("contact-error", "Please enter a valid email address.");
        return false;
    }

    showSuccess("contact-success", "Your message has been sent successfully! We'll contact you within 24 hours.");
    document.getElementById("contact-name").value    = "";
    document.getElementById("contact-email").value   = "";
    document.getElementById("contact-subject").value = "";
    document.getElementById("contact-message").value = "";

    return false;
}



// =========================================================
// BOOKING FORM VALIDATION (Services Page)
// =========================================================
function validateBookingForm() {

    var pickup      = document.getElementById("pickup").value.trim();
    var dropoff     = document.getElementById("dropoff").value.trim();
    var car         = document.getElementById("selected-car").value;
    var pickupDate  = document.getElementById("pickup-date").value;
    var returnDate  = document.getElementById("return-date").value;

    hideMsg("booking-error");
    hideMsg("booking-success");

    if (!pickup || !dropoff || !car || !pickupDate || !returnDate) {
        showError("booking-error", "Please complete all booking fields.");
        return false;
    }

    if (new Date(returnDate) <= new Date(pickupDate)) {
        showError("booking-error", "Return date must be after the pickup date.");
        return false;
    }

    showSuccess("booking-success", "Booking confirmed! We will contact you shortly with details.");
    return false;
}



// =========================================================
// HERO IMAGE SWITCHER (Index Page)
// =========================================================
var heroImages = [
    "../Sources/img1.jpg",
    "../Sources/img2.jpg",
    "../Sources/img3.jpg",
    "../Sources/img4.jpg",
    "../Sources/img5.jpg"
];
var currentHeroIndex = 0;

function switchHeroImage() {
    var img = document.getElementById("hero-img");
    if (!img) return;

    currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
    img.style.opacity = "0.3";

    setTimeout(function () {
        img.src = heroImages[currentHeroIndex];
        img.style.opacity = "1";
    }, 280);
}

// Auto-rotate hero image every 4 seconds
setInterval(switchHeroImage, 4000);



// =========================================================
// CAR FILTER SYSTEM (Fleet Page)
// =========================================================
function filterCars(type) {

    var cards   = document.querySelectorAll(".car-card[data-type]");
    var buttons = document.querySelectorAll(".filter-btn");

    cards.forEach(function (card) {
        if (type === "all" || card.dataset.type === type) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    buttons.forEach(function (btn) {
        btn.classList.remove("active-filter");
    });

    var active = document.querySelector('[data-filter="' + type + '"]');
    if (active) active.classList.add("active-filter");
}



// =========================================================
// PRICE FILTER
// =========================================================
function filterByPrice() {

    var maxPrice = parseInt(document.getElementById("price-range").value) || 99999;
    var cards    = document.querySelectorAll(".car-card[data-price]");

    cards.forEach(function (card) {
        var price = parseInt(card.dataset.price) || 0;
        card.style.display = price <= maxPrice ? "block" : "none";
    });

    var display = document.getElementById("price-display");
    if (display) display.textContent = "Rs. " + maxPrice.toLocaleString();
}



// =========================================================
// TABLE ROW SELECTION (Services + Dashboard)
// =========================================================
function initTableSelection() {

    var rows = document.querySelectorAll("table tbody tr");

    rows.forEach(function (row) {
        row.addEventListener("click", function () {

            rows.forEach(function (r) {
                r.classList.remove("row-selected");
            });

            this.classList.add("row-selected");

            // Auto-fill booking form if on services page
            var carSelect = document.getElementById("selected-car");
            if (carSelect && this.cells[0] && this.cells[5]) {
                var carName = this.cells[0].textContent.trim();
                var status  = this.cells[5].textContent.trim();
                if (status === "Available") {
                    carSelect.value = carName;
                }
            }
        });
    });
}



// =========================================================
// DASHBOARD — VIEW STOCK
// =========================================================
var stockData = [
    { id: 1, model: "MD-42 Luxury Sedan",     category: "Sedan",  seats: 5, transmission: "Automatic", price: 7500,  status: "Available" },
    { id: 2, model: "Black Mustang",           category: "Sports", seats: 4, transmission: "Manual",    price: 9000,  status: "Available" },
    { id: 3, model: "Mercedes G-Wagon",        category: "SUV",    seats: 5, transmission: "Automatic", price: 12000, status: "Available" },
    { id: 4, model: "Black Mustang GT",        category: "Sports", seats: 4, transmission: "Automatic", price: 9500,  status: "Available" },
    { id: 5, model: "Mercedes G-Wagon AMG",    category: "SUV",    seats: 5, transmission: "Automatic", price: 15000, status: "Booked"    },
    { id: 6, model: "MD-42 Executive",         category: "Sedan",  seats: 5, transmission: "Automatic", price: 8000,  status: "Booked"    }
];

function renderStockTable() {

    var tbody = document.getElementById("stock-tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    stockData.forEach(function (car) {

        var statusClass = car.status === "Available" ? "status-available" : "status-booked";

        var row = document.createElement("tr");
        row.innerHTML =
            "<td>" + car.id + "</td>" +
            "<td>" + car.model + "</td>" +
            "<td>" + car.category + "</td>" +
            "<td>" + car.seats + "</td>" +
            "<td>" + car.transmission + "</td>" +
            "<td>Rs. " + car.price.toLocaleString() + "</td>" +
            "<td><span class='" + statusClass + "'>" + car.status + "</span></td>" +
            "<td>" +
                "<button class='btn-warning' onclick='loadUpdateForm(" + car.id + ")'>Edit</button>" +
                "<button class='btn-danger' onclick='deleteStock(" + car.id + ")'>Delete</button>" +
            "</td>";

        tbody.appendChild(row);
    });
}



// =========================================================
// DASHBOARD — INSERT STOCK
// =========================================================
function insertStock() {

    var model    = document.getElementById("insert-model").value.trim();
    var category = document.getElementById("insert-category").value;
    var seats    = document.getElementById("insert-seats").value.trim();
    var trans    = document.getElementById("insert-trans").value;
    var price    = document.getElementById("insert-price").value.trim();

    hideMsg("insert-error");
    hideMsg("insert-success");

    if (!model || !category || !seats || !trans || !price) {
        showError("insert-error", "All fields are required.");
        return;
    }

    if (isNaN(price) || parseInt(price) <= 0) {
        showError("insert-error", "Please enter a valid price.");
        return;
    }

    var newId = stockData.length > 0 ? stockData[stockData.length - 1].id + 1 : 1;

    stockData.push({
        id:           newId,
        model:        model,
        category:     category,
        seats:        parseInt(seats),
        transmission: trans,
        price:        parseInt(price),
        status:       "Available"
    });

    renderStockTable();
    showSuccess("insert-success", "Vehicle '" + model + "' added successfully!");

    document.getElementById("insert-model").value    = "";
    document.getElementById("insert-category").value = "";
    document.getElementById("insert-seats").value    = "";
    document.getElementById("insert-trans").value    = "";
    document.getElementById("insert-price").value    = "";
}



// =========================================================
// DASHBOARD — LOAD UPDATE FORM
// =========================================================
function loadUpdateForm(id) {

    var car = stockData.find(function (c) { return c.id === id; });
    if (!car) return;

    var panel = document.getElementById("update-panel");
    if (panel) {
        panel.classList.remove("panel-hidden");
        panel.scrollIntoView({ behavior: "smooth" });
    }

    document.getElementById("update-id").value    = car.id;
    document.getElementById("update-model").value = car.model;
    document.getElementById("update-cat").value   = car.category;
    document.getElementById("update-seats").value = car.seats;
    document.getElementById("update-trans").value = car.transmission;
    document.getElementById("update-price").value = car.price;
    document.getElementById("update-status").value= car.status;

    hideMsg("update-error");
    hideMsg("update-success");
}



// =========================================================
// DASHBOARD — UPDATE STOCK
// =========================================================
function updateStock() {

    var id     = parseInt(document.getElementById("update-id").value);
    var model  = document.getElementById("update-model").value.trim();
    var cat    = document.getElementById("update-cat").value;
    var seats  = document.getElementById("update-seats").value.trim();
    var trans  = document.getElementById("update-trans").value;
    var price  = document.getElementById("update-price").value.trim();
    var status = document.getElementById("update-status").value;

    hideMsg("update-error");
    hideMsg("update-success");

    if (!model || !cat || !seats || !trans || !price) {
        showError("update-error", "All fields are required.");
        return;
    }

    var index = stockData.findIndex(function (c) { return c.id === id; });
    if (index === -1) {
        showError("update-error", "Vehicle not found.");
        return;
    }

    stockData[index] = {
        id:           id,
        model:        model,
        category:     cat,
        seats:        parseInt(seats),
        transmission: trans,
        price:        parseInt(price),
        status:       status
    };

    renderStockTable();
    showSuccess("update-success", "Vehicle updated successfully!");
}



// =========================================================
// DASHBOARD — DELETE STOCK
// =========================================================
function deleteStock(id) {

    var car = stockData.find(function (c) { return c.id === id; });
    if (!car) return;

    if (!confirm("Are you sure you want to delete '" + car.model + "'?")) return;

    stockData = stockData.filter(function (c) { return c.id !== id; });
    renderStockTable();

    var panel = document.getElementById("update-panel");
    if (panel) panel.classList.add("panel-hidden");
}



// =========================================================
// DASHBOARD — RENDER BAR CHART
// =========================================================
function renderChart() {

    var chartArea = document.getElementById("chart-bars");
    if (!chartArea) return;

    var data = [
        { label: "Sedans",  value: 42, color: "#C0392B" },
        { label: "SUVs",    value: 35, color: "#8E44AD" },
        { label: "Sports",  value: 23, color: "#F39C12" },
        { label: "Booked",  value: 18, color: "#27AE60" },
        { label: "Revenue", value: 60, color: "#2980B9" }
    ];

    var maxVal = Math.max.apply(null, data.map(function (d) { return d.value; }));

    chartArea.innerHTML = "";

    data.forEach(function (item) {
        var heightPct = (item.value / maxVal) * 100;

        var barItem = document.createElement("div");
        barItem.className = "bar-item";

        var barFill = document.createElement("div");
        barFill.className = "bar-fill";
        barFill.style.height = "0px";
        barFill.style.background = item.color;
        barFill.style.width = "100%";
        barFill.style.borderRadius = "6px 6px 0 0";
        barFill.style.transition = "height 0.8s ease";
        barFill.title = item.label + ": " + item.value;

        var valLabel = document.createElement("div");
        valLabel.className = "bar-value";
        valLabel.textContent = item.value;
        valLabel.style.color = item.color;
        valLabel.style.fontSize = "0.78rem";
        valLabel.style.fontWeight = "700";

        var nameLabel = document.createElement("div");
        nameLabel.className = "bar-label";
        nameLabel.textContent = item.label;

        barItem.appendChild(valLabel);
        barItem.appendChild(barFill);
        barItem.appendChild(nameLabel);

        chartArea.appendChild(barItem);

        setTimeout(function () {
            barFill.style.height = heightPct * 1.8 + "px";
        }, 100);
    });
}



// =========================================================
// PAGE INIT
// =========================================================
document.addEventListener("DOMContentLoaded", function () {
    initTableSelection();
    renderStockTable();
    renderChart();
});
