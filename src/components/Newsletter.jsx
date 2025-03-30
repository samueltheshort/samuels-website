// components/Newsletter.jsx
import React, { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Submit to MailerLite's API
      const formData = new FormData(e.target);
      
      // For local testing, log what would be submitted
      console.log('Form submission data:', {
        email: formData.get('fields[email]'),
        name: formData.get('fields[name]')
      });
      
      const response = await fetch('https://app.mailerlite.com/webforms/submit/aV9OD0', {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Important for cross-origin requests
      });
      
      // Clear the form and show success message
      setEmail('');
      setName('');
      setStatus('success');
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };
  
  return (
    <div className="p-6 my-8 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
      <h3 className="text-xl font-semibold mb-2 text-stone-800 dark:text-stone-100">Stay Updated</h3>
      <p className="mb-4 text-stone-600 dark:text-stone-400">Subscribe to my newsletter for the latest updates.</p>
      
      {status === 'success' ? (
        <p className="text-green-600 dark:text-green-400 font-medium">
          Thank you for subscribing! Check your email for confirmation.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="text"
            name="fields[name]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="p-2 border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100"
          />
          <input
            type="email"
            name="fields[email]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="p-2 border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white p-2 rounded"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          
          {status === 'error' && (
            <p className="text-red-600 dark:text-red-400 text-sm">
              There was an error. Please try again later.
            </p>
          )}
        </form>
      )}
    </div>
  );
}