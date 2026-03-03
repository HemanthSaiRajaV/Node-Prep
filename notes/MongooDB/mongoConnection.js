import mongodb from "mongodb";
import mongoose from "mongoose";

// MongoDB Connection Options
const MONGO_URI = "mongodb://localhost:27017/mydatabase";
// Or with authentication: "mongodb://username:password@localhost:27017/mydatabase"



// ============================================
// Method 1: Using MongoDB Native Driver
// ============================================

// Connect to MongoDB using native driver
async function connectWithNativeDriver() {
    const { MongoClient } = mongodb;
    const client = new MongoClient(MONGO_URI);

    try {
        // Connect to MongoDB server
        await client.connect();
        console.log("✅ Connected to MongoDB (Native Driver)");

        const database = client.db("mydatabase");
        const collection = database.collection("users");

        // CREATE - Insert a document
        const insertResult = await collection.insertOne({
            name: "John Doe",
            email: "john@example.com",
            age: 25
        });
        console.log("✅ Document inserted:", insertResult.insertedId);

        // READ - Find documents
        const users = await collection.find({}).toArray();
        console.log("✅ All users:", users);

        // READ - Find single document
        const user = await collection.findOne({ name: "John Doe" });
        console.log("✅ Found user:", user);

        // UPDATE - Update a document
        const updateResult = await collection.updateOne(
            { name: "John Doe" },
            { $set: { age: 26 } }
        );
        console.log("✅ Document updated:", updateResult.modifiedCount);

        // DELETE - Delete a document
        const deleteResult = await collection.deleteOne({ name: "John Doe" });
        console.log("✅ Document deleted:", deleteResult.deletedCount);

    } catch (error) {
        console.error("❌ MongoDB Error:", error);
    } finally {
        // Close the connection
        await client.close();
        console.log("✅ Connection closed");
    }
}


// ============================================
// Method 2: Using Mongoose ODM
// ============================================

// Define a Mongoose Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 0 },
    createdAt: { type: Date, default: Date.now }
});

// Create a Mongoose Model
const User = mongoose.model("User", userSchema);

async function connectWithMongoose() {
    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB (Mongoose)");

        // CREATE - Create a new user
        const newUser = await User.create({
            name: "Jane Doe",
            email: "jane@example.com",
            age: 24
        });
        console.log("✅ User created:", newUser);

        // READ - Find all users
        const allUsers = await User.find({});
        console.log("✅ All users:", allUsers);

        // READ - Find user by email
        const foundUser = await User.findOne({ email: "jane@example.com" });
        console.log("✅ Found user:", foundUser);

        // UPDATE - Update user age
        const updatedUser = await User.findOneAndUpdate(
            { email: "jane@example.com" },
            { age: 25 },
            { new: true }
        );
        console.log("✅ Updated user:", updatedUser);

        // DELETE - Delete a user
        const deletedUser = await User.findOneAndDelete({ email: "jane@example.com" });
        console.log("✅ Deleted user:", deletedUser);

    } catch (error) {
        console.error("❌ Mongoose Error:", error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log("✅ Mongoose connection closed");
    }
}


// ============================================
// Run Examples
// ============================================

// Uncomment one of the following to run:

// connectWithNativeDriver();
// connectWithMongoose();

// Or run both (they will create separate connections)
// Note: Both can't run simultaneously without different databases

export { connectWithNativeDriver, connectWithMongoose };
