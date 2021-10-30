const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

// debTour
// aUopCeLAO6Wwj1Lh

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb://debTour:aUopCeLAO6Wwj1Lh@cluster0-shard-00-00.0gtlp.mongodb.net:27017,cluster0-shard-00-01.0gtlp.mongodb.net:27017,cluster0-shard-00-02.0gtlp.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-amsdfs-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("debTour");
    const servicesCollection = database.collection("services");
    const ordersCollection = database.collection("orders");


    app.get('/services', async (req, res) => {

      console.log('got id');
      //res.send('Post Hitting succesfully');

      const cursor = servicesCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      //res.send('Post Hitting succesfully');

      const service = await servicesCollection.findOne(query);
      res.json(service);
    });

    // POST API
    app.post('/services', async (req, res) => {
      const newService = req.body;
      const result = await servicesCollection.insertOne(newService);
      res.json(result);
    });

    // ORDER POST API 
    app.post('/orders', async (req, res) => {
      console.log('Post Hitting succesfully');
      const order = req.body;
      const result = await ordersCollection.insertOne(order);
      //console.log(order);
      res.json(result);
    });

    // ORDERS GET API 
    app.get('/orders', async (req, res) => {
      //console.log('Hitting the get post api');    
      const cursor = ordersCollection.find({});
      const orders = await cursor.toArray();
      res.send(orders);
    });

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});