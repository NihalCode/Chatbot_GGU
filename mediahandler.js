// Handle media content for specific responses
const mediaHandler = {
    academics: {
      10: {
        type: 'images',
        content: [
          { url: "https://i.imgur.com/q61JWq3.jpeg", type: "image", alt: "GGU Hyderabad Center" },
          { url: "https://i.imgur.com/PtBHW55.jpeg", type: "image", alt: "GGU Hyderabad Students" },
          { url: "https://i.imgur.com/4tc8E7p.jpeg", type: "image", alt: "GGU Hyderabad Campus" }
        ]
      }
    },
    finance: {
      8: {
        type: 'images',
        content: [
          { url: "https://i.imgur.com/32fgg52.jpeg", type: "image", alt: "Accreditation" },
          { url: "https://i.imgur.com/q6rvtHH.jpeg", type: "image", alt: "Accreditation" }
        ]
      }
    },
    faq: {
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
  };
  
  function getMediaContent(section, questionNumber) {
    const sectionMedia = mediaHandler[section];
    if (sectionMedia && sectionMedia[questionNumber]) {
      const { type, content } = sectionMedia[questionNumber];
      return { [type]: content };
    }
    return {};
  }
  
  module.exports = { getMediaContent };