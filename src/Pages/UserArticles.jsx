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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router";
import useAxiosSucure from "../Hooks/useAxiosSucure";
import Swal from "sweetalert2";

const UserArticles = () => {
  const { User } = useAuth();
  const axiosSecure = useAxiosSucure()
  const queryClient = useQueryClient(); // for refetching after mutation

  // Fetching articles
  const { data: articles, isLoading } = useQuery({
    queryKey: ["userarticle", User?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles?email=${User?.email}`);
      return res.data;
    },
  });
  console.log(articles)

  // Deleting article mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/articles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userarticle", User?.email]); // Refetch after delete
    },
  });

  const handleDelete = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      const deleted = deleteMutation.mutate(id);
      if (result.isConfirmed && !deleted) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  };

  if (isLoading || !articles) {
    return <div className="text-center mt-16 text-xl">Loading...</div>;
  }

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
          <div className="flex items-start space-y-1">
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
              {articles?.map((article, index) => (
                <tr key={article._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{article.title}</p>
                      <p className="text-xs text-slate-500">{article.source}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{(article?.status)}</td>
                  <td className="px-6 py-4">
                    {article?.plan ==="Premium" ? (
                      <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                        <Crown size={14} /> Yes
                      </span>
                    ) : (
                      "No"
                    )}
                  </td>
                  <td className="px-6 py-4">{article?.view?.toLocaleString()}</td>
                  <td className="px-6 py-4">{article.date}</td>
                  <td className="px-6 py-4 flex gap-3 text-slate-600">
                    <Link to={`/Articles-Details/${article?._id}`}>
                      <Eye className="cursor-pointer hover:text-blue-600" size={18} />
                    </Link>
                    <Link to={`/article-update/${article?._id}`}><Pencil className="cursor-pointer hover:text-yellow-600" size={18} /></Link>
                    <Trash2
                      onClick={() => handleDelete(article?._id)}
                      className="cursor-pointer hover:text-red-600"
                      size={18}
                    />
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
