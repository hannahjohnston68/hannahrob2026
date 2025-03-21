#!/bin/bash
echo "Cleaning gallery directory..."
rm -rf public/images/gallery/*

echo "Creating gallery directory..."
mkdir -p public/images/gallery

echo "Copying header image..."
cp "/Users/hannahjohnston/Desktop/wedding copy/archeo-wedding13.jpg" public/images/gallery/archeo-wedding13.jpg 2>/dev/null || true

echo "Copying images from wedding folder..."
cp /Users/hannahjohnston/Desktop/wedding/*.{jpg,JPG,jpeg,JPEG} public/images/gallery/ 2>/dev/null || true

echo "Copying timeline photos..."
cp "/Users/hannahjohnston/Desktop/wedding copy/IMG_0265 2.JPG" public/images/gallery/IMG_0265.JPG 2>/dev/null || true
cp "/Users/hannahjohnston/Desktop/wedding copy/IMG_3478.JPG" public/images/gallery/IMG_3478.JPG 2>/dev/null || true
cp "/Users/hannahjohnston/Desktop/wedding copy/IMG_3817.jpg" public/images/gallery/IMG_3817.jpg 2>/dev/null || true
cp "/Users/hannahjohnston/Desktop/wedding copy/IMG_4516.JPG" public/images/gallery/IMG_4516.JPG 2>/dev/null || true

echo "Listing copied files:"
ls public/images/gallery

echo "Current working directory:"
pwd
