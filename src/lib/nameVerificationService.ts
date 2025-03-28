import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export const verifyName = async (firstName: string): Promise<boolean> => {
  try {
    console.log('Verifying name:', firstName);
    
    // Query the 'invited_guests' collection for the name
    const guestsRef = collection(db, 'invited_guests');
    const q = query(guestsRef, where('name', '>=', firstName.toLowerCase()), where('name', '<=', firstName.toLowerCase() + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    
    // Check if any documents match
    const nameExists = !querySnapshot.empty;
    console.log('Name verification result:', nameExists);
    
    return nameExists;
  } catch (error) {
    console.error('Error verifying name:', error);
    throw new Error('Failed to verify name. Please try again.');
  }
}; 