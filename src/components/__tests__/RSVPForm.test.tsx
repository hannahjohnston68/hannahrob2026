import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RSVPForm } from '../RSVPForm';
import { submitRSVP } from '../../lib/rsvpService';

// Mock the rsvpService
vi.mock('../../lib/rsvpService', () => ({
  submitRSVP: vi.fn()
}));

describe('RSVPForm', () => {
  it('renders all form fields', () => {
    render(<RSVPForm />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/attending/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dietary restrictions/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/song request/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<RSVPForm />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(submitRSVP).not.toHaveBeenCalled();
    });
  });

  it('validates email format', async () => {
    render(<RSVPForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    render(<RSVPForm />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/attending/i), { target: { value: 'Yes' } });
    fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/dietary restrictions/i), { target: { value: 'None' } });
    fireEvent.change(screen.getByLabelText(/song request/i), { target: { value: 'Test Song' } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitRSVP).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        attending: 'Yes',
        numberOfGuests: '2',
        dietaryRestrictions: 'None',
        songRequest: 'Test Song'
      });
      expect(screen.getByText(/rsvp submitted successfully/i)).toBeInTheDocument();
    });
  });
}); 