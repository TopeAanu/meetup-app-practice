import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

async function connectToMongoDB() {
  try {
    const client = await MongoClient.connect(
      process.env.MONGODB_URI || 'mongodb+srv://tope:ZMdfEeEoXuhCPcrA@cluster0.eg0br.mongodb.net/tope?retryWrites=true&w=majority',
      {
        serverSelectionTimeoutMS: 5000,
        retryWrites: true,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      }
    );
    return client;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Failed to connect to database');
  }
}

async function HomePage() {
  try {
    const client = await connectToMongoDB();
    const db = client.db();
    const meetupsCollection = db.collection('tope');
    const meetups = await meetupsCollection.find().toArray();
    
    await client.close();

    const transformedMeetups = meetups.map((meetup) => ({
      title: meetup.title,
      address: meetup.address,
      image: meetup.image,
      id: meetup._id.toString(),
    }));

    return <MeetupList meetups={transformedMeetups} />;
  } catch (error) {
    console.error('Error fetching meetups:', error);
    return <div>Error loading meetups. Please try again later.</div>;
  }
}

export const revalidate = 60;

export default HomePage;