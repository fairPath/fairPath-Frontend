
export default function Footer({handleAboutClick}: {handleAboutClick: () => void}) {

  return (
    <footer className="w-full bg-gray-100 text-center text-sm text-gray-600 py-4">
      © {new Date().getFullYear()} FairPath. All rights reserved.
      <a
        onClick={handleAboutClick}
        className="text-blue-500 hover:underline ml-1"
      >
        About
      </a>
    </footer>
  );
}
