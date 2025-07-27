import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSucure from "../Hooks/useAxiosSucure";
import { Crown } from "lucide-react";
import Swal from "sweetalert2";

const StatusBadge = ({ status }) => {
  const base = "px-3 py-1 rounded-full text-xs font-semibold";
  if (status === "Pending")
    return <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>;
  if (status === "Approved")
    return <span className={`${base} bg-green-100 text-green-700`}>Approved</span>;
  return <span className={`${base} bg-gray-200 text-gray-600`}>{status}</span>;
};

const AllArticlesDash = () => {
  const axiosSecure = useAxiosSucure();
  const queryClient = useQueryClient();

  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [declineReason, setDeclineReason] = useState("");

  const { data: articles } = useQuery({
    queryKey: ["dashArticle"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-articles");
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch("/article-approve", { id });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dashArticle"]);
      Swal.fire("Approved!", "The article has been approved.", "success");
    },
  });

  const declineMutation = useMutation({
    mutationFn: async ({ id, reason }) => {
      const res = await axiosSecure.patch("/article-decline", { id, reason });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dashArticle"]);
      setDeclineReason("");
      setSelectedArticleId(null);
      document.getElementById("my_modal_4").close();
      Swal.fire("Declined!", "The article has been declined.", "success");
    },
  });

  const PremiumMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch("/article-Premium", { id });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dashArticle"]);
      Swal.fire("Marked Premium!", "The article is now Premium.", "success");
    },
  });

  const handelApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this article.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id);
      }
    });
  };

  const handeldecline = (id) => {
    Swal.fire({
      title: "Decline Article?",
      text: "You will be asked to provide a reason.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Continue",
      confirmButtonColor: "#e11d48",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedArticleId(id);
        document.getElementById("my_modal_4").showModal();
      }
    });
  };

  const handelPremium = (id) => {
    Swal.fire({
      title: "Make Premium?",
      text: "This article will be marked as Premium.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Premium",
    }).then((result) => {
      if (result.isConfirmed) {
        PremiumMutation.mutate(id);
      }
    });
  };

  const handleDeclineSubmit = () => {
    if (selectedArticleId && declineReason) {
      declineMutation.mutate({ id: selectedArticleId, reason: declineReason });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">All Articles</h1>
        <div className="space-x-2">
          <span className="bg-white px-4 py-1 rounded shadow text-sm">Pending: 45</span>
          <span className="bg-white px-4 py-1 rounded shadow text-sm">Total: {articles?.length}</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
            <tr>
              <th className="px-6 py-3 text-left">Article</th>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">Publisher</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {articles?.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 flex items-center space-x-3">
                  <img className="w-15 h-15 border-gray-200 border-2 rounded-full object-cover" src={article?.image} alt="" />
                  <div>
                    <p className="font-medium">{article.title}</p>
                    <p className="text-gray-500 text-xs">{article.time}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <img className="w-10 h-10 rounded-full object-cover" src={article?.author_img} alt="" />
                    <div>
                      <p>{article.author}</p>
                      <p className="text-xs text-gray-500">{article.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{article.publisher}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={article.status} />
                </td>
                <td className="px-6 py-4 space-x-2">
                  {article.status === "Pending" && (
                    <>
                      <button onClick={() => handelApprove(article?._id)} className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded">
                        Approve
                      </button>
                      <button onClick={() => handeldecline(article?._id)} className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">
                        Decline
                      </button>
                    </>
                  )}
                  {article?.status === "decline" ? (
                    <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded">
                      Deleted
                    </button>
                  ) : article?.plan === "Premium" ? (
                    <button><Crown /></button>
                  ) : (
                    <button onClick={() => handelPremium(article?._id)} className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded">
                      Premium
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decline Modal */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="font-bold text-lg mb-2">Reason for Declining</h3>
          <textarea
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            placeholder="Write the decline reason here..."
            className="w-full p-2 border rounded-md mb-4"
            rows="4"
          ></textarea>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <button
                type="button"
                onClick={handleDeclineSubmit}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllArticlesDash;
