import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';  // Import Image from next/image
import { fetchImages } from '../utils/strapi';

// Fetch images in `getStaticProps`
export async function getStaticProps() {
  try {
    const images = await fetchImages();
    console.log('Fetched Images:', images);  // Log the fetched images to see if they're coming through as expected
    return { props: { images: images.data || [] } };
  } catch (error) {
    console.error('Failed to fetch images:', error);
    return { props: { images: [] } };
  }
}

export default function Gallery({ images }) {
  const [search, setSearch] = useState('');

  console.log('All Images:', images);

  return (
    <>
      <Head>
        <title>Image Gallery - Samuel de Korte</title>
        <meta name="description" content="Explore the image gallery of Black American soldiers during WWII" />
        <meta property="og:title" content="Image Gallery - Black American Soldiers" />
        <meta property="og:description" content="Explore the image gallery" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold">Gallery of Black American Soldiers</h1>
          <p className="text-lg mt-2">Explore historical images from World War II.</p>
        </div>

        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md px-4 py-2 w-full max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => {
            const attributes = image || {}; // Adjusting based on structure

            // Correct access paths
            const imageUrl = image?.Image?.[0]?.url
              ? image.Image[0].url.startsWith('http')
                ? image.Image[0].url
                : `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.Image[0].url}`
              : null;

            const altText = attributes.alt_text || 'Image';
            const description = attributes.Description?.[0]?.children?.[0]?.text || 'No description available';
            const creator = attributes.Source || 'Unknown'; // Replace `Creator` with `Source`
            const date = attributes.Date || 'Unknown Date';

            if (imageUrl) {
              return (
                <div key={image.id} className="overflow-hidden rounded-lg shadow-lg group">
                  <div className="relative">
                    <Image
                      src={imageUrl}
                      alt={altText}
                      width={500}
                      height={500}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <p className="text-white text-sm text-center">{description}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="font-semibold">{attributes.Name}</h3>
                    <p className="text-sm text-gray-600">{creator}</p> {/* Creator/Source */}
                    <p className="text-xs text-gray-500">{date}</p> {/* Date */}
                  </div>
                </div>
              );
            }
            return null; // Skip if imageUrl is unavailable
          })}
        </div>
      </div>
    </>
  );
}
