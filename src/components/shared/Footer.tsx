export default function Footer() {
    return (
      <footer className="w-full bg-gray-100 text-center text-sm text-gray-600 py-4">
        © {new Date().getFullYear()} FairPath. All rights reserved.
      </footer>
    );
  }