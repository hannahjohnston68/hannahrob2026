import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "",
    dietaryRestrictions: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("RSVP Submitted:", formData);
    // Here you can integrate with an API or Firebase to save the response
  };

  return (
    <Card className="max-w-lg mx-auto mt-10 p-5 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">RSVP</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select
            name="attending"
            value={formData.attending}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Will you attend?</option>
            <option value="yes">Yes, I’ll be there!</option>
            <option value="no">Sorry, I can’t make it</option>
          </select>
          <Textarea
            name="dietaryRestrictions"
            placeholder="Any dietary restrictions?"
            value={formData.dietaryRestrictions}
            onChange={handleChange}
          />
          <Button type="submit" className="w-full">Submit RSVP</Button>
        </form>
      </CardContent>
    </Card>
  );
}
