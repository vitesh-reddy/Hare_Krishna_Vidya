import HeroSection from './components/HeroSection';
import KitsShowcase from './components/KitsShowcase';
import GrocerySection from './components/GrocerySection';
import ImpactSection from './components/ImpactSection';
import HowItWorks from './components/HowItWorks';
import TransparencySection from './components/TransparencySection';

const DonateItemsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <KitsShowcase />
      <GrocerySection />
      <ImpactSection />
      <HowItWorks />
      <TransparencySection />
    </div>
  );
};

export default DonateItemsPage;
