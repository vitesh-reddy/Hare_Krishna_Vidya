// src/pages/contact/index.jsx
import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = (formData) => {
    console.log('Form submitted:', formData)
    setTimeout(() => {
      setFormSubmitted(true);
    }, 100);
  };

  return (
    <div>
      <Header />
      <section className='flex flex-wrap-reverse w-full justify-center items-center gap-[4rem] px-[2rem] sm:px-0  sm:pt-[2.5rem] mb-[5rem] bg-[#F9F9F9] '>
        <ContactInfo/>
        <ContactForm onSubmit={onSubmit}/>        
      </section>
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
