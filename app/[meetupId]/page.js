import MeetupDetail from '../../components/meetups/MeetupDetail';

// Example data for demonstration
const DUMMY_MEETUPS = {
  m1: {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    title: 'First Meetup',
    address: 'Some Street 5, Some City',
    description: 'This is a first meetup',
  },
  m2: {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    title: 'Second Meetup',
    address: 'Another Street 10, Some City',
    description: 'This is a second meetup',
  },
};

// MeetupDetails component as a server component
export default async function MeetupDetails({ params }) {
  const meetupId = params.meetupId;

  // Fetch data for a single meetup
  const meetupData = DUMMY_MEETUPS[meetupId] || {};

  return (
    <MeetupDetail
      image={meetupData.image}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
    />
  );
}