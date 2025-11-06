class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.user = null;
        this.checkAuth();
    }

    async checkAuth() {
        const session = localStorage.getItem('session');
        if (session) {
            this.isAuthenticated = true;
            this.user = JSON.parse(session);
            this.updateUI();
        }
    }

    async login(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            this.isAuthenticated = true;
            this.user = data.user;
            localStorage.setItem('session', JSON.stringify(data.user));
            this.updateUI();
            return true;
        } catch (error) {
            console.error('Login error:', error.message);
            return false;
        }
    }

    async register(email, password) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });

            if (error) throw error;

            return true;
        } catch (error) {
            console.error('Registration error:', error.message);
            return false;
        }
    }

    logout() {
        localStorage.removeItem('session');
        this.isAuthenticated = false;
        this.user = null;
        this.updateUI();
        window.location.href = '/';
    }

    updateUI() {
        const authLinks = document.getElementById('authLinks');
        const dashboardLink = document.getElementById('dashboardLink');

        if (this.isAuthenticated) {
            authLinks.style.display = 'none';
            dashboardLink.style.display = 'block';
        } else {
            authLinks.style.display = 'block';
            dashboardLink.style.display = 'none';
        }
    }
}

const auth = new Auth();
