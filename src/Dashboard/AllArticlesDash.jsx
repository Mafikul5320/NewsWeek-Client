import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useAxiosSucure from "../Hooks/useAxiosSucure";
import { Crown } from "lucide-react";


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
  const { data: articles } = useQuery({
    queryKey: ["dashArticle"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-articles")
      return res.data;
    }
  })
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch("/article-approve", { id })
      console.log(res.data)
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dashArticle"])
    }
  })
  const declineMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch("/article-decline", { id })
      console.log(res.data)
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dashArticle"])
    }
  })
  const PremiumMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch("/article-Premium", { id })
      console.log(res.data)
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dashArticle"])
    }
  })
  const handelApprove = (id) => {
    approveMutation.mutate(id)
  }
  const handeldecline = (id) => {
    // declineMutation.mutate(id)





    document.getElementById('my_modal_4').showModal()




  }
  const handelPremium = (id) => {
    PremiumMutation.mutate(id)
  }
  console.log(articles)
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
            {articles?.map((article, idx) => (
              <tr key={article.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 flex items-center space-x-3">
                  <div className=" text-white text-xs font-semibold rounded">
                    <img className="w-15 h-15 border-gray-200 border-2 rounded-full object-cover" src={article?.image} alt="" />
                  </div>
                  <div>
                    <p className="font-medium">{article.title}</p>
                    <p className="text-gray-500 text-xs">{article.time}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className=" flex items-center justify-center font-bold text-green-800">
                      <img className="w-10 h-10 rounded-full object-cover" src={article?.author_img} alt="" />
                    </div>
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
                  {
                    article?.status === "decline" ? <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded">
                      Deleted
                    </button> : (article?.plan === "Premium" ? <button><Crown /></button> : (<button onClick={() => handelPremium(article?._id)} className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded">
                      Premium
                    </button>))
                  }
                  {/* modal */}
                  <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-2xl max-w-5xl">
                      <h3 className="font-bold text-lg">Hello!</h3>
                      <p className="py-4">Click the button below to close</p>
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllArticlesDash;
