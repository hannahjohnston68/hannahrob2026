import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import RSVPPage from '../../pages/RSVP';
import { submitRSVP } from '../../lib/rsvpService';
import { renderWithRouter, mockRSVPData, fillRSVPForm } from '../helpers';

// Mock Firebase
vi.mock('../../lib/firebase', () => ({
  db: {
    collection: vi.fn(),
  },
}));

vi.mock('../../lib/rsvpService', () => ({
  submitRSVP: vi.fn(),
}));

describe('RSVP Flow Integration', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('completes full RSVP flow successfully', async () => {
    // Render the RSVP page with router context
    renderWithRouter(<RSVPPage />);

    // Fill out the form
    await fillRSVPForm(screen);

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    // Verify form submission
    await waitFor(() => {
      expect(submitRSVP).toHaveBeenCalledWith(mockRSVPData);
    });

    // Verify success message
    expect(screen.getByText(/rsvp submitted successfully/i)).toBeInTheDocument();

    // Wait for the responses to load
    await waitFor(() => {
      expect(screen.getByText(mockRSVPData.name)).toBeInTheDocument();
      expect(screen.getByText(mockRSVPData.email)).toBeInTheDocument();
      expect(screen.getByText(mockRSVPData.attending)).toBeInTheDocument();
    });
  });

  it('handles form validation errors', async () => {
    renderWithRouter(<RSVPPage />);

    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    // Verify validation messages
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });

    // Verify no submission was made
    expect(submitRSVP).not.toHaveBeenCalled();
  });

  it('handles submission errors gracefully', async () => {
    // Mock submission error
    vi.mocked(submitRSVP).mockRejectedValueOnce(new Error('Submission failed'));

    renderWithRouter(<RSVPPage />);

    // Fill out the form
    await fillRSVPForm(screen);

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    // Verify error message
    await waitFor(() => {
      expect(screen.getByText(/failed to submit rsvp/i)).toBeInTheDocument();
    });
  });

  it('displays loading state during submission', async () => {
    // Mock delayed submission
    vi.mocked(submitRSVP).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    renderWithRouter(<RSVPPage />);

    // Fill out the form
    await fillRSVPForm(screen);

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    // Verify loading state
    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/submitting/i)).toBeInTheDocument();

    // Wait for submission to complete
    await waitFor(() => {
      expect(screen.getByText(/rsvp submitted successfully/i)).toBeInTheDocument();
    });
  });
}); 