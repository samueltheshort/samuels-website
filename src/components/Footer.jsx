import Link from 'next/link'

import { Container } from '@/components/Container'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-stone-100 pt-10 pb-16 dark:border-stone-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-stone-800 dark:text-stone-200">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/books">Books</NavLink>
                <NavLink href="/articles">Blog</NavLink>
                {/* <NavLink href="/speaking">Speaking</NavLink> */}
                {/* <NavLink href="/uses">Uses</NavLink> */}
              </div>
              <p className="text-sm text-stone-400 dark:text-stone-500">
                &copy; {new Date().getFullYear()} Samuel de Korte. All rights
                reserved.
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
