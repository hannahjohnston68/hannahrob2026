import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface RSVPData {
  name: string;
  email: string;
  attending: string;
  numberOfGuests: string;
  dietaryRestrictions: string;
  songRequest: string;
}

export const submitRSVP = async (data: RSVPData) => {
  try {
    // Submit to Firebase
    const docRef = await addDoc(collection(db, 'rsvps'), {
      ...data,
      timestamp: serverTimestamp()
    });
    console.log('RSVP submitted successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    throw new Error('Failed to submit RSVP. Please try again.');
  }
}; 