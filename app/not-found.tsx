import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h2>
      <p className="text-lg text-gray-600 mb-6">Sorry, we couldn’t find the page you were looking for.</p>
        <Link href={'/'} className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300">
          Return Home
        </Link>
    </div>
  )
}
