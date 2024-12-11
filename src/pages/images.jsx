import Image from 'next/image'
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
import ca4901 from '@/images/photos/ca4901.jpg'
import ca7601 from '@/images/photos/ca7601.jpg'
import ca7602 from '@/images/photos/ca7602.jpg'
import ca7603 from '@/images/photos/ca7603.jpg'
import ca7604 from '@/images/photos/ca7604.jpg'
import ca7605 from '@/images/photos/ca7605.jpg'
import ca7606 from '@/images/photos/ca7606.jpg'
import ca7607 from '@/images/photos/ca7607.jpg'
import ca7608 from '@/images/photos/ca7608.jpg'
import ca7609 from '@/images/photos/ca7609.jpg'
import ca7610 from '@/images/photos/ca7610.jpg'
import ca7611 from '@/images/photos/ca7611.jpg'
import ca7612 from '@/images/photos/ca7612.jpg'
import fa999th01 from '@/images/photos/fa999th01.jpg'
import qm218 from '@/images/photos/218qmbn.jpg'
import fa578th from '@/images/photos/578thfagunjpg.jpg'
import cpdb6888thfr from '@/images/photos/cpdb6888th01.jpg'
import cpdb6888thuk from '@/images/photos/cpdb6888th02.jpg'
import bp76103 from '@/images/photos/bp76103.jpg'


