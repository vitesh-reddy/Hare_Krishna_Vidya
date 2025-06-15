import HeroSection from './components/HeroSection';
import KitsShowcase from './components/KitsShowcase';
import GrocerySection from './components/GrocerySection';
import ImpactSection from './components/ImpactSection';
import HowItWorks from './components/HowItWorks';
import TransparencySection from './components/TransparencySection';
import { useData } from '../../../contexts/DataContext';
import { useEffect } from 'react';
import Loader from '../../../components/common/Loader';

const DonateItemsPage = () => {
  const { kits, groceryItems, fetchKits, fetchGroceryItems, isLoading, error } = useData();
  useEffect(() => {
    if (!kits.length) fetchKits();
    if (!groceryItems.length) fetchGroceryItems();
  }, []);
  if (isLoading.kits || isLoading.groceryItems) return <Loader/> ;
  if (error.kits || error.groceryItems) return <div>Error: {error.kits || error.groceryItems}</div>;
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
