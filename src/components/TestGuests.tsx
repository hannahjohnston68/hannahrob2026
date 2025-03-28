import { Button } from "@/components/ui/button";
import { addTestGuests } from "@/lib/firebase";

export default function TestGuests() {
  const handleAddTestGuests = async () => {
    try {
      await addTestGuests();
      alert('Test guests added successfully!');
    } catch (error) {
      console.error('Error adding test guests:', error);
      alert('Error adding test guests. Check console for details.');
    }
  };

  return (
    <div className="p-4">
      <Button onClick={handleAddTestGuests}>
        Add Test Guests
      </Button>
    </div>
  );
} 