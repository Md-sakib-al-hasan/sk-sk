const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3000
require('dotenv').config();


app.use(cors({ origin: [
  'https://uk-sk.vercel.app', // Allow this origin
  'https://uk-sk-md-sakibs-projects-0c3367a4.vercel.app', // Allow this origin
  'http://localhost:5173' // Allow this origin for local development
],}))


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_PASSWORD}:${process.env.USER_NAME}@cluster0.wn8gk0s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("Cars-doctors");
    const movies = database.collection("booking");

    app.get("/sk",async(req,res)=> {
           const data = await movies.find().toArray()
           res.send(data);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/",(req,res) => {
    res.send('hellow world')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })