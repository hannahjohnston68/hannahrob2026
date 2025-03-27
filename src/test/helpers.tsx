import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

export const renderWithRouter = (ui: ReactElement) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

export const mockRSVPData = {
  name: 'John Doe',
  email: 'john@example.com',
  attending: 'Yes',
  numberOfGuests: '2',
  dietaryRestrictions: 'None',
  songRequest: 'Test Song'
};

export const fillRSVPForm = async (screen: any) => {
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: mockRSVPData.name } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: mockRSVPData.email } });
  fireEvent.change(screen.getByLabelText(/attending/i), { target: { value: mockRSVPData.attending } });
  fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: mockRSVPData.numberOfGuests } });
  fireEvent.change(screen.getByLabelText(/dietary restrictions/i), { target: { value: mockRSVPData.dietaryRestrictions } });
  fireEvent.change(screen.getByLabelText(/song request/i), { target: { value: mockRSVPData.songRequest } });
}; 