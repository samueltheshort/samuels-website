import { YoutubeEmbed } from '@/components/YoutubeEmbed';
import Head from 'next/head';
import { SimpleLayout } from '@/components/SimpleLayout';
import Link from 'next/link'
import clsx from 'clsx'

export default function Films() {
  // Define an array of film data
  const films = [
    {
      id: 'y7JqLgQ4CKw',
      description: 'The fragments featuring the soldiers of the 614th Tank Destroyer Battalion are available online.',
    },
    {
      id: 'pXkMrAdZxEw',
      description: 'A fire mission of the 969th Field Artillery Battalion.',
    },
    {
      id: 'WTJsXau-WIQ',
      description: 'A training exercise of the 333rd Field Artillery Battalion.',
    },
    {
      id: 'tez8-5lNoxE',
      description: 'A training exercise of the 484th Anti-Aircraft Artillery Battalion.',
    },
    // Add more film data as needed
  ];

  return (
    <>
      <Head>
        <title>Sources - Samuel de Korte</title>
        <meta name="description" content="Page for watching films" />
        <link
          rel="canonical"
          href="https://www.samueldekorte.com/films"
        />
      </Head>
      <SimpleLayout
        title="Films"
        intro={`On this page you can watch sources and film clips relating to Black American soldiers during the Second World War. Some of the material that you see has been digitized on my request and is now freely available. If a high-quality version is needed, send me a message.`}
        >
        <p> If the clips don't show, you can also watch them <a href="https://www.youtube.com/channel/UCZrhGsNzh0qZi6pq2RyESjg"> here</a>.</p>
        <br />
        {/* Map over the films array to render each film link */}
        {films.map((film) => (
          <div key={film.id}>
            {/* Render the film description */}
            <p>{film.description}</p>
            {/* Render the YoutubeEmbed component with the film ID */}
            <YoutubeEmbed id={film.id} />
            <br />
          </div>
        ))}

        </SimpleLayout>
    </>
  );
}
