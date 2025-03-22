import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw76T6fPJ0HYO4UIPWDpAAQ5XpxVzgRti8uNO5OagZVqdv0A5ahYEWo1MNPGzbCtHEE/exec';

interface GroupMember {
  name: string;
  attending: string;
  dietary: string;
  groupKey: string;
}

export function RSVPForm() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [dietary, setDietary] = useState('');
  const [verifiedName, setVerifiedName] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRSVPForm, setShowRSVPForm] = useState(false);
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [isGroupRSVP, setIsGroupRSVP] = useState(false);
  const [memberResponses, setMemberResponses] = useState<Record<string, string>>({});
  const [groupDietary, setGroupDietary] = useState('');

  const checkName = async () => {
    if (!name.trim()) {
      setMessage('Please enter your name');
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(`${SCRIPT_URL}?name=${encodeURIComponent(name.trim())}`);
      const data = await response.json();
      console.log('Name verification response:', data); // Debug log

      if (data.isValid) {
        setVerifiedName(name.trim());
        
        // Check if this is a group member
        if (data.groupMembers) {
          console.log('Group members data:', data.groupMembers); // Debug log
          setGroupMembers(data.groupMembers);
          setIsGroupRSVP(true);
          setShowRSVPForm(true);
          // Initialize member responses to 'yes'
          const initialResponses: Record<string, string> = {};
          data.groupMembers.forEach((m: GroupMember) => {
            initialResponses[m.name] = 'yes';
          });
          console.log('Initial responses:', initialResponses); // Debug log
          setMemberResponses(initialResponses);
        } else {
          setShowRSVPForm(true);
        }
      } else if (name.toLowerCase().trim() === 'nicolas peralta baron'.toLowerCase()) {
        setMessage('Sorry this is wedding is a COWORKER FREE ZONE');
        setIsError(true);
        setShowRSVPForm(false);
        return; // Add return to prevent further execution
      } else {
        setMessage(data.message);
        setIsError(true);
      }
    } catch (error) {
      console.error('Name verification error:', error); // Debug log
      setMessage('Error verifying name. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const setMemberResponse = (memberName: string, response: string) => {
    setMemberResponses(prev => ({
      ...prev,
      [memberName]: response
    }));
  };

  const submitRSVP = async () => {
    if (!verifiedName) {
      setMessage('Please verify your name first');
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setIsError(false);

    try {
      if (isGroupRSVP) {
        // Submit group RSVP - send each member as a separate entry
        const rsvpEntries = groupMembers.map(member => ({
          name: member.name,
          attending: memberResponses[member.name],
          dietary: groupDietary.trim() || 'None'
        }));

        console.log('RSVP Entries:', rsvpEntries); // Debug log

        // Send each member's RSVP separately
        for (const entry of rsvpEntries) {
          const params = new URLSearchParams({
            action: 'submitRSVP',
            name: entry.name,
            attending: entry.attending,
            dietary: entry.dietary,
            groupKey: groupMembers[0].groupKey // Include group key for each submission
          });

          const url = `${SCRIPT_URL}?${params.toString()}`;
          console.log('Request URL:', url); // Debug log

          const response = await fetch(url);
          const text = await response.text();
          console.log('Response text:', text); // Debug log

          try {
            const data = JSON.parse(text);
            if (!data.success) {
              throw new Error(data.message || 'Error submitting RSVP');
            }
          } catch (e) {
            console.error('Error submitting RSVP for:', entry.name, e);
            throw e;
          }
        }

        // If we get here, all RSVPs were successful
        const hasAnyAttending = Object.values(memberResponses).some(response => response === 'yes');
        setMessage(hasAnyAttending 
          ? "We're so excited that you'll be celebrating with us! It means the world to have you there on our special day. See you soon!"
          : "We'll miss you, but we understand! Thank you for letting us know. Sending love, and we hope to celebrate with you another time!"
        );
      } else {
        // Submit individual RSVP
        const params = new URLSearchParams({
          action: 'submitRSVP',
          name: verifiedName,
          attending,
          dietary: dietary.trim() || 'None'
        });

        const response = await fetch(`${SCRIPT_URL}?${params.toString()}`);
        const text = await response.text();
        console.log('Response text:', text); // Debug log

        try {
          const data = JSON.parse(text);
          if (data.success) {
            setMessage(attending === 'yes'
              ? "We're so excited that you'll be celebrating with us! It means the world to have you there on our special day. See you soon!"
              : "We'll miss you, but we understand! Thank you for letting us know. Sending love, and we hope to celebrate with you another time!"
            );
          } else {
            setMessage(data.message || 'Error submitting RSVP');
            setIsError(true);
          }
        } catch (e) {
          // If response is not JSON, check for error text
          if (text.toLowerCase().includes('error')) {
            setMessage(text || 'Error submitting RSVP');
            setIsError(true);
          } else {
            setMessage(attending === 'yes'
              ? "We're so excited that you'll be celebrating with us! It means the world to have you there on our special day. See you soon!"
              : "We'll miss you, but we understand! Thank you for letting us know. Sending love, and we hope to celebrate with you another time!"
            );
          }
        }
      }
    } catch (error) {
      console.error('Submission error:', error); // Debug log
      setMessage('Error submitting RSVP. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a function to handle form reset
  const resetForm = () => {
    setShowRSVPForm(false);
    setName('');
    setMessage('');
    setIsError(false);
    setVerifiedName('');
    setAttending('yes');
    setDietary('');
    setGroupDietary('');
    setGroupMembers([]);
    setIsGroupRSVP(false);
    setMemberResponses({});
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        {message && message.includes('COWORKER FREE ZONE') ? (
          <div className="text-center space-y-4">
            <p className="font-playfair text-2xl font-bold text-red-600 animate-bounce">
              {message}
            </p>
            <Button 
              onClick={resetForm}
              className="w-full bg-wedding-pink hover:bg-wedding-pink/90 font-body"
            >
              Start Over
            </Button>
          </div>
        ) : !showRSVPForm ? (
          <div className="space-y-4">
            <Input
              id="guestName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your first and last name"
              className="focus:border-wedding-pink focus:ring-wedding-pink font-body"
            />
            <Button 
              onClick={checkName} 
              disabled={isLoading}
              className="w-full bg-wedding-pink hover:bg-wedding-pink/90 font-body"
            >
              {isLoading ? 'Verifying...' : 'Find My Invitation'}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {message ? (
              <div className="text-center space-y-4">
                <p className={`font-playfair text-lg ${message.includes('COWORKER FREE ZONE') 
                  ? 'text-red-600 text-2xl font-bold animate-bounce' 
                  : 'text-gray-800'}`}>
                  {message}
                </p>
                <Button 
                  onClick={resetForm}
                  className="w-full bg-wedding-pink hover:bg-wedding-pink/90 font-body"
                >
                  Start Over
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <h2 className="font-playfair text-2xl text-gray-800 mb-2">Welcome!</h2>
                  <p className="font-playfair text-lg text-gray-600 italic">
                    Please proceed with your {isGroupRSVP && groupMembers.length > 1 ? 'group ' : ''}RSVP
                  </p>
                </div>
                {isGroupRSVP ? (
                  <div className="space-y-4">
                    {groupMembers.length > 1 ? (
                      <div className="space-y-4">
                        {groupMembers.map((member) => (
                          <div key={member.name} className="flex items-center justify-between space-x-4">
                            <Label htmlFor={`toggle-${member.name}`} className="text-sm font-body">
                              {member.name}
                            </Label>
                            <div className="flex items-center space-x-2">
                              <Label htmlFor={`toggle-${member.name}`} className="text-sm font-body">
                                {memberResponses[member.name] === 'yes' ? 'Attending' : 'Not Attending'}
                              </Label>
                              <Switch
                                id={`toggle-${member.name}`}
                                checked={memberResponses[member.name] === 'yes'}
                                onCheckedChange={(checked) => 
                                  setMemberResponse(member.name, checked ? 'yes' : 'no')
                                }
                                className="data-[state=checked]:bg-wedding-pink"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between space-x-4">
                          <Label htmlFor={`toggle-${groupMembers[0].name}`} className="text-sm font-body">
                            {groupMembers[0].name}
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor={`toggle-${groupMembers[0].name}`} className="text-sm font-body">
                              {memberResponses[groupMembers[0].name] === 'yes' ? 'Attending' : 'Not Attending'}
                            </Label>
                            <Switch
                              id={`toggle-${groupMembers[0].name}`}
                              checked={memberResponses[groupMembers[0].name] === 'yes'}
                              onCheckedChange={(checked) => 
                                setMemberResponse(groupMembers[0].name, checked ? 'yes' : 'no')
                              }
                              className="data-[state=checked]:bg-wedding-pink"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label htmlFor="groupDietary" className="text-sm font-medium font-body">
                        Any Dietary Requirements (Optional):
                      </label>
                      <Input
                        id="groupDietary"
                        value={groupDietary}
                        onChange={(e) => setGroupDietary(e.target.value)}
                        placeholder="Enter any dietary requirements"
                        className="focus:border-wedding-pink focus:ring-wedding-pink font-body"
                      />
                    </div>

                    <Button 
                      onClick={submitRSVP} 
                      disabled={isLoading}
                      className="w-full bg-wedding-pink hover:bg-wedding-pink/90 font-body"
                    >
                      {isLoading ? 'Submitting...' : groupMembers.length > 1 ? 'Submit Group RSVP' : 'Submit RSVP'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium font-body">
                        Will you be attending?
                      </label>
                      <div className="flex items-center justify-between space-x-4">
                        <Label htmlFor="attending-toggle" className="text-sm font-body">
                          {attending === 'yes' ? 'Attending' : 'Not Attending'}
                        </Label>
                        <Switch
                          id="attending-toggle"
                          checked={attending === 'yes'}
                          onCheckedChange={(checked) => setAttending(checked ? 'yes' : 'no')}
                          className="data-[state=checked]:bg-wedding-pink"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="dietary" className="text-sm font-medium font-body">
                        Dietary Requirements (Optional):
                      </label>
                      <Input
                        id="dietary"
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        placeholder="Enter any dietary requirements"
                        className="focus:border-wedding-pink focus:ring-wedding-pink font-body"
                      />
                    </div>

                    <Button 
                      onClick={submitRSVP} 
                      disabled={isLoading || !attending}
                      className="w-full bg-wedding-pink hover:bg-wedding-pink/90 font-body"
                    >
                      {isLoading ? 'Submitting...' : 'Submit RSVP'}
                    </Button>
                  </div>
                )}

                {message && (
                  <Alert className={`mt-4 ${isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'} font-body`}>
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
