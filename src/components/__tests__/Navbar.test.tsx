import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../Navbar';

describe('Navbar', () => {
  it('renders all navigation links', () => {
    render(<Navbar />);
    
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/gallery/i)).toBeInTheDocument();
    expect(screen.getByText(/rsvp/i)).toBeInTheDocument();
  });

  it('toggles mobile menu when clicking menu button', () => {
    render(<Navbar />);
    
    // Menu should be closed initially
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Open menu
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);

    // Menu should be open
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Close menu
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Menu should be closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders logo with correct link', () => {
    render(<Navbar />);
    
    const logoLink = screen.getByRole('link', { name: /hannah & rob/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders navigation links with correct hrefs', () => {
    render(<Navbar />);
    
    const links = screen.getAllByRole('link');
    
    // Check each link's href
    expect(links[0]).toHaveAttribute('href', '/'); // Logo
    expect(links[1]).toHaveAttribute('href', '/');
    expect(links[2]).toHaveAttribute('href', '/gallery');
    expect(links[3]).toHaveAttribute('href', '/rsvp');
  });
}); 