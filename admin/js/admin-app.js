// Admin Dashboard Logic & Charts

document.addEventListener('DOMContentLoaded', () => {
    initCharts();
});

// Initialize Chart.js Graphs
function initCharts() {
    // 1. Revenue Chart (Line)
    const ctxRevenue = document.getElementById('revenueChart');
    if (ctxRevenue) {
        new Chart(ctxRevenue, {
            type: 'line',
            data: {
                labels: dashboardData.revenue.labels,
                datasets: [{
                    label: 'Revenue ($)',
                    data: dashboardData.revenue.monthly,
                    borderColor: '#E63946',
                    backgroundColor: 'rgba(230, 57, 70, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#111827',
                    pointBorderColor: '#E63946',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.4 // smooth curves
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#111827',
                        titleColor: '#f3f4f6',
                        bodyColor: '#9ca3af',
                        borderColor: '#374151',
                        borderWidth: 1,
                        padding: 10,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false, drawBorder: false },
                        ticks: { color: '#6b7280', font: { family: "'Inter', sans-serif", size: 11 } }
                    },
                    y: {
                        grid: { color: 'rgba(55, 65, 81, 0.3)', drawBorder: false },
                        ticks: {
                            color: '#6b7280',
                            font: { family: "'Inter', sans-serif", size: 11 },
                            callback: function (value) {
                                return '$' + (value / 1000) + 'k';
                            }
                        }
                    }
                }
            }
        });
    }

    // 2. Category Sales Chart (Doughnut)
    const ctxCategory = document.getElementById('categoryChart');
    if (ctxCategory) {
        new Chart(ctxCategory, {
            type: 'doughnut',
            data: {
                labels: dashboardData.categories.labels,
                datasets: [{
                    data: dashboardData.categories.data,
                    backgroundColor: dashboardData.categories.colors,
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#111827',
                        titleColor: '#f3f4f6',
                        bodyColor: '#9ca3af',
                        borderColor: '#374151',
                        borderWidth: 1,
                        callbacks: {
                            label: function (context) {
                                return ` ${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                }
            }
        });
    }
}
