export default function Navbar() {
  return (
    <header className="w-full px-6 py-4 bg-transparent absolute top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-start gap-1">
        {/* Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
          />
        </svg>
        <h1 className="text-white text-xl font-semibold tracking-wide drop-shadow">
          FairPath
        </h1>
      </div>
    </header>
  );
}
