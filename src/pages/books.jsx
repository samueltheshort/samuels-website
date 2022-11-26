import Image from 'next/future/image'
import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

import cover614th from '@/images/books/614th-tank-destroyer-battalion.jpg'
import covertragedy from '@/images/books/tragedy-and-betrayal.jpg'
import coverexecutie from '@/images/books/executie.jpg'

const books = [
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'The 614th Tank Destroyer Battalion was activated on 25 July 1942 at Camp Carson, USA and, like many other…',
    link: { href: 'https://www.amazon.com/614th-Tank-Destroyer-Battalion-Fighting/dp/1399008684', label: 'amazon.com' },  
    image: cover614th,
  },
  {
    name: 'Tragedy & Betrayal in the Dutch Resistance',
    description:
      'On the night of 31 March 1945, five men were woken and taken from their cells in the city of Zwolle…',
    link: { href: 'https://www.amazon.com/Tragedy-Betrayal-Dutch-Resistance-Samuel/dp/152678498X', label: 'amazon.com' },
    image: covertragedy,
  },
  {
    name: 'Executie aan de Meppelerstraatweg',
    description:
      'De Tweede Wereldoorlog was bijna afgelopen. Toch werden er op de vooravond van de bevrijding, op 31 maart…',
    link: { href: 'https://www.bol.com/nl/nl/p/executie-aan-de-meppelerstraatweg/9200000111454645/?s2a=#productTitle', label: 'bol.com' },
    image: coverexecutie,
  },
]

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Projects() {
  const introText = 'Below you will find my books.'

  return (
    <>
      <Head>
        <title>Books - Samuel de Korte </title>
        <meta name="description" content={introText} />
      </Head>
      <SimpleLayout
        title={introText}
        intro="Through the years I've written about various topics. These include the black American soldiers during the Second World War, Dutch soldiers during the Napoleonic wars, and the Dutch Resistance during the Second World War."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {books.map((book) => (
            <Card as="li" key={book.name} className="group">
              <div className="relative z-10 flex h-60 w-full items-center justify-center overflow-hidden rounded-sm bg-gray-50 shadow-md shadow-stone-800/5 ring-1 ring-stone-900/5 duration-150 group-hover:bg-white dark:border dark:border-stone-700/50 dark:bg-stone-800 dark:ring-0">
                <Image
                  src={book.image}
                  alt="An image of the cover of the book."
                  layout="responsive"
                  className="absolute top-0 -z-10 h-full w-auto opacity-50 blur-2xl"
                  unoptimized
                />
                <Image
                  src={book.image}
                  alt="An image of the cover of the book."
                  layout="responsive"
                  className="h-full w-auto"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-stone-800 dark:text-stone-100">
                <Card.Link href={book.link.href}>{book.name}</Card.Link>
              </h2>
              <Card.Description>{book.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-stone-400 transition group-hover:text-red-500 dark:text-stone-200">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{book.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