const images = [
  {
    name: 'A shell is being loaded into an 8-inch howitzer of the 578th Field Artillery Battalion.',
    description:
      'A shell is being loaded into an 8-inch howitzer of the 578th Field Artillery Battalion (Bleialf, Germany, 9 February 1945). (Author collection.)',
    image: fa578th,
    category: 'Artillery',
  },
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
      name: 'Soldiers of the 218th Quartermaster Battalion are fueling jerricans.',
      description:
        'Soldiers of the 218th Quartermaster Battalion are fueling jerrycans. These cans were used to fuel the advance of the Ninth Army during Operation Flashpoint. (Wegberg, Germany. 23 March 1945) (Courtesy of the United States Army Heritage and Education Center)',
      image: qm218,
      category: 'Tanks',
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
    name: 'Soldiers of the 999th Field Artillery Battalion are about to fire another shell at a target.',
    description:
      'Another present from "Harlem to Hitler" is presented on behalf of the men of an artillery outfit which is firing at the barges in which the Germans are trying to escape across the River Seine. Montes-Gassicourt, France, August 20, 1944. The men are of the 999th Field Artillery Battalion, Battery A. (Courtesy of United States Army Heritage and Edication Center.)',
    image: fa999th01,
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
    name: 'A M4 Sherman tank of the 761st Tank Battalion is crossing a Bailey Bridge in France',
    description:
      'A M4 Sherman tank of the 761st Tank Battalion is crossing a Bailey Bridge in France on their way to the frontline (9 November 1944). (Courtesy of National Archives and Records Administration.)',
    image: bp76103,
    category: 'Tanks',
  },
  {
    name: 'A 3-inch anti-aircraft gun of the 76th Coast Artillery',
    description:
      'A 3-inch anti-aircraft gun manned by soldiers of the 76th Coast Artillery on the firing range at Myrtle Beach, South Carolina. This photograph was taken by Harry R Price, the regimental commander. (Courtesy of the United States Army Heritage and Education Center)',
    image: ca76,
    category: 'Artillery',
  },
  {
    name: 'A 40-mm Bofors gun of the 452nd Anti Aircraft Artillery Battalion.',
    description:
      'A 40-mm Bofors gun of Battery A, 452nd Anti Aircraft Artillery Battalion. (Courtesy of National Archives and Records Administration.)',
    image: aa452,
    category: 'Artillery',
  },
  {
    name: 'First Sergeant James Sims shows Private John Stephens his .45. Both are soldiers of the 76th CA.',
    description:
      'Original caption: First Sergeant James Sims of Los Angeles, who saw World War I, as a member of the 801st Pioneers, is shown here on his way to another war as top cutter of a Battery of C.A.A., which sailed on a transport from a Port of Embarkation in U.S. Sergeant Sims is telling Private John O. Stephens of Los Angeles how to handle a 45 in close quarters. Sims said Stephens is the brightest boy in his battery. August 1942. Battery A, 76th C.A.A. S.S. Mormacsea at Fort Mason, California, 9 August 1942. (Courtesy of the United States Army Heritage and Education Center)',
    image: ca7601,
    category: 'Artillery',
  },
  {
    name: 'Soldiers of the 76th Coast Artillery',
    description:
      '"That pig sticker is so sharp it will slit a hair," says Pvt Wm Crook of Ripley, Tenn. He proves it too, with a hirsute speciment from the cranium of Pvt Theo Bean of Birmingham, Ala. The four soldiers are members of Hq. Co. of a C.A.A. unit. They sailed on the transport for overseas duty in the Pacific. They are not talking about slicing vegetables with these bayonets; they are eager to see Tokyo. Aboard a tranport from a Port of Embarkation in US. August 1942. Hq. Co. 76th C.A.A. SS Mormacsea at Fort Mason, Calif. August 9, 1942. (Courtesy of the United States Army Heritage and Education Center)',
    image: ca7602,
    category: 'Artillery',
  },
  {
    name: 'Soldiers of the 76th Coast Artillery',
    description:
      'Another photograph of the same soldiers, where they are displaying their bayonets. (Courtesy of the United States Army Heritage and Education Center)',
    image: ca7603,
    category: 'Artillery',
  },
  {
    name: 'Soldiers of the 76th Coast Artillery',
    description:
      'Original caption: Half an hour after the colored soldiers of a regimental headquarters battery of the C.A.A. marched aboard the transport, many of them were bedded down in their close quarters and snoring. The line next the camera, from bunk up, consists of: Pvt. Harrison Wyatt, Atlanta, Ga.; Technician Clarence L. Williams, Columbus, Ga.; Pvt. Bennie Simmons, Goulds, Fla.; Pvt. Patrick Williams, Wells Ferry, Ala.; Sgt. Clommie Watkins, Jackson, Tenn.; Sgt. Abi Stephens, Montgomery, Ala. Next row: Pvt. Willie Brown, Fort Meyers, Fla.; Pvt. William K. Watkins, Linden, Ala.; Pvt. Flenard Van, Pursglove, W.Va, Corp. John G. Thomas, Chicago, Ill. 76th C.A.A. SS Mormacsea at Fort Mason, Calif. Sunday night, August 9, 1942. (Courtesy of the United States Army Heritage and Education Center)',
    image: ca7604,
    category: 'Artillery',
  },
  {
    name: 'Soldiers of the 76th Coast Artillery on board of the SS Mormacsea',
    description:
      'Original caption: "Down the hatch" Colored soldiers of a C.A.A. unit, few of whom ever were aboard a ship before, get acquinted with a new world aboard the transport as the line pauses on deck at the door of a hatch which leads below to the bunk tiers. A Port of Embarkation in U.S. 76th C.A.A. SS Mormacsea at Fort Mason, Calif. August 9, 1942 (Courtesy of the United States Army Heritage and Education Center)',
    image: ca7605,
    category: 'Artillery',
  },
  {
    name: 'Soldiers of the 76th Coast Artillery are playing blackjack',
    description:
      'Original caption: Members of A C.A.A. regimental band, atop their bunk section in the hold of a transport, are playing a little blackjack before turning in. Aboard a transport from a Port of Embarkation in U.S. 76th C.A.A. SS Mormacsea at Fort Mason, Calif. August 9, 1942 (Courtesy of the United States Army Heritage and Education Center)',
    image: ca7606,
    category: 'Artillery',
  },
  {
    name: 'Soldiers of the 76th or 77th Coast Artillery during a training exercise',
    description:
      'Original caption: C. D. nurse and defending medical troops pick up dead and wounded from the battle field, Ft. Moultrie, Charleston, S. C. Oct. 22, 1941. (Courtesy of the United States Army Heritage and Education Center)',
    image: ca7607,
    category: 'Artillery',
  },
  {
    name: 'Soldiers of the 76th or 77th Coast Artillery during a training exercise',
    description:
      'Defending troops of Ft. Moultrie on the charge. C. D. Air raid exercises at Charleston, S. C. Oct. 22, 1941. (Courtesy of the United States Army Heritage and Education Center)',
    image: ca7608,
    category: 'Artillery',
  },
  {
    name: 'Soldiers of the 76th or 77th Coast Artillery during a training exercise',
    description:
      'Soldiers at a charge after the parachutist have landed. C.D. Air raid exercises. Ft. Moultrie, Charleston, S. C. Oct. 22, 1941. (Courtesy of the United States Army Heritage and Education Center)',
    image: ca7609,
    category: 'Artillery',
  },
  {
    name: 'Soldiers of the 76th or 77th Coast Artillery during a training exercise',
    description:
      'Original caption: Defending troops capture the enemy during C. D. air raids, Ft. Moultrie, Charleston, S. C. Oct 22, 1941. (Courtesy of the United States Army Heritage and Education Center)',
    image: ca7610,
    category: 'Artillery',
  },
  {
    name: 'Soldiers of the 76th Coast Artillery stand next to a large searchlight',
    description:
      'Original caption: Pvt. Robert Byrd, Henry Johnson, John Hamlin, Battery E, 76th CAC (AA) at searchlight during C. D. air raids exercises. Fort Moultrie, Charleston, S. C. Oct. 22, 1941. (Courtesy of the United States Army Heritage and Education Center)',
    image: ca7611,
    category: 'Artillery',
  },
  {
    name: 'Soldiers of Battery E the 76th Coast Artillery are lighting up the field during exercises',
    description:
      'Original caption: Searchlights lighting up first aid exercises on the field at Charleston, S. C., during the C. D. Air raid exercises. Oct. 22, 1941. (Courtesy of the United States Army Heritage and Education Center)',
    image: ca7612,
    category: 'Artillery',
  },
  {
    name: 'Battery B, 49th Coast Artillery, section 2, fires at Japanese positions on Bougainville',
    description:
      'Original caption: This 155mm rifle, operated by negro troops, is firing at Jap positions on Bougainville. The soldier at left prepares to sponge the breech. Bougainville. 4/16/44. (Courtesy of the United States Army Heritage and Education Center)',
    image: ca4901,
    category: 'Artillery',
  },
  {
    name: 'Major Charity Adams inspects the troops under her command.',
    description:
      'Somewhere in England, Maj. Charity E. Adams, Columbia, S.C., and Capt. Abbie N. Campbell, Tuskegee Institute, Tuskegee, Ala, during an inspection in February 1945. (Courtesy of NARA: NAID: 531249)',
    image: cpdb6888thuk,
    category: 'Women Army Corps',
  },
  {
    name: 'Opening of the 6888th Central Postal Directory Battalion bar in France in 1945',
    description:
      "In Rouen, France, Second Lieutenant Freda le Beau (New Orleans, LA), post exchange officer, serves the first Coca Cola to Major Charity Adams (Columbia, South Carolina), at the grand opening of the WAC battalion's new snack bar. (Courtesy of NARA: NAID: 175539159)",
    image: cpdb6888thfr,
    category: 'Women Army Corps',
  },
]


