const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://otp:inamsaif@cluster0.jnbirzy.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection URI
const dbName = 'test'; // Replace with your database name

// Function to connect to the MongoDB database
const connectToDatabase = async () => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    console.log('Connected to the database');
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};



// Example function to find documents in a collection
const findDocuments = async (collectionName, name) => {
  const db = await connectToDatabase();
  const collection = db.collection(collectionName);

  try {

    const query = { student:name};
    const projection = { filename:1,fileUrl: 1, _id: 0 }; // Only return the studentName field
    const result = await collection.find(query).project(projection).toArray();
    return result;
  } catch (error) {
    console.error('Error finding documents:', error);
  }
};

const findNameByEmail = async (collectionName, email) => {
  const db = await connectToDatabase();
  const collection = db.collection(collectionName);

  try {
    const query = { studentId: email };
    const projection = { studentName: 1, _id: 0 }; // Only return the studentName field
    const result = await collection.find(query).project(projection).toArray();
    if (result.length > 0) {
      return result[0].studentName;
    } else {
      return null; // Return null if no matching document is found
    }
  } catch (error) {
    console.error('Error finding documents:', error);
    return null;
  }
};

module.exports = {
    findDocuments,
    findNameByEmail
};
