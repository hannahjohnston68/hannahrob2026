import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface RSVPResponse {
  id: string;
  name: string;
  email: string;
  attending: string;
  numberOfGuests: string;
  dietaryRestrictions: string;
  songRequest: string;
  timestamp: Date;
}

export function RSVPResponses() {
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'rsvps'), orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rsvpData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date()
      })) as RSVPResponse[];
      
      setResponses(rsvpData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center">Loading responses...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">RSVP Responses</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {responses.map((response) => (
          <Card key={response.id} className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">{response.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="font-semibold">Email:</span> {response.email}</p>
                <p><span className="font-semibold">Attending:</span> {response.attending}</p>
                <p><span className="font-semibold">Number of Guests:</span> {response.numberOfGuests}</p>
                <p><span className="font-semibold">Dietary Restrictions:</span> {response.dietaryRestrictions}</p>
                <p><span className="font-semibold">Song Request:</span> {response.songRequest}</p>
                <p className="text-sm text-gray-500">
                  Submitted: {response.timestamp.toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 