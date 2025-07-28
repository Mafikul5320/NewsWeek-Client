import React from 'react';
import { Users, Newspaper, BarChart3, TrendingUp, Crown, UserCheck } from 'lucide-react';
import useAxiosSucure from '../Hooks/useAxiosSucure';
import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';

const StatisticsSection = () => {
  const axiosSecure = useAxiosSucure()
  const { data: growthData, isLoading } = useQuery({
    queryKey: ["growthData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/chart/overview")
      return res.data
    }
  });
  if (isLoading || !growthData) {
    return <div className="text-center mt-16 text-xl">Loading...</div>;
  }
  const { totalUsers, premiumUsers, totalArticles } = growthData
  return (
    <section className="py-16 bg-[#FFF7EC]/25 border border-amber-200 rounded-lg">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold text-foreground mb-4">
            Platform Statistics
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who trust our platform for the latest news and insights
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-amber-50/30">
          {/* Card 1 */}
          <div className="bg-card shadow-lg  border border-amber-300 rounded-lg p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="mb-4 flex justify-center">
              <div className="p-4 rounded-full bg-muted/50">
                <Users className="h-8 w-8 text-gray-600" />
              </div>
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Total Users</h3>
            <div className="font-headline text-3xl font-bold mb-2 text-blue-500"><CountUp duration={5} end={totalUsers} /> +</div>
            <p className="text-sm text-muted-foreground">People who have joined and use our platform</p>
          </div>

          {/* Card 2 */}
          <div className="bg-card shadow-lg  border border-amber-300 rounded-lg p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="mb-4 flex justify-center">
              <div className="p-4 rounded-full bg-muted/50">
                <UserCheck className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Premium Users</h3>
            <div className="font-headline text-3xl font-bold mb-2 text-green-500"><CountUp duration={5} end={premiumUsers} /> +</div>
            <p className="text-sm text-muted-foreground">News stories and premium content published</p>
          </div>

          {/* Card 3 */}
          <div className="bg-card shadow-lg  border border-amber-300 rounded-lg p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="mb-4 flex justify-center">
              <div className="p-4 rounded-full bg-muted/50">
                <Crown className="h-8 w-8 text-purple-500" />
              </div>
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Total Articles</h3>
            <div className="font-headline text-3xl font-bold mb-2 text-purple-500"> <CountUp duration={5} end={totalArticles} /> +</div>
            <p className="text-sm text-muted-foreground">Monthly active views across all platforms</p>
          </div>
        </div>

        {/* Extra Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center space-x-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>Growing by 25% monthly</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
