// components/Newsletter.jsx
import React from 'react';

export function Newsletter() {
  return (
    <div className="p-6 my-8 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
      <h3 className="text-xl font-semibold mb-2 text-stone-800 dark:text-stone-100">Stay Updated</h3>
      <p className="mb-4 text-stone-600 dark:text-stone-400">Subscribe to our newsletter for the latest updates and offers.</p>
      
      {/* Simple form that posts directly to MailerLite */}
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
        
        {/* Add this hidden input for additional security */}
        <input type="hidden" name="ml-submit" value="1" />
        
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}