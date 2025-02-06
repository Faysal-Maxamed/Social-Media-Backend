import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        // Connect to the local MongoDB instance and use the 'Mango' database
        const url = 'mongodb://localhost:27017/Social-Media';

        // Connect to MongoDB
        const conn = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Log the connection success message
        console.log(`Connected to database: ${conn.connection.name}`);
    } catch (err) {
        // Log any connection errors
        console.error(`Error connecting to database: ${err.message}`);
    }
};

export default connectToDb;
