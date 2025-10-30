const mongoose = require('mongoose');
 const initData = require('./data.js');
 const Listing = require('../models/listing.js');

 const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
 main().then(() => console.log('Connected to MongoDB'))
 .catch(err => console.log(err));
 
 
 async function main() {
   await mongoose.connect(MONGO_URL);
 
 };

 const initDB = async () => {
    // Clear the database
    await Listing.deleteMany({});
    
    // Add the 'owner' to each object in initData.data
    const listingsWithOwner = initData.data.map((obj) => ({
        ...obj, 
        owner: '68fe567a43d051739b947cd4' // <-- Add your owner ID here
   }));

    // Insert the modified data
    await Listing.insertMany(listingsWithOwner);
    console.log("DB Initialized with sample data");
 };

initDB();