// src/pages/services/index.jsx
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ServiceHeroSection from './components/ServiceHeroSection';
import ServiceCard from './components/ServiceCard';
import ImpactMetrics from './components/ImpactMetrics';

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: 'Annadaan',
      description: 'Provide freshly cooked, sanctified meals to those in need. Your kindness fills plates and hearts.',
      icon: '/assets/img_food_traced.svg',
      impact: '10,000+ meals served daily',
      category: 'Food Security',
      features: [
        'Fresh, sanctified meals',
        'Nutritious and balanced diet',
        'Daily meal distribution',
        'Community kitchen programs'
      ]
    },
    {
      id: 2,
      title: 'Sponsor a Child',
      description: 'Support a child\'s education, nutrition, and wellbeing. Change one life forever.',
      icon: '/assets/img_heart_traced.svg',
      impact: '500+ children sponsored',
      category: 'Child Welfare',
      features: [
        'Complete educational support',
        'Healthcare and nutrition',
        'Skill development programs',
        'Mentorship and guidance'
      ]
    },
    {
      id: 3,
      title: 'Vidya Daan',
      description: 'Help light the lamp of learning. Your support shares sacred teachings and education with young hearts.',
      icon: '/assets/img_settings.svg',
      impact: '2,000+ students educated',
      category: 'Education',
      features: [
        'Traditional and modern education',
        'Spiritual teachings',
        'Skill-based training',
        'Character development'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      
      <main>
        <ServiceHeroSection />
        
        {/* Services Overview */}
        <section className="py-16 px-4 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="bg-gradient-light rounded-[24px] p-4 shadow-custom-light inline-flex items-center space-x-3 mb-6">
                <img src="/assets/img_shines.png" alt="Services" className="w-5 h-5" />
                <span className="text-base font-semibold text-neutral-dark">Our Services</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-dark mb-6">
                Pathways to <span className="text-accent-yellow">Make a Difference</span>
              </h2>
              <p className="text-lg text-text-muted max-w-3xl mx-auto">
                Choose your way to contribute and create meaningful impact in the lives of those who need it most
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <ImpactMetrics />

        {/* How It Works */}
        <section className="py-16 px-4 bg-gradient-gallery lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-dark mb-6">
                How Your <span className="text-accent-yellow">Contribution</span> Works
              </h2>
              <p className="text-lg text-text-muted max-w-3xl mx-auto">
                A transparent journey from your donation to real impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Choose Your Cause',
                  description: 'Select from Annadaan, Child Sponsorship, or Vidya Daan',
                  icon: '🎯'
                },
                {
                  step: '02',
                  title: 'Make Donation',
                  description: 'Secure payment through multiple convenient options',
                  icon: '💳'
                },
                {
                  step: '03',
                  title: 'Implementation',
                  description: 'Our team ensures your contribution reaches those in need',
                  icon: '🤝'
                },
                {
                  step: '04',
                  title: 'Impact Updates',
                  description: 'Receive regular updates on how your kindness is making a difference',
                  icon: '📊'
                }
              ].map((item, index) => (
                <Card key={index} variant="default" className="text-center p-8 hover:shadow-custom-medium transition-all duration-300">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <div className="text-4xl font-bold text-accent-yellow mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold text-neutral-dark mb-4">{item.title}</h3>
                  <p className="text-text-muted">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Card variant="primary" className="p-12 lg:p-16 rounded-[0px_50px_0px_50px]">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Make an Impact?
              </h2>
              <p className="text-xl text-white bg-opacity-90 mb-8">
                Every contribution matters. Start your journey of kindness today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="accent" 
                  size="large"
                  className="px-8 py-4 text-lg rounded-[25px] shadow-custom-blue"
                >
                  Start Donating
                </Button>
                <Button 
                  variant="outline" 
                  size="large"
                  className="px-8 py-4 text-lg rounded-[25px] border-white text-white hover:bg-white hover:text-primary-blue"
                >
                  Learn More
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;