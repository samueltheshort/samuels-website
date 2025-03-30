// components/Newsletter.jsx
import React, { useState, useRef, useEffect } from 'react';

export function Newsletter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const formRef = useRef(null);
  
  // Completely custom form that doesn't use MailerLite's HTML
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    
    if (status === 'submitting') return; // Prevent double submissions
    
    setStatus('submitting');
    
    const formData = new FormData();
    formData.append('fields[name]', name);
    formData.append('fields[email]', email);
    formData.append('ml-submit', '1');
    formData.append('anticsrf', 'true');
    
    try {
      // Use fetch API to submit the form data
      const response = await fetch(
        'https://assets.mailerlite.com/jsonp/1402781/forms/149595039718180275/subscribe',
        {
          method: 'POST',
          body: formData,
          // Important: set mode to 'cors' to allow handling the response
          mode: 'cors',
        }
      );
      
      setStatus('success');
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };
  
  return (
    <div className="p-6 my-8 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
      {status === 'success' ? (
        <div className="text-center">
          <h4 className="text-xl font-semibold mb-2 text-stone-800 dark:text-stone-100">Thank you!</h4>
          <p className="text-stone-600 dark:text-stone-400">You have successfully signed up.</p>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2 text-stone-800 dark:text-stone-100">Newsletter</h3>
          <p className="mb-4 text-stone-600 dark:text-stone-400">Subscribe to my newsletter for the latest updates.</p>
          
          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="flex flex-col space-y-3"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="p-2 border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="p-2 border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white p-2 rounded"
            >
              {status === 'submitting' ? 'Subscribing...' : 'Subscribed'}
            </button>
            
            {status === 'error' && (
              <p className="text-red-500 text-sm">
                There was an error. Please try again later.
              </p>
            )}
          </form>
        </>
      )}
    </div>
  );
}