const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const uri = "mongodb+srv://calebjaowens:2uoIa1DYyeCxce2g@swe432-project.2n5dvs0.mongodb.net/?retryWrites=true&w=majority";

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
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

let allRadioHosts = [
    {
        name: "Caleb",
        favorite_song: "A Beautiful Lie",
        favorite_song_artist: "Three Days Grace",
        hiring_date: new Date(),
        age: 22,
        timesHosted: 1
    },
    {
        name: "John",
        favorite_song: "American Idiot",
        favorite_song_artist: "Green Day",
        hiring_date: new Date(),
        age: 21,
        timesHosted: 0
    }
]

let currentRadioHost = allRadioHosts[0];
let endTime = new Date();
endTime.setHours(endTime.getHours() + 1);
currentRadioHost.endTime = endTime; // added new property
currentRadioHost.timesHosted += 1; // modified property

app.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Home',
    });
});

app.get('/contact-us', (req, res) => {
    res.render('pages/contact-us', {
        title: 'Contact Us',
    });
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
});