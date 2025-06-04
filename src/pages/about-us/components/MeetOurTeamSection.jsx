// src/pages/about-us/components/MeetOurTeamSection.jsx
import React from 'react';
import Card from '../../../components/ui/Card';

const TeamMemberCard = ({ name, role, description, image, experience }) => {
  return (
    <Card 
      variant="gradient" 
      className="rounded-[30px] border border-[#cfcfcf] overflow-hidden hover:shadow-[20px_20px_40px_rgba(209,213,215,0.9)] transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black bg-opacity-70 to-transparent p-6">
          <div className="bg-[#f4a261] text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-2">
            {experience}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#2c2c2c] mb-2">{name}</h3>
        <p className="text-lg font-semibold text-[#e76f51] mb-4">{role}</p>
        <p className="text-base text-[#656565] leading-relaxed">{description}</p>
      </div>
    </Card>
  );
};

const MeetOurTeamSection = () => {
  const teamMembers = [
    {
      name: "Radha Sharma",
      role: "Founder & President",
      description: "A devoted spiritual practitioner with over 20 years of experience in community service and child welfare. Radha\'s vision drives our mission forward.",
      image: "https://assets.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      experience: "20+ Years"
    },
    {
      name: "Krishna Das",
      role: "Education Director",
      description: "Former teacher with expertise in child psychology and spiritual education. Krishna ensures our educational programs meet the highest standards.",
      image: "https://assets.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      experience: "15+ Years"
    },
    {
      name: "Priya Mehta",
      role: "Nutrition Coordinator",
      description: "Certified nutritionist specializing in child health and meal planning. Priya ensures every meal we serve promotes healthy growth and development.",
      image: "https://assets.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=600",
      experience: "12+ Years"
    },
    {
      name: "Gopal Singh",
      role: "Community Outreach Manager",
      description: "Passionate about connecting with local communities and building sustainable relationships. Gopal coordinates our field operations across multiple states.",
      image: "https://assets.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      experience: "10+ Years"
    },
    {
      name: "Sita Devi",
      role: "Child Welfare Specialist",
      description: "Licensed social worker dedicated to child protection and family support services. Sita ensures our programs create safe, nurturing environments.",
      image: "https://assets.pixabay.com/photo/2017/05/31/04/59/beautiful-2359121_640.jpg",
      experience: "8+ Years"
    },
    {
      name: "Arjun Patel",
      role: "Operations Manager",
      description: "Expert in logistics and program management, Arjun ensures smooth operations across all our centers and efficient resource distribution.",
      image: "https://assets.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      experience: "9+ Years"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-[#e8e8e8] to-white rounded-[24px] p-4 shadow-[6px_6px_15px_rgba(185,185,185,0.9)] inline-flex items-center space-x-3 mb-6">
            <img src="/assets/img_shines.png" alt="Shine icon" className="w-5 h-5" />
            <span className="text-base font-semibold text-black">Our Team</span>
          </div>
          
          <h2 className="text-5xl font-bold text-[#2c2c2c] mb-6">
            Meet Our <span className="text-[#f4a261]">Dedicated</span> Team
          </h2>
          <p className="text-xl text-[#656565] max-w-3xl mx-auto leading-relaxed">
            Passionate individuals united by a common goal: to serve humanity with love, compassion, and unwavering dedication
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              role={member.role}
              description={member.description}
              image={member.image}
              experience={member.experience}
            />
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16">
          <Card variant="primary" className="rounded-[30px] p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <p className="text-lg text-[rgba(255,255,255,0.8)]">Full-time Staff</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">200+</div>
                <p className="text-lg text-[rgba(255,255,255,0.8)]">Volunteers</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">15+</div>
                <p className="text-lg text-[rgba(255,255,255,0.8)]">Years Experience</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">5</div>
                <p className="text-lg text-[rgba(255,255,255,0.8)]">States Covered</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Join Our Team CTA */}
        <div className="mt-16 text-center">
          <Card variant="gradient" className="rounded-[30px] p-12 border border-[#cfcfcf]">
            <h3 className="text-4xl font-bold text-[#2c2c2c] mb-6">
              Join Our <span className="text-[#e76f51]">Mission</span>
            </h3>
            <p className="text-xl text-[#656565] mb-8 max-w-2xl mx-auto leading-relaxed">
              We're always looking for passionate individuals who want to make a difference. Whether as a volunteer, intern, or full-time team member, there's a place for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#f4a261] text-white px-8 py-4 rounded-[20px] font-semibold text-lg shadow-soft hover:bg-[#e89a5c] transition-colors">
                Volunteer With Us
              </button>
              <button className="bg-transparent border-2 border-[#0b3954] text-[#0b3954] px-8 py-4 rounded-[20px] font-semibold text-lg hover:bg-[#0b3954] hover:text-white transition-colors">
                Career Opportunities
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeamSection;