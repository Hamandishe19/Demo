// Admin Mock Data & Authentication Logic

// Mock Admin Accounts
const adminAccounts = [
    {
        id: "usr_super1",
        name: "John Doe",
        email: "super@Kensitondrive.com",
        password: "admin123", // In a real app, this would be hashed
        role: "Super Admin",
        avatar: "JV",
        status: "Active",
        lastLogin: "2026-03-13T08:30:00Z"
    },
    {
        id: "usr_admin1",
        name: "David Doe",
        email: "admin@Kensitondrive.com",
        password: "admin123",
        role: "Regular Admin",
        avatar: "DC",
        status: "Active",
        lastLogin: "2026-03-12T14:15:00Z"
    }
];

// Check Auth Status on Page Load
function checkAdminAuth() {
    const currentAdminStr = localStorage.getItem('currentAdmin');
    const isLoginPage = window.location.pathname.endsWith('login.html');

    if (!currentAdminStr && !isLoginPage) {
        // Not logged in and trying to access an admin page
        window.location.href = 'login.html';
        return null;
    }

    if (currentAdminStr) {
        try {
            const adminUser = JSON.parse(currentAdminStr);

            // If on login page but already logged in, redirect to index
            if (isLoginPage) {
                window.location.href = 'index.html';
                return null;
            }

            // Bind UI elements based on role
            bindAdminUI(adminUser);

            return adminUser;
        } catch (e) {
            localStorage.removeItem('currentAdmin');
            window.location.href = 'login.html';
            return null;
        }
    }

    return null;
}

// Bind User Data to UI and Enforce Role Visibility
function bindAdminUI(adminUser) {
    document.addEventListener('DOMContentLoaded', () => {
        // Set Name & Avatar
        const headerName = document.getElementById('admin-header-name');
        const headerRole = document.getElementById('admin-header-role');
        const headerAvatar = document.getElementById('admin-header-avatar');

        if (headerName) headerName.textContent = adminUser.name;
        if (headerRole) headerRole.textContent = adminUser.role;
        if (headerAvatar) headerAvatar.textContent = adminUser.avatar;

        // Apply Role Based Access Control (RBAC) to Sidebar Links
        const isSuper = adminUser.role === 'Super Admin';

        document.querySelectorAll('[data-role="super"]').forEach(el => {
            if (!isSuper) el.style.display = 'none';
        });

        // Highlight Active Sidebar Link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.sidebar-link').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
}

// Perform Login
function handleAdminLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('login-error');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');

    if (!email || !password) {
        showError('Please enter both email and password.');
        return;
    }

    // Loading State
    btnText.classList.add('hidden');
    btnSpinner.classList.remove('hidden');
    errorEl.classList.add('hidden');

    // Simulate API Delay
    setTimeout(() => {
        const user = adminAccounts.find(u => u.email === email && u.password === password);

        if (user) {
            if (user.status !== 'Active') {
                showError('This account has been suspended.');
            } else {
                // Success
                const { password, ...safeUser } = user; // strip password
                localStorage.setItem('currentAdmin', JSON.stringify(safeUser));
                window.location.href = 'index.html';
            }
        } else {
            showError('Invalid email or password.');
        }

        // Reset Loading State (if error)
        btnText.classList.remove('hidden');
        btnSpinner.classList.add('hidden');
    }, 800);

    function showError(msg) {
        errorEl.textContent = msg;
        errorEl.classList.remove('hidden');
    }
}

// Perform Logout
function handleAdminLogout() {
    if (confirm('Are you sure you want to sign out of the Admin Portal?')) {
        localStorage.removeItem('currentAdmin');
        window.location.href = 'login.html';
    }
}

// Mobile sidebar toggle
function toggleAdminSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

// Initialize Auth
const currentAdmin = checkAdminAuth();
