import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import arlesterbrown from '@/images/photos/arlesterbrown.jpg'
import louisbrown from '@/images/photos/louisbrown.jpg'
import lawrencejohnson from '@/images/photos/lawrencejohnson1945.jpg'

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

export default function About() {
  const introText =
    "Honoring Black American World War II veterans."

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>Black American WWII Veterans - Honoring Their Legacy</title>
        <meta
          name="description"
          content="Discover the heroic stories of Black American WWII veterans, including Dr. Arlester Brown and Louis Brown, and their invaluable contributions."
        />
        <link
          rel="canonical"
          href="https://www.samueldekorte.com/veterans"
        />
        <meta name="keywords" content="Black American WWII veterans, World War II history, Allied efforts, Black soldiers, Black American veterans, African American veterans" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Black American WWII Veterans - Honoring Their Legacy" />
        <meta
          property="og:description"
          content="Discover the heroic stories of Black American WWII veterans, including Dr. Arlester Brown and Louis Brown, and their invaluable contributions."
        />
        <meta property="og:image" content="https://www.samueldekorte.com/images/photos/arlesterbrown.jpg" />
        <meta property="og:url" content="https://www.samueldekorte.com/veterans" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Black American WWII Veterans - Honoring Their Legacy" />
        <meta
          name="twitter:description"
          content="Discover the heroic stories of Black American WWII veterans, including Dr. Arlester Brown and Louis Brown, and their invaluable contributions."
        />
        <meta name="twitter:image" content="https://www.samueldekorte.com/images/photos/arlesterbrown.jpg" />

        {/* Additional SEO Enhancements */}
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">

            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-stone-800 dark:text-stone-100 sm:text-5xl">
              {introText}
            </h1>
            <div className="mt-6 space-y-7 text-base text-stone-600 dark:text-stone-400">
                <p className="mt-4">
                    Through my research, I've been fortunate enough to meet several Black American veterans. Their contributions to the Allied efforts remain a testament to the courage of Black American soldiers. Want to learn more or share your own story about Black American WWII veterans? Email me your story!
                </p>
                <SocialLink
                  href="mailto:contact@samueldekorte.com"
                  icon={MailIcon}
                  className="mt-4"
                  >
                  contact@samueldekorte.com
                </SocialLink>
                  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                      <Image
                      src={arlesterbrown}
                      alt="Dr. Arlester Brown, 599th Quartermaster Laundry Battalion"
                      className="rounded-lg"
                      layout="intrinsic"
                      />
                      <p className="mt-2 text-sm text-gray-600">
                      Dr. Arlester Brown served in the 599th Quartermaster Laundry Battalion, providing critical support during WWII. As he said it: "I'm just glad we won the war."
                      </p>
                  </div>
                  <div>
                     <Image
                      src={louisbrown}
                      alt="Louis Brown, 4036th Quartermaster Truck Company"
                      className="rounded-lg"
                      />
                      <p className="mt-2 text-sm text-gray-600">
                      Louis Brown was part of the 4036th Quartermaster Truck Company, ensuring vital supplies reached the frontlines.
                      </p>
                  </div>
                  </div>
                  <p className="mt-4">
                  By including photographs in history books, we gain a deeper understanding of individuals and their stories, allowing us to connect more personally with the past. My research has led me to engage with the families of World War II veterans, enabling me to honor their sacrifices and keep their memories alive. 
                  </p>
                  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                  <Image
                      src={lawrencejohnson}
                      alt="Lawrence Johnson, 614th Tank Destroyer Battalion"
                      className="rounded-lg"
                      layout="intrinsic"
                      width={250}  // Adjust this value as needed
                      height={200} // Adjust this value as needed
                      objectFit="contain"
                      />
                      <p className="mt-2 text-sm text-gray-600">
                      Lawrence Johnson served in the 614th Tank Destroyer Battalion. This image is included in the book "The 614th Tank Destroyer Battalion: Fighting on Both Fronts".  (Courtesy of Lawrence Johnson family)
                      </p>
                  </div>    
                </div>    
            </div>
          </div>
          <div className="lg:pl-20">
          </div>
        </div>
      </Container>
    </>
  )
}
