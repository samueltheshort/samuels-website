import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { SimpleLayout } from '@/components/SimpleLayout';
import { Card } from '@/components/Card';

// Export the imageData array
export const imageData = [
  {
    id: 1,
    name: 'A shell is being loaded into an 8-inch howitzer.',
    description: 'A shell is being loaded into an 8-inch gun of Battery C, 578th Field Artillery Battalion near Bleialf, Germany.',
    image: '578th-field-artillery-battalion-01.jpg',
    category: 'Artillery',
    source: 'Author collection',
    date: '9 February 1945',
  },
  {
    id: 2,
    name: 'The 614th Tank Destroyer Battalion',
    description: 'A three-inch M5 gun with the crew of the 614th Tank Destroyer Battalion.',
    image: '614th-tank-destroyer-battalion-01.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 3,
    name: 'The 614th Tank Destroyer Battalion',
    description: 'An officer and two enlisted men of the 614th Tank Destroyer Battalion.',
    image: '614th-tank-destroyer-battalion-02.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 4,
    name: 'A soldier of the 614th Tank Destroyer Battalion',
    description: 'A soldier of the 614th Tank Destroyer Battalion poses with a round for the M3 anti-tank gun.',
    image: '614th-tank-destroyer-battalion-03.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 5,
    name: 'Charlie Rattler of the 614th Tank Destroyer Battalion',
    description: 'Charlie Rattler, Third Platoon, Company C, the 614th Tank Destroyer Battalion sits on the ground with a bazooka.',
    image: '614th-tank-destroyer-battalion-04.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 6,
    name: 'Charlie Rattler of the 614th Tank Destroyer Battalion is smoking a cigarette',
    description: 'Charlie Rattler, Third Platoon, Company C, the 614th Tank Destroyer Battalion is smoking a cigarette. This photograph was published in a 1945.',
    image: '614th-tank-destroyer-battalion-05.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 7,
    name: 'Charlie Rattler of the 614th Tank Destroyer Battalion in a foxhole with another soldier',
    description: 'Charlie Rattler, of Third Platoon, C Company, the 614th Tank Destroyer Battalion together with another soldier in a foxhole.',
    image: '614th-tank-destroyer-battalion-06.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 8,
    name: 'A camouflaged three inch gun of the 614th Tank Destoyer Battalion',
    description: 'A three inch M5 gun covered by camouflage netting.',
    image: '614th-tank-destroyer-battalion-07.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 9,
    name: 'A three inch gun of the 614th Tank Destroyer Battalion during a firing exercise',
    description: 'Members of the gun crew of a tank destroyer unit load their piece during practice firing, somewhere in England, before leaving for the real thing on the continent. Left to Right: Pfc. Aurbery Morris (Hobbsville, NC), Pfc. J. C. Heatem (Detroit, MI), Pfc. Robert B. Russell (Ashville, NC), 1st Lt. U.V. Watkins (Huntsville, TX), Pfc. Cebe Young (Ashville, NC), Pfc. James H. Mason (Williamston, NC). 614th Tank Destroyer Battalion, Burley, England.',
    image: '614th-tank-destroyer-battalion-08.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 10,
    name: 'An officer and an enlisted man in front of a halftrack',
    description: 'An officer and an enlisted man of the 614th Tank Destroyer Battalion stand in front of a halftrack.',
    image: '614th-tank-destroyer-battalion-09.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 29,

    name: 'Soldiers of the 218th Quartermaster Battalion are fueling jerricans.',
    description: 'Soldiers of the 218th Quartermaster Battalion are fueling jerrycans. These cans were used to fuel the advance of the Ninth Army during Operation Flashpoint. (Wegberg, Germany)',
    image: '218th-quartermaster-battalion-01.jpg',
    category: 'Quartermaster',
    source: 'United States Army Heritage and Education Center.',
    date: '23 March 1945',
  },
  {
    id: 30,
    name: 'An armed halftrack of the 827th Engineers Aviation Battalion.',
    description: 'Derived from original caption: Although the main job for the members of the 827th Engineers, is to construct an airport they still have to keep in trim for fighting. L to R: Private James Bryand, Sergeant Will L. Scott, Private First Class Dan Smith, and Corporal Woodrow George. This image also appeared in the Jackson Advocate of 4 September 1943, which alludes to an invasion of Germany. However, in September 1943, the Normandy landings were far in the future.',
    image: '827th-engineers-aviation-battalion-01.jpg',
    category: 'Engineers',
    source: 'Ike Skelton Combined Arms Research Library: SC 174587.',
    date: '1943',
  },
  {
    id: 100, 
    name: 'A retreat ceremony somewhere in the South Pacific Area.', 
    description: '"Old Glory" is lowered in a retreat ceremony somewhere in the South Pacific Area by Corporal John O. Crittonden, a member of Company A, 903rd Air Base Security Battalion.', 
    image: '903rd-airbase-security-battalion-01.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: (SC 184656)', 
    date: '29 June 1943'
  },
  {
    id: 101, 
    name: 'A message is speeded on its way by these men from a Headquarter Detachment of the 903rd Air Base Security Battalion.', 
    description: 'A message is speeded on its way by these men from a Headquarter Detachment of the 903rd Air Base Security Battalion somewhere in the South Pacific Area. L-R: T/5 Carl D. Hale, Sgt. William L. Shepard and T/4 R.C. Collins.', 
    image: '903rd-airbase-security-battalion-02.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: (SC 164669)', 
    date: 'undated'
  },
  {
    id: 102, 
    name: "It's chow time for the 903rd 903rd Air Base Security Battalion.", 
    description: "It's chow time at the 903rd Air Base Security Battalion in the South Pacific Area.", 
    image: '903rd-airbase-security-battalion-03.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: (SC 184655)', 
    date: '29 June 1943'
  },
  {
    id: 103, 
    name: 'Private Glenn Moore, Warren, Ohio, is vaccinated by by T/5 Henry Edwards, member of a Medical Detachment.', 
    description: 'A "shot" is given to Private Glenn Moore, Warren, Ohio, by T/5 Henry Edwards, member of a Medical Detachment serving in the South Pacific Area. Waiting are Private Willie J. L. Dawson, Greenville, S.C., and Private Curtis Daniel Knox, Palmetto, Ga', 
    image: '903rd-airbase-security-battalion-04.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: (SC 184642)', 
    date: '29 June 1943'
  },
  {
    id: 104, 
    name: 'Getting ready to turn in.', 
    description: 'Getting ready to turn in. 1st Lt. Harry L. Curtis, Morgantown, N.C., gives a few pointers to Cpl. Alfred Summerville, Washington, D.C., on a sea-going barracks, as they prepare for an overseas journey. 350th Engineer Regiment aboard the S.S. Poelau Laut, Pier 41-S, San Francisco Port of Embarkation.', 
    image: '350th-engineer-regiment-01.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: (SC 171514)', 
    date: '27 January, 1943.'
  },
  {
    id: 105, 
    name: 'Private Isaac Bartell, left, is instructed by S/Sgt. Thomas Blackstone.', 
    description: 'Private Isaac Bartell, left, Detroit, Mich., gets last-minute instructions from S/Sgt. Thomas A. Blackstone, Leonardtown, Md., as they prepare to go overseas. Both are with the 350th Engineer Regiment, aboard the S.S. Poelau Laut, Pier 41-S, San Francisco Port of Embarkation.', 
    image: '350th-engineer-regiment-02.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: (SC 171515)', 
    date: '27 January, 1943.'
  },
  {
    id: 106, 
    name: 'Private Robert A. Williams of Clarksdale.', 
    description: 'Private Robert A. Williams of Clarksdale, Miss., as he contemplates sleeping in a hammock aboard the transport on which his unit embarked for overseas. Company D, 462nd Port Battalion, embarked at San Francisco Port of Embarkation.', 
    image: '462nd-port-battalion-01.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: (SC 171509)', 
    date: '12 January 1943'
  },
  {
    id: 107, 
    name: 'Members of a Medical Detachment, 352nd Engineer Regiment, prepare for their overseas journey.', 
    description: 'Members of a Medical Detachment stowing their duffels and testing their hammocks on the deck of the transport on which they embarked for overseas. Detachment of the 352nd Engineer Regiment, embarked at San Francisco Port of Embarkation.', 
    image: '352nd-engineer-regiment-01.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: (SC 171512)', 
    date: '12 January 1943'
  },
  {
    id: 108, 
    name: 'The remaining tanks of the Byrne Task Force are serviced by their crews.', 
    description: 'Before moving on to the next objective, the remaining tanks of the Byrne Task Force are serviced by their crews. Company B, 784th Tank Battalion, at Sevelen, Germany.', 
    image: '784th-tank-battalion-01.jpg', 
    category: 'Tanks', 
    source: 'National Archives and Records Administration: (SC 336785)', 
    date: '5 March 1945'
  },
  {
    id: 109, 
    name: 'Lieutenant Colonel Nolan Troxell teaches infantry warfare to a group of Black infantry volunteers.', 
    description: 'Lt. Col. Nolan Troxell, 1609 Olive St., Little Rock, Arkansas, veteran combat officer explains the tactics of infantry warfare to a group of Black soldiers, all volunteers from service units.', 
    image: 'infantry-volunteers-01.jpg', 
    category: 'Infantry', 
    source: 'National Archives and Records Administration: (SC 337400)', 
    date: '28 February 1945'
  },
  {
    id: 110, 
    name: 'Private George E. Stevens during infantry training.', 
    description: 'At the 47th Reinforcement Depot, Private George E. Stevens, Abbottsburg, North Carolina, undergoes some serious infantry training. 47th Reinforcement Depot. Noyon, France.', 
    image: 'infantry-volunteers-02.jpg', 
    category: 'Infantry', 
    source: 'National Archives and Records Administration: (SC 337399)', 
    date: '28 February 1945'
  }, 
];

