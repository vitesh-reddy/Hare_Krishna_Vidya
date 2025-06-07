import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import React from 'react'

const PrivacyPolicyPage = () => {
  const preText = ["We recognize that you may be concerned about the information we collect from you through our website and how we treat that information. We are committed to ensuring that your privacy is protected.", "This Privacy Policy is effective from May 25, 2011. This policy describes what information we collect from you, why we collect it, how it is used, protected and retained as well as your choices regarding this information.", "If you have any questions, comments and concerns about this Privacy Policy, or any requests concerning your personal data, you may contact us at: HARE KRISHNA MOVEMENT INDIA, Hare Krishna Golden Temple, Swayambhu Sri Lakshmi Narasimha Swamy Kshetram Road #12, near Anti Corruption Bureau office, NBT Nagar, Banjara Hills."];
  const contactDetails = ["Phone: +91-95056 88881", "Email: connect2hkm@gmail.com", "https://harekrishnavidya.org/mn/"];
  const data = [
    {
      sideHeading: "Personal Information",
      body: [
        "We respect your privacy when you visit our website. At our site, we do not collect personally identifiable information unless you provide it to us voluntarily. To access the content of the website you need not register or provide your personal information.",
        "However, we gather certain personally identifiable data under specific circumstances. We do not sell or trade such information collected to third parties. Also we do not share such information with third parties unless authorized by the person submitting the information or when required by law."
      ]
    },
    {
      sideHeading: "Donations",
      body: [
        "When you make a donation through our online donation page, we collect your name, mobile number, e-mail address, postal address and zip/postal code. We use this information to acknowledge the receipt of your donation and / or to send prasadam.",
        "If you are donating for any seva, you can also specify in whose name the seva should be offered. In such cases, we collect additional details like the sevakarta’s name, his relation with you, his rashi, nakshatra and gotra which are needed to perform sankalpa in the sevakarta’s name."
      ]
    },
    {
      sideHeading: "Life Patron",
      body: [
        "You can become our life patron by enrolling in one of our life patron schemes. By becoming a life patron, you get an opportunity to participate in our various programs and get benefited by them. If you are interested in becoming a life patron, you can send us an enquiry for more details and the enrolment procedure. In the online enquiry form, we collect your name, mobile number, email address, and life patron scheme. We use this data for subsequent communication with you."
      ]
    },
    {
      sideHeading: "Donor’s Personal Data",
      body: [
        "We retain your personal information that we collect at the time of your online donation, as long as it is required for statutory or legal purposes.",
        "We use your personal information only for the purposes for which it is meant. However, you can also opt to receive our communications related to our temple festivals, events, special offers and various other opportunities for volunteering in our temple, and we use your personal data for these communications."
      ]
    },
    {
      sideHeading: "Online Contests",
      body: [
        "We occasionally conduct online contests like Krishna Costume Contest with the purpose of imparting spiritual education to the participants and encouraging them to take up spiritual practices. When you register online to participate in such contests, we collect participant’s details such as name, date of birth and gender and parent/guardian’s details such as name, mobile number, e-mail address, postal address and zip/postal code. We use this information to communicate with you regarding any matters related to the contest and send certificates/prizes to the winners."
      ]
    },
    {
      sideHeading: "Free Puja",
      body: [
        "We offer our online visitors an opportunity to have a free puja performed in their names on special occasions like Sri Krishna Janmashtami and Sri Vaikuntha Ekadashi festivals. Upon registration for free puja, they can also view the live webcast of puja on the day of the festival. When you register online for a free puja, we collect your name, address, zip/postal code, mobile number, e-mail address, your rashi, nakshatra and gotra. This information is used to communicate with you regarding any matters related to the free puja and to perform sankalpa and puja in your name. Additionally you can register your family members online for free puja, and in that case we collect name, rashi, nakshatra and gotra of the each individual member."
      ]
    },
    {
      sideHeading: "Event Registration",
      body: [
        "We conduct programs like Culture Camp and Heritage Fest (a cultural contest) for students with the purpose of nurturing their talents and inculcating cultural and spiritual values in them.",
        "When you register online for Culture Camp, we collect the participant’s name, date of birth, gender, name of school and class, and the contact person’s name, relationship with the participant, email address, mobile number, city, state, country and postal address. Alternate contact details are optional.",
        "Participant’s details are used to ensure that they are eligible for participating in Culture Camp and to give them participation certificates.",
        "When you register online for Heritage Fest, we collect the participant’s name, school name, gender and class and the contact person’s name, email address and mobile number.",
        "Participant’s details are used to ensure that they are eligible for contesting in the Heritage Fest. These details are also used to award participation certificates to all the contestants and prizes to the winners of the contest.",
        "Contact person’s details are used to communicate regarding any matters related to these events."
      ]
    },
    {
      sideHeading: "Charitable Activities",
      body: [
        "We offer scholarships on merit to economically backward students of Bengaluru every year who have appeared for the SSLC or II PUC exams. When you submit an application online for availing the scholarship, we collect the student’s name, parent/guardian’s name, address, zip/postal code, mobile number, e-mail address, student’s percentage marks, parent/guardian’s occupation, annual income, the course which the student wants to pursue, the name and postal address of the college or institution where he/she is admitted or seeking admission. This information is used for communication regarding any matters related to scholarship and to assess the student’s eligibility to receive the scholarship."
      ]
    },
    {
      sideHeading: "WhatsApp Subscription",
      body: [
        "You can subscribe to our WhatsApp Broadcast Group to receive daily messages such as daily Deity darshan, festival announcements, Ekadashi reminders, inspirational quotes, etc. This service is absolutely free and you are free to unsubscribe at any time. When you subscribe to our WhatsApp Broadcast Group, we collect your name and save it in our contacts list along with your WhatsApp number to send you the messages."
      ]
    },
    {
      sideHeading: "Enquiries (Contact Us)",
      body: [
        "When you send us an enquiry through the ‘Contact Us’ page, we collect your name and email id along with your enquiry to communicate with you and answer your questions."
      ]
    },
    {
      sideHeading: "Third party tools",
      body: [
        "We use the following third party tools in our site for various purposes as explained below."
      ]
    },
    {
      sideHeading: "AWeber (Email Subscription):",
      body: [
        "We use AWeber tool for email communication with our email subscribers. When you subscribe to our email messages, AWeber collects your name and email address to send you our emails about our upcoming festivals, special events and other important updates on our temple activities.",
        "This service is absolutely free and if you no longer wish to receive our emails, you can use the unsubscribe option provided by AWeber."
      ]
    },
    {
      sideHeading: "Tawk.to (Chat Plugin)",
      body: [
        "We use Tawk.to provide chat facility for our online visitors. When the chat box is online, you just need to type your chat message and send it to us to begin a conversation with us. While the chat box is offline, you need to leave your message along with your name and email address. We use this information to communicate with you at a later time and answer your queries."
      ]
    },
    {
      sideHeading: "Pushify (Push Notification)",
      body: [
        "We use Pushify to send Push Notifications to our subscribers. When the subscriber is using our website, he gets pop-up notifications about our upcoming festivals, special events and other important updates on our temple activities. You can subscribe to this service by using the subscribe option in the Pushify tool. Pushify will not ask you for any personal information. This service is absolutely free and you are free to unsubscribe at any time using the unsubscribe option provided by the tool."
      ]
    },
    {
      sideHeading: "Payment Gateways",
      body: [
        "Payment Gateways allow you to make a payment electronically using your credit card, debit card, net banking or other payment methods.",
        "The payment gateways collect data that may include your contact details, your card details and the transaction details which facilitates your online payment. We don’t collect or store any of these personal details and we don’t have any control over them. This data is completely managed by the Payment Gateway tools according to their own privacy policies.",
        "We use the following Payment Gateways.",
        " • RazorPay",
        " • PayU Money",
        " • Axis",
        " • TPSL",
        " • HDFC",
        " • Instamojo",
        " • Billdesk"
      ]
    },
    {
      sideHeading: "Google Analytics/ Google Tag Manager (for Analytics)",
      body: [
        "We use Google Analytics/ Google Tag Manager to analyze and evaluate the use and performance of our website in order to improve your online experience and take up necessary steps needed to further our objectives.",
        "Google Analytics/ Google Tag Manager collects non-personal data that may include your IP address, geographical location, browser type and version, operating system, referral source, length of visit, page views and website navigation paths, as well as information about the timing, frequency and pattern of your website visit.",
        "This data is used in research and analytics to determine the popularity of our website content, measure the effectiveness of advertising campaigns, analyze site traffic and trends, and to understand the online behaviors and interests of our website visitors."
      ]
    },
    {
      sideHeading: "Donation Refund Policy",
      body: [
        "We follow a reliable refund policy to let our donors feel privileged about their association with us. We take utmost care about processing donations as per the mandates signed by our donors in the donor forms, both offline and online. But in case of an unlikely event of an erroneous deduction or if the donor wants to cancel/deduct the donation, we will respond within 7 working days from the date of receiving the complaint from donor. The timely refund of the wrongly deduced amount will depend on type of card used during transaction. We would require a proof of deduction of the donation amount and a written communication for refund from the donor within two days after donation.",
        "In such cases if the receipt already has been issued, then the donor needs to return the original receipt at our official address.",
        "In the case of tax exemption certificate already issued, refund will not be possible.",
        "Please note that international donations will require more working days for refund."
      ]
    },
    {
      sideHeading: "Security",
      body: [
        "We are committed to ensure that the information you share with us is secure. In order to protect your data from unauthorized access or disclosure, or unlawful processing and against accidental loss, destruction or damage we have put in place suitable physical, electronic and managerial procedures."
      ]
    },
    {
      sideHeading: "Cookies",
      body: [
        "The third party tools that we use in our website as mentioned above may use cookies to automatically collect your non-personal information. Cookies are small text files a website can use to recognize repeat visitors, facilitate the visitor’s ongoing access to and use of the site, and allow a site to track usage behavior and compile aggregate data that will allow content improvements. Cookies are not programs that come onto visitor’s system and damage files. Generally, cookies work by assigning a unique number to the visitor that has no meaning outside the assigning site. If you don’t want information to be collected through the use of cookies, there is a simple procedure in most browsers that allows you to deny or accept the cookie feature. Blocking cookies will have a negative impact on the performance of the third party tools and consequently you may not be able to use some of the features of our website."
      ]
    },
    {
      sideHeading: "External Links",
      body: [
        "Our website may contain links to other websites of interest. The fact that we have provided a link to a site is not a representation, an endorsement, authorization, sponsorship, or affiliation with respect to such site, its contents, its owners, or its providers unless we expressly state otherwise. There are risks associated with using any information, software, or products found on the internet, and we caution you to make sure that you understand these risks before retrieving, using, relying upon, or purchasing anything via the internet. These other sites may collect or solicit personal data or send their own cookies to your computer. Please be aware that we are not responsible for the privacy practices of those sites regarding the collection and use of your personal information."
      ]
    },
    {
      sideHeading: "Amendments to this Policy",
      body: [
        "If we decide to change our privacy policy, we will post those changes to this privacy statement so you are always aware of what information we collect, how we use it, and under what circumstances, if any, we disclose it. We will use information in accordance with the privacy policy under which the information was collected. We encourage you to periodically review this policy for the latest information on our privacy practices.",
        "If we decide to use your personally identifiable information in a manner significantly different from that stated at the time of collection, we will notify you through e-mail and will not use your information in the new manner unless your express permission is granted. However, if you have opted out of all communication with the site, or deleted/deactivated your account, then you will not be contacted, nor will your personal information be used in this new manner."
      ]
    },
    {
      sideHeading: "Data Retention",
      body: [
        "We seek to retain your personal information only as long as necessary to fulfil the purposes described in this policy unless a longer retention period is required by law or regulations. For example, tax laws in India may require us to keep contact information and contribution level of donors on a file."
      ]
    },
    {
      sideHeading: "Rights",
      body: [
        "You have certain rights with respect to the personal information we collect about you. Upon your request, we tell you what information we hold about you, we rectify any incomplete or inaccurate information and also restrict the use of your information. We will make reasonable efforts to delete your information if you ask us to do so, unless we are otherwise required to keep it."
      ]
    },
    {
      sideHeading: "Sharing",
      body: [
        "Though we make a good faith effort to preserve your privacy, we may need to disclose your personal information when required by law wherein we have a good faith belief that such action is necessary to comply with a current judicial proceeding, a court order or legal process served on our website or when needed to protect our rights, privacy, safety, property, donors, or users; and when necessary to enforce our terms of service."
      ]
    }
  ];

  return (
    <div>
      <Header/>
      <main className='bg-[#F9F9F9] px-[1.5rem] sm:pl-[4.5rem] sm:pr-[14rem] pt-[3rem]'>
        <p className='text-[#005389] font-urbanist font-bold text-[2rem] lg:text-[3.25rem] mb-[1rem] sm:mb-[3rem]'>Privacy Policy</p>


        <p className='font-medium text-[1rem]'>This website is owned and operated by <span className='font-bold'> HARE KRISHNA MOVEMENT INDIA. </span> In this Privacy Policy, “we”, “us” and “our” refer to <span className='font-bold'> HARE KRISHNA MOVEMENT INDIA.</span></p>
        <p className='font-medium text-[1rem] mb-[2rem]'>{preText}</p>

        <div className='mb-[2rem]'>
          {contactDetails.map((contact, idx) => {
            return ( <p className='font-medium text-[1rem]'>{contact}</p> )
          })}
        </div>

        <div className=''>{
          data.map(({sideHeading, body, idx}) => {
            return (              
              <div className='text-[#2C2C2C] font-inter flex flex-col space-y-[0.5rem] pb-[2rem]' key={idx} >
                <SideHeading text={sideHeading} />
                <BodyPara body={body}/>
              </div>
            )
          })
          }
        </div>
      </main>
      <Footer/>
    </div>
  )
}

const SideHeading = ({text}) => {
  return (
    <p className='font-bold text-[1.25rem]'>{text}</p>
  )
}

const BodyPara = ({body}) => {
  return (
    <div>
      {
      body.map((para, idx) => {
        return ( <p className='font-medium text-[1rem]' key={idx}>{para}</p> ) })
      }
    </div>
  )
}

export default PrivacyPolicyPage;