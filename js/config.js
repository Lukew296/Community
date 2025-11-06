// Firebase Configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "your-app.firebaseapp.com",
    databaseURL: "https://your-app-default-rtdb.firebaseio.com",
    projectId: "your-app",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abc123def456"
};

// Supabase Configuration
const supabaseConfig = {
    url: "https://your-project.supabase.co",
    key: process.env.SUPABASE_ANON_KEY
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Initialize Supabase
const supabase = createClient(supabaseConfig.url, supabaseConfig.key);
