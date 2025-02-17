import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

async function getMeetupData(meetupId) {
  const client = await MongoClient.connect(
    "mongodb+srv://tope:ZMdfEeEoXuhCPcrA@cluster0.eg0br.mongodb.net/tope?retryWrites=true&w=majority",
    {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    }
  );

  const db = client.db();
  const meetupsCollection = db.collection("tope");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId), // Use `new` here
  });

  client.close();

  return {
    id: selectedMeetup._id.toString(),
    title: selectedMeetup.title,
    address: selectedMeetup.address,
    image: selectedMeetup.image,
    description: selectedMeetup.description,
  };
}

export default async function MeetupDetails({ params }) {
  // Await params
  const { meetupId } = await params;

  const meetupData = await getMeetupData(meetupId);

  return (
    <MeetupDetail
      image={meetupData.image}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
    />
  );
}