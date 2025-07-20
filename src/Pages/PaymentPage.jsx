import React from 'react';

const PaymentPage = () => {
    return (
           <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl flex overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 p-10 space-y-6 border-r">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-sm font-bold">K</div>
            <span className="text-sm font-medium">Kavholm</span>
          </div>
          <h2 className="text-gray-700 text-lg">Touchwood Counter Stool</h2>
          <h1 className="text-3xl font-bold">$71.21</h1>
          <div className="w-40 h-40 rounded-lg bg-gray-100 overflow-hidden">
            <img
              src="https://i.imgur.com/MEKjHGa.png"
              alt="stool"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-10">
          <h2 className="text-lg font-semibold mb-6">Review order</h2>
          <div className="space-y-4 text-sm">
            {/* Email */}
            <div className="border rounded-lg p-3">
              <p className="text-gray-500 mb-1">Email</p>
              <p>jenny.rosen@example.com</p>
            </div>

            {/* Ship To */}
            <div className="border rounded-lg p-3">
              <p className="text-gray-500 mb-1">Ship to</p>
              <p className="font-semibold">Jenny Rosen</p>
              <p className="text-gray-500 text-sm">27 Fredrick Ave<br />Brothers, OR 97712, US</p>
            </div>

            {/* Pay With */}
            <div className="border rounded-lg p-3 flex justify-between items-center">
              <div>
                <p className="text-gray-500 mb-1">Pay with</p>
                <div className="flex items-center gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                    alt="Visa"
                    className="w-8"
                  />
                  <span>•••• 4242</span>
                </div>
              </div>
              <span className="text-xs text-gray-500">▼</span>
            </div>
          </div>

          {/* Secure & Link */}
          <div className="flex items-center mt-3 text-xs text-green-600 font-medium gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
              viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Encrypted
            <span className="ml-auto text-black">🔗 link</span>
          </div>

          {/* Pay Button */}
          <button className="w-full mt-6 bg-blue-600 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700 transition">
            <span>Pay $71.21</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2} d="M12 11c0-1.105.895-2 2-2s2 .895 2 2v2m0 0c0 1.105-.895 2-2 2s-2-.895-2-2m0 0V9m0 6v2" /></svg>
          </button>

        </div>
      </div>
    </div>
    );
};

export default PaymentPage;