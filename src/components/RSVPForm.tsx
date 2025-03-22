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
        setMessage(data.message);
        
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
        setMessage('Thank you for your group RSVP!');
        setShowRSVPForm(false);
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
            setMessage('Thank you for your RSVP!');
            setShowRSVPForm(false);
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
            setMessage('Thank you for your RSVP!');
            setShowRSVPForm(false);
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

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Wedding RSVP</CardTitle>
      </CardHeader>
      <CardContent>
        {!showRSVPForm ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="guestName" className="text-sm font-medium">
                Please enter your name as it appears on your invitation:
              </label>
              <Input
                id="guestName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <Button 
              onClick={checkName} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Verifying...' : 'Verify Name'}
            </Button>
          </div>
        ) : isGroupRSVP ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                RSVP for group members:
              </label>
              <div className="space-y-4">
                {groupMembers.map((member) => (
                  <div key={member.name} className="flex items-center justify-between space-x-4">
                    <Label htmlFor={`toggle-${member.name}`} className="text-sm">
                      {member.name}
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`toggle-${member.name}`} className="text-sm">
                        {memberResponses[member.name] === 'yes' ? 'Attending' : 'Not Attending'}
                      </Label>
                      <Switch
                        id={`toggle-${member.name}`}
                        checked={memberResponses[member.name] === 'yes'}
                        onCheckedChange={(checked) => 
                          setMemberResponse(member.name, checked ? 'yes' : 'no')
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="groupDietary" className="text-sm font-medium">
                Any Dietary Requirements (Optional):
              </label>
              <Input
                id="groupDietary"
                value={groupDietary}
                onChange={(e) => setGroupDietary(e.target.value)}
                placeholder="Enter any dietary requirements"
              />
            </div>

            <Button 
              onClick={submitRSVP} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Submitting...' : 'Submit Group RSVP'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Will you be attending?
              </label>
              <div className="flex items-center justify-between space-x-4">
                <Label htmlFor="attending-toggle" className="text-sm">
                  {attending === 'yes' ? 'Attending' : 'Not Attending'}
                </Label>
                <Switch
                  id="attending-toggle"
                  checked={attending === 'yes'}
                  onCheckedChange={(checked) => setAttending(checked ? 'yes' : 'no')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="dietary" className="text-sm font-medium">
                Dietary Requirements (Optional):
              </label>
              <Input
                id="dietary"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                placeholder="Enter any dietary requirements"
              />
            </div>

            <Button 
              onClick={submitRSVP} 
              disabled={isLoading || !attending}
              className="w-full"
            >
              {isLoading ? 'Submitting...' : 'Submit RSVP'}
            </Button>
          </div>
        )}

        {message && (
          <Alert className={`mt-4 ${isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
