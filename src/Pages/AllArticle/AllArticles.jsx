import { Clock, Crown, Eye, Search } from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import AllArticle from "./AllArticle";

const AllArticles = () => {
    const { User } = useAuth();
    const UserAxios = useAxios();
    const { data: Allarticle, isLoading } = useQuery({
        queryKey: ["Allarticle", User?.email],
        queryFn: async () => {
            const res = await UserAxios.get(`/articles`)
            return res.data;
        }
    })

    if (isLoading || !Allarticle) {
        return <div className="text-center mt-16 text-xl">Loading...</div>;
    }

    // console.log(Allarticle)
    return (
        <div className="my-12 w-11/13 mx-auto">

            <div className="bg-white border border-slate-200 mb-3 rounded-2xl p-5 shadow-md space-y-4">
                {/* Search Bar */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search articles by title..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                    <button className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow">
                        Search
                    </button>
                </div>

                {/* Filter Row */}
                <div className="flex justify-between items-center">
                    <button className="flex items-center text-slate-600 font-medium gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V20a1 1 0 01-1.447.894l-4-2A1 1 0 019 18v-4.586L3.293 6.707A1 1 0 013 6V4z" />
                        </svg>
                        Filters
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex gap-2">
                            <svg className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M3 3h7v7H3V3zM14 3h7v7h-7V3zM14 14h7v7h-7v-7zM3 14h7v7H3v-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="text-slate-500">6 articles found</span>
                    </div>
                </div>

                {/* Filter Content */}
                <div className="space-y-4 border-t border-t-gray-200 pt-4">
                    {/* Publisher */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Publisher</label>
                        <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none">
                            <option>All Publishers</option>
                            <option>Global News Network</option>
                            <option>Science Today</option>
                        </select>
                    </div>

                    {/* Tags
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tags</label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "Climate", "Politics", "Environment", "Technology", "Healthcare", "AI", "Finance",
                                "Economy", "Markets", "Space", "Science", "Energy", "Art", "Culture"
                            ].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-600"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div> */}

                    {/* Buttons */}
                    {/* <div className="flex items-center gap-4 mt-2">
                        <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium">
                            Apply Filters
                        </button>
                        <button className="text-slate-500 hover:underline text-sm">
                            Clear All
                        </button>
                    </div> */}
                </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
                {
                    Allarticle?.map(oneArticle => <AllArticle key={oneArticle._id} oneArticle={oneArticle}></AllArticle>)
                }
            </div>
        </div>
    );
};

export default AllArticles;
