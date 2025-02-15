import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect('mongodb+srv://topefasasi99:Fasasi123@cluster0.eg0br.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201),json({messgae: 'Meetup inserted!'});

  }
}

export default handler;