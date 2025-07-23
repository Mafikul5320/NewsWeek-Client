import React, { useState } from "react";

const AddPublisher = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 2 * 1024 * 1024) {
      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));
      setLogoPreview(URL.createObjectURL(file));
    } else {
      alert("Please upload PNG or JPG under 2MB");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.logo) {
      alert("Please fill all fields");
      return;
    }

    // Simulate submission (you can integrate with your backend)
    console.log("Publisher Added:", formData);
    alert("Publisher added successfully!");

    // Reset form
    setFormData({ name: "", description: "", logo: null });
    setLogoPreview(null);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center items-start">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Add Publisher</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Publisher Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Publisher Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter publisher name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Publisher Logo */}
          <div>
            <label className="block text-sm font-medium mb-1">Publisher Logo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full"
                />
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    id="logoUpload"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="logoUpload" className="cursor-pointer">
                    <svg
                      className="mx-auto mb-2 h-10 w-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 16l5-5m0 0l5 5m-5-5v12"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">
                      Click to upload logo or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter publisher description"
              rows={4}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Add Publisher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPublisher;
