import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'
import { useEffect, useState } from "react";
import { Container } from '@/components/Container'
import portraitImage from '@/images/portrait.jpg'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  FacebookIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'


function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-stone-800 transition hover:text-red-500 dark:text-stone-200 dark:hover:text-red-500"
      >
        <Icon className="h-6 w-6 flex-none fill-stone-500 transition group-hover:fill-red-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

export default function About() {
  const introText = "I study the past, present, and the future.";

  // Client-side rendering check
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Triggered when the component is mounted (client-side)
  }, []);

  useEffect(() => {
    if (isClient) {
      // Dynamically load the MailerLite script after mounting
      const script = document.createElement('script');
      script.src = 'https://assets.mailerlite.com/js/universal.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, [isClient]);

  return (
    <>
      <Head>
        <title>About - Samuel de Korte</title>
        <meta name="description" content={introText} />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt="A photograph of Samuel de Korte during a hike."
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-stone-100 object-cover dark:bg-stone-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-stone-800 dark:text-stone-100 sm:text-5xl">
              {introText}
            </h1>
            <div className="mt-6 space-y-7 text-base text-stone-600 dark:text-stone-400">
              <p>
                My name is Samuel de Korte. History is my passion! For as long as I've remembered, I've been an avid reader. In the past I used to buy many physical books, while I now frequently read them in a digital format.
              </p>
              <p>
                Besides history, I really love stories. These can be told through a variety of mediums. Indeed, books, but a great story can also be told or visualized through games, movies, or drawings. A particular genre that I enjoy is science-fiction and the promises that technology holds for the future.
              </p>
              <p>
                Currently, I work as an Automation Engineer. In my spare time, I exercise or meet up with friends. Common activities include riding my bike through the local forests.
              </p>
              <p>
                Of course, I'm always open to suggestions, feedback, and comments. If you're interested in writing a review or if you have a great idea for a book, reach out to me!
              </p>

              {/* Conditionally render the subscription form on the client side */}
              {isClient && (
                <div id="mc_embed_shell">
                  <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css" />
                  <style type="text/css">
                    {`
                      #mc_embed_signup {
                        background: #fff;
                        clear: left;
                        font: 14px Helvetica, Arial, sans-serif;
                        width: 600px;
                      }
                    `}
                  </style>

                  <div id="mc_embed_signup">
                    <form
                      action="https://samueldekorte.us11.list-manage.com/subscribe/post?u=03a70de8dd4fb17f5424f1b2c&amp;id=1d48b04c52&amp;f_id=00aef0e1f0"
                      method="post"
                      id="mc-embedded-subscribe-form"
                      name="mc-embedded-subscribe-form"
                      className="validate"
                      target="_blank"
                    >
                      <div id="mc_embed_signup_scroll">
                        <h2>Subscribe for my free newsletter and stay up to date!</h2>
                        <div className="indicates-required"><span className="asterisk">*</span> indicates required</div>

                        <div className="mc-field-group">
                          <label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span></label>
                          <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required value="" />
                        </div>

                        <div className="mc-field-group">
                          <label htmlFor="mce-FNAME">First Name </label>
                          <input type="text" name="FNAME" className="text" id="mce-FNAME" value="" />
                        </div>

                        <div id="mce-responses" className="clear foot">
                          <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                          <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                        </div>

                        <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                          {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                          <input type="text" name="b_03a70de8dd4fb17f5424f1b2c_1d48b04c52" tabIndex="-1" value="" />
                        </div>

                        <div className="optionalParent">
                          <div className="clear foot">
                            <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value="Subscribe" />
                            <p style={{ margin: '0px auto' }}>
                              <a href="http://eepurl.com/jaXKzU" title="Mailchimp - email marketing made easy and fun">
                                <span style={{ display: 'inline-block', backgroundColor: 'transparent', borderRadius: '4px' }}>
                                  <img 
                                    className="refferal_badge" 
                                    src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg" 
                                    alt="Intuit Mailchimp" 
                                    style={{ width: '220px', height: '40px', display: 'flex', padding: '2px 0px', justifyContent: 'center', alignItems: 'center' }} 
                                  />
                                </span>
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
                  <script type="text/javascript">
                    {`
                      (function($) {
                        window.fnames = new Array();
                        window.ftypes = new Array();
                        fnames[0] = 'EMAIL';
                        ftypes[0] = 'email';
                        fnames[1] = 'FNAME';
                        ftypes[1] = 'text';
                        fnames[2] = 'LNAME';
                        ftypes[2] = 'text';
                        fnames[3] = 'ADDRESS';
                        ftypes[3] = 'address';
                        fnames[4] = 'PHONE';
                        ftypes[4] = 'phone';
                        fnames[5] = 'BIRTHDAY';
                        ftypes[5] = 'birthday';
                        fnames[6] = 'COMPANY';
                        ftypes[6] = 'text';
                      }(jQuery));
                      var $mcj = jQuery.noConflict(true);
                    `}
                  </script>
                </div>
              )}
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                href="mailto:contact@samueldekorte.com"
                icon={MailIcon}
                className="mt-8 border-t border-stone-100 pt-8 dark:border-stone-700/40"
              >
                contact@samueldekorte.com
              </SocialLink>

              <SocialLink
                href="https://www.instagram.com/samuel.dekorte/"
                icon={InstagramIcon}
                className="mt-4"
              >
                Follow on Instagram
              </SocialLink>

              <SocialLink
                href="https://www.facebook.com/samuel.dekorte/"
                icon={FacebookIcon}
                className="mt-4"
              >
                Follow on Facebook
              </SocialLink>

              <SocialLink
                href="https://www.linkedin.com/in/samueldekorte/"
                icon={LinkedInIcon}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}