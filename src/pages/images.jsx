import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

import td614im1 from '@/images/photos/td61401.jpg'
import td614im2 from '@/images/photos/td61402.jpg'
import td614im3 from '@/images/photos/td61403.jpg'
import td614im4 from '@/images/photos/td61404.jpg'
import td614im5 from '@/images/photos/td61405.jpg'
import td614im6 from '@/images/photos/td61406.jpg'
import td614im7 from '@/images/photos/td61407.jpg'
import td614im8 from '@/images/photos/td61408.jpg'
import td614im9 from '@/images/photos/td61409.jpg'

const books = [
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'A three-inch M5 gun with crew of the 614th Tank Destroyer Battalion. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im1,
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'Soldiers of the 614th Tank Destroyer Battalion stand in front of a halftrack. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im8,
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'Original Caption: "Members of the gun crew of a tank destroyer unit load their piece during practice firing, somewhere in England, before leaving for the real thing on the continent. Left to Right: Pfc. Aurbery Morris (Hobbsville, NC), Pfc. J. C. Heatem (Detroit, MI), Pfc. Robert B. Russell (Ashville, NC), 1st Lt. U.V. Watkins (Huntsville, TX), Pfc. Cebe Young (Ashville, NC), Pfc. James H. Mason (Williamston, NC). 614th Tank Destroyer Battalion, Burley, England." (Courtesy of the National Archives and Records Administration)',
    image: td614im9,
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
    'Two enlisted men and an officer of the 614th Tank Destroyer Battalion. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im2,
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
    'A soldier of the 614th Tank Destroyer Battalion poses with a round for the three-inch M5 gun. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im3,
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'Charlie Rattler, of Third Platoon, C Company, the 614th Tank Destroyer Battalion sitting on the ground. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im4,
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'Charlie Rattler, of Third Platoon, C Company, the 614th Tank Destroyer Battalion smokes a ciragette and poses for the camera. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im5,
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'Charlie Rattler, of Third Platoon, C Company, the 614th Tank Destroyer Battalion together with another soldier in a foxhole. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im6,
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'A three inch M5 gun covered by camouflage netting. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im7,
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
  const introText = 'Images of Black American soldiers during the Second World War.'

  return (
    <>
      <Head>
        <title>Images - Samuel de Korte </title>
        <meta name="description" content={introText} />
      </Head>
      <SimpleLayout
        title={introText}
        intro="During my research I've come across many images of Black American soldiers which I wanted to share with you. Feel free to take a look at the images below."
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
                  alt="An image of the 614th Tank Destroyer Battalion."
                  layout="responsive"
                  className="absolute top-0 -z-10 h-full w-auto opacity-50 blur-2xl"
                  unoptimized
                />
                <Image
                  src={book.image}
                  alt="An image of the 614th Tank Destroyer Battalion."
                  layout="responsive"
                  className="h-full w-auto"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-stone-800 dark:text-stone-100">
              </h2>
              <Card.Description>{book.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-stone-400 transition group-hover:text-red-500 dark:text-stone-200">
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
