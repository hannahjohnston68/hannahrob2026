import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GalleryGrid } from '../GalleryGrid';

// Mock the images data
const mockImages = [
  {
    src: '/images/gallery/IMG_6624.JPG',
    alt: 'Test Image 1'
  },
  {
    src: '/images/gallery/IMG_6753.JPG',
    alt: 'Test Image 2'
  }
];

describe('GalleryGrid', () => {
  it('renders all images', () => {
    render(<GalleryGrid images={mockImages} />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockImages.length);
    
    mockImages.forEach((image, index) => {
      expect(images[index]).toHaveAttribute('src', image.src);
      expect(images[index]).toHaveAttribute('alt', image.alt);
    });
  });

  it('opens lightbox when clicking an image', () => {
    render(<GalleryGrid images={mockImages} />);
    
    const firstImage = screen.getAllByRole('img')[0];
    fireEvent.click(firstImage);

    // Check if lightbox is opened
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: mockImages[0].alt })).toBeInTheDocument();
  });

  it('navigates between images in lightbox', () => {
    render(<GalleryGrid images={mockImages} />);
    
    // Open lightbox
    const firstImage = screen.getAllByRole('img')[0];
    fireEvent.click(firstImage);

    // Check initial image
    expect(screen.getByRole('img', { name: mockImages[0].alt })).toBeInTheDocument();

    // Click next
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    // Check if second image is shown
    expect(screen.getByRole('img', { name: mockImages[1].alt })).toBeInTheDocument();

    // Click previous
    const prevButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(prevButton);

    // Check if first image is shown again
    expect(screen.getByRole('img', { name: mockImages[0].alt })).toBeInTheDocument();
  });

  it('closes lightbox when clicking close button', () => {
    render(<GalleryGrid images={mockImages} />);
    
    // Open lightbox
    const firstImage = screen.getAllByRole('img')[0];
    fireEvent.click(firstImage);

    // Check if lightbox is opened
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Click close button
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Check if lightbox is closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
}); 