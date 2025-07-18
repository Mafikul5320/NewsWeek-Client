import React from 'react';
import HeroSection from '../Home/HeroSection';
import TrendingArticles from '../Home/TrendingArticles';
import PlansSection from '../Home/PlansSection';

const HomeLayout = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <TrendingArticles></TrendingArticles>
            <PlansSection></PlansSection>
        </div>
    );
};

export default HomeLayout;