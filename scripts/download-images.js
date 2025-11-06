/**
 * Image Download Script for Bespoke Academy
 * Downloads professional AI/tech education images from Unsplash
 * 
 * Usage: node scripts/download-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Unsplash API - Using Source API (no auth needed for basic downloads)
const UNSPLASH_BASE = 'https://source.unsplash.com';

// Image specifications matching our GenZ-professional AI education theme
const imagesToDownload = [
  {
    url: `${UNSPLASH_BASE}/1600x900/?artificial-intelligence,technology`,
    filename: 'phases/ai-fundamentals.jpg',
    description: 'AI fundamentals - modern tech education'
  },
  {
    url: `${UNSPLASH_BASE}/1600x900/?ai-tools,automation`,
    filename: 'phases/advanced-tools.jpg',
    description: 'Advanced AI tools and automation'
  },
  {
    url: `${UNSPLASH_BASE}/1600x900/?ai-applications,industry`,
    filename: 'phases/specialized-apps.jpg',
    description: 'Specialized AI applications'
  },
  {
    url: `${UNSPLASH_BASE}/1600x900/?portfolio,projects`,
    filename: 'phases/capstone-portfolio.jpg',
    description: 'Capstone projects and portfolio'
  },
  {
    url: `${UNSPLASH_BASE}/1600x900/?tech-education,learning`,
    filename: 'hero/tech-education-hero.jpg',
    description: 'Hero image - tech education'
  },
  {
    url: `${UNSPLASH_BASE}/800x800/?young-professional,tech-career`,
    filename: 'testimonials/success-student-1.jpg',
    description: 'Successful student testimonial'
  },
  {
    url: `${UNSPLASH_BASE}/800x800/?tech-professional,career`,
    filename: 'testimonials/success-student-2.jpg',
    description: 'Tech professional testimonial'
  }
];

// Better approach: Use specific Unsplash photo IDs for consistent, professional images
const professionalImages = [
  {
    photoId: 'Q1p7bh3SHj8', // AI/tech professional
    filename: 'hero/ai-education-hero.jpg',
    width: 1920,
    height: 1080
  },
  {
    photoId: 'U3sMwViOR_s', // Modern learning space
    filename: 'phases/ai-fundamentals.jpg',
    width: 1600,
    height: 900
  },
  {
    photoId: 'K4mSJ7kc0As', // Technology and coding
    filename: 'phases/advanced-tools.jpg',
    width: 1600,
    height: 900
  },
  {
    photoId: 'x_8dJ7u9vP8', // AI and machine learning
    filename: 'phases/specialized-apps.jpg',
    width: 1600,
    height: 900
  },
  {
    photoId: 'c9F57YeIkBM', // Portfolio and projects
    filename: 'phases/capstone-portfolio.jpg',
    width: 1600,
    height: 900
  },
  {
    photoId: 'WXJ33HOrzvE', // Young professional
    filename: 'testimonials/success-student-1.jpg',
    width: 800,
    height: 800
  },
  {
    photoId: 'd2MSDujJl2g', // Diverse professional
    filename: 'testimonials/success-student-2.jpg',
    width: 800,
    height: 800
  }
];

function downloadImage(photoId, filename, width, height) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(process.cwd(), 'public', 'images', filename);
    const dir = path.dirname(filePath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Use Unsplash Source API with specific photo ID
    const url = `https://source.unsplash.com/${photoId}/${width}x${height}`;
    
    console.log(`Downloading: ${filename} from ${url}`);
    
    https.get(url, { maxRedirects: 5 }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        return downloadImage(photoId, filename, width, height);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✓ Downloaded: ${filename}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  console.log('Starting image downloads from Unsplash...\n');
  
  for (const image of professionalImages) {
    try {
      await downloadImage(image.photoId, image.filename, image.width, image.height);
      // Add delay to be respectful to Unsplash API
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error.message);
    }
  }
  
  console.log('\n✓ Image download process completed!');
}

// Run if called directly
if (require.main === module) {
  downloadAllImages().catch(console.error);
}

module.exports = { downloadAllImages };


