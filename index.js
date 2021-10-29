const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
require('dotenv').config();

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
    const database = client.db("carMechanic");
    const servicesCollection = database.collection("services");

    app.get('/services', async (req, res) => {

      // console.log('Hitting the get post api');
      //res.send('Post Hitting succesfully');

      const cursor = servicesCollection.find({});
      const services = await cursor.toArray();
      res.send(services);


    });

    // GET api link
    app.get('/hello', async (req, res) => {
      res.send('Hello world');
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