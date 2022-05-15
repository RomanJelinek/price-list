import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    const { title, value, icon } = data;

    const client = await MongoClient.connect(
      'mongodb+srv://Roman:Roman@cluster0.9yd7t.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('babyValues');

    const result = await meetupsCollection.insertOne(data);

    res.status(201).json({ message: 'budget added successfully' });

    client.close();
  }
};
export default handler;
