import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  FacebookIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'

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
    "Throughout my research, I've been fortunate enough to meet with several World War II veterans or to honor the memory of Black American soldiers during World War II."

  return (
    <>
      <Head>
        <title>About - Samuel de Korte</title>
        <meta name="description" content={introText} />
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
              <p>
                PLACE HOLDER
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              
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
                href="mailto:contact@samueldekorte.com"
                icon={MailIcon}
                className="mt-8 border-t border-stone-100 pt-8 dark:border-stone-700/40"
              >
                contact@samueldekorte.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
