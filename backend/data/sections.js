
// Sections data structure containing questions, responses, and media content
const sections = {
    academics: {
      questions: [
        "1. What courses do you offer?",
        "2. What are the admission requirements?",
        "3. What are the various academic pathways available?",
        "4. How can I contact academic advisors?",
        "5. What are the Partner Countries and Universities?",
        "6. What are the requirements for these universities?",
        "7. Do you offer online classes?",
        "8. Who are the Professors at GGU Hyderabad?",
        "9. Will the students have internship opportunities at GGU Hyderabad?",
        "10. Are there any photos of the centre and its students?"
      ],
      responses: {
        1: "We offer a variety of undergraduate programs here at GGU worldwide, we basically have two tracks Computing and Business, the most popular Computing programs include BS in IT, CS, CE and many other engineering programs!.",
        2: "The admission requirements vary by program but for Computing, you need 60% in your 12th Grade with a Science Stream (both PCM and PCB are accepted).",
        3: "We offer two models, 1 year at GGU WorldWide Hyderabad and 3 years in USA OR 2 years at GGU WorldWide Hyderabad and 2 years in USA. Students from both pathways will recieve the same degree in the end.",
        4: "You can contact academic advisors via email at contactus@upgradabroad.com or by calling the UpGrad office.",
        5: `We partner with several universities including USA, UK, Canada, Australia and many more!
           As for the universities, the most popular choices in USA include:
           1. BS IT, BA ANALYTICS: Northeastern Univeristy, Boston (top 30 in the USA for Computer Science related programs)
           2. BS CS,BS DATA SCIENCE, BS FOOD SCIENCE: Colorado State Univeristy, Colorado
           3. BS CE: Illinois Institute of Technology, Chicago (And many other engineering programs)
           4. BS Neuroscience: Washington State University
           5. BS CS, BS Software Engineering, BS Business Data Analytics: Northern Arizona University
           6. BS DATA ANALYTICS, BA MANAGEMENT: Golden Gate Univeristy
           7. BS CYBERSECURIY, BS BIOTECH: Clark University
  
           Speaking about Canada:
  
           1. Algoma University, Brampton - BS CS
  
           For futher details on other countries and programs contact us at, contactus@upgradabroad.com`,
        6: `USA
           1. Northeastern University- 3 GPA, IELTS - 6.5
           2. Colorado State University- 2 GPA, IELTS - 6
           3. Illinois Institute of Technology - 2 GPA, IELTS - 6.5
           4. Northern Arizona University - 2.5 GPA, IELTS - 6
           5. Golden Gate Univeristy, CA - 2 GPA, IELTS - 6
           6. Clark University - 3 GPA, IELTS - 6.5
           7. Washington State University - 3 GPA, IELTS - 6.5
  
           CANADA
           1. Algoma University - 3 GPA, IELTS - 6`,
        7: "Yes, we offer a range of online and hybrid classes to suit your needs.",
        8: `Our esteemed Faculty:
           1. DR. DURGA SHARMA: MATHEMATICS, ML, R PROGRAMMING
           2. DR. SAROJA: COMPUTER SCIENCE, DSA, DATA ANALYTICS
           3. DR. SRILAKSHMI RAMU: BUSINESS`,
        9: "Yes Absolutely, infact our students have already completed internships in Machine Learning, Java Development, programming etc.",
        10: "yes we have photos"
      },
      media: {
        10: {
          type: 'images',
          content: [
            { url: "https://i.imgur.com/q61JWq3.jpeg", type: "image", alt: "GGU Hyderabad Center" },
            { url: "https://i.imgur.com/PtBHW55.jpeg", type: "image", alt: "GGU Hyderabad Students" },
            { url: "https://i.imgur.com/4tc8E7p.jpeg", type: "image", alt: "GGU Hyderabad Campus" }
          ]
        }
      }
    },
    finance: {
      questions: [
        "1. What are the tuition fees?",
        "2. How can I pay my GGU Hyderabad fees?",
        "3. What is the refund policy?",
        "4. What will be the cost of attending if I choose USA?",
        "5. What will be the cost of attending for Canada?",
        "6. How can I pay the Cost of Attending?",
        "7. Am I eligible for scholarships?",
        "8. Is this Program Recognized by GGU and USA?"
      ],
      responses: {
        1: "Tuition fee is approx. Rs 500000 annually contact us at contactus@upgradabroad.com for further details",
        2: "You can pay the fee at once, or through a no cost EMI option, we also partner with banks to provide loans for the amount",
        3: "The refund policy depends on the date of withdrawal. Contact us at contactus@upgradabroad.com for details.",
        4: "For the 1+3 model the cost is Approx. 90 Lacs, for the 2+2 model the cost is Approx. 60 Lacs.",
        5: "For Canada, the 3 year cost is approx. 57 Lacs, whereas for 2 years it is aprrox. 38 Lacs",
        6: "We partner with MPower for providing collateral free loans to our students, contact us at contactus@upgradabroad.com, for further details.",
        7: `Yes! Absolutely, most of our partner univeristies offer generous scholarships to meritorious students, we recommend maintaining an overall 3 GPA and 6.5 IELTS to be eligible. Here are the amounts awarded by each institution:
  
           USA:
           1. Colorado State University:
           $10000, REQUIRED GPA 3.0
  
           2. Northern Arizona University:
           $10000, REQUIRED GPA - 3.0
  
           3. Washington State Univeristy:
           $2000, REQUIRED GPA - 3.0 TO 3.59
           $4000, REQUIRED GPA - ABOVE 3.6
  
           CANADA:
           1. ALGOMA UNIVERISTY:
           500 CAD, 60-69.9% IN 12TH
           1000 CAD, 70-79.9% IN 12TH
           2500 CAD, 80-89.9% IN 12TH
           5000 CAD, ABOVE 90% IN 12TH
  
           NOTE: IELTS - 6.5`,
        8: "Yes! Absolutely, here is accreditation by the US government and the programs listed on GGU's website"
      },
      media: {
        8: {
          type: 'images',
          content: [
            { url: "https://i.imgur.com/32fgg52.jpeg", type: "image", alt: "Accreditation" },
            { url: "https://i.imgur.com/q6rvtHH.jpeg", type: "image", alt: "Accreditation" }
          ]
        }
      }
    },
    faq: {
      questions: [
        "1. From which university will I get my degree?",
        "2. Will I be able to work after I receive my degree?",
        "3. Are there any alumni of this program?",
        "4. Will I be able to pay my loan by working in the USA?",
        "5. Will I be able to pay my loan by working in Canada?",
        "6. What about English proficiency, Visa, and application?",
        "7. Do you have a sample Offer Letter and Degree?",
        "8. Do you have any testimonials by students?"
      ],
      responses: {
        1: "You will get the degree from the Univeristy you finish at, for example, if you complete your 4th year at Northeastern University, you will recieve your degree from the same, there will no difference between the degrees given to 4 year students and transfer students",
        2: "Yes, Absolutely, In the US you can work for upto 3 years during your OPT period, after your degree.",
        3: "Yes, Currently we have students in Canada and USA, we also have students here at GGU Hyderabad who are in their 2nd year.",
        4: "Yes! Absolutely, Starting salaries in USA are around 60 lpa, you can pay off your loans in 3 years or earlier.",
        5: "Yes! Absolutely, Starting salaries in CANADA are around 40 lpa, you can pay off your loans in 3 years or earlier.",
        6: "The entire university application process will be handled by UpGrad, we provide free classes for english proficiency exams such as IELTS, TOEFL, DET, PTE etc. We also provide interview advice and mock interviews for Visa process, completely free of cost",
        7: "Yes, Absolutely.",
        8: "Yes, Here is the testimonial from one of our students currently studying abroad."
      },
      media: {
        7: {
          type: 'images',
          content: [
            { url: "https://i.imgur.com/cXrxJMP.png", type: "image", alt: "Offer Letter" },
            { url: "https://i.imgur.com/9xb3FrP.png", type: "image", alt: "Degree" }
          ]
        },
        8: {
          type: 'videos',
          content: [
            { url: "https://i.imgur.com/pDrkro4.mp4", type: "video", alt: "GGU Hyderabad Testimonial" }
          ]
        }
      }
    }
  };
  
  // Helper function to get response with media content
  function getResponse(section, questionNumber) {
    if (!sections[section]) {
      throw new Error('Invalid section');
    }
  
    const sectionData = sections[section];
    if (!sectionData.responses[questionNumber]) {
      throw new Error('Invalid question number');
    }
  
    const response = {
      response: sectionData.responses[questionNumber]
    };
  
    // Add media content if available
    if (sectionData.media?.[questionNumber]) {
      const { type, content } = sectionData.media[questionNumber];
      response[type] = content;
    }
  
    return response;
  }
  
  module.exports = {
    sections,
    getResponse
  };

