import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSucure from "../Hooks/useAxiosSucure";
import PremiumArticlePage from "./PremiumArticlePage";
import { Search } from "lucide-react";
import useAuth from "../Hooks/useAuth";

const PremiumArticles = () => {
    const axiosSecure = useAxiosSucure();
    const { User } = useAuth();

    const [searchTitle, setSearchTitle] = useState("");
    const [selectedPublisher, setSelectedPublisher] = useState("All");
    const [searchClicked, setSearchClicked] = useState(false);

    // Get publishers for dropdown
    const { data: publishers = [] } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const res = await axiosSecure.get("/publishers");
            return res.data;
        }
    });

    // Load all premium articles initially
    const { data: allPremiumArticles = [], isLoading } = useQuery({
        queryKey: ["premium-articles"],
        queryFn: async () => {
            const res = await axiosSecure.get("/premium-articles");
            return res.data;
        }
    });

    // Filtered/Search articles
    const {
        data: filteredArticles = [],
        refetch: refetchFiltered,
        isFetching: isFilterLoading,
    } = useQuery({
        queryKey: ["filteredPremium", searchTitle, selectedPublisher],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (searchTitle) params.append("title", searchTitle);
            if (selectedPublisher && selectedPublisher !== "All") {
                params.append("publisher", selectedPublisher);
            }
            const res = await axiosSecure.get(`/articles/search?${params.toString()}`);
            return res.data;
        },
        enabled: false, // Only run on form submit
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchClicked(true);
        refetchFiltered();
    };

    const displayedArticles = searchClicked ? filteredArticles : allPremiumArticles;

    return (
        <div className="my-12 w-11/12 mx-auto">
            {/* Search + Filter Bar */}
            <div className="bg-white border border-slate-200 mb-3 rounded-2xl p-5 shadow-md space-y-4">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
                    <div className="relative w-full md:flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search premium articles by title..."
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>

                    <select
                        value={selectedPublisher}
                        onChange={(e) => setSelectedPublisher(e.target.value)}
                        className="w-full md:w-60 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none"
                    >
                        <option value="All">All Publishers</option>
                        {publishers.map(pub => (
                            <option key={pub.name} value={pub.name}>{pub.name}</option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold shadow"
                    >
                        Search
                    </button>
                </form>

                {/* Result Count */}
                <div>
                    {(isFilterLoading || isLoading) ? (
                        <p className="text-center text-slate-500">Loading...</p>
                    ) : (
                        // <p className="text-sm text-slate-500">{displayedArticles?.length} articles found</p>
                        <p className="text-sm text-slate-500">articles found</p>
                    )}
                </div>
            </div>

            {/* Article Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {displayedArticles?.map(oneArticel => (
                    <PremiumArticlePage key={oneArticel._id} oneArticel={oneArticel} />
                ))}
            </div>
        </div>
    );
};

export default PremiumArticles;
