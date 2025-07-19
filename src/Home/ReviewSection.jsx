import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const reviews = [
    {
        name: 'Ray Robertson',
        title: 'CEO Company',
        img: 'https://i.pravatar.cc/100?img=1',
        date: '10th Feb, 2023',
        review:
            'Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore. Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore. Lorem Ipsum Dolor Sit Amet.',
    },
    {
        name: 'Sherl',
        title: 'CEO Company',
        img: 'https://i.pravatar.cc/100?img=2',
        date: '10th Feb, 2023',
        review:
            'Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore. Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore. Lorem Ipsum Dolor Sit Amet.',
    },
    {
        name: 'Sherl',
        title: 'CEO Company',
        img: 'https://i.pravatar.cc/100?img=3',
        date: '10th Feb, 2023',
        review:
            'Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore. Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore. Lorem Ipsum Dolor Sit Amet.',
    },
];

const ReviewSection = () => {
    return (
        <div className='my-9'>
            <h1 className='text-5xl font-semibold text-center'>What Our Readers Say</h1>
            <p className='text-lg text-gray-500 font-semibold text-center py-4'>
                Join thousands of satisfied readers who trust NewsHub Pro for their daily news. Here's what they <br /> have to say about their experience.
            </p>

            <div className="flex flex-wrap gap-6 justify-center py-10 px-4 bg-gray-50">
                {reviews.map((review, idx) => (
                    <div
                        key={idx}
                        className="bg-white shadow-lg rounded-xl p-6 max-w-xl h-70 w-full"
                    >
                        {/* Star + Date */}
                        <div className="flex justify-between items-start mb-12">
                            <div className="flex text-orange-400 space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} size={16} />
                                ))}
                            </div>
                            <p className="text-sm text-gray-500">{review.date}</p>
                        </div>

                        {/* Quotation + Review Text */}
                        <div className="relative mb-6">
                            <FaQuoteLeft size={19} className="absolute -top-4 -left-2 text-3xl text-gray-600" />
                            <p className="text-gray-600 font-medium text-sm leading-relaxed pl-7  ">
                                {review.review}
                            </p>
                        </div>

                        {/* Profile */}
                        <div className="flex mt-6 items-center space-x-4">
                            <img
                                src={review.img}
                                alt={review.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                            />
                            <div>
                                <h4 className="font-semibold text-gray-800">{review.name}</h4>
                                <p className="text-sm text-gray-500">{review.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSection;
