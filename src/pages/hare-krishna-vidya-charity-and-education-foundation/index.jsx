// src/pages/hare-krishna-vidya-charity-and-education-foundation/index.jsx
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const HareKrishnaVidyaPage = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-[#edf2f7] to-[#f9feff]">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#e8e8e8] to-white rounded-[24px] p-4 shadow-[6px_6px_15px_rgba(185,185,185,0.9)] inline-flex items-center space-x-3 mb-6">
              <img src="/assets/img_shines.png" alt="Shine icon" className="w-5 h-5" />
              <span className="text-base font-semibold text-black">Our Foundation</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-[#2c2c2c] mb-6 leading-tight">
              Hare Krishna Vidya
            </h1>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#e76f51] mb-8">
              Charity and Education Foundation
            </h2>
            
            <p className="text-xl text-[#656565] mb-12 leading-relaxed max-w-4xl mx-auto">
              Dedicated to providing meals, books, and education to underprivileged children. Our mission is to nourish both body and mind, creating lasting change in communities across India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#f4a261] text-white px-8 py-4 rounded-[20px] font-semibold text-lg shadow-soft hover:bg-[#e89a5c] transition-colors">
                Donate Now
              </Button>
              <Button className="bg-transparent border-2 border-[#0b3954] text-[#0b3954] px-8 py-4 rounded-[20px] font-semibold text-lg hover:bg-[#0b3954] hover:text-white transition-colors">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <Card className="bg-white rounded-[30px] p-0 shadow-[15px_15px_38px_rgba(209,213,215,0.9)] overflow-hidden">
                <img 
                  src="https://assets.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Children receiving education and meals" 
                  className="w-full h-[400px] object-cover"
                />
              </Card>
              
              <div>
                <h3 className="text-4xl font-bold text-[#2c2c2c] mb-6">
                  Our <span className="text-[#f4a261]">Mission</span>
                </h3>
                <p className="text-lg text-[#656565] mb-6 leading-relaxed">
                  We believe that every child deserves access to nutritious food and quality education. Our foundation works tirelessly to bridge the gap between privilege and need, ensuring that socioeconomic barriers don't prevent children from reaching their full potential.
                </p>
                <p className="text-lg text-[#656565] mb-8 leading-relaxed">
                  Through our comprehensive programs, we provide not just immediate relief but sustainable solutions that empower communities to thrive independently.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#f4a261] w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-lg text-[#2c2c2c] font-medium">Daily nutritious meals for over 10,000 children</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#f4a261] w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-lg text-[#2c2c2c] font-medium">Quality education and learning materials</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#f4a261] w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-lg text-[#2c2c2c] font-medium">Spiritual and moral guidance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-[#edf2f7] to-[#f9feff]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-[#2c2c2c] mb-6">
                Our <span className="text-[#f4a261]">Programs</span>
              </h2>
              <p className="text-xl text-[#656565] max-w-3xl mx-auto leading-relaxed">
                Comprehensive initiatives designed to address the multifaceted needs of underprivileged children
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Annadaan Program */}
              <Card variant="gradient" className="rounded-[30px] p-8 border border-[#cfcfcf]">
                <div className="bg-[rgba(244,162,97,0.5)] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <img src="/assets/img_food_traced.svg" alt="Food icon" className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#2c2c2c] mb-4">Annadaan</h3>
                <p className="text-lg text-[#656565] mb-6 leading-relaxed">
                  Our food distribution program ensures no child goes hungry. We serve freshly prepared, nutritious meals that support healthy growth and development.
                </p>
                <ul className="text-base text-[#656565] space-y-2">
                  <li>• 10,000+ daily meals served</li>
                  <li>• Balanced nutrition for growing children</li>
                  <li>• Fresh, sanctified food preparation</li>
                  <li>• Community-based distribution centers</li>
                </ul>
              </Card>

              {/* Education Program */}
              <Card variant="gradient" className="rounded-[30px] p-8 border border-[#cfcfcf]">
                <div className="bg-[rgba(231,111,81,0.5)] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <img src="/assets/img_books_traced.svg" alt="Books icon" className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#2c2c2c] mb-4">Vidya Daan</h3>
                <p className="text-lg text-[#656565] mb-6 leading-relaxed">
                  Quality education program that provides academic learning alongside moral and spiritual development for holistic growth.
                </p>
                <ul className="text-base text-[#656565] space-y-2">
                  <li>• 5,000+ students enrolled</li>
                  <li>• Modern teaching methodologies</li>
                  <li>• Free books and learning materials</li>
                  <li>• Character development focus</li>
                </ul>
              </Card>

              {/* Child Sponsorship Program */}
              <Card variant="gradient" className="rounded-[30px] p-8 border border-[#cfcfcf]">
                <div className="bg-[rgba(11,57,84,0.5)] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <img src="/assets/img_heart_traced.svg" alt="Heart icon" className="w-8 h-8 filter brightness-0 invert" />
                </div>
                <h3 className="text-2xl font-bold text-[#2c2c2c] mb-4">Child Sponsorship</h3>
                <p className="text-lg text-[#656565] mb-6 leading-relaxed">
                  Comprehensive support system that provides individual children with education, nutrition, healthcare, and mentorship.
                </p>
                <ul className="text-base text-[#656565] space-y-2">
                  <li>• One-on-one child support</li>
                  <li>• Regular progress updates</li>
                  <li>• Healthcare and nutrition</li>
                  <li>• Educational guidance</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Gallery */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-[#2c2c2c] mb-6">
                See Our <span className="text-[#e76f51]">Impact</span>
              </h2>
              <p className="text-xl text-[#656565] max-w-3xl mx-auto leading-relaxed">
                Visual stories of transformation, hope, and the power of community support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white rounded-[20px] p-0 overflow-hidden">
                <img 
                  src="https://assets.pexels.com/photos/8923184/pexels-photo-8923184.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Children enjoying meals" 
                  className="w-full h-[250px] object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-[#2c2c2c] mb-2">Nutritious Meals</h4>
                  <p className="text-sm text-[#656565]">Daily meals bring smiles and energy</p>
                </div>
              </Card>

              <Card className="bg-white rounded-[20px] p-0 overflow-hidden">
                <img 
                  src="https://assets.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Children in classroom" 
                  className="w-full h-[250px] object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-[#2c2c2c] mb-2">Quality Education</h4>
                  <p className="text-sm text-[#656565]">Building bright futures through learning</p>
                </div>
              </Card>

              <Card className="bg-white rounded-[20px] p-0 overflow-hidden">
                <img 
                  src="https://assets.pixabay.com/photo/2017/07/31/11/32/people-2557396_1280.jpg" 
                  alt="Community celebration" 
                  className="w-full h-[250px] object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-[#2c2c2c] mb-2">Community Joy</h4>
                  <p className="text-sm text-[#656565]">Celebrating achievements together</p>
                </div>
              </Card>

              <Card className="bg-white rounded-[20px] p-0 overflow-hidden">
                <img 
                  src="https://assets.pexels.com/photos/8923058/pexels-photo-8923058.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Happy children" 
                  className="w-full h-[250px] object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-[#2c2c2c] mb-2">Bright Futures</h4>
                  <p className="text-sm text-[#656565]">Hope and happiness in every face</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-gradient-to-br from-[#edf2f7] to-[#f9feff]">
          <div className="max-w-4xl mx-auto text-center">
            <Card variant="primary" className="rounded-[30px] p-12">
              <h2 className="text-4xl font-bold text-white mb-6">
                Join Our Mission Today
              </h2>
              <p className="text-xl text-[rgba(255,255,255,0.9)] mb-8 leading-relaxed">
                Your support can transform lives and create lasting change in communities. Every contribution matters, every action counts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#f4a261] text-white px-8 py-4 rounded-[20px] font-semibold text-lg shadow-soft hover:bg-[#e89a5c] transition-colors">
                  Donate Now
                </Button>
                <Button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-[20px] font-semibold text-lg hover:bg-white hover:text-[#0b3954] transition-colors">
                  Become a Volunteer
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

export default HareKrishnaVidyaPage;