// components/Newsletter.jsx
import React, { useEffect, useState } from 'react';

export function Newsletter() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a placeholder with similar styling to avoid hydration issues
    return (
      <div className="p-6 my-8 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
        <h3 className="text-xl font-semibold mb-2 text-stone-800 dark:text-stone-100">Stay Updated</h3>
        <p className="mb-4 text-stone-600 dark:text-stone-400">Subscribe to our newsletter for the latest updates and offers.</p>
        <div className="h-20"></div> {/* Empty space as placeholder for form */}
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
                      <h4>Newsletter</h4>
                      <p>Subscribe to our newsletter for the latest updates and offers.</p>
                    </div>
                    <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/1402781/forms/149595039718180275/subscribe" data-code="" method="post" target="_blank">
                      <div class="ml-form-formContent">
                        <div class="ml-form-fieldRow">
                          <div class="ml-field-group ml-field-name">
                            <input aria-label="name" type="text" class="form-control" data-inputmask="" name="fields[name]" placeholder="Name" autocomplete="given-name">
                          </div>
                        </div>
                        <div class="ml-form-fieldRow ml-last-item">
                          <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                            <input aria-label="email" aria-required="true" type="email" class="form-control" data-inputmask="" name="fields[email]" placeholder="Email" autocomplete="email">
                          </div>
                        </div>
                      </div>
                      <input type="hidden" name="ml-submit" value="1">
                      <div class="ml-form-embedSubmit">
                        <button type="submit" class="primary">Subscribe</button>
                        <button disabled="disabled" style="display: none;" type="button" class="loading">
                          <div class="ml-form-embedSubmitLoad"></div>
                          <span class="sr-only">Loading...</span>
                        </button>
                      </div>
                      <input type="hidden" name="anticsrf" value="true">
                    </form>
                  </div>
                  <div class="ml-form-successBody row-success" style="display: none">
                    <div class="ml-form-successContent">
                      <h4>Thank you!</h4>
                      <p>You have successfully signed up.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <script>
              function ml_webform_success_23978422() {
                var $ = ml_jQuery || jQuery;
                $('.ml-subscribe-form-23978422 .row-success').show();
                $('.ml-subscribe-form-23978422 .row-form').hide();
              }
            </script>
          `
        }} 
      />
    </div>
  );
}