import React from 'react';

const blogData = {
  title: 'Why Mid Day Meal is a Modern Bhakti Movement',
  subtitle: 'Discovering the spiritual essence of feeding the hungry in Krishna consciousness',
  author: 'Radha Devi',
  date: 'March 15, 2024',
  verse: `"annad bhavanti bhutani parjanyad anna-sambhavah\nyajnad bhavati parjanyo yajnah karma-samudbhavah"\n— Bhagavad Gita 3.14`,
  verseMeaning:
    'All living beings subsist on food grains, which are produced from rains. Rains are produced by performance of yajna [sacrifice], and yajna is born of prescribed duties.',
  imageAlt: 'Children enjoying their mid-day meal with gratitude and joy',
  spiritualText:
    'When we prepare and serve food with devotion, we transform a simple act into a powerful spiritual practice. The mid-day meal program becomes a modern manifestation of the ancient principle of prasadam — food offered to the Divine and then distributed as mercy.',
  spiritualPrinciples: [
    {
      icon: '🧡',
      text: 'Seva (Service): Serving food purifies the heart and develops compassion',
    },
    {
      icon: '🙏',
      text: 'Gratitude: Teaching children to be thankful for their daily sustenance',
    },
    {
      icon: '♾️',
      text: 'Karma Yoga: Acting without attachment to results, offering all to Krishna',
    },
    {
      icon: '🔷',
      text: 'Unity: Recognizing the divine presence in every child we serve',
    },
  ],
  transformationQuote:
    'When I first started serving in the mid-day meal program, I thought I was just helping feed hungry children. But after months of this seva, I realized the children were feeding my soul. Their innocent smiles, their gratitude for simple dal-rice, their prayers before eating—it all awakened something beautiful within me.',
  howToPractice: {
    beforeCooking: [
      'Cleanse your mind with prayer',
      'Offer the ingredients to Krishna',
      'Cook with love and mindfulness',
      'Maintain cleanliness as worship',
    ],
    whileServing: [
      'See Krishna in every child',
      'Serve with humility and joy',
      'Encourage gratitude prayers',
      'Share spiritual stories during meals',
    ],
  },
};

const BlogView = () => {
  return (
    <div className="w-full bg-[#fdfcf9] text-[#1f1f1f]">
      <div className="relative w-full h-[30rem] bg-cover bg-center flex items-center justify-center text-center text-white" style={{ backgroundImage: `url('/your-temple-bg.jpg')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 px-[1.5rem]">
          <h1 className="text-[2.5rem] font-bold leading-tight">{blogData.title}</h1>
          <p className="text-[1.125rem] mt-[0.5rem]">{blogData.subtitle}</p>
          <div className="text-[0.875rem] mt-[0.5rem] opacity-80">
            By {blogData.author} • {blogData.date}
          </div>
        </div>
      </div>

      <div className="max-w-[64rem] mx-auto px-[1rem] py-[2rem]">
        <p className="text-[1rem] mb-[1.5rem]">
          In the sacred tradition of <i>anna-dana</i> (food donation), we find one of the most profound expressions of bhakti... 
        </p>

        <blockquote className="bg-[#f3f3f3] p-[1rem] border-l-[0.25rem] border-[#d4a373] text-[0.95rem] mb-[2rem]">
          <p className="italic whitespace-pre-line">{blogData.verse}</p>
          <p className="mt-[0.5rem] text-[0.85rem] text-[#555]">{blogData.verseMeaning}</p>
        </blockquote>

        <h2 className="text-[1.5rem] font-semibold mb-[1rem]">🍛 The Spiritual Science of Feeding</h2>
        <p className="text-[1rem] mb-[1rem]">{blogData.spiritualText}</p>

        <img
          src="/your-meal-image.jpg"
          alt={blogData.imageAlt}
          className="w-full rounded-[0.5rem] shadow-md mb-[0.5rem]"
        />
        <p className="text-center text-[0.85rem] mb-[2rem]">{blogData.imageAlt}</p>

        <h3 className="text-[1.25rem] font-semibold mb-[1rem]">Key Spiritual Principles:</h3>
        <ul className="list-disc pl-[1rem] mb-[2rem]">
          {blogData.spiritualPrinciples.map((principle, idx) => (
            <li key={idx} className="text-[1rem] mb-[0.5rem]">
              <span className="mr-[0.5rem]">{principle.icon}</span> {principle.text}
            </li>
          ))}
        </ul>

        <h3 className="text-[1.25rem] font-semibold mb-[0.5rem]">A Volunteer's Transformation</h3>
        <p className="italic text-[1rem] mb-[1rem]">“{blogData.transformationQuote}”</p>

        <h3 className="text-[1.25rem] font-semibold mb-[1rem]">How to Practice Bhakti Through Food Service</h3>
        <div className="flex flex-col md:flex-row gap-[2rem]">
          <div className="flex-1 bg-[#fff] p-[1rem] rounded-[0.5rem] shadow-sm">
            <h4 className="text-[1.125rem] font-semibold mb-[0.5rem]">🍴 Before Cooking</h4>
            <ul className="list-disc pl-[1rem] text-[1rem]">
              {blogData.howToPractice.beforeCooking.map((item, idx) => (
                <li key={idx} className="mb-[0.5rem]">{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex-1 bg-[#fff] p-[1rem] rounded-[0.5rem] shadow-sm">
            <h4 className="text-[1.125rem] font-semibold mb-[0.5rem]">🧺 While Serving</h4>
            <ul className="list-disc pl-[1rem] text-[1rem]">
              {blogData.howToPractice.whileServing.map((item, idx) => (
                <li key={idx} className="mb-[0.5rem]">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-[3rem]">
          <h3 className="text-[1.25rem] font-semibold mb-[1rem]">Join the Movement</h3>
          <p className="mb-[1rem] text-[1rem]">Help us serve more children and spread the joy of bhakti through food service</p>
          <button className="bg-[#ff814b] text-white px-[1.5rem] py-[0.75rem] rounded-[0.5rem] text-[1rem] font-medium shadow-md hover:opacity-90 transition-all duration-300">
            🍲 Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
