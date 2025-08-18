import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const OfferModal = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 10000); // Show modal after 10 seconds

        return () => clearTimeout(timer); // Clean up on unmount
    }, []);

    const handleSubscribe = () => {
        setShowModal(false);
        navigate("/subscription");
    };

    return (
        <div>
            {/* Modal */}
{showModal && (
        <div className="fixed inset-0 z-50 bg-black/35 bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center animate-fade-in-up relative">
            <div className="mb-4">
              <h2 className="text-2xl font-extrabold text-amber-500">Unlock Premium Content</h2>
              <p className="text-gray-600 mt-2">
                Subscribe now and get access to exclusive articles, insights, and in-depth reports!
              </p>
            </div>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Subscribe"
              className="w-20 mx-auto my-4"
            />

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
              >
                Maybe Later
              </button>
              <button
                onClick={handleSubscribe}
                className="px-5 py-2 rounded-md bg-amber-500 hover:bg-amber-600 text-white font-medium shadow-md transition"
              >
                Subscribe Now
              </button>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
        </div>
    );
};

export default OfferModal;
