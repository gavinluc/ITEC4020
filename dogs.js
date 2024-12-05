const csvParser = require('csv-parser');
const http = require('http');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const hostname = '127.0.0.1';
const port = 3000;
const apiKey = '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';  // Replace with your OpenAI API key
const url = 'https://api.openai.com/v1/chat/completions';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
};


const dbURL ='mongodb+srv://gavinluc3357:dogs123@doglovertest.7qgrs.mongodb.net/doglovertest?retryWrites=true&w=majority&appName=doglovertest';
const dbName= 'ChatGPT_Evaluation';
const CSQuest='Computer_Security';
const HistQuest='History';
const SocSQuest='Social_Science';
const testq = 'TEST';
mongoose.connect(dbURL)
 //   .then((result)=> console.log('connected'))

const server = http.createServer((req, res)=>{
    res.statusCode = 200;
    res.setHeader ('Content-Type', 'text/plain');
    res.end('Hello World');

});

server.listen (port, hostname, () => {
 //   console.log(`server running at ${hostname}:${port}/`);
});


async function fetchDocuments(coll) {
    const client = new MongoClient(dbURL);
    try {
         await client.connect();
       //  console.log('Connectedddd');

         const db = client.db(dbName);
         const collection = db.collection(SocSQuest);

         const documents = await collection.find({}).toArray(); // You can add filters inside `find({})`

    // Print the documents array
        //console.log('Documents:', documents);
         return documents;
    }
    catch{

    }
  }

fetchDocuments(testq).then((documents)=>{
  
      //  console.log(documents[1].Question);
       // gptCall(documents,0);
       

        for (let i = 0; i < 5; i++) {
            
            gptCall(documents, i,testq);
            
          } 

});
async function MongUpload(id, response){
    try {
        await client.connect();

        const database = client.db(dbName); // Replace with your database name
        const collection = database.collection("myCollection"); // Replace with your collection name

        // Update a specific document
        const filter = { _id: "unique-id" }; // Replace with your filter criteria
        const update = {
            $set: { fieldToUpdate: "new value" }, // Fields to update
            $unset: { fieldToRemove: "" },       // Fields to remove (if any)
        };

        const result = await collection.updateOne(filter, update);
        console.log(`${result.matchedCount} document(s) matched the filter.`);
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    } finally {
        await client.close();
    }
}

function gptCall(doc, indy,colly){
    inpstring= doc[indy].Question + ' A. '+ doc[indy].A + ' B. ' + doc[indy].B + ' C. '+ doc[indy].C + ' D. '+ doc[indy].D;
   // console.log(inpstring);
    const body = JSON.stringify({
        model: 'gpt-3.5-turbo',  // Choose your model: e.g., gpt-3.5-turbo or gpt-4
        messages: [
            { role: 'system', content: 'You are a test taking machine, please answer the following question with either A, B, C or D. Only provide a one letter response' },
          // { role: 'system', content: 'simply repeat my prompt back to me' },
           
            { role: 'user', content: inpstring },

        ],
        max_tokens: 100,
        temperature: 0.7,
    });

    const start = performance.now();
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
    })
        .then(response => response.json())
        .then(data => {
            end = performance.now();
            responseTime = end = start;

           console.log(`ChatGPT Response:`, data.choices[0].message.content, `response time: ${responseTime} milleseconds` );
            //console.log(`response time: ${responseTime} milleseconds`);
            result = [data.choices[0].message.content,responseTime];
           // console.log(result);
            /*  strr= data.choices[0].message.content;
            console.log(typeof(strr));
            return typeof(strr); */
            return {
                content: data.choices[0].message.content.trim(),
                responseTime,
            }
            ;
             
        })
        .catch(error => {
            console.error('Error:', error);
    });
}
