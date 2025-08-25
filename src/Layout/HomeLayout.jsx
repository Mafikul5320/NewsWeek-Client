import React from 'react';
import HeroSection from '../Home/HeroSection';
import TrendingArticles from '../Home/TrendingArticles';
import StatisticsSection from '../Home/StatisticsSection';
import PublishersSection from '../Home/PublishersSection';
import ReviewSection from '../Home/ReviewSection';
import FeaturedCategories from '../Home/FeaturedCategories';
import PlanSection from '../Home/PlanSection';
import OfferModal from '../Pages/OfferModal';
const HomeLayout = () => {
    return (
        <div>
            <div className='w-11/13 mx-auto'>
                <HeroSection></HeroSection>
                <OfferModal></OfferModal>
                {/* <PlansSection></PlansSection> */}
            </div >
            <TrendingArticles></TrendingArticles>
            <PublishersSection></PublishersSection>
            <StatisticsSection></StatisticsSection>
            <ReviewSection></ReviewSection>
            <FeaturedCategories></FeaturedCategories>
            <PlanSection></PlanSection>
        </div>
    );
};

export default HomeLayout;