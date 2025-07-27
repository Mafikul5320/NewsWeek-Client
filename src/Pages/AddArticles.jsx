import axios from 'axios';
import { CircleX } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import useAuth from '../Hooks/useAuth';
import useAxiosSucure from '../Hooks/useAxiosSucure';

const AddArticles = () => {
  const { User } = useAuth();
  const axiosSucure = useAxiosSucure();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const tagOptions = [
    { value: 'Technology', label: 'Technology' },
    { value: 'AI', label: 'AI' },
    { value: 'React', label: 'React' },
    { value: 'Programming', label: 'Programming' },
    { value: 'Startups', label: 'Startups' },
  ];

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file)
    const uploadImage = await axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_imagebb_key}`, formData)

    setImagePreview(uploadImage.data.data.url);
    console.log(uploadImage.data.data.url);
  };
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
  const onsubmit = async (data) => {
    const tags = selectedTags.map(tag => tag.value);
    const { title, publisher, categories, description } = data;
    const articleData = { title, categories, publisher, description, image: imagePreview, tag: tags, email: User?.email, displayName: User?.displayName, date: formattedDate, status: "Pending" }
    const res = await axiosSucure.post("/article", articleData)
    console.log(res.data.insertedId)
    return res.data;
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Add New Article
          </h1>
          <p className="text-slate-600 text-lg">
            Share your story with our global community of readers
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <form onSubmit={handleSubmit(onsubmit)} className="p-8 space-y-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                placeholder="Enter article title..."
                className="w-full px-4 py-3 border-gray-300 border rounded-lg focus:border-2 focus:border-amber-300 focus:outline-none"
                {...register("title", { required: "Article Title is required" })}
              />
              {errors.title && (
                <p className='text-red-500 py-1 flex items-center'>
                  <CircleX size={13} />
                  <span className='pl-1 font-semibold font-mono'>{errors.title.message} !</span>
                </p>
              )}
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
                      onClick={() => setImagePreview('')}
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
                          {...register("image", { required: "Article image is required" })}
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-slate-500 text-sm">
                      Upload a high-quality image for your article
                    </p>
                  </div>
                )}
              </div>
              {errors.image && (
                <p className='text-red-500 py-1 flex items-center'>
                  <CircleX size={13} />
                  <span className='pl-1 font-semibold font-mono'>{errors.image.message} !</span>
                </p>
              )}
            </div>

            {/* Publisher */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Categories *
              </label>
              <select
                {...register("categories", { required: "Publisher is required" })}
                className="w-full px-4 py-3 border-gray-300 border rounded-lg focus:border-2 focus:border-amber-300 focus:outline-none"
              >
                <option value="">Select Categories</option>
                <option value="Technology">Technology</option>
                <option value="Politics">Politics</option>
                <option value="Business">Business</option>
                <option value="Health">Health</option>
                <option value="Sports">Sports</option>
                <option value="World">World</option>
                {/* You can add more publishers or fetch them dynamically if needed */}
              </select>
              {errors.publisher && (
                <p className="text-red-500 py-1 flex items-center">
                  <CircleX size={13} />
                  <span className="pl-1 font-semibold font-mono">{errors.publisher.message} !</span>
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Publisher *
              </label>
              <select
                {...register("publisher", { required: "Publisher is required" })}
                className="w-full px-4 py-3 border-gray-300 border rounded-lg focus:border-2 focus:border-amber-300 focus:outline-none"
              >
                <option value="">Select Publisher</option>
                <option value="Prothom Alo">Prothom Alo</option>
                <option value="The Daily Star">The Daily Star</option>
                <option value="BBC Bangla">BBC Bangla</option>
                <option value="TechCrunch">TechCrunch</option>
                {/* You can add more publishers or fetch them dynamically if needed */}
              </select>
              {errors.publisher && (
                <p className="text-red-500 py-1 flex items-center">
                  <CircleX size={13} />
                  <span className="pl-1 font-semibold font-mono">{errors.publisher.message} !</span>
                </p>
              )}
            </div>

            {/* Tags (React-Select) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tags *
              </label>
              <Select
                options={tagOptions}
                isMulti
                {...register("tags")}
                onChange={setSelectedTags}
                placeholder="Select the tags"
              />
              {selectedTags.length === 0 && (
                <p className="text-red-500 py-1 flex items-center">
                  <CircleX size={13} />
                  <span className="pl-1 font-semibold font-mono">Tags are required!</span>
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Article Content *
              </label>
              <textarea
                {...register("description", { required: "Description is required" })}
                rows={10}
                placeholder="Write your article here..."
                className="w-full px-4 py-3 border-gray-300 border rounded-lg focus:border-2 focus:border-amber-300 focus:outline-none"
              />
              {errors.description && (
                <p className='text-red-500 py-1 flex items-center'>
                  <CircleX size={13} />
                  <span className='pl-1 font-semibold font-mono'>{errors.description.message} !</span>
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <button
                type="reset"
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
