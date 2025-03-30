// components/Newsletter.jsx
import React, { useEffect, useState } from 'react';

export function Newsletter() {
  const [isClient, setIsClient] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle form submission via JavaScript
  const handleFormSubmit = (e) => {
    // For client-side only
    if (!isClient) return;
    
    // Get the form element from the DOM after it's rendered
    const form = document.querySelector('#newsletter-form');
    if (!form) return;
    
    // Add an event listener for form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      setFormStatus('submitting');
      
      // Create a FormData object from the form
      const formData = new FormData(form);
      
      // Submit the form data via fetch
      fetch('https://assets.mailerlite.com/jsonp/1402781/forms/149595039718180275/subscribe', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setFormStatus('success');
          // Show MailerLite success message
          const successElement = document.querySelector('.ml-form-successBody');
          const formElement = document.querySelector('.ml-form-embedBodyDefault');
          if (successElement && formElement) {
            successElement.style.display = 'block';
            formElement.style.display = 'none';
          }
        } else {
          setFormStatus('error');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setFormStatus('error');
      });
    });
    
    // Cleanup
    return () => {
      if (form) {
        form.removeEventListener('submit', handleFormSubmit);
      }
    };
  };

  useEffect(handleFormSubmit, [isClient]);

  if (!isClient) {
    // Return a placeholder with similar styling to avoid hydration issues
    return (
      <div className="p-6 my-8 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
        <h3 className="text-xl font-semibold mb-2 text-stone-800 dark:text-stone-100">Stay Updated</h3>
        <p className="mb-4 text-stone-600 dark:text-stone-400">Subscribe to our newsletter for the latest updates and offers.</p>
        <div className="h-20"></div>
      </div>
    );
  }

  return (
    <div className="p-6 my-8 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
      <div 
        dangerouslySetInnerHTML={{ 
          __html: `
            <div id="mlb2-23978422" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-23978422">
              <div class="ml-form-align-center">
                <div class="ml-form-embedWrapper embedForm">
                  <div class="ml-form-embedBody ml-form-embedBodyDefault row-form">
                    <div class="ml-form-embedContent">
                      <h4 style="color: var(--tw-prose-headings, #1a1a1a); font-size: 1.25rem; margin-bottom: 0.5rem; font-weight: 600;" class="dark:text-stone-100">Newsletter</h4>
                      <p style="color: var(--tw-prose-body, #374151); margin-bottom: 1rem;" class="dark:text-stone-400">Subscribe to our newsletter for the latest updates and offers.</p>
                    </div>
                    <form id="newsletter-form" class="ml-block-form" action="https://assets.mailerlite.com/jsonp/1402781/forms/149595039718180275/subscribe" data-code="" method="post">
                      <div class="ml-form-formContent">
                        <div class="ml-form-fieldRow">
                          <div class="ml-field-group ml-field-name">
                            <input aria-label="name" type="text" class="form-control" data-inputmask="" name="fields[name]" placeholder="Name" autocomplete="given-name" style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 0.5rem; border-radius: 0.375rem; width: 100%; margin-bottom: 0.75rem;">
                          </div>
                        </div>
                        <div class="ml-form-fieldRow ml-last-item">
                          <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                            <input aria-label="email" aria-required="true" type="email" class="form-control" data-inputmask="" name="fields[email]" placeholder="Email" autocomplete="email" style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 0.5rem; border-radius: 0.375rem; width: 100%;">
                          </div>
                        </div>
                      </div>
                      <input type="hidden" name="ml-submit" value="1">
                      <div class="ml-form-embedSubmit" style="margin-top: 1rem;">
                        <button type="submit" class="primary" style="background-color: #ef4444; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.375rem; font-weight: 500; cursor: pointer; width: 100%;">
                          ${formStatus === 'submitting' ? 'Subscribing...' : 'Subscribe'}
                        </button>
                      </div>
                      <input type="hidden" name="anticsrf" value="true">
                    </form>
                  </div>
                  <div class="ml-form-successBody row-success" style="display: none">
                    <div class="ml-form-successContent">
                      <h4 style="color: var(--tw-prose-headings, #1a1a1a); font-size: 1.25rem; margin-bottom: 0.5rem; font-weight: 600;" class="dark:text-stone-100">Thank you!</h4>
                      <p style="color: var(--tw-prose-body, #374151);" class="dark:text-stone-400">You have successfully signed up.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `
        }} 
      />
    </div>
  );
}