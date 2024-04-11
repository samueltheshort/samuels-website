import Image from 'next/future/image'
import Head from 'next/head'
import { useState } from 'react' // Import useState hook
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
import fa593 from '@/images/photos/fa593.jpg'
import davis from '@/images/photos/davis.jpg'
import armorer from '@/images/photos/fg332.jpg'
import bp76101 from '@/images/photos/bp76101.jpg'
import ca76 from '@/images/photos/ca76.jpg'
import aa452 from '@/images/photos/image-5.jpg'
import fa777 from '@/images/photos/fa777.jpg'

const books = [
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'A three-inch M5 gun with crew of the 614th Tank Destroyer Battalion. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im1,
    category: 'Tank Destroyers',
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'Soldiers of the 614th Tank Destroyer Battalion stand in front of a halftrack. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im8,
    category: 'Tank Destroyers',
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'Original Caption: "Members of the gun crew of a tank destroyer unit load their piece during practice firing, somewhere in England, before leaving for the real thing on the continent. Left to Right: Pfc. Aurbery Morris (Hobbsville, NC), Pfc. J. C. Heatem (Detroit, MI), Pfc. Robert B. Russell (Ashville, NC), 1st Lt. U.V. Watkins (Huntsville, TX), Pfc. Cebe Young (Ashville, NC), Pfc. James H. Mason (Williamston, NC). 614th Tank Destroyer Battalion, Burley, England." (Courtesy of the National Archives and Records Administration)',
    image: td614im9,
    category: 'Tank Destroyers',
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'Two enlisted men and an officer of the 614th Tank Destroyer Battalion. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im2,
    category: 'Tank Destroyers',
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'A soldier of the 614th Tank Destroyer Battalion poses with a round for the three-inch M5 gun. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im3,
    category: 'Tank Destroyers',
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'Charlie Rattler, of Third Platoon, C Company, the 614th Tank Destroyer Battalion sitting on the ground. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im4,
    category: 'Tank Destroyers',
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'Charlie Rattler, of Third Platoon, C Company, the 614th Tank Destroyer Battalion smokes a ciragette and poses for the camera. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im5,
    category: 'Tank Destroyers',
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'Charlie Rattler, of Third Platoon, C Company, the 614th Tank Destroyer Battalion together with another soldier in a foxhole. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im6,
    category: 'Tank Destroyers',
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'A three inch M5 gun covered by camouflage netting. (Courtesy of the United States Army Heritage and Education Center)',
    image: td614im7,
    category: 'Tank Destroyers',
  },
  {
    name: 'A howitzer of the 593rd Field Artillery Battalion',
    description:
      '1st section gun crew, Battery A, 593rd Field Artillery Battalion, 93rd Infantry Division, loads a 105mm howitzer and prepares to fire (Bougainville 16 April 1944). (Courtesy of National Archives and Records Administration.)',
    image: fa593,
    category: 'Artillery',
  },
  {
    name: 'Several soldiers of the 777th Field Artillery Battalion',
    description:
      'Soldiers of a Field Artillery Battalion near Ubach, Germany, sit in dugout near their gun waiting for firing orders. (Courtesy of National Archives and Records Administration.)',
    image: fa777,
    category: 'Artillery',
  },
  {
    name: 'John T. Fields, an armorer with the 332nd Fighter Group.',
    description:
      'Pfc. John T. Fields, an armorer with the 332nd Fighter Group, checks the ammunition of a P-51 Mustang. (Courtesy of National Archives and Records Administration.)',
    image: armorer,
    category: 'Air Force',
  },
  {
    name: 'Benjamin O. Davis',
    description:
      'Benjamin O. Davis, the commander of the 332nd Fighter Group. (Courtesy of National Archives and Records Administration.)',
    image: davis,
    category: 'Air Force',
  },
  {
    name: 'A M4 Sherman tank of the 761st Tank Battalion',
    description:
      'A M4 Sherman tank of the 761st Tank Battalion. (Courtesy of National Archives and Records Administration.)',
    image: bp76101,
    category: 'Tanks',
  },
  {
    name: 'A 3-inch anti-aircraft gun of the 76th Coast Artillery',
    description:
      'A 3-inch anti-aircraft gun manned by soldiers of the 76th Coast Artillery on the firing range at Myrtle Beach, South Carolina. This photograph was taken by Harry R Price, the regimental commander. (Courtesy of the United States Army Heritage and Education Center)',
    image: ca76,
    category: 'Coast Artillery',
  },
  {
    name: 'A 40-mm Bofors gun of the 452nd Anti Aircraft Artillery Battalion.',
    description:
      'A 40-mm Bofors gun of Battery A, 452nd Anti Aircraft Artillery Battalion. (Courtesy of National Archives and Records Administration.)',
    image: aa452,
    category: 'Coast Artillery',
  },
]

export default function Projects() {
  const introText =
    'Images of Black American soldiers during the Second World War.'
  const [category, setCategory] = useState('All') // State to track selected category

  // Function to filter books based on category
  const filteredBooks =
    category === 'All'
      ? books
      : books.filter((book) => book.category === category)

  const extractedCategories = books
    .map((item) => item.category) // Extract categories from books array
    .filter((value, index, self) => self.indexOf(value) === index) // Only keep the unique values

  const allCategories = ['All', ...extractedCategories]

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
        {/* Index box */}
        <div className="mb-8 flex flex-wrap justify-center">
          {allCategories.map((item) => (
            <button
              className={`m-2 p-2 duration-150 hover:text-red-500 hover:dark:text-red-400 ${
                item === category
                  ? 'border-b border-red-500 text-red-500 dark:border-red-400 dark:text-red-400'
                  : ''
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {/* Images */}
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredBooks.map((book, index) => (
            <Card as="li" key={index} className="group">
              <div className="relative z-10 flex h-60 w-full items-center justify-center overflow-hidden rounded-sm bg-gray-50 shadow-md shadow-stone-800/5 ring-1 ring-stone-900/5 duration-150 group-hover:bg-white dark:border dark:border-stone-700/50 dark:bg-stone-800 dark:ring-0">
                <Image
                  src={book.image}
                  alt={`An image of ${book.name}`}
                  layout="responsive"
                  className="absolute top-0 -z-10 h-full w-auto opacity-50 blur-2xl"
                  unoptimized
                />
                <Image
                  src={book.image}
                  alt={`An image of ${book.name}`}
                  layout="responsive"
                  className="h-full w-auto"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-stone-800 dark:text-stone-100 " />
              <Card.Description>{book.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-stone-400 transition group-hover:text-red-500 dark:text-stone-200" />
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
