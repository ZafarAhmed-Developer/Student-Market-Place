const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

const testConnection = async () => {
    console.log('Testing connection to:', process.env.MONGO_URI);
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('SUCCESS: Connected to MongoDB Atlas');
        
        // List collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections in database:', collections.map(c => c.name));
        
        await mongoose.disconnect();
    } catch (err) {
        console.error('FAILURE: Could not connect to MongoDB Atlas');
        console.error('Error details:', err.message);
    }
};

testConnection();
