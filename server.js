const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.static('public'));

// Serve the config with environment variables
app.get('/js/config.js', (req, res) => {
    const config = `
        const firebaseConfig = {
            apiKey: '${process.env.FIREBASE_API_KEY}',
            authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
            databaseURL: '${process.env.FIREBASE_DATABASE_URL}',
            projectId: '${process.env.FIREBASE_PROJECT_ID}',
            storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
            messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
            appId: '${process.env.FIREBASE_APP_ID}'
        };

        const supabaseConfig = {
            url: '${process.env.SUPABASE_URL}',
            key: '${process.env.SUPABASE_KEY}'
        };
    `;
    res.type('javascript').send(config);
});

// Handle all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
