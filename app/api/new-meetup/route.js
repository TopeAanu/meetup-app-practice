import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    
    const client = await MongoClient.connect('mongodb+srv://tope:ZMdfEeEoXuhCPcrA@cluster0.eg0br.mongodb.net/tope?retryWrites=true&w=majority', {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      connectTimeoutMS: 10000, 
      socketTimeoutMS: 45000, 
    });

    const db = client.db();
    const meetupsCollection = db.collection('tope');
    
    const result = await meetupsCollection.insertOne(data);
    
    await client.close();
    
    return NextResponse.json(
      { message: 'Meetup inserted!', meetupId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('MongoDB Error:', error);
    return NextResponse.json(
      { message: 'Failed to insert meetup.', error: error.message },
      { status: 500 }
    );
  }
}