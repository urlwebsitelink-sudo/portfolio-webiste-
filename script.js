// Sticky Header Scroll Event
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Mobile Nav Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking links
    const navLinksArray = navLinks.querySelectorAll('a');
    navLinksArray.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Scroll Spy to highlight active nav link
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

/* ==========================================
   INTERACTIVE ORDER MODAL SYSTEM
   ========================================== */

const orderModal = document.getElementById('orderModal');
const modalProductName = document.getElementById('modalProductName');
const modalTotalPrice = document.getElementById('modalTotalPrice');
const orderQtyInput = document.getElementById('orderQty');
const packageSizeSelector = document.getElementById('packageSizeSelector');

// Configured products, sizes and exact pricing
const productConfigs = {
    "Amma Special Paruppu Podi": {
        sizes: [
            { label: '100 grams', sizeCode: '100g', price: 45 },
            { label: '250 grams', sizeCode: '250g', price: 100 },
            { label: '500 grams', sizeCode: '500g', price: 190 },
            { label: '1 Kilogram', sizeCode: '1kg', price: 360 }
        ]
    },
    "Amma Special Poondu Thokku": {
        sizes: [
            { label: '100 grams', sizeCode: '100g', price: 50 },
            { label: '250 grams', sizeCode: '250g', price: 110 },
            { label: '500 grams', sizeCode: '500g', price: 200 },
            { label: '1 Kilogram', sizeCode: '1kg', price: 380 }
        ]
    },
    "Amma Special Rava Laddu": {
        sizes: [
            { label: '4 pieces', sizeCode: '4 pcs', price: 20 },
            { label: '8 pieces', sizeCode: '8 pcs', price: 40 },
            { label: '12 pieces', sizeCode: '12 pcs', price: 60 },
            { label: '20 pieces', sizeCode: '20 pcs', price: 95 }
        ]
    }
};

let currentProductName = '';
let selectedSize = '';
let selectedPrice = 0;
let currentQty = 1;

// Setup Event Delegation for Package Size Selector
if (packageSizeSelector) {
    packageSizeSelector.addEventListener('click', function(e) {
        const btn = e.target.closest('.size-btn');
        if (!btn) return;
        
        // Toggle active states
        packageSizeSelector.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update selection state
        selectedSize = btn.getAttribute('data-size');
        selectedPrice = parseFloat(btn.getAttribute('data-price'));
        
        // Recalculate price
        updateTotalPrice();
    });
}

// Open Modal and render size buttons dynamically
function openOrderModal(productName) {
    const config = productConfigs[productName];
    if (!config) return;

    currentProductName = productName;
    currentQty = 1;
    orderQtyInput.value = currentQty;

    // Set default selection to first option
    selectedSize = config.sizes[0].sizeCode;
    selectedPrice = config.sizes[0].price;

    // Render package size buttons dynamically
    if (packageSizeSelector) {
        packageSizeSelector.innerHTML = ''; // Clear old buttons
        config.sizes.forEach((option, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `size-btn ${idx === 0 ? 'active' : ''}`;
            btn.setAttribute('data-size', option.sizeCode);
            btn.setAttribute('data-price', option.price);
            btn.textContent = option.label;
            packageSizeSelector.appendChild(btn);
        });
    }

    modalProductName.textContent = productName;
    updateTotalPrice();
    
    // Show Modal
    orderModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
}

// Close Modal
function closeOrderModal() {
    orderModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
}

// Close Modal when clicking outside
if (orderModal) {
    orderModal.addEventListener('click', function(e) {
        if (e.target === orderModal) {
            closeOrderModal();
        }
    });
}

// Adjust Quantity
function adjustQty(amount) {
    currentQty += amount;
    if (currentQty < 1) {
        currentQty = 1;
    }
    orderQtyInput.value = currentQty;
    updateTotalPrice();
}

// Calculate and render price
function updateTotalPrice() {
    const total = selectedPrice * currentQty;
    modalTotalPrice.textContent = '₹' + total;
}

// Build WhatsApp text and redirect
function submitWhatsAppOrder() {
    const phoneNumber = "919952156494";
    const total = selectedPrice * currentQty;
    
    const message = 
`Hello RK Foods,

I would like to place an order:
*Product:* ${currentProductName}
*Pack Size / Count:* ${selectedSize}
*Quantity:* ${currentQty}
*Estimated Total:* ₹${total}

Please confirm my order and let me know the payment and shipping details. Thank you!`;

    const url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
    closeOrderModal();
}

/* ==========================================
   CUSTOM MESSAGE BUILDER FORM
   ========================================== */
const customMessageForm = document.getElementById('customMessageForm');
if (customMessageForm) {
    customMessageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const custName = document.getElementById('custName').value;
        const custLocation = document.getElementById('custLocation').value;
        const custText = document.getElementById('custText').value;
        const phoneNumber = "919952156494";
        
        const message = 
`Hello RK Foods,

I have an inquiry / custom request:
*Name:* ${custName}
*Location:* ${custLocation}
*Details:* ${custText}`;

        const url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
        window.open(url, "_blank");
        customMessageForm.reset();
    });
}

/* ==========================================
   SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================== */

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, revealOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appeared');
            revealOnScroll.unobserve(entry.target);
        }
    });
}, revealOptions);

// Add reveal class to cards and elements
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.product-card, .feature-card, .review-card, .img-reveal');
    cards.forEach(card => {
        card.classList.add('reveal-element');
        revealOnScroll.observe(card);
    });
});
