const emptyCartEl = document.getElementById('empty-cart');
const cartContentEl = document.getElementById('cart-content');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTotalEl = document.getElementById('cart-total');
const HANDLING_FEE = 2500;

document.addEventListener('DOMContentLoaded', () => {
    // Wait slightly to ensure main.js has loaded the cart variable
    setTimeout(renderCartPage, 100);
});

function removeFromCartPage(carId) {
    cart = cart.filter(item => item.id !== carId);
    saveCart();
    renderCartPage();
}

function processCheckout() {
    if (cart.length === 0) return;
    alert("Proceeding to secure checkout portal. You will be redirected momentarily.");

    // Simulate clearing cart after successful intent
    setTimeout(() => {
        cart = [];
        saveCart();
        renderCartPage();
    }, 1500);
}

function renderCartPage() {
    if (!cart || cart.length === 0) {
        emptyCartEl.classList.remove('hidden');
        cartContentEl.classList.add('hidden');
        return;
    }

    emptyCartEl.classList.add('hidden');
    cartContentEl.classList.remove('hidden');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal + HANDLING_FEE;

    cartSubtotalEl.textContent = formatCurrency(subtotal);
    cartTotalEl.textContent = formatCurrency(total);

    // Render items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="bg-dark rounded-xl border border-gray-800 overflow-hidden flex flex-col sm:flex-row gap-6 p-4 relative group">
            <div class="sm:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden border border-gray-700">
                <img src="${item.image}" alt="${item.make} ${item.model}" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 flex flex-col justify-center">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">${item.make}</h3>
                        <h2 class="text-2xl font-heading font-bold text-white mb-2">${item.model}</h2>
                        <p class="text-sm text-gray-400">${item.year} | ${item.category}</p>
                    </div>
                </div>
                <div class="flex justify-between items-end mt-4 sm:mt-auto">
                    <span class="text-xl font-bold text-primary">${formatCurrency(item.price)}</span>
                </div>
            </div>
            
            <button onclick="removeFromCartPage('${item.id}')" class="absolute top-4 right-4 w-10 h-10 bg-gray-900 border border-gray-800 hover:border-red-500 hover:bg-red-500/10 hover:text-red-500 text-gray-500 rounded-full flex items-center justify-center transition-colors" title="Remove Item">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `).join('');
}
