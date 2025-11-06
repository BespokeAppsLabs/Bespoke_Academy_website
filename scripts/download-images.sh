#!/bin/bash

# Image Download Script for Bespoke Academy
# Downloads professional AI/tech education images from Unsplash
# Uses direct Unsplash photo URLs for reliable downloads

echo "Starting image downloads from Unsplash..."
echo ""

# Create directories if they don't exist
mkdir -p public/images/phases
mkdir -p public/images/hero
mkdir -p public/images/testimonials

# Function to download image
download_image() {
    local url=$1
    local output=$2
    local description=$3
    
    echo "Downloading: $description"
    echo "  URL: $url"
    echo "  Output: $output"
    
    if curl -L -f -o "$output" "$url" 2>/dev/null; then
        echo "  ✓ Successfully downloaded"
        echo ""
        return 0
    else
        echo "  ✗ Failed to download"
        echo ""
        return 1
    fi
}

# AI/Tech Education Images - Using specific Unsplash photo IDs
# Format: https://images.unsplash.com/photo-[ID]?w=[width]&h=[height]&fit=crop

# Hero image - Modern AI/tech workspace
download_image \
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop&q=85" \
    "public/images/hero/ai-education-hero.jpg" \
    "Hero - AI Education"

# Phase images for programs
download_image \
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=900&fit=crop&q=85" \
    "public/images/phases/ai-fundamentals.jpg" \
    "AI Fundamentals"

download_image \
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop&q=85" \
    "public/images/phases/advanced-tools.jpg" \
    "Advanced Tools"

download_image \
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&h=900&fit=crop&q=85" \
    "public/images/phases/specialized-apps.jpg" \
    "Specialized Applications"

download_image \
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop&q=85" \
    "public/images/phases/capstone-portfolio.jpg" \
    "Capstone Portfolio"

# Testimonial images - Diverse professionals
download_image \
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&q=85" \
    "public/images/testimonials/success-student-1.jpg" \
    "Testimonial - Success Story 1"

download_image \
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop&q=85" \
    "public/images/testimonials/success-student-2.jpg" \
    "Testimonial - Success Story 2"

echo "✓ Image download process completed!"
echo ""
echo "Downloaded images:"
ls -lh public/images/phases/*.jpg 2>/dev/null
ls -lh public/images/hero/*.jpg 2>/dev/null
ls -lh public/images/testimonials/*.jpg 2>/dev/null


