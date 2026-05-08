import React from 'react';
import Hero from './Hero';
import ScrollingMarquee from './ScrollingMarquee';
import WhyChooseUs from './WhyChooseUs';
import WhatWeOffer from './WhatWeOffer';
import HowItWorks from './HowItWorks';
import Prices from './Prices';
import Team from './Team';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div className="w-full flex flex-col">
            <Hero />
            <ScrollingMarquee />
            <WhatWeOffer />
            <WhyChooseUs />
            <HowItWorks />
            <Prices />
            <Team />
            <Testimonials />
        </div>
    );
};

export default Home;
