import { MongoClient } from 'mongodb';
import BabyItems from "../src/components/BabyItems"


export default function Home(props) {
  
  return (
    <>
     <BabyItems babyItems={props}/>
    </>
  );
}

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://Roman:Roman@cluster0.9yd7t.mongodb.net/babyItems?retryWrites=true&w=majority'
  );

  const db = client.db();

  const babyItemsCollection = db.collection('babyItems');


  const babyItems = await babyItemsCollection.find().toArray();


  client.close();

  return {
    props: {
      babyItems: babyItems.map((babyItem) => ({
        value: babyItem.value,
        title: babyItem.title,
        color: babyItem.color,
      })),
    },
    revalidate: 10,
  };
};
