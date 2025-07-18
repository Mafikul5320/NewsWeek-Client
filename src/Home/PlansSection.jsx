import React, { useRef } from 'react';
import { Link } from 'react-router';
import { Check, Crown, Star, Zap, Shield, Users } from 'lucide-react';

const PlansSection = () => {
  const plansRef = useRef(null);

const plans = [
  {
    name: 'Free Reader',
    price: 0,
    period: 'Forever',
    description: 'Ideal for casual readers.',
    icon: Users,
    color: 'from-slate-500 to-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    features: [
      'Access to public articles',
      'Mobile responsive reading',
      'Email newsletter'
    ],
    limitations: [
      '5 articles/day only'
    ]
  },
  {
    name: 'Premium',
    price: 19.99,
    period: 'per month',
    description: 'Full access to premium news.',
    icon: Crown,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
    borderColor: 'border-amber-300',
    popular: true,
    features: [
      'Unlimited article access',
      'Ad-free experience',
      'Early breaking news',
      'Custom reading lists'
    ]
  },
  {
    name: 'Pro Publisher',
    price: 49.99,
    period: 'per month',
    description: 'For news creators & teams.',
    icon: Zap,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50',
    borderColor: 'border-indigo-300',
    features: [
      'All Premium features',
      'Publishing tools',
      'Content analytics',
      'Team access'
    ],
    limitations: [
      'Team onboarding required'
    ]
  }
];


  return (
    <div className="space-y-12 my-12">

      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Star className="h-8 w-8 text-amber-600" />
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Choose Your Plan
          </h2>
        </div>
        <p className="text-slate-600 text-lg max-w-3xl mx-auto">
          Whether you're a casual reader or a news enthusiast, we have the perfect plan for you. 
          Upgrade anytime to unlock premium features and exclusive content.
        </p>
      </div>


      <div ref={plansRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const IconComponent = plan.icon;
          return (
            <div key={index} className="plan-card relative">
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`relative h-full rounded-2xl border-2 ${plan.borderColor} ${plan.bgColor} overflow-hidden group hover:shadow-2xl transition-all duration-400 hover:scale-105 `}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                    <div className="absolute top-4 right-[-32px] bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-semibold py-1 px-8 rotate-45 shadow-lg">
                      POPULAR
                    </div>
                  </div>
                )}

                <div className="p-8 space-y-6">
                  <div className="text-center space-y-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                      <p className="text-slate-600 text-sm mt-2">{plan.description}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                      <span className="text-slate-600">{plan.period}</span>
                    </div>
                    {plan.price > 0 && (
                      <div className="text-sm text-slate-500 mt-1">
                        Billed monthly • Cancel anytime
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900 flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      What's included:
                    </h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations && (
                      <div className="pt-4 border-t border-slate-200">
                        <h5 className="font-medium text-slate-600 text-sm mb-2">Limitations:</h5>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="flex items-start space-x-3">
                              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full flex-shrink-0 mt-2"></div>
                              <span className="text-slate-600 text-xs">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="">
                    <Link
                      to="/subscription"
                      className={`w-full inline-flex  items-center justify-center px-6 py-4 rounded-xl font-semibold transition-all duration-200 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                          : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg'
                      }`}
                    >
                      {plan.price === 0 ? 'Get Started Free' : 'Upgrade to Premium'}
                      {plan.popular && <Crown className="ml-2 h-5 w-5" />}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlansSection;
