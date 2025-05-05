import HeroSection from '@/components/shared/HeroSection';
import Navbar from '@/components/shared/Navbar';

export default function Home() {
  return (
    <>
      <div className="purple-blue-animated">
        <div className="text-white">
          <Navbar />
        </div>
        <HeroSection />
      </div>
    </>
  );
}
