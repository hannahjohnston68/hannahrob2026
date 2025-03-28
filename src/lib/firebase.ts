// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxX",
  authDomain: "hannahrob2026.firebaseapp.com",
  projectId: "hannahrob2026",
  storageBucket: "hannahrob2026.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Test function to add a sample RSVP
export const addTestRSVP = async () => {
  try {
    const rsvpCollection = collection(db, 'rsvps');
    const testRSVP = {
      name: "Test Guest",
      email: "test@example.com",
      attending: "Yes",
      numberOfGuests: "2",
      dietaryRestrictions: "None",
      songRequest: "Test Song",
      timestamp: new Date()
    };

    const docRef = await addDoc(rsvpCollection, testRSVP);
    console.log("Test RSVP added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding test RSVP:", error);
    throw error;
  }
};

// Function to add test guests to the invited_guests collection
export const addTestGuests = async () => {
  try {
    const guestsCollection = collection(db, 'invited_guests');
    const testGuests = [
      { name: "hannah", email: "hannah@example.com" },
      { name: "rob", email: "rob@example.com" },
      { name: "john", email: "john@example.com" },
      { name: "jane", email: "jane@example.com" },
      { name: "mike", email: "mike@example.com" },
      { name: "sarah", email: "sarah@example.com" }
    ];

    for (const guest of testGuests) {
      const docRef = await addDoc(guestsCollection, guest);
      console.log(`Added guest ${guest.name} with ID:`, docRef.id);
    }

    console.log("All test guests added successfully");
  } catch (error) {
    console.error("Error adding test guests:", error);
    throw error;
  }
}; 