// src/pages/contact/index.jsx
import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import LocationMap from './components/LocationMap';

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 px-4 lg:py-24 bg-gradient-charity">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="bg-gradient-light rounded-[24px] p-4 shadow-custom-light inline-flex items-center space-x-3 mb-6">
                <img src="/images/img_mail.svg" alt="Contact" className="w-5 h-5" />
                <span className="text-base font-semibold text-neutral-dark">Contact Us</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6 leading-tight">
                Get in <span className="text-accent-yellow">Touch</span>
              </h1>
              
              <p className="text-xl text-text-muted max-w-3xl mx-auto">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card variant="default" className="p-8 lg:p-12">
                  <h2 className="text-3xl font-bold text-neutral-dark mb-6">Send us a Message</h2>
                  <ContactForm onSubmit={handleFormSubmit} />
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <ContactInfo />
                
                {/* Quick Links */}
                <Card variant="gradient" className="p-8">
                  <h3 className="text-xl font-semibold text-neutral-dark mb-6">Quick Actions</h3>
                  <div className="space-y-4">
                    <Button 
                      variant="primary" 
                      size="medium"
                      className="w-full rounded-[20px] justify-start"
                    >
                      <img src="/images/img_heart_traced.svg" alt="Donate" className="w-5 h-5 mr-3" />
                      Make a Donation
                    </Button>
                    <Button 
                      variant="outline" 
                      size="medium"
                      className="w-full rounded-[20px] justify-start"
                    >
                      <img src="/images/img_settings.svg" alt="Volunteer" className="w-5 h-5 mr-3" />
                      Become a Volunteer
                    </Button>
                    <Button 
                      variant="outline" 
                      size="medium"
                      className="w-full rounded-[20px] justify-start"
                    >
                      <img src="/images/img_mail.svg" alt="Newsletter" className="w-5 h-5 mr-3" />
                      Subscribe to Newsletter
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Location and Map */}
        <section className="py-16 px-4 bg-gradient-gallery">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-6">
                Visit Our <span className="text-accent-yellow">Center</span>
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                Come see our work in action. You're always welcome to visit our center and witness the impact firsthand.
              </p>
            </div>
            
            <LocationMap />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-6">
                Frequently Asked <span className="text-accent-yellow">Questions</span>
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: 'How can I make a donation?',
                  answer: 'You can donate through our website, by visiting our center, or through bank transfer. All donation methods are secure and transparent.'
                },
                {
                  question: 'Can I volunteer with your organization?',
                  answer: 'Absolutely! We welcome volunteers of all backgrounds. You can help with meal distribution, teaching, event organization, and many other activities.'
                },
                {
                  question: 'How do I know my donation is being used effectively?',
                  answer: 'We provide regular updates to all donors about how their contributions are making a difference. You can also visit our center to see our work firsthand.'
                },
                {
                  question: 'Do you provide tax receipts for donations?',
                  answer: 'Yes, we provide tax-deductible receipts for all donations. You will receive an official receipt via email or post.'
                }
              ].map((faq, index) => (
                <Card key={index} variant="default" className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-dark mb-3">{faq.question}</h3>
                  <p className="text-text-muted leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Success Message */}
      {formSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card variant="default" className="p-8 max-w-md mx-4">
            <div className="text-center">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-2xl font-bold text-neutral-dark mb-4">Message Sent!</h3>
              <p className="text-text-muted mb-6">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <Button 
                onClick={() => setFormSubmitted(false)}
                variant="primary"
                className="rounded-[20px]"
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContactPage;