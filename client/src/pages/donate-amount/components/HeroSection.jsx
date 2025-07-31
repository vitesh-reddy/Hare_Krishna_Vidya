import DonationCards from './DonationCards';
import StatsCard from './StatsCard';

const HeroSection = () => {

  return (
    <section className="relative bg-[#001b2c] rounded-[40px] mx-auto mb-0 lg:mb-8 overflow-hidden w-[95%] h-[28rem] md:h-[40rem] lg:h-[48rem] lg:px-4">
      <div className="absolute inset-0">
        <div className='absolute inset-0 bg-black/10' ></div>
        <img
          src="/assets/Home Hero Image.png"
          alt="Children receiving food"
          className="w-full h-full object-cover rounded-[40px] opacity-70"
        />
      </div>
 
      <div className="absolute z-10 px-8 w-full h-full flex flex-col items-center gap-[3rem] justify-center">
        <StatsCard position={'inside'} />
        <div className="max-w-[40rem] mx-auto text-center">
          <p className="font-urbanist text-[1.5rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[3rem] font-bold text-white leading-[1.5rem] md:leading-[3rem] lg:leading-[3.5rem]">
            Make a Lasting Difference. <span className="[font-style:oblique_6deg] text-[#f4a261]"> One Act of Giving </span>at a Time.
          </p>

          <p className="font-inter text-[0.75rem] sm:text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] font-[350] text-white leading-0 max-w-[35rem] lg:max-w-2xl mx-auto">
            Support a cause that speaks to your soul. Your donation fuels real, lasting impact.
          </p>
        </div>
        <DonationCards/>      
      </div>
    </section>
  );
};

export default HeroSection;
