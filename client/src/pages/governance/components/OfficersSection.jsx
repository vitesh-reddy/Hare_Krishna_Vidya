import React from 'react'

const OfficersSection = () => {
  const bio1 = [
    "Chaitanya Krishna Dasa is currently serving as the CEdO of AIKYA Vidya. He Completed his B.Tech Mechanical Engineering from JNTU, Kakinada and worked in PSUs, Railways, and India Post (Accounting).",
    "He has been serving the Hare Krishna Movement and ISKCON (Vrindavan and Delhi temples) from the past 11 years. He is also serving as the main editor of Bhakti Vedanta Book Trust one of the world’s largest publisher of classic Vaishnava texts and contemporary works on the philosophy, theology, and culture of bhakti-yoga.",
    "He is also one of the largest social media influencers in India spreading the knowledge of the Bhagavad Gita through his digital media company JivJago media."
  ];
  const bio2 = [
    "Chaitanya Krishna Dasa is currently serving as the CEdO of AIKYA Vidya. He Completed his B.Tech Mechanical Engineering from JNTU, Kakinada and worked in PSUs, Railways, and India Post (Accounting).",
    "He has been serving the Hare Krishna Movement and ISKCON (Vrindavan and Delhi temples) from the past 11 years. He is also serving as the main editor of Bhakti Vedanta Book Trust one of the world’s largest publisher of classic Vaishnava texts and contemporary works on the philosophy, theology, and culture of bhakti-yoga.",
    "He is also one of the largest social media influencers in India spreading the knowledge of the Bhagavad Gita through his digital media company JivJago media."
  ];
  const bio3 = [
    "Raghavendra is currently serving as the CSCO of AIKYA VIDYA. He is an Ex-Political and Policy Consultant and Ex-Civil Services mentor. In a span of his 10 years career in development sector he contributed to many policy reforms in India in the spheres of education and healthcare.",
    "Earlier he worked for reputed think tanks like Centre for Civil Society and Foundation for Democratic Reforms contributing towards Governance Reforms and National Education Policy.",
    "He has published more than 60 articles for various reputed magazines like Swarajya, the Pulse and Telugu news dailies like Andhra Jyothi and Velugu.",
    "He has done his Masters in Governance from MIT school of Government and was awarded a certificate in Rule of Law by International Academy of Leadership Germany."
  ];

  return (
    <section className='mt-[4rem]'>
      <div className='space-y-[2rem] flex flex-col justify-center items-center sm:space-y-[6rem] px-[2rem] lg:px-[10rem]'>
        <div className='flex flex-col md:flex-row gap-[4rem]'>
          <div className='flex flex-col items-center'>
            <img className='w-[10rem] sm:w-[15rem]' src="/assets/Chaitanya Krishna Dasa.png" alt="Chaitanya Krishna Dasa" />
            <div className='flex flex-col gap-[1rem]'>
              {bio1.map((line, idx) => {
                return (
                  <p key={idx} className='font-inter text-center text-[#6F6F6F] font-medium text-[0.75rem] sm:text-[0.8rem] md:[0.9rem] lg:text-[1rem]  sm:leading-[1.65rem]'>{line}</p>
                )})
              }
            </div>
          </div>
          <div className='flex flex-col items-center'>
              <img className='w-[10rem] sm:w-[15rem]' src="/assets/Tejasvi Chaitanya Dasa.png" alt="Tejasvi Chaitanya Dasa" />
            <div className='flex flex-col gap-[1rem]'>
              {bio2.map((line, idx) => {
                return (
                  <p key={idx} className='font-inter text-center text-[#6F6F6F] font-medium text-[0.75rem] sm:text-[0.8rem] md:[0.9rem] lg:text-[1rem] sm:leading-[1.65rem]'>{line}</p>
                )})
              }
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <img className='w-[12rem] sm:w-[20rem]' src="/assets/Raghavendra.png" alt="Raghavendra" />
          <div className='flex flex-col gap-[1rem] sm:w-[50%]'>
            {bio3.map((line, idx) => {
              return (
                <p key={idx} className='font-inter text-center text-[#6F6F6F] font-medium text-[0.75rem] sm:text-[0.8rem] md:[0.9rem] lg:text-[1rem] sm:leading-[1.65rem]'>{line}</p>
              )})
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default OfficersSection