// Main component
export default function Gallery() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredImages = imageData.filter((image) => {
    const matchesSearch =
      image.name.toLowerCase().includes(search.toLowerCase()) ||
      image.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || image.category === category;
    return matchesSearch && matchesCategory;
  });

  // Generate the categories dynamically, excluding blank categories
  const categories = ['All', ...new Set(imageData
    .map((img) => img.category)
    .filter((cat) => cat !== '') // Exclude blank categories
  )];

  // Prepare schema JSON-LD for the entire gallery
  const schemaData = filteredImages.map((image) => ({
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "name": image.name,
    "contentUrl": `https://www.samueldekorte.com/images/${image.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    "creator": {
      "@type": "Person",
      "name": "Samuel de Korte"
    },
    "datePublished": image.date,
    "description": image.description,
    "image": `https://www.samueldekorte.com/images/${image.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    "publisher": {
      "@type": "Organization",
      "name": "Samuel de Korte History"
    }
  }));

  return (
    <>
      <Head>
        <title>Image Gallery - WWII Historical Images of Black American Soldiers | Samuel de Korte</title>
        <meta property="og:title" content="Image Gallery - Black American Soldiers" />
        <meta name="description" content="Explore a curated gallery showcasing the contributions of Black American soldiers during World War II with historical images and stories." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.samueldekorte.com/images" />

        {/* Schema for the entire gallery */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Collection",
            "name": "Black American Soldiers WWII Gallery",
            "creator": {
              "@type": "Person",
              "name": "Samuel de Korte"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Samuel de Korte History"
            },
            "image": schemaData.map((image) => image.contentUrl),
            "description": "A collection of historical images of Black American soldiers during WWII.",
            "url": "https://www.samueldekorte.com/gallery"
          })}
        </script>

        {/* Meta Tags for Social Sharing */}
        <meta property="og:image" content={`https://www.samueldekorte.com/images/${filteredImages[0]?.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} />
        <meta property="og:image:alt" content={filteredImages[0]?.name} />
        <meta property="twitter:image" content={`https://www.samueldekorte.com/images/${filteredImages[0]?.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} />
        <meta property="twitter:image:alt" content={filteredImages[0]?.name} />
      </Head>

      <SimpleLayout
        title="Historical Image Gallery"
        intro="Browse through images showcasing the contributions of Black American soldiers during WWII."
      >
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md px-4 py-2 w-full max-w-md"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 m-1 rounded-md ${category === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id}>
              <Image
                src={`/images/${image.image}`}  // Updated path
                alt={`Historical image showing ${image.name} of Black American soldiers during WWII`}
                width={400}
                height={300}
                loading="lazy"
                className="rounded-md"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <h3 className="mt-2 text-lg font-semibold">{image.name}</h3>
              <p className="text-sm text-gray-600">{image.description}</p>
              <p className="text-xs text-gray-500">Source: {image.source}</p>
              <p className="text-xs text-gray-500">Date: {image.date}</p>
            </Card>
          ))}
        </div>
      </SimpleLayout>
    </>
  );
}
