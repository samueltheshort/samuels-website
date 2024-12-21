import Head from 'next/head';
import { SimpleLayout } from '@/components/SimpleLayout';

export default function Sources() {
  return (
    <>
      <Head>
        <title>Sources - Samuel de Korte</title>
        <meta name="description" content="Page for downloading sources" />
        <link
          rel="canonical"
          href="https://www.samueldekorte.com/sources"
        />
      </Head>
      <SimpleLayout
        title="Sources"
        intro="History is fun and history is about sharing. On this page you can download sources and files relevant to Black American soldiers during the Second World War. During my research I've come across several documents, which I had digitized, and which are now freely available."
      >
        <div className="mt-8">
          <a
            href="/thegoldencannon.pdf"
            download="thegoldencannon.pdf"
            className="text-blue-500 hover:underline"
          >
            The Golden Cannon: A History of the 969th Field Artillery Battalion (PDF). 
          </a>
          <p className="text-sm text-gray-600"> The unit history of the 969th Field Artillery Battalion. The unit history contains encounters, songs, stories and photographs.
          </p>
        </div>
        <div className="mt-8">
          <a
            href="/ComeOutFighting.pdf"
            download="ComeOutFighting.pdf"
            className="text-blue-500 hover:underline"
          >
            Come Out Fighting: The Epic Tale of the 761st Tank Battalion (PDF). 
          </a>
          <p className="text-sm text-gray-600"> The unit history of the 761st Tank Battalion also known as the Black Panthers. The unit history contains stories and images of this unit.
  </p>
        </div>
        <div className="mt-8">
          <a
            href="/HelenDouglas.pdf"
            download="HelenDouglas.pdf"
            className="text-blue-500 hover:underline"
          >
            The Negro Soldier: A partial record of Negro devotion and heroism in the cause of freedom gathered from the files of the War and Navy Departments (PDF). 
          </a>
          <p className="text-sm text-gray-600">
    A speech given by Helen Douglas in 1946. The speech provides a broad overview of the contributions of Black American soldiers during World War II.
  </p>
        </div>
      </SimpleLayout>
    </>
  );
}
