// pages/api/webhooks.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Log incoming webhook data
        console.log('Webhook data received:', req.body);
  
        // Process the data (e.g., fetch images or update state)
        // For example, you could call a function to fetch images from Strapi again
        const images = await fetchImages();  // Your function to fetch images
  
        // Send a response back to Strapi (optional)
        res.status(200).json({ message: 'Webhook received and processed' });
      } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ message: 'Error processing webhook' });
      }
    } else {
      // If it's not a POST request
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  