import { collection, addDoc, serverTimestamp } from '@firebase/firestore';
import { db } from './firebase';

// Replace with your actual web app URL from Google Apps Script deployment
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwIKLvvoGw3LNsVjoCWNuEh_t9J0WhBAwf9WzODIqf7Upa85UjLp_3Iyc6FZeAlYpg6/exec";

export interface RSVPData {
  name: string;
  email: string;
  attending: string;
  numberOfGuests: string;
  dietaryRestrictions: string;
  songRequest: string;
}

export const submitRSVP = async (data: RSVPData): Promise<void> => {
  try {
    // Submit to Firebase
    const rsvpCollection = collection(db, 'rsvps');
    await addDoc(rsvpCollection, {
      ...data,
      timestamp: serverTimestamp()
    });

    // Submit to Google Sheet
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rsvpData: data
      })
    });

    // Since we're using no-cors mode, we can't check the response
    // We'll assume success if we get here
    console.log('RSVP submitted successfully to both Firebase and Google Sheet');
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    throw new Error('Failed to submit RSVP. Please try again.');
  }
}; 