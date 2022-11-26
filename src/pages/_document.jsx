import { Head, Html, Main, NextScript } from 'next/document'

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`

export default function Document() {
  return (
    <Html className="h-full antialiased" lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
        <link
          rel="alternate"
          type="application/rss+xml"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/feed+json"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.json`}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="flex h-full flex-col bg-stone-50 font-['Source_Serif_Pro'] dark:bg-stone-900">
        <Main />
        <NextScript />
        <a title="GDPR-compliant Web Analytics" href="https://clicky.com/101388714"><img alt="Clicky" src="//static.getclicky.com/media/links/badge.gif" border="0" /></a>
<script async src="//static.getclicky.com/101388714.js"></script>
<noscript><p><img alt="Clicky" width="1" height="1" src="//in.getclicky.com/101388714ns.gif" /></p></noscript>
      </body>
    </Html>
  )
}
