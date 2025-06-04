import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'NextBlog',
  description: 'A simple blog with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">

        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-red-600 font-bold text-lg">
                NextBlog
              </Link>
              
              {/* shows on medium screens and up */}
              <div className="hidden sm:flex gap-4">
                <Link href="/new-post" className="text-red-500 hover:text-red-700">
                  New Post
                </Link>
                <Link href="/quote" className="text-red-500 hover:text-red-700">
                  Quote
                </Link>
              </div>

              {/* shows on small screens */}
              <button className="sm:hidden text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu - shows when clicked */}
            <div className="sm:hidden hidden mt-2">
              <Link href="/new-post" className="block py-2 text-red-500">
                New Post
              </Link>
              <Link href="/quote" className="block py-2 text-red-500">
                Quote
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}