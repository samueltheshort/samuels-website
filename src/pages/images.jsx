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
    id: 30,
    name: 'An armed halftrack of the 827th Engineers Aviation Battalion.',
    description: 'Derived from original caption: Although the main job for the members of the 827th Engineers, is to construct an airport they still have to keep in trim for fighting. L to R: Private James Bryand, Sergeant Will L. Scott, Private First Class Dan Smith, and Corporal Woodrow George. This image also appeared in the Jackson Advocate of 4 September 1943, which alludes to an invasion of Germany. However, in September 1943, the Normandy landings were far in the future.',
    image: '827th-engineers-aviation-battalion-01.jpg',
    category: 'Engineers',
    source: 'Ike Skelton Combined Arms Research Library: SC 174587.',
    date: '1943',
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

  const categories = ['All', ...new Set(imageData.map((img) => img.category))];

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
