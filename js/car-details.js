const params = new URLSearchParams(window.location.search);
const carId = params.get('id');

const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const detailsContainer = document.getElementById('car-details');

// Spec definitions — short explanations of what each spec means
const specDefinitions = {
    // Engine & Performance
    engine_size: "The engine's displacement or type. Larger engines generally produce more power, while electric motors deliver instant torque.",
    horsepower: "Measures the engine's power output. Higher HP means faster acceleration and greater overtaking ability.",
    torque: "The rotational force of the engine. Higher torque improves acceleration off the line and towing capacity.",
    zero_to_100: "Time to accelerate from 0 to 100 km/h. Lower numbers indicate faster, more responsive acceleration.",
    top_speed: "The maximum velocity the car can achieve. Reflects aerodynamic design and powertrain capability.",

    // Fuel Efficiency
    fuel_consumption: "Distance the car travels per unit of fuel/energy. Higher values mean better efficiency and lower running costs.",
    fuel_type: "The type of fuel or energy the car uses. Affects availability, cost per kilometer, and emissions.",
    tank_capacity: "Total fuel/energy storage. A larger tank or battery means longer range between fill-ups or charges.",

    // Transmission
    transmission: "The gearbox system that transfers engine power to the wheels. Affects shift speed, comfort, and fuel efficiency.",

    // Drivetrain
    drivetrain: "Which wheels receive power from the engine. Affects traction, handling, and suitability for different driving conditions.",

    // Safety
    airbags: "Inflatable cushions that deploy in a collision to protect occupants. More airbags means better coverage in different crash types.",
    abs: "Anti-lock Braking System prevents wheels from locking during hard braking, maintaining steering control.",
    esc: "Electronic Stability Control detects loss of traction and applies brakes to individual wheels to prevent skidding.",
    driver_assist: "Advanced systems that help the driver avoid hazards. Includes features like automatic emergency braking and lane keeping.",
    crash_rating: "Independent safety organization test score. Higher ratings indicate better occupant protection in collisions.",

    // Size & Practicality
    seating: "Maximum number of passengers the car can accommodate. Determines suitability for families or groups.",
    trunk_space: "Cargo area volume. More litres means more luggage, shopping, or equipment you can carry.",
    wheelbase: "Distance between front and rear axles. A longer wheelbase improves ride comfort and interior space.",
    ground_clearance: "Height between the lowest point of the car and the ground. Higher clearance is better for rough terrain.",

    // Technology
    infotainment: "The car's built-in media and navigation system. Larger screens and modern systems improve the driving experience.",
    carplay_android: "Smartphone integration that mirrors your phone's apps on the car's screen for hands-free navigation and calls.",
    sound_system: "The car's audio system quality. Premium systems offer better clarity, bass, and surround sound immersion.",
    keyless: "Allows you to unlock and start the car without removing the key from your pocket. Adds convenience and security.",
    parking_sensors: "Sensors and cameras that detect obstacles while parking. Reduces the risk of scrapes and collisions.",

    // Reliability & Maintenance
    reliability: "How dependable the brand/model is based on owner reports. Higher reliability means fewer unexpected repairs.",
    spare_parts: "How easy and affordable it is to source replacement parts. Widely available parts mean faster, cheaper repairs.",
    service_interval: "How often the car needs routine maintenance. Longer intervals save time and reduce ownership costs.",
    warranty: "The manufacturer's coverage period for defects. Longer warranties provide greater peace of mind."
};

