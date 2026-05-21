import React from 'react';
import { Carousel, Card } from './ui/apple-cards-carousel';

const defaultHover = { scale: 1.04, y: -8 };
const defaultHoverTransition = { type: 'spring', stiffness: 400, damping: 22 };

/** Card dimensions — adjust here to resize all achievement carousel cards */
export const achievementCardSize =
  'h-96 w-48 sm:h-[26rem] sm:w-56 md:h-[28rem] md:w-64 lg:h-[30rem] lg:w-72';

const achievementData = [
  {
    category: 'Leadership',
    title: 'Team Collaboration',
    src: '/images/Leadership/vms.jpg',
    cardSize: achievementCardSize,
    hover: { scale: 1.05, y: -10 },
    hoverTransition: defaultHoverTransition,
    hoverClassName: 'hover:border-primary/60 hover:shadow-xl hover:shadow-primary/30 cursor-pointer',
    gallery: [
      {
        src: '/images/Leadership/vms.jpg',
        alt: 'VMS competition team',
        description:
          'Led the team through planning and coordination for the Voting Management System for DNSC-LSG Integrated Compliance System, aligning roles and responsibilities.',
      },
    ],
  },
  {
    category: 'Seminar',
    title: 'Seminar',
    src: '/images/Seminar/starup-1.jpg',
    cardSize: achievementCardSize,
    hover: defaultHover,
    hoverTransition: defaultHoverTransition,
    hoverClassName: 'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 cursor-pointer',
    gallery: [
      {
        src: '/images/Seminar/zero-production.jpg',
        alt: 'Zero Production',
        description:
          'Attended a 2-day startup seminar and received a certificate of completion.',
      },
      
      {
        src: '/images/Seminar/post-deployment.jpg',
        alt: 'Post Deployment',
        description:
          'Performed post-deployment maintenance and updates to ensure the system is running smoothly.',
      },
    ],
  },  

  {
    category: 'Certifications   ',
    title: 'Certifications',
    src: '/images/TreePlanting.png',
    cardSize: achievementCardSize,
    hover: defaultHover,
    hoverTransition: defaultHoverTransition,
    hoverClassName: 'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 cursor-pointer',  
    gallery: [
      {
        src: '/images/TreePlanting.png',
        alt: 'Tree Planting',
        description:
          'Completed a tree planting initiative and received a certificate of completion.',
      },
      {
        src: '/images/Seminar/starup-certificate.png',
        alt: 'Starup Certificate',
        description:
          'Received a certificate of completion from the startup seminar.',
      },
      {
        src: '/images/Certifications/zero-prod.jpg',
        alt: 'Starup Certificate',
        description:
          'Completed a zero production certification and received a certificate of completion.',
      },
      {
        src: '/images/Certifications/dev-dep.jpg',
        alt: 'Starup Certificate',
        description:
          'Performed post-deployment maintenance and updates to ensure the system is running smoothly.',
      },
    ],
  },
];

const AchievementsCarousel = () => {
  const cards = achievementData.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <div className="w-full">
      <Carousel items={cards} />
    </div>
  );
};

export default AchievementsCarousel;
