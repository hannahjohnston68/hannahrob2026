import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { submitRSVP } from "@/lib/rsvpService";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { verifyName } from '../lib/nameVerificationService';
import { Loader2 } from 'lucide-react';

const rsvpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  attending: z.string().min(1, 'Please select if you are attending'),
  numberOfGuests: z.string().min(1, 'Number of guests is required'),
  dietaryRestrictions: z.string(),
  songRequest: z.string()
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

export default function RSVPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isNameValid, setIsNameValid] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasVerified, setHasVerified] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema)
  });

  const attending = watch('attending');

  const validateName = async (firstName: string) => {
    try {
      setIsVerifying(true);
      setNameError(null);
      const isValid = await verifyName(firstName);
      setIsNameValid(isValid);
      if (isValid) {
        setHasVerified(true);
      } else {
        setNameError('Name not found in our invitation list.');
      }
    } catch (error) {
      setNameError('Error checking name. Please try again later.');
    } finally {
      setIsVerifying(false);
    }
  };

  const onSubmit = async (data: RSVPFormData) => {
    if (!hasVerified) {
      setNameError('Please verify your name before submitting.');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      await submitRSVP(data);
      reset();
      setHasVerified(false);
      setIsNameValid(false);
    } catch (error) {
      setSubmitError('Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-10 p-5 shadow-lg bg-white/90 backdrop-blur-sm border-wedding-pink/20">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-wedding-charcoal">Your Name</Label>
            <div className="flex gap-2">
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="border-wedding-pink/20 focus:border-wedding-pink"
                disabled={hasVerified}
                {...register('name')}
              />
              {!hasVerified && (
                <Button
                  type="button"
                  onClick={() => validateName(watch('name'))}
                  disabled={isVerifying || !watch('name')}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify Name'
                  )}
                </Button>
              )}
            </div>
            {nameError && (
              <div className="text-red-500 text-sm text-center">
                {nameError}
              </div>
            )}
            {errors.name && (
              <div className="text-red-500 text-sm text-center">
                {errors.name.message}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-wedding-charcoal">Your Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border-wedding-pink/20 focus:border-wedding-pink"
              {...register('email')}
            />
            {errors.email && (
              <div className="text-red-500 text-sm text-center">
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-wedding-charcoal">Will you attend?</Label>
            <Select onValueChange={(value) => register('attending').onChange({ target: { value } })}>
              <SelectTrigger className="border-wedding-pink/20 focus:border-wedding-pink">
                <SelectValue placeholder="Select your response" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes, I'll be there!</SelectItem>
                <SelectItem value="no">Sorry, I can't make it</SelectItem>
              </SelectContent>
            </Select>
            {errors.attending && (
              <div className="text-red-500 text-sm text-center">
                {errors.attending.message}
              </div>
            )}
          </div>

          {attending === 'yes' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="numberOfGuests" className="text-wedding-charcoal">Number of Guests</Label>
                <Input
                  id="numberOfGuests"
                  type="number"
                  min="1"
                  placeholder="Enter number of guests"
                  className="border-wedding-pink/20 focus:border-wedding-pink"
                  {...register('numberOfGuests')}
                />
                {errors.numberOfGuests && (
                  <div className="text-red-500 text-sm text-center">
                    {errors.numberOfGuests.message}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietaryRestrictions" className="text-wedding-charcoal">Dietary Restrictions</Label>
                <Textarea
                  id="dietaryRestrictions"
                  placeholder="Any dietary restrictions we should know about?"
                  className="border-wedding-pink/20 focus:border-wedding-pink"
                  {...register('dietaryRestrictions')}
                />
                {errors.dietaryRestrictions && (
                  <div className="text-red-500 text-sm text-center">
                    {errors.dietaryRestrictions.message}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="songRequest" className="text-wedding-charcoal">Song Request</Label>
                <Textarea
                  id="songRequest"
                  placeholder="What song would you like to hear at the reception?"
                  className="border-wedding-pink/20 focus:border-wedding-pink"
                  {...register('songRequest')}
                />
                {errors.songRequest && (
                  <div className="text-red-500 text-sm text-center">
                    {errors.songRequest.message}
                  </div>
                )}
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full bg-wedding-pink hover:bg-wedding-pink/90 text-white"
            disabled={isSubmitting || !hasVerified}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit RSVP'
            )}
          </Button>

          {submitError && (
            <div className="text-red-500 text-sm text-center">
              {submitError}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
} 