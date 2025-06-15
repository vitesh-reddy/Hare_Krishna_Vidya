import KitCard from './KitCard';
import { useData } from '../../../../contexts/DataContext';

const KitsShowcase = () => {
  const {kits} = useData();

  return (
    <section id="kits-showcase" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Choose Your <span className="text-orange-600">Impact</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Each kit is carefully curated to address specific needs in underserved communities
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {kits.map((kit) => (
            <KitCard key={kit._id} kit={kit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KitsShowcase;
