// Mock Data for Admin Statistics

const dashboardData = {
    revenue: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        monthly: [120000, 185000, 140000, 245000, 290000, 310000, 280000, 340000, 210000, 450000, 380000, 520000]
    },
    categories: {
        labels: ['Sport', 'SUV', 'Electric', 'Supercar'],
        data: [45, 30, 15, 10],
        colors: ['#E63946', '#10b981', '#3b82f6', '#8b5cf6']
    }
};

const usersData = [
    { id: 'USR-0881', name: 'Michael Ross', email: 'mike@example.com', role: 'Customer', registered: '2026-01-15', status: 'Active' },
    { id: 'USR-0882', name: 'Sarah Kline', email: 'sarah.k@example.com', role: 'Customer', registered: '2026-02-04', status: 'Active' },
    { id: 'USR-0883', name: 'John Doe', email: 'john@example.com', role: 'Customer', registered: '2026-02-18', status: 'Inactive' },
    { id: 'USR-0884', name: 'Emily Chen', email: 'emily@example.com', role: 'Customer', registered: '2026-03-01', status: 'Banned' }
];

const mockOrders = [
    { id: 'ORD-9024', customer: 'Michael Ross', vehicle: 'Porsche 911 GT3 RS', total: 245000, date: '2026-03-12', status: 'Processing' },
    { id: 'ORD-9023', customer: 'Sarah Kline', vehicle: 'Audi RS e-tron GT', total: 148000, date: '2026-03-10', status: 'Completed' },
    { id: 'ORD-9022', customer: 'John Doe', vehicle: 'Mercedes G-Class (Deposit)', total: 10000, date: '2026-03-08', status: 'Completed' },
    { id: 'ORD-9021', customer: 'Emily Chen', vehicle: 'BMW M8 Competition', total: 140000, date: '2026-03-05', status: 'Cancelled' },
];

const mockProducts = [
    { id: 'car_1', model: '911 GT3 RS', make: 'Porsche', price: 245000, stock: 2, status: 'In Stock' },
    { id: 'car_2', model: 'G-Class G63', make: 'Mercedes-Benz', price: 185000, stock: 5, status: 'In Stock' },
    { id: 'car_3', model: 'RS e-tron GT', make: 'Audi', price: 148000, stock: 0, status: 'Out of Stock' },
    { id: 'car_4', model: 'Huracán EVO', make: 'Lamborghini', price: 290000, stock: 1, status: 'Low Stock' },
    { id: 'car_5', model: 'M8 Competition', make: 'BMW', price: 140000, stock: 4, status: 'In Stock' },
    { id: 'car_6', model: 'Range Rover SV', make: 'Land Rover', price: 220000, stock: 2, status: 'In Stock' }
];

const mockSupport = [
    { id: 'TKT-104', customer: 'Michael Ross', subject: 'Finance Rates Inquiry', date: 'Today', status: 'Open', priority: 'High' },
    { id: 'TKT-103', customer: 'David Smith', subject: 'Test Drive Scheduling', date: 'Yesterday', status: 'Open', priority: 'Medium' },
    { id: 'TKT-102', customer: 'Sarah Kline', subject: 'Delivery Updates', date: 'Mar 10', status: 'Resolved', priority: 'Low' }
];

// Helper: Format Currency Int
function fmtCurr(num) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
}