export default function Projects() {
  const introText =
    'Images of Black American soldiers during the Second World War.'
  const [category, setCategory] = useState('All') // State to track selected category

  // Function to filter images based on category
  const filteredimages =
    category === 'All'
      ? images
      : images.filter((images) => images.category === category)

  const extractedCategories = images
    .map((item) => item.category) // Extract categories from images array
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
          {filteredimages.map((images, index) => (
            <Card as="li" key={index} className="group">
              <div className="relative z-10 flex h-60 w-full items-center justify-center overflow-hidden rounded-sm bg-gray-50 shadow-md shadow-stone-800/5 ring-1 ring-stone-900/5 duration-150 group-hover:bg-white dark:border dark:border-stone-700/50 dark:bg-stone-800 dark:ring-0">
                <Image
                  src={images.image}
                  alt={`An image of ${images.name}`}
                  layout="responsive"
                  className="absolute top-0 -z-10 h-full w-auto opacity-50 blur-2xl"
                  unoptimized
                />
                <Image
                  src={images.image}
                  alt={`An image of ${images.name}`}
                  layout="responsive"
                  className="h-full w-auto"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-stone-800 dark:text-stone-100 " />
              <Card.Description>{images.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-stone-400 transition group-hover:text-red-500 dark:text-stone-200" />
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}


