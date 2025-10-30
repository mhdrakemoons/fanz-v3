import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="relative z-30 flex items-center justify-between whitespace-nowrap px-0 py-4 md:px-4 bg-white/90 supports-[backdrop-filter]:bg-white/70 backdrop-blur border border-gray-100 rounded-xl">
        <Link className="flex items-center gap-2.5 text-[#111827]" href="/">
          <div className="text-primary size-6 flex items-center justify-center">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
            </svg>
          </div>
        <h2 className="text-[#111827] text-lg font-bold leading-tight tracking-[-0.015em]">Fanzsocial</h2>
      </Link>
      <nav className="hidden md:flex flex-1 justify-end">
        <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 p-1.5 backdrop-blur-sm shadow-sm">
          <Link className="text-slate-800 text-sm font-medium leading-normal hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-full" href="/best-strategies">Best Strategies</Link>
          <Link className="text-slate-800 text-sm font-medium leading-normal hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-full" href="/reviews">Reviews</Link>
          <Link className="text-slate-800 text-sm font-medium leading-normal hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-full" href="/blog">Blog</Link>
        </div>
      </nav>
      <div className="md:hidden">
        <span className="material-symbols-outlined text-3xl text-[#111827]">menu</span>
      </div>
    </header>
  )
}


