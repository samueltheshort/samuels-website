import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import logoAirbnb from '@/images/logos/airbnb.svg'
import logoFacebook from '@/images/logos/facebook.svg'
import logoPlanetaria from '@/images/logos/planetaria.svg'
import logoStarbucks from '@/images/logos/starbucks.svg'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-stone-100 stroke-stone-400 dark:fill-stone-100/10 dark:stroke-stone-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-stone-400 dark:stroke-stone-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-stone-100 stroke-stone-400 dark:fill-stone-100/10 dark:stroke-stone-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-stone-400 dark:stroke-stone-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-stone-500 transition group-hover:fill-stone-600 dark:fill-stone-400 dark:group-hover:fill-stone-300" />
    </Link>
  )
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-stone-100 p-6 dark:border-stone-700/40"
    >
      <h2 className="flex text-sm font-semibold text-stone-900 dark:text-stone-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-stone-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-stone-800/5 placeholder:text-stone-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:border-stone-700 dark:bg-stone-700/[0.15] dark:text-stone-200 dark:placeholder:text-stone-500 dark:focus:border-red-400 dark:focus:ring-red-400/10 sm:text-sm"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  )
}


function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
              alt="An image related to historical projects in which Samuel de Korte was involved."
              layout="responsive"
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home({ articles }) {
  return (
    <><>
      <Head>
        <title>Samuel de Korte - Historian</title>
        <meta
          name="description"
          content="I’m Samuel de Korte. I wrote about Black American soldiers during World War II, including the 614th Tank Destroyer Battalion, the Tuskegee Airmen, and the 452nd Anti-Aircraft Artillery Battalion." />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <div className="hero-section text-center">
   <h1 className="text-5xl font-bold text-black">Uncovering the history of Black American soldiers during the Second World War, one unit at a time!</h1>
</div>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            My name is Samuel de Korte. I'm a historian specializing in Black American soldiers during World War II and Dutch soldiers in the Napoleonic Wars. My past work includes writing about the 614th Tank Destroyer Battalion, the first segregated combat unit to receive the Distinguished Unit Citation. I’ve also translated the memoirs of a Dutch officer who served with Napoleon in Russia in 1812, authored a book on the Tuskegee Airmen, and have a forthcoming book on the 452nd Anti-Aircraft Artillery Battalion. The book is scheduled to appear in February 2025. Currently, I'm writing about the 777th Field Artillery Battalion.</p>
   
            <div className="mt-6 flex gap-6">

            </div>
              <div className="flex flex-wrap justify-center gap-6 mt-6">
                <a href="https://www.samueldekorte.com/books" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto">
                    Learn More About My Books
                  </Button>
                </a>
                <a href="https://www.samueldekorte.com/sources" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto">
                    Read Historical Sources
                  </Button>
                </a>
                <a href="https://www.samueldekorte.com/images" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto">
                    View Historical Images
                  </Button>
                </a>
                <a href="https://www.samueldekorte.com/films" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto">
                    View Historical Footage
                  </Button>
                </a>
                <a href="https://www.samueldekorte.com/articles" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto">
                    Check Out My Blog
                  </Button>
                </a>
              </div>
            </div>
     </Container></>
    <Photos /><Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {/* <Newsletter /> */}
            
          </div>
        </div>
      </Container></>
  
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
