import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface RSVPData {
  name: string;
  email: string;
  attending: string;
  numberOfGuests: string;
  dietaryRestrictions: string;
  songRequest: string;
  submittedAt: Date;
}

export const submitRSVP = async (data: Omit<RSVPData, 'submittedAt'>): Promise<void> => {
  try {
    await addDoc(collection(db, 'rsvps'), {
      ...data,
      submittedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    throw new Error('Failed to submit RSVP');
  }
}; 