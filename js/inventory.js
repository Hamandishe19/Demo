// DOM Elements
const inventoryGrid = document.getElementById('inventory-grid');
const searchInput = document.getElementById('search-input');
const makeFilter = document.getElementById('make-filter');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const priceVal = document.getElementById('price-val');
const resultsCount = document.getElementById('results-count');
const noResults = document.getElementById('no-results');
const resetBtn = document.getElementById('reset-filters');
const clearBtn = document.getElementById('clear-filters-btn');

// State for active filters
let state = {
    search: '',
    make: 'all',
    category: 'all',
    maxPrice: 250000
};

// Update UI format for price
priceFilter.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    state.maxPrice = val;
    priceVal.textContent = val >= 250000 ? '$250k+' : `$${Math.round(val / 1000)}k`;
    filterCars();
});

// Watch inputs
searchInput.addEventListener('input', (e) => {
    state.search = e.target.value.toLowerCase();
    filterCars();
});

makeFilter.addEventListener('change', (e) => {
    state.make = e.target.value;
    filterCars();
});

categoryFilter.addEventListener('change', (e) => {
    state.category = e.target.value;
    filterCars();
});

// Reset
function resetFilters() {
    state = { search: '', make: 'all', category: 'all', maxPrice: 250000 };
    searchInput.value = '';
    makeFilter.value = 'all';
    categoryFilter.value = 'all';
    priceFilter.value = 250000;
    priceVal.textContent = '$250k+';
    filterCars();
}

resetBtn.addEventListener('click', resetFilters);
clearBtn.addEventListener('click', resetFilters);

// Filter logic
function filterCars() {
    const filtered = cars.filter(car => {
        const matchSearch = car.make.toLowerCase().includes(state.search) || car.model.toLowerCase().includes(state.search);
        const matchMake = state.make === 'all' || car.make === state.make;
        const matchCat = state.category === 'all' || car.category === state.category;
        const matchPrice = state.maxPrice >= 250000 ? true : car.price <= state.maxPrice;

        return matchSearch && matchMake && matchCat && matchPrice;
    });

    renderGrid(filtered);
}

// Render
function renderGrid(filteredCars) {
    if (filteredCars.length === 0) {
        inventoryGrid.innerHTML = '';
        noResults.classList.remove('hidden');
        resultsCount.textContent = `Showing 0 vehicles`;
        return;
    }

    noResults.classList.add('hidden');
    resultsCount.textContent = `Showing ${filteredCars.length} vehicle${filteredCars.length !== 1 ? 's' : ''}`;

    inventoryGrid.innerHTML = filteredCars.map(car => `
        <div class="bg-dark rounded-xl overflow-hidden border border-gray-800 hover:border-primary transition-colors duration-300 group flex flex-col h-full">
            <div class="h-56 overflow-hidden relative img-zoom-container cursor-pointer" onclick="window.location.href='car-details.html?id=${car.id}'">
                <img src="${car.image}" alt="${car.make} ${car.model}" class="w-full h-full object-cover">
                <div class="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-gray-700">${car.year}</div>
            </div>
            <div class="p-6 flex flex-col flex-1">
                <div class="mb-4">
                    <h3 class="text-gray-400 text-sm font-semibold tracking-wider uppercase mb-1">${car.year} ${car.make}</h3>
                    <h2 class="text-xl font-bold text-white font-heading truncate" title="${car.model}">${car.model}</h2>
                </div>
                
                <div class="text-primary font-bold text-2xl mb-6">${formatCurrency(car.price)}</div>
                
                <div class="grid grid-cols-2 gap-4 text-gray-400 text-sm mb-6 mt-auto">
                    <div class="flex items-center gap-2 bg-gray-900 rounded-lg p-2 border border-gray-800">
                        <i class="fa-solid fa-road text-gray-500 w-4"></i>
                        <span class="truncate">${car.mileage.toLocaleString()} km</span>
                    </div>
                    <div class="flex items-center gap-2 bg-gray-900 rounded-lg p-2 border border-gray-800">
                        <i class="fa-solid fa-stopwatch text-gray-500 w-4"></i>
                        <span>${car.specs["0_60"]}s</span>
                    </div>
                    <div class="col-span-2 flex items-center gap-2 bg-gray-900 rounded-lg p-2 border border-gray-800">
                        <i class="fa-solid fa-horse-head text-gray-500 w-4"></i>
                        <span>${car.specs.horsepower} Engine</span>
                    </div>
                </div>
                
                <div class="flex flex-col gap-2 mt-auto pt-4 border-t border-gray-800">
                    <div class="flex gap-2">
                        <a href="car-details.html?id=${car.id}" class="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-center py-2.5 rounded-lg transition-colors text-sm font-semibold">Details</a>
                        <button onclick="addToCart('${car.id}')" class="flex-1 bg-primary hover:bg-red-700 text-white text-center py-2.5 rounded-lg transition-colors text-sm font-semibold shadow-lg shadow-primary/20"><i class="fa-solid fa-cart-shopping mr-2"></i>Add</button>
                    </div>
                    <button onclick="requestTestDrive('${car.id}')" class="w-full bg-transparent border border-gray-700 hover:bg-white hover:text-darker text-white text-center py-2 rounded-lg transition-colors text-sm font-semibold"><i class="fa-solid fa-key mr-2"></i>Test Drive</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderGrid(cars);
});
