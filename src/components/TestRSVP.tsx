import { addTestRSVP } from '../lib/firebase';
import { Button } from './ui/button';

export function TestRSVP() {
  const handleTestRSVP = async () => {
    try {
      const id = await addTestRSVP();
      alert(`Test RSVP added successfully! ID: ${id}`);
    } catch (error) {
      alert('Error adding test RSVP. Check console for details.');
      console.error(error);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white/80 backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-4">Test RSVP Submission</h3>
      <Button onClick={handleTestRSVP}>
        Add Test RSVP
      </Button>
    </div>
  );
} 