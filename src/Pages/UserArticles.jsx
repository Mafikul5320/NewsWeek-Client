import React from "react";
import {
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Crown,
} from "lucide-react";

const UserArticles = () => {
  const articles = [
    {
      id: 1,
      title: "The Future of Renewable Energy in Urban ...",
      source: "Energy Weekly",
      status: "Approved",
      premium: false,
      views: 1250,
      published: "Jul 22, 2025",
    },
    {
      id: 2,
      title: "Breaking: New Climate Policy Announced",
      source: "Global News Network",
      status: "Pending",
      premium: false,
      views: 0,
      published: "Jul 21, 2025",
    },
    {
      id: 3,
      title: "Exclusive Interview with Tech Industry Lea...",
      source: "Tech Today",
      status: "Declined",
      premium: true,
      views: 0,
      published: "Jul 20, 2025",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
            <CheckCircle size={16} /> Approved
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full">
            <Clock size={16} /> Pending
          </span>
        );
      case "Declined":
        return (
          <div className="flex  items-start space-y-1">
            <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full">
              <AlertCircle size={16} /> Declined
            </span>
            <button className="text-xs text-red-500 underline">View Reason</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Articles</h1>
            <p className="text-slate-500">Manage and track your published articles</p>
          </div>
          <button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:to-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow">
            Add New Article
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-slate-100 text-slate-600 font-semibold">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Article Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Premium</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4">Published</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {articles.map((article, index) => (
                <tr key={article.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{article.title}</p>
                      <p className="text-xs text-slate-500">{article.source}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(article.status)}</td>
                  <td className="px-6 py-4">
                    {article.premium ? (
                      <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                        <Crown size={14} /> Yes
                      </span>
                    ) : (
                      "No"
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {article.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{article.published}</td>
                  <td className="px-6 py-4 flex gap-3 text-slate-600">
                    <Eye className="cursor-pointer hover:text-blue-600" size={18} />
                    <Pencil className="cursor-pointer hover:text-yellow-600" size={18} />
                    <Trash2 className="cursor-pointer hover:text-red-600" size={18} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserArticles;