// Spec tab configuration
const specTabs = [
    {
        id: "engine",
        label: "Engine & Performance",
        icon: "fa-solid fa-engine",
        fallbackIcon: "fa-solid fa-bolt",
        specs: [
            { key: "engine_size", label: "Engine Size" },
            { key: "horsepower", label: "Horsepower" },
            { key: "torque", label: "Torque" },
            { key: "zero_to_100", label: "0–100 km/h" },
            { key: "top_speed", label: "Top Speed" }
        ]
    },
    {
        id: "fuel",
        label: "Fuel Efficiency",
        icon: "fa-solid fa-gas-pump",
        specs: [
            { key: "fuel_consumption", label: "Fuel Consumption" },
            { key: "fuel_type", label: "Fuel Type" },
            { key: "tank_capacity", label: "Tank Capacity" }
        ]
    },
    {
        id: "transmission",
        label: "Transmission",
        icon: "fa-solid fa-gears",
        specs: [
            { key: "transmission", label: "Transmission Type" }
        ]
    },
    {
        id: "drivetrain",
        label: "Drivetrain",
        icon: "fa-solid fa-car",
        specs: [
            { key: "drivetrain", label: "Drivetrain Type" }
        ]
    },
    {
        id: "safety",
        label: "Safety Features",
        icon: "fa-solid fa-shield-halved",
        specs: [
            { key: "airbags", label: "Airbags" },
            { key: "abs", label: "ABS" },
            { key: "esc", label: "ESC" },
            { key: "driver_assist", label: "Driver Assistance" },
            { key: "crash_rating", label: "Crash Test Rating" }
        ]
    },
    {
        id: "size",
        label: "Size & Practicality",
        icon: "fa-solid fa-ruler-combined",
        specs: [
            { key: "seating", label: "Seating Capacity" },
            { key: "trunk_space", label: "Boot / Trunk Space" },
            { key: "wheelbase", label: "Wheelbase" },
            { key: "ground_clearance", label: "Ground Clearance" }
        ]
    },
    {
        id: "tech",
        label: "Technology & Features",
        icon: "fa-solid fa-microchip",
        specs: [
            { key: "infotainment", label: "Infotainment System" },
            { key: "carplay_android", label: "CarPlay / Android Auto" },
            { key: "sound_system", label: "Sound System" },
            { key: "keyless", label: "Keyless Entry & Start" },
            { key: "parking_sensors", label: "Parking Sensors / Cameras" }
        ]
    },
    {
        id: "reliability",
        label: "Reliability & Maintenance",
        icon: "fa-solid fa-wrench",
        specs: [
            { key: "reliability", label: "Brand Reliability" },
            { key: "spare_parts", label: "Spare Parts Availability" },
            { key: "service_interval", label: "Service Interval" },
            { key: "warranty", label: "Warranty Length" }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    if (!carId) {
        showError();
        return;
    }

    loading.classList.remove('hidden');

    // Simulate slight network delay for realism
    setTimeout(() => {
        const car = cars.find(c => c.id === carId);
        if (car) {
            renderCarDetails(car);
        } else {
            showError();
        }
    }, 400);
});

function showError() {
    loading.classList.add('hidden');
    errorMessage.classList.remove('hidden');
}

function renderSpecItem(spec, car) {
    const value = car.specs[spec.key] || "N/A";
    const definition = specDefinitions[spec.key] || "";
    const defId = `def-${spec.key}-${car.id}`;

    return `
        <div class="spec-item">
            <div class="spec-item-header">
                <div class="spec-label-group">
                    <span class="spec-label">${spec.label}</span>
                    <span class="spec-value">${value}</span>
                </div>
                ${definition ? `
                    <button class="spec-info-btn" onclick="toggleDefinition('${defId}')" aria-label="Show definition" title="What does this mean?">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                ` : ''}
            </div>
            ${definition ? `
                <div class="spec-definition" id="${defId}">
                    <div class="spec-definition-inner">
                        <i class="fa-solid fa-lightbulb"></i>
                        <span>${definition}</span>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function renderSpecTabs(car) {
    const tabButtons = specTabs.map((tab, i) => `
        <button class="spec-tab-btn ${i === 0 ? 'active' : ''}" 
                onclick="switchSpecTab('${tab.id}')" 
                data-tab="${tab.id}">
            <i class="${tab.icon || tab.fallbackIcon}"></i>
            <span>${tab.label}</span>
        </button>
    `).join('');

    const tabPanels = specTabs.map((tab, i) => `
        <div class="spec-tab-panel ${i === 0 ? 'active' : ''}" id="panel-${tab.id}">
            <div class="spec-grid">
                ${tab.specs.map(spec => renderSpecItem(spec, car)).join('')}
            </div>
        </div>
    `).join('');

    return `
        <div class="spec-tabs-container mt-20">
            <h3 class="font-heading text-3xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Full Specifications</h3>
            <div class="spec-tabs-nav">
                ${tabButtons}
            </div>
            <div class="spec-tabs-content">
                ${tabPanels}
            </div>
        </div>
    `;
}

function renderCarDetails(car) {
    loading.classList.add('hidden');
    document.title = `${car.make} ${car.model} | LuxeDrive`;

    detailsContainer.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Image Side -->
            <div>
                <div class="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl relative">
                    <img src="${car.image}" alt="${car.make} ${car.model}" class="w-full object-cover h-[400px] md:h-[500px]">
                    <div class="absolute top-6 left-6 bg-gray-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-gray-700 font-semibold tracking-wider uppercase text-sm">
                        ${car.category}
                    </div>
                </div>
            </div>

            <!-- Details Side -->
            <div class="flex flex-col">
                <div class="mb-2">
                    <span class="text-primary font-bold tracking-widest uppercase text-sm">${car.year} ${car.make}</span>
                </div>
                <h1 class="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">${car.model}</h1>
                
                <div class="text-3xl font-bold text-gray-300 mb-8 pb-8 border-b border-gray-800">${formatCurrency(car.price)}</div>

                <h3 class="font-heading text-xl font-bold text-white mb-6">Performance Specifications</h3>
                
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div class="bg-dark rounded-xl p-6 border border-gray-800 text-center flex flex-col items-center">
                        <div class="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb-3">
                            <i class="fa-solid fa-road text-primary text-xl"></i>
                        </div>
                        <span class="text-sm text-gray-400 mb-1">Mileage</span>
                        <span class="text-lg font-bold text-white">${car.mileage.toLocaleString()} km</span>
                    </div>

                    <div class="bg-dark rounded-xl p-6 border border-gray-800 text-center flex flex-col items-center">
                        <div class="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb-3">
                            <i class="fa-solid fa-gauge-high text-primary text-xl"></i>
                        </div>
                        <span class="text-sm text-gray-400 mb-1">Top Speed</span>
                        <span class="text-lg font-bold text-white">${car.specs.top_speed}</span>
                    </div>
                    
                    <div class="bg-dark rounded-xl p-6 border border-gray-800 text-center flex flex-col items-center">
                        <div class="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb-3">
                            <i class="fa-solid fa-stopwatch text-primary text-xl"></i>
                        </div>
                        <span class="text-sm text-gray-400 mb-1">0-100 km/h</span>
                        <span class="text-lg font-bold text-white">${car.specs.zero_to_100}</span>
                    </div>

                    <div class="bg-dark rounded-xl p-6 border border-gray-800 text-center flex flex-col items-center">
                        <div class="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb-3">
                            <i class="fa-solid fa-horse-head text-primary text-xl"></i>
                        </div>
                        <span class="text-sm text-gray-400 mb-1">Horsepower</span>
                        <span class="text-lg font-bold text-white">${car.specs.horsepower}</span>
                    </div>
                </div>

                <div class="mt-auto pt-8 flex flex-col sm:flex-row gap-4">
                    <button onclick="addToCart('${car.id}')" class="flex-1 bg-primary hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-cart-shopping"></i> Purchase
                    </button>
                    <button onclick="requestTestDrive('${car.id}')" class="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white py-4 rounded-xl font-bold text-lg transition-colors text-center flex items-center justify-center gap-2">
                        <i class="fa-solid fa-key"></i> Test Drive
                    </button>
                    <a href="contact.html?interest=${car.id}" class="flex-1 bg-transparent border-2 border-white hover:bg-white hover:text-darker text-white py-4 rounded-xl font-bold text-lg transition-colors text-center flex items-center justify-center gap-2">
                        <i class="fa-solid fa-envelope"></i> Inquire
                    </a>
                </div>
                
                <div class="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <i class="fa-solid fa-shield-halved"></i> <span>Includes LuxeDrive Extended Warranty and Global Delivery Options</span>
                </div>
            </div>
        </div>
        
        <!-- Vehicle Description -->
        <div class="mt-20">
            <h3 class="font-heading text-3xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Vehicle Description</h3>
            <div class="prose prose-invert max-w-none text-gray-400 text-lg leading-relaxed">
                <p>The ${car.year} ${car.make} ${car.model} sets a new standard for automotive engineering. Crafted for the purist, it combines relentless power, exquisite design, and state-of-the-art technology to deliver an unforgettable driving experience.</p>
                <p class="mt-4">This particular model is part of our curated selection, passing a rigorous 150-point inspection. It features a stunning exterior finish, custom luxury interior, and an immaculately maintained powertrain. For collectors and enthusiasts alike, the ${car.model} offers unmatched prestige and blistering performance.</p>
            </div>
        </div>

        <!-- Full Specifications Tabs -->
        ${renderSpecTabs(car)}
    `;

    detailsContainer.classList.remove('hidden');
}

// Tab switching
function switchSpecTab(tabId) {
    // Update buttons
    document.querySelectorAll('.spec-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    // Update panels
    document.querySelectorAll('.spec-tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `panel-${tabId}`);
    });
}

// Definition toggle
function toggleDefinition(defId) {
    const el = document.getElementById(defId);
    if (el) {
        el.classList.toggle('open');
    }
}
