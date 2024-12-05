const { MongoClient } = require('mongodb');
const fs = require('fs');
const csvParser = require('csv-parser');

// MongoDB connection details
const uri = 'mongodb+srv://gavinluc3357:dogs123@doglovertest.7qgrs.mongodb.net/doglovertest?retryWrites=true&w=majority&appName=doglovertest'; // Replace with your connection string
const dbName = 'ChatGPT_Evaluation';
const collectionName = 'TEST';
// CSV file path
const csvFilePath = './computer_security_test.csv';

// Function to upload CSV data to MongoDB
async function uploadCSV() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Read and parse the CSV file
    const records = [];
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => {
        records.push(row); // Push each row as an object to the records array
      })
      .on('end', async () => {
        console.log(`Finished reading CSV file. Found ${records.length} records.`);

        // Insert records into MongoDB
        if (records.length > 0) {
          const result = await collection.insertMany(records);
          console.log(`Successfully inserted ${result.insertedCount} records into MongoDB`);
        } else {
          console.log('No records to insert');
        }

        // Close the MongoDB connection
        await client.close();
        console.log('MongoDB connection closed');
      });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    
  }
}

// Call the function
uploadCSV();
