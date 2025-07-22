import React from "react";

const articles = [
  {
    id: 1,
    title: "Breaking News Article 1",
    time: "Posted 2 hours ago",
    author: "Author 1",
    email: "author1@example.com",
    publisher: "TechNews Daily",
    status: "Pending",
  },
  {
    id: 2,
    title: "Breaking News Article 2",
    time: "Posted 2 hours ago",
    author: "Author 2",
    email: "author2@example.com",
    publisher: "TechNews Daily",
    status: "Pending",
  },
  {
    id: 3,
    title: "Breaking News Article 3",
    time: "Posted 2 hours ago",
    author: "Author 3",
    email: "author3@example.com",
    publisher: "TechNews Daily",
    status: "Approved",
  },
  {
    id: 4,
    title: "Breaking News Article 4",
    time: "Posted 2 hours ago",
    author: "Author 4",
    email: "author4@example.com",
    publisher: "TechNews Daily",
    status: "Approved",
  },
  {
    id: 5,
    title: "Breaking News Article 5",
    time: "Posted 2 hours ago",
    author: "Author 5",
    email: "author5@example.com",
    publisher: "TechNews Daily",
    status: "Approved",
  },
];

const StatusBadge = ({ status }) => {
  const base = "px-3 py-1 rounded-full text-xs font-semibold";
  if (status === "Pending")
    return <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>;
  if (status === "Approved")
    return <span className={`${base} bg-green-100 text-green-700`}>Approved</span>;
  return <span className={`${base} bg-gray-200 text-gray-600`}>{status}</span>;
};

const AllArticlesDash = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">All Articles</h1>
        <div className="space-x-2">
          <span className="bg-white px-4 py-1 rounded shadow text-sm">Pending: 45</span>
          <span className="bg-white px-4 py-1 rounded shadow text-sm">Total: 890</span>
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
            {articles.map((article, idx) => (
              <tr key={article.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded px-2 py-1">
                    IMG
                  </div>
                  <div>
                    <p className="font-medium">{article.title}</p>
                    <p className="text-gray-500 text-xs">{article.time}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center font-bold text-green-800">
                      A{idx + 1}
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
                      <button className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded">
                        Approve
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">
                        Decline
                      </button>
                    </>
                  )}
                  <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded">
                    Premium
                  </button>
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
