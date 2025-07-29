import { Clock, Crown, Eye, Search } from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import AllArticle from "./AllArticle";
import useAxiosSucure from "../../Hooks/useAxiosSucure";
import { useState } from "react";

const AllArticles = () => {
    const { User } = useAuth();
    const UserAxios = useAxios();
    const axiosSecure = useAxiosSucure();


    const [searchTitle, setSearchTitle] = useState("");
    const [selectedPublisher, setSelectedPublisher] = useState("");

    const [searchClicked, setSearchClicked] = useState(false);

    const { data: Allarticle, isLoading: isAllLoading } = useQuery({
        queryKey: ["Allarticle", User?.email],
        queryFn: async () => {
            const res = await UserAxios.get(`/all-articles`);
            return res.data;
        },
    });
    const { data: publishers = [] } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const res = await axiosSecure.get("/publishers");
            return res.data;
        }
    });

    // Filtered/Search articles
    const {
        data: filteredArticles = [],
        refetch: refetchFiltered,
        isFetching: isFilterLoading,
    } = useQuery({
        queryKey: ["filteredArticles", searchTitle, selectedPublisher],
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

    // Loading State
    if (isAllLoading) {
        return <div className="text-center mt-16 text-xl">Loading...</div>;
    }

    // Decide what to render
    const displayedArticles = searchClicked ? filteredArticles : Allarticle;

    return (
        <div className="my-12 w-11/12 mx-auto">
            {/* Search and Filters */}
            <div className="bg-white border border-slate-200 mb-3 rounded-2xl p-5 shadow-md space-y-4">
                <form onSubmit={handleSearch} className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search articles by title..."
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow"
                    >
                        Search
                    </button>
                </form>

                {/* Filters */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Publisher</label>
                    <select
                        value={selectedPublisher}
                        onChange={(e) => setSelectedPublisher(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none"
                    >
                        <option value="All">All Publishers</option>
                        {publishers.map(pub => (
                            <option key={pub.name} value={pub.name}>{pub.name}</option>
                        ))}
                    </select>
                </div>

                {/* Results Count */}
                <div>
                    {(isFilterLoading || isAllLoading) ? (
                        <p className="text-center text-slate-500">Loading...</p>
                    ) : (
                        <p className="text-sm text-slate-500">{displayedArticles?.length} articles found</p>
                    )}
                </div>
            </div>

            {/* Article Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {displayedArticles?.map((oneArticle) => (
                    <AllArticle key={oneArticle._id} oneArticle={oneArticle} />
                ))}
            </div>
        </div>
    );
};

export default AllArticles;
