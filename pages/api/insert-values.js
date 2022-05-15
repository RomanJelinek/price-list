import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    console.log(data);

    const { title, value, color } = data.values;
    const { type } = data;

    const client = await MongoClient.connect(
      'mongodb+srv://Roman:Roman@cluster0.9yd7t.mongodb.net/babyItems?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('babyItems');

    if (type === 'new') {
      const result = await meetupsCollection.insertOne(data.values);

      res.status(201).json({ message: 'baby value added successfully' });
    }
    if (type === 'update') {
      const update = await meetupsCollection.updateOne(
        { title: data.itemToUpdate.title }, // specifies the document to update
        {
          $set: {
            title: title,
            value: value,
          },
        }
      );

      res.status(201).json({ message: 'baby value changed successfully' });
    }

    if (type === 'delete') {
      const deleteOne = await meetupsCollection.deleteOne({ title: data.itemToUpdate.title })

      res.status(201).json({ message: 'baby value changed successfully' });
    }

    client.close();
  }
};
export default handler;

// _id: new ObjectId('627f4a88caecf5a756aca8c5');
