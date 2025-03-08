
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  attending: z.enum(["yes", "no"]),
  guestCount: z.string().optional(),
  mealPreference: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const RSVPForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      attending: "yes",
      guestCount: "0",
      mealPreference: "",
      dietaryRestrictions: "",
      message: "",
    },
  });

  const { watch } = form;
  const attending = watch("attending");

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    
    // Simulate form submission delay
    setTimeout(() => {
      setIsSubmitted(true);
      toast.success("Thank you for your RSVP!", {
        description: "We've received your response and can't wait to celebrate with you!",
      });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12 px-4"
      >
        <div className="max-w-md mx-auto glass-card p-8 rounded-lg">
          <h3 className="font-serif text-2xl mb-4">Thank You!</h3>
          <p className="mb-6 text-wedding-charcoal/80">
            We've received your RSVP and can't wait to celebrate with you!
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-wedding-gold hover:bg-wedding-gold/80 text-white border-none"
          >
            Submit Another Response
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto glass-card p-8 rounded-lg shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-body">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    className="border-wedding-taupe/30 focus:border-wedding-gold focus:ring-wedding-gold/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-body">Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="border-wedding-taupe/30 focus:border-wedding-gold focus:ring-wedding-gold/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attending"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="font-body">Will you be attending?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="attending-yes" />
                      <Label htmlFor="attending-yes">Joyfully Accepts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="attending-no" />
                      <Label htmlFor="attending-no">Regretfully Declines</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {attending === "yes" && (
            <>
              <FormField
                control={form.control}
                name="guestCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body">Number of Guests</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-wedding-taupe/30 focus:border-wedding-gold focus:ring-wedding-gold/20">
                          <SelectValue placeholder="Select number of guests" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Just me</SelectItem>
                        <SelectItem value="1">Me + 1 guest</SelectItem>
                        <SelectItem value="2">Me + 2 guests</SelectItem>
                        <SelectItem value="3">Me + 3 guests</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mealPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body">Meal Preference</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-wedding-taupe/30 focus:border-wedding-gold focus:ring-wedding-gold/20">
                          <SelectValue placeholder="Select meal preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beef">Beef</SelectItem>
                        <SelectItem value="chicken">Chicken</SelectItem>
                        <SelectItem value="fish">Fish</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dietaryRestrictions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body">Dietary Restrictions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please list any allergies or dietary restrictions"
                        className="border-wedding-taupe/30 focus:border-wedding-gold focus:ring-wedding-gold/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-body">Message to the Couple (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your well wishes or any message for the couple"
                    className="resize-none border-wedding-taupe/30 focus:border-wedding-gold focus:ring-wedding-gold/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-wedding-gold hover:bg-wedding-gold/80 text-white border-none"
          >
            Submit RSVP
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RSVPForm;
