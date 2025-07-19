import React, { useState } from 'react';

const AddArticles = () => {
  const [formData, setFormData] = useState({
    title: '',
    publisher: '',
    tags: '',
    description: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', { ...formData, imageFile });
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Add New Article
          </h1>
          <p className="text-slate-600 text-lg">
            Share your story with our global community of readers
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter article title..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Article Image *
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-amber-500 transition-colors">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview('');
                      }}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="h-12 w-12 mx-auto bg-slate-200 rounded-full" />
                    <div>
                      <label className="cursor-pointer">
                        <span className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                          Choose Image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          required
                        />
                      </label>
                    </div>
                    <p className="text-slate-500 text-sm">
                      Upload a high-quality image for your article
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Publisher */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Publisher *
              </label>
              <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                placeholder="Enter publisher name..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tags *
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Comma-separated (e.g. Tech,AI,React)"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none"
                required
              />
              <p className="text-slate-500 text-sm mt-1">
                Example: Web, JavaScript, Frontend
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Article Content *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={10}
                placeholder="Write your article here..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none resize-none"
                required
              />
              <p className="text-slate-500 text-sm mt-1">
                Minimum 100 characters required for quality content
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <button
                type="reset"
                onClick={() => {
                  setFormData({ title: '', publisher: '', tags: '', description: '' });
                  setImageFile(null);
                  setImagePreview('');
                }}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Publish Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArticles;
