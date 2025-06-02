import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import HeroSection from '../../components/common/HeroSection';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const HomePage = () => {
  const [selectedAmount, setSelectedAmount] = useState('5000');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const handleDonationClick = () => {
    setShowPaymentSuccess(true);
    setTimeout(() => setShowPaymentSuccess(false), 3000);
  };

  const testimonials = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet consectetur. Libero convallis proin habitasse sollicitudin. Mi adipiscing sed quis odio duis ipsum eget scelerisque quis.",
      name: "Lorem ipsum",
      location: "Lorem ipsum",
      donation: "Donated ₹1000 in Anadaan",
      image: "/images/img_ellipse_3.png"
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet consectetur. Libero convallis proin habitasse sollicitudin. Mi adipiscing sed quis odio duis ipsum eget scelerisque quis.",
      name: "Lorem ipsum",
      location: "Lorem ipsum",
      donation: "Donated ₹1000 in Anadaan",
      image: "/images/img_ellipse_3.png"
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet consectetur. Libero convallis proin habitasse sollicitudin. Mi adipiscing sed quis odio duis ipsum eget scelerisque quis.",
      name: "Lorem ipsum",
      location: "Lorem ipsum",
      donation: "Donated ₹1000 in Anadaan",
      image: "/images/img_ellipse_3.png"
    }
  ];

  const galleryImages = [
    { src: "/images/img_image_15.png", alt: "Children receiving education" },
    { src: "/images/img_image_16.png", alt: "Community gathering" },
    { src: "/images/img_image_17.png", alt: "Educational activities" },
    { src: "/images/img_image_18.png", alt: "Food distribution" },
    { src: "/images/img_image_19.png", alt: "Happy children" }
  ];

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      
      <main>
        <HeroSection />

        {/* Mission Section */}
        <section className="py-12 px-4 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-dark mb-4">
                Give Nourishment, <span className="text-accent-yellow">Give Knowledge,</span> Give Hope
              </h2>
              <p className="text-lg text-text-muted max-w-3xl mx-auto">
                Decide the path of your kindness — each one leads to hope and transformation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Annadaan Card */}
              <Card variant="gradient" className="border border-border-primary rounded-[30px] p-6 lg:p-8 hover:shadow-custom-medium transition-all duration-300">
                <div className="bg-accent-yellow bg-opacity-50 w-14 h-14 lg:w-[59px] lg:h-[59px] rounded-full flex items-center justify-center mb-6 lg:mb-8">
                  <img src="/images/img_food_traced.svg" alt="Food icon" className="w-6 h-6 lg:w-7 lg:h-7" />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-black mb-4">Annadaan</h3>
                <p className="text-base lg:text-lg text-text-muted leading-6 mb-6">
                  Provide freshly cooked, sanctified meals to those in need. Your kindness fills plates and hearts.
                </p>
                <Link to="/services">
                  <Button variant="outline" size="medium" className="w-full rounded-[20px]">
                    Learn More
                  </Button>
                </Link>
              </Card>

              {/* Sponsor a Child Card */}
              <Card variant="gradient" className="border border-border-primary rounded-[30px] p-6 lg:p-8 hover:shadow-custom-medium transition-all duration-300">
                <div className="bg-accent-yellow bg-opacity-50 w-14 h-14 lg:w-[59px] lg:h-[59px] rounded-full flex items-center justify-center mb-6 lg:mb-8">
                  <img src="/images/img_heart_traced.svg" alt="Child icon" className="w-6 h-6 lg:w-7 lg:h-7" />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-black mb-4">Sponsor a Child</h3>
                <p className="text-base lg:text-lg text-text-muted leading-6 mb-6">
                  Support a child's education, nutrition, and wellbeing. Change one life forever.
                </p>
                <Link to="/services">
                  <Button variant="outline" size="medium" className="w-full rounded-[20px]">
                    Learn More
                  </Button>
                </Link>
              </Card>

              {/* Vidya Daan Card */}
              <Card variant="gradient" className="border border-border-primary rounded-[30px] p-6 lg:p-8 hover:shadow-custom-medium transition-all duration-300 md:col-span-2 lg:col-span-1">
                <div className="bg-accent-yellow bg-opacity-50 w-14 h-14 lg:w-[59px] lg:h-[59px] rounded-full flex items-center justify-center mb-6 lg:mb-8">
                  <img src="/images/img_settings.svg" alt="Education icon" className="w-6 h-6 lg:w-7 lg:h-7" />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-black mb-4">Vidya Daan</h3>
                <p className="text-base lg:text-lg text-text-muted leading-6 mb-6">
                  Help light the lamp of learning. Your support shares sacred teachings and education with young hearts.
                </p>
                <Link to="/services">
                  <Button variant="outline" size="medium" className="w-full rounded-[20px]">
                    Learn More
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* Donation Journey Section */}
        <section className="py-12 px-4 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Journey Steps */}
              <Card variant="primary" className="rounded-[0px_50px_0px_50px] p-8 lg:p-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 lg:mb-12">Your Donation Journey</h2>
                
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="bg-white bg-opacity-70 rounded-[15px] p-4 flex items-center space-x-4">
                    <div className="bg-white w-10 h-10 lg:w-[42px] lg:h-[42px] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg lg:text-xl font-bold text-neutral-dark">1</span>
                    </div>
                    <span className="text-lg lg:text-xl font-bold text-neutral-dark">🧡 You Select a Cause</span>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white bg-opacity-70 rounded-[15px] p-4 flex items-center space-x-4">
                    <div className="bg-white w-10 h-10 lg:w-[42px] lg:h-[42px] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg lg:text-xl font-bold text-neutral-dark">2</span>
                    </div>
                    <span className="text-lg lg:text-xl font-bold text-neutral-dark">💳 Make a Secure Donation</span>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white bg-opacity-70 rounded-[15px] p-4 flex items-center space-x-4">
                    <div className="bg-white w-10 h-10 lg:w-[42px] lg:h-[42px] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg lg:text-xl font-bold text-neutral-dark">3</span>
                    </div>
                    <span className="text-lg lg:text-xl font-bold text-neutral-dark">🙏 Get Updates on Real Impact</span>
                  </div>
                </div>
              </Card>

              {/* Right Side - Success Message */}
              <Card variant="secondary" className="rounded-[0px_50px_0px_50px] p-8 lg:p-12 relative">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-opacity-90 mb-6">Woohoo! 🎉</h2>
                <p className="text-lg lg:text-xl text-white text-opacity-90 mb-8 leading-6">
                  Your kindness will serve fresh, sanctified meals to <span className="font-bold">100 children today.</span>
                </p>
                <Link to="/donate">
                  <Button 
                    className="bg-accent-yellow text-white px-6 py-3 rounded-[20px] font-semibold shadow-custom-light hover:bg-accent-dark transition-colors flex items-center space-x-3 w-full sm:w-auto justify-center"
                  >
                    <span>Click here to make payment</span>
                    <img src="/images/img_credit.png" alt="Credit card" className="w-6 h-6 lg:w-7 lg:h-7" />
                  </Button>
                </Link>
              </Card>
            </div>

            {/* Mobile Donation Interface */}
            <div className="mt-12 flex justify-center">
              <div className="relative max-w-sm w-full">
                <img 
                  src="/images/img_iphone_15_1.png" 
                  alt="Mobile donation interface" 
                  className="w-full h-auto max-w-[384px] mx-auto rounded-[30px] lg:rounded-[50px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 px-4 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="bg-gradient-light rounded-[24px] p-4 shadow-custom-light inline-flex items-center space-x-3 mb-6">
                <img src="/images/img_shines.png" alt="Shine icon" className="w-5 h-5" />
                <span className="text-base font-semibold text-black">Testimonials</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
                Your <span className="text-accent-yellow">Impact in Their Words</span>
              </h2>
              <p className="text-lg text-neutral-dark text-center max-w-2xl mx-auto">
                Real voices. Real change. Hear from those whose lives have been transformed by your kindness.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="relative">
                  <div className="border-4 border-accent-yellow rounded-[40px] p-0 overflow-hidden">
                    <Card variant="secondary" className="rounded-[40px] p-6 lg:p-8">
                      <p className="text-lg lg:text-2xl text-white text-opacity-90 mb-8 lg:mb-12 leading-relaxed">
                        {testimonial.text}
                      </p>
                      
                      <div className="flex items-center space-x-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-16 h-16 lg:w-[85px] lg:h-[85px] rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-xl lg:text-2xl font-bold text-white leading-tight">{testimonial.name}</h4>
                          <p className="text-base lg:text-lg text-white text-opacity-70 leading-6">{testimonial.location}</p>
                          <p className="text-sm lg:text-base font-semibold text-white leading-5">{testimonial.donation}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-12 px-4 sm:py-16 lg:py-20 bg-gradient-gallery">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="bg-gradient-light rounded-[24px] p-4 shadow-custom-light inline-flex items-center space-x-3 mb-6">
                <img src="/images/img_shines.png" alt="Shine icon" className="w-5 h-5" />
                <span className="text-base font-semibold text-black">Gallery</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8">
                A glimpse into the lives you have touched with your <span className="text-accent-yellow">kindness.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <Card className="bg-white rounded-[20px] p-0 overflow-hidden group">
                  <img 
                    src={galleryImages[0].src} 
                    alt={galleryImages[0].alt}
                    className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Card>
                <Card className="bg-white rounded-[20px] p-0 overflow-hidden group">
                  <img 
                    src={galleryImages[3].src} 
                    alt={galleryImages[3].alt}
                    className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Card>
              </div>

              {/* Center Column */}
              <div className="sm:col-span-2">
                <Card className="bg-white rounded-[20px] p-0 mb-6 overflow-hidden group">
                  <img 
                    src={galleryImages[1].src} 
                    alt={galleryImages[1].alt}
                    className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Card>
                
                <div className="text-center py-8 lg:py-12">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-dark leading-tight">
                    Real change does not always speak<br className="hidden sm:block" />
                    it shows. <span className="text-accent-yellow font-extrabold">Just like this.</span>
                  </h3>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <Card className="bg-white rounded-[20px] p-0 overflow-hidden group">
                  <img 
                    src={galleryImages[2].src} 
                    alt={galleryImages[2].alt}
                    className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Card>
                <Card className="bg-white rounded-[20px] p-0 overflow-hidden group">
                  <img 
                    src={galleryImages[4].src} 
                    alt={galleryImages[4].alt}
                    className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Card>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/gallery">
                <Button 
                  variant="primary" 
                  size="large"
                  className="px-8 py-4 text-lg rounded-[25px] shadow-custom-blue"
                >
                  View Full Gallery
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Payment Success Modal */}
      {showPaymentSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-neutral-dark mb-4">Thank You!</h3>
              <p className="text-lg text-text-muted mb-6">
                Your donation will help feed 100 children today. You will receive updates on the impact of your kindness.
              </p>
              <Button 
                onClick={() => setShowPaymentSuccess(false)}
                variant="primary"
                className="rounded-[20px]"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;