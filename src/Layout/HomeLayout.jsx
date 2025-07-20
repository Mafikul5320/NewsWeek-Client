import React from 'react';
import HeroSection from '../Home/HeroSection';
import TrendingArticles from '../Home/TrendingArticles';
import PlansSection from '../Home/PlansSection';
import StatisticsSection from '../Home/StatisticsSection';
import PublishersSection from '../Home/PublishersSection';
import ReviewSection from '../Home/ReviewSection';
import FeaturedCategories from '../Home/FeaturedCategories';
import PlanSection from '../Home/PlanSection';
import PaymentPage from '../Pages/PaymentPage';

const HomeLayout = () => {
    return (
        <div>
            <div className='w-11/13 mx-auto'>
                <HeroSection></HeroSection>
                <TrendingArticles></TrendingArticles>
                {/* <PlansSection></PlansSection> */}
            </div>
            <PublishersSection></PublishersSection>
            <StatisticsSection></StatisticsSection>
            <ReviewSection></ReviewSection>
            <FeaturedCategories></FeaturedCategories>
            <PlanSection></PlanSection>
        </div>
    );
};

export default HomeLayout;