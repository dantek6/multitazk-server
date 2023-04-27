import env from "dotenv";
const { MongoClient, ServerApiVersion } = require('mongodb');

env.config();

const uri = `mongodb+srv://${process.env.MONGODB_CONFIG}/?retryWrites=true&w=majority`;

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("DB connected finally!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = { run };