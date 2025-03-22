import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
      console.log('Name verification response:', data);

      if (data.isValid) {
        setVerifiedName(name.trim());
        
        if (data.groupMembers) {
          console.log('Group members data:', data.groupMembers);
          setGroupMembers(data.groupMembers);
          setIsGroupRSVP(true);
          setShowRSVPForm(true);
          const initialResponses: Record<string, string> = {};
          data.groupMembers.forEach((m: GroupMember) => {
            initialResponses[m.name] = 'yes';
          });
          console.log('Initial responses:', initialResponses);
          setMemberResponses(initialResponses);
        } else {
          setShowRSVPForm(true);
        }
      } else if (name.toLowerCase().trim() === 'nicolas peralta baron'.toLowerCase()) {
        setMessage('Sorry this is wedding is a COWORKER FREE ZONE');
        setIsError(true);
        setShowRSVPForm(false);
        return;
      } else {
        setMessage(data.message);
        setIsError(true);
      }
    } catch (error) {
      console.error('Name verification error:', error);
      setMessage('Error verifying name. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
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
        const rsvpEntries = groupMembers.map(member => ({
          name: member.name,
          attending: memberResponses[member.name],
          dietary: dietary.trim() || 'None'
        }));

        console.log('RSVP Entries:', rsvpEntries);

        for (const entry of rsvpEntries) {
          const params = new URLSearchParams({
            action: 'submitRSVP',
            name: entry.name,
            attending: entry.attending,
            dietary: entry.dietary,
            groupKey: groupMembers[0].groupKey
          });

          const url = `${SCRIPT_URL}?${params.toString()}`;
          console.log('Request URL:', url);

          const response = await fetch(url);
          const text = await response.text();
          console.log('Response text:', text);

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

        const hasAnyAttending = Object.values(memberResponses).some(response => response === 'yes');
        setMessage(hasAnyAttending 
          ? "We're so excited that you'll be celebrating with us! It means the world to have you there on our special day. See you soon!"
          : "We'll miss you, but we understand! Thank you for letting us know. Sending love, and we hope to celebrate with you another time!"
        );
      } else {
        const params = new URLSearchParams({
          action: 'submitRSVP',
          name: verifiedName,
          attending,
          dietary: dietary.trim() || 'None'
        });

        const response = await fetch(`${SCRIPT_URL}?${params.toString()}`);
        const text = await response.text();
        console.log('Response text:', text);

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
      console.error('Submission error:', error);
      setMessage('Error submitting RSVP. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setShowRSVPForm(false);
    setName('');
    setMessage('');
    setIsError(false);
    setVerifiedName('');
    setAttending('yes');
    setDietary('');
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
            {isGroupRSVP ? (
              <div className="space-y-4">
                <div className="space-y-4">
                  {groupMembers.map((member) => (
                    <div key={member.name} className="flex items-center justify-between space-x-4">
                      <Label className="font-body">{member.name}</Label>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-body text-gray-500">
                          {memberResponses[member.name] === 'yes' ? 'Attending' : 'Not Attending'}
                        </span>
                        <Switch
                          checked={memberResponses[member.name] === 'yes'}
                          onCheckedChange={(checked) => {
                            setMemberResponses(prev => ({
                              ...prev,
                              [member.name]: checked ? 'yes' : 'no'
                            }));
                          }}
                          className="data-[state=checked]:bg-wedding-pink"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dietary" className="font-body">Dietary Requirements</Label>
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
                  disabled={isLoading}
                  className="w-full bg-wedding-pink hover:bg-wedding-pink/90 font-body"
                >
                  {isLoading ? 'Submitting...' : 'Submit Group RSVP'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-4">
                  <Label className="font-body">Will you be attending?</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-body text-gray-500">
                      {attending === 'yes' ? 'Attending' : 'Not Attending'}
                    </span>
                    <Switch
                      checked={attending === 'yes'}
                      onCheckedChange={(checked) => setAttending(checked ? 'yes' : 'no')}
                      className="data-[state=checked]:bg-wedding-pink"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dietary" className="font-body">Dietary Requirements</Label>
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
                  disabled={isLoading}
                  className="w-full bg-wedding-pink hover:bg-wedding-pink/90 font-body"
                >
                  {isLoading ? 'Submitting...' : 'Submit RSVP'}
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
