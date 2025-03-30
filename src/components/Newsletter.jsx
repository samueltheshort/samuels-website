// components/Newsletter.jsx
import React, { useEffect, useState } from 'react';

export function Newsletter() {
  // Track when component has mounted to avoid hydration issues
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Set mounted state to true after component mounts
    setMounted(true);
    
    // Make sure the MailerLite script is loaded
    if (window.ml) {
      // Try to show the form
      try {
        window.ml('show', {
          selector: '.ml-subscribe-form',
          form: 'aV9OD0'
        });
      } catch (e) {
        console.error('Error initializing MailerLite form:', e);
      }
    }
  }, []);

  return (
    <div className="p-6 my-8 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
      <h3 className="text-xl font-semibold mb-2 text-stone-800 dark:text-stone-100">Stay Updated</h3>
      <p className="mb-4 text-stone-600 dark:text-stone-400">Subscribe to our newsletter for the latest updates and offers.</p>
      
      {/* This is the official MailerLite placeholder that their script will replace */}
      {mounted && <div className="ml-subscribe-form" data-form="aV9OD0"></div>}
      
      {/* Fallback if MailerLite script fails to load */}
      {mounted && (
        <div id="fallback-form" style={{display: 'none'}}>
          <form 
            action="https://app.mailerlite.com/webforms/submit/aV9OD0" 
            method="post"
            target="_blank"
            className="flex flex-col space-y-3"
          >
            <input
              type="text"
              name="fields[name]"
              placeholder="Your name"
              required
              className="p-2 border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100"
            />
            <input
              type="email"
              name="fields[email]"
              placeholder="Your email address"
              required
              className="p-2 border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100"
            />
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
            >
              Subscribe
            </button>
          </form>
        </div>
      )}
    </div>
  );
}