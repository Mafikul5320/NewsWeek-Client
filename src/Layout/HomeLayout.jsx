import React from 'react';
import HeroSection from '../Home/HeroSection';
import TrendingArticles from '../Home/TrendingArticles';
import PlansSection from '../Home/PlansSection';
import StatisticsSection from '../Home/StatisticsSection';

const HomeLayout = () => {
    return (
        <div>
            <div className='w-11/13 mx-auto'>
                <HeroSection></HeroSection>
                <TrendingArticles></TrendingArticles>
                <PlansSection></PlansSection>
            </div>
            <StatisticsSection></StatisticsSection>
        </div>
    );
};

export default HomeLayout;