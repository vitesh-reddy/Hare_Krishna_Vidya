// src/pages/contact/components/ContactInfo.jsx
import React from 'react';
import Card from '../../../components/ui/Card';

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: '/assets/img_phone.svg',
      title: 'Phone',
      primary: '+91 98765 43210',
      secondary: '+91 87654 32109',
      description: 'Call us during business hours'
    },
    {
      icon: '/assets/img_mail.svg',
      title: 'Email',
      primary: 'info@hkvidya.org',
      secondary: 'donate@hkvidya.org',
      description: 'We respond within 24 hours'
    },
    {
      icon: '/assets/img_settings.svg',
      title: 'Address',
      primary: '123 Seva Road, Krishna Nagar',
      secondary: 'Mumbai, Maharashtra 400001',
      description: 'Visit us Monday to Saturday'
    }
  ];

  const socialLinks = [
    { icon: '/assets/img_facebook.svg', name: 'Facebook', url: '#' },
    { icon: '/assets/img_instagram.svg', name: 'Instagram', url: '#' },
    { icon: '/assets/img_x.svg', name: 'Twitter', url: '#' },
    { icon: '/assets/img_youtube.svg', name: 'YouTube', url: '#' },
    { icon: '/assets/img_linkedin.svg', name: 'LinkedIn', url: '#' }
  ];

  return (
    <>
      {/* Contact Methods */}
      <Card variant="default" className="p-8">
        <h3 className="text-xl font-semibold text-neutral-dark mb-6">Get in Touch</h3>
        <div className="space-y-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-accent-yellow bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <img src={method.icon} alt={method.title} className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-dark mb-1">{method.title}</h4>
                <p className="text-neutral-dark font-medium">{method.primary}</p>
                {method.secondary && (
                  <p className="text-text-muted">{method.secondary}</p>
                )}
                <p className="text-sm text-text-muted mt-1">{method.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Business Hours */}
      <Card variant="gradient" className="p-8">
        <h3 className="text-xl font-semibold text-neutral-dark mb-6">Office Hours</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-neutral-dark">Monday - Friday</span>
            <span className="font-medium text-neutral-dark">9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-dark">Saturday</span>
            <span className="font-medium text-neutral-dark">10:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-dark">Sunday</span>
            <span className="font-medium text-neutral-dark">Closed</span>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white bg-opacity-50 rounded-xl">
          <p className="text-sm text-neutral-dark">
            <strong>Emergency Contact:</strong> For urgent matters, call our 24/7 helpline at +91 98765 43210
          </p>
        </div>
      </Card>

      {/* Social Media */}
      <Card variant="default" className="p-8">
        <h3 className="text-xl font-semibold text-neutral-dark mb-6">Follow Us</h3>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              className="bg-gradient-light w-12 h-12 rounded-full flex items-center justify-center hover:bg-accent-yellow hover:bg-opacity-20 transition-colors duration-300"
              aria-label={`Follow us on ${social.name}`}
            >
              <img src={social.icon} alt={social.name} className="w-6 h-6" />
            </a>
          ))}
        </div>
        <p className="text-sm text-text-muted mt-4">
          Stay updated with our latest activities and impact stories
        </p>
      </Card>
    </>
  );
};

export default ContactInfo;