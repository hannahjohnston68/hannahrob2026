import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { submitRSVP } from "@/lib/rsvpService";

interface FormData {
  name: string;
  email: string;
  attending: string;
  numberOfGuests: string;
  dietaryRestrictions: string;
  songRequest: string;
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    attending: "",
    numberOfGuests: "",
    dietaryRestrictions: "",
    songRequest: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitError(null); // Clear any previous errors
  };

  const handleAttendingChange = (value: string) => {
    setFormData({ ...formData, attending: value });
    setSubmitError(null); // Clear any previous errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitRSVP(formData);
      // Show success message
      alert('Thank you for your RSVP! We look forward to celebrating with you.');
      // Reset form
      setFormData({
        name: "",
        email: "",
        attending: "",
        numberOfGuests: "",
        dietaryRestrictions: "",
        songRequest: "",
      });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitError('There was an error submitting your RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-10 p-5 shadow-lg bg-white/90 backdrop-blur-sm border-wedding-pink/20">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-wedding-charcoal">Your Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-wedding-pink/20 focus:border-wedding-pink"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-wedding-charcoal">Your Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-wedding-pink/20 focus:border-wedding-pink"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-wedding-charcoal">Will you attend?</Label>
            <Select value={formData.attending} onValueChange={handleAttendingChange}>
              <SelectTrigger className="border-wedding-pink/20 focus:border-wedding-pink">
                <SelectValue placeholder="Select your response" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes, I'll be there!</SelectItem>
                <SelectItem value="no">Sorry, I can't make it</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.attending === 'yes' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="numberOfGuests" className="text-wedding-charcoal">Number of Guests</Label>
                <Input
                  id="numberOfGuests"
                  type="number"
                  name="numberOfGuests"
                  min="1"
                  placeholder="Enter number of guests"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  required
                  className="border-wedding-pink/20 focus:border-wedding-pink"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietaryRestrictions" className="text-wedding-charcoal">Dietary Restrictions</Label>
                <Textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  placeholder="Any dietary restrictions we should know about?"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  className="border-wedding-pink/20 focus:border-wedding-pink"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="songRequest" className="text-wedding-charcoal">Song Request</Label>
                <Textarea
                  id="songRequest"
                  name="songRequest"
                  placeholder="What song would you like to hear at the reception?"
                  value={formData.songRequest}
                  onChange={handleChange}
                  className="border-wedding-pink/20 focus:border-wedding-pink"
                />
              </div>
            </>
          )}

          {submitError && (
            <div className="text-red-500 text-sm text-center">
              {submitError}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-wedding-pink hover:bg-wedding-pink/90 text-white font-serif"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 