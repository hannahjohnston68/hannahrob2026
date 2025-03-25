import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ArrowRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

// Separate schema for initial name validation
const nameValidationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
});

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  attending: z.enum(["yes", "no"]),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional(),
});

type NameValidationFormValues = z.infer<typeof nameValidationSchema>;
type FormValues = z.infer<typeof formSchema>;

export const RSVPForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidGuest, setIsValidGuest] = useState(false);
  const [validatedName, setValidatedName] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [shake, setShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const nameForm = useForm<NameValidationFormValues>({
    resolver: zodResolver(nameValidationSchema),
    defaultValues: {
      name: "",
    },
  });

  const rsvpForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      attending: "yes",
      dietaryRestrictions: "",
      message: "",
    },
  });

  // Add this to get the current attending value from the form
  const attending = rsvpForm.watch("attending");

  const validateGuestName = async (data: NameValidationFormValues) => {
    setIsValidating(true);
    
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwIPWDafbGfhtDVt9rmj_yDPl_W-mPIMl3iheBKA3xPFJmflwSAW3traQc419DGTFI5/exec';

    return new Promise((resolve, reject) => {
      const callbackName = `jsonp_callback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const script = document.createElement('script');
      
      // Create URL with parameters
      const params = new URLSearchParams({
        callback: callbackName,
        name: data.name.trim()
      });
      
      // Construct final URL
      const finalUrl = `${SCRIPT_URL}?${params.toString()}`;
      
      // Log the request details
      console.log('JSONP Request:', {
        url: finalUrl,
        parameters: {
          callback: callbackName,
          name: data.name.trim()
        }
      });
      
      script.src = finalUrl;
      
      // Define callback
      (window as any)[callbackName] = (result: any) => {
        console.log('JSONP Response:', result);
        cleanup();
        
        if (result.success && result.isValid) {
          setErrorMessage("");
          setIsValidGuest(true);
          const fullName = result.fullName || data.name;
          setValidatedName(fullName);
          rsvpForm.setValue('name', fullName);
          toast.success("Name verified!");
          resolve(result);
        } else {
          setShake(true);
          setErrorMessage("Name not found");
          setTimeout(() => setShake(false), 500);
          reject(new Error("Name not found"));
        }
      };
      
      const cleanup = () => {
        document.head.removeChild(script);
        delete (window as any)[callbackName];
      };
      
      script.onerror = () => {
        cleanup();
        const error = new Error('Script load failed');
        console.error('JSONP Error:', error);
        toast.error("Connection failed", {
          description: "Unable to connect to the verification service. Please try again later."
        });
        reject(error);
      };
      
      document.head.appendChild(script);
      
      // Set timeout
      setTimeout(() => {
        if ((window as any)[callbackName]) {
          cleanup();
          const error = new Error('Request timed out');
          console.error('JSONP Timeout:', error);
          toast.error("Request timed out", {
            description: "The verification service is taking too long to respond. Please try again."
          });
          reject(error);
        }
      }, 10000);
    }).finally(() => {
      setIsValidating(false);
    });
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // First, update the Google Sheet
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwIPWDafbGfhtDVt9rmj_yDPl_W-mPIMl3iheBKA3xPFJmflwSAW3traQc419DGTFI5/exec';
      
      // Create JSONP callback for Google Sheet update
      const updateCallback = `jsonp_callback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const script = document.createElement('script');
      
      const sheetUpdatePromise = new Promise((resolve, reject) => {
        (window as any)[updateCallback] = (result: any) => {
          if (result.success) {
            resolve(result);
          } else {
            reject(new Error(result.error || 'Failed to update RSVP status'));
          }
          // Cleanup
          document.head.removeChild(script);
          delete (window as any)[updateCallback];
        };
        
        // Add parameters for sheet update
        const params = new URLSearchParams({
          callback: updateCallback,
          action: 'updateRSVP',
          name: data.name,
          status: data.attending,
          dietaryRestrictions: data.dietaryRestrictions || '',
          message: data.message || ''
        });
        
        script.src = `${SCRIPT_URL}?${params.toString()}`;
        script.onerror = () => reject(new Error('Failed to update RSVP status'));
        document.head.appendChild(script);
      });

      // Wait for Google Sheet update
      await sheetUpdatePromise;

      // Then send to Formspree
      const response = await fetch("https://formspree.io/f/mvgkpdzr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Thank you for your RSVP!", {
          description: "We've received your response and can't wait to celebrate with you!",
        });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionError('Error submitting RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add handler for Enter key
  const handleNameKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const nameFormData = nameForm.getValues();
      if (nameFormData.name) {
        validateGuestName(nameFormData);
      }
    }
  };

  // Add this effect to clear error message when input is empty
  useEffect(() => {
    const subscription = nameForm.watch((value) => {
      if (!value.name) {
        setErrorMessage("");
      }
    });
    return () => subscription.unsubscribe();
  }, [nameForm]);

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
    <div 
      className={`max-w-xl mx-auto glass-card p-8 rounded-lg shadow-lg transition-transform ${
        shake ? 'animate-shake' : ''
      }`}
    >
      {!isValidGuest ? (
        <Form {...nameForm}>
          <form onSubmit={nameForm.handleSubmit(validateGuestName)} className="space-y-4">
            <FormField
              control={nameForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your first and last name"
                      className="border-wedding-taupe/30 focus:border-wedding-gold focus:ring-wedding-gold/20"
                      onKeyPress={handleNameKeyPress}
                      {...field}
                    />
                  </FormControl>
                  {errorMessage && (
                    <p className="text-red-500 text-sm mt-2 text-center">
                      {errorMessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-wedding-pink hover:bg-wedding-pink/80 text-white border-none"
              disabled={isValidating || !nameForm.getValues().name}
            >
              {isValidating ? (
                "Searching..."
              ) : (
                "Find My Invitation"
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...rsvpForm}>
          <form onSubmit={rsvpForm.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-serif text-wedding-charcoal">
                {validatedName}
              </div>
              <FormField
                control={rsvpForm.control}
                name="attending"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        value={field.value}
                        onValueChange={(value) => {
                          if (value) field.onChange(value);
                        }}
                        className="border border-wedding-taupe/30 rounded-lg"
                      >
                        <ToggleGroupItem 
                          value="yes"
                          className={`px-4 py-2 text-sm transition-colors ${
                            field.value === "yes" 
                              ? "bg-wedding-gold text-white" 
                              : "hover:bg-wedding-gold/10"
                          }`}
                        >
                          Accept
                        </ToggleGroupItem>
                        <ToggleGroupItem 
                          value="no"
                          className={`px-4 py-2 text-sm transition-colors ${
                            field.value === "no" 
                              ? "bg-wedding-charcoal text-white" 
                              : "hover:bg-wedding-charcoal/10"
                          }`}
                        >
                          Decline
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <input type="hidden" {...rsvpForm.register("name")} value={validatedName} />

            {attending === "yes" && (
              <FormField
                control={rsvpForm.control}
                name="dietaryRestrictions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body">Dietary Restrictions (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter any dietary restrictions"
                        className="border-wedding-taupe/30 focus:border-wedding-gold focus:ring-wedding-gold/20 placeholder:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={rsvpForm.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body">Message to the Couple (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your well wishes or any message for Hannah & Rob"
                      className="resize-none border-wedding-taupe/30 focus:border-wedding-gold focus:ring-wedding-gold/20 placeholder:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="relative w-full mt-8">
              <button
                type="submit"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px 24px',
                  backgroundColor: '#D4919B', // wedding-pink color
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 50,
                  transition: 'background-color 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#C17F88'} // darker pink on hover
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D4919B'} // back to original pink
                disabled={isSubmitting}
              >
                <div className="flex items-center justify-center gap-2">
                  {isSubmitting ? "Submitting..." : (
                    <>
                      <span>Submit RSVP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
