import React from 'react';

const HeroSection = React.memo(() => {
  return (
    <section className="w-full flex flex-col items-center justify-center pt-[5rem] pb-[4rem] text-center bg-white">
      <p className="text-[#6941C6] text-[0.875rem] font-semibold mb-[0.625rem]">Our blog</p>
      <h1 className="text-[2rem] sm:text-[2rem] md:text-[2.25rem] font-bold leading-[2.75rem] mb-[1rem]">Stories and interviews</h1>
      <p className="text-[1rem] text-[#667085] max-w-[37.5rem] mb-[1.5rem]">
        Subscribe to learn about new product features, the latest in technology, solutions, and updates.
      </p>
      <form className="flex flex-col sm:flex-row items-center gap-[0.75rem]" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email" className="sr-only">Email address</label>
        <input
          id="email"
          type="email"
          required
          placeholder="Enter your email"
          className="border border-[#D0D5DD] rounded-[0.5rem] px-[1rem] py-[0.75rem] text-[0.875rem] w-[16.25rem]"
        />
        <button
          type="submit"
          className="bg-[#6941C6] hover:bg-[#53389E] text-white px-[1.25rem] py-[0.75rem] rounded-[0.5rem] text-[0.875rem] font-semibold transition-colors"
        >
          Subscribe
        </button>
      </form>
      <p className="text-[0.75rem] text-[#98A2B3] mt-[0.625rem]">
        We care about your data in our <a href="#" className="underline">privacy policy</a>
      </p>
    </section>
  );
});

export default HeroSection;
