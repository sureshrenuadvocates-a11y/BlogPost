import React, { useState } from "react";
import useAuthStore from "../Store/Store";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const { isCreatingAccount, Register } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePic: file });
    setPreview(URL.createObjectURL(file));
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Image = "";
    if (formData.profilePic) {
      base64Image = await toBase64(formData.profilePic);
    }

    Register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      profilePic: base64Image,
    });
  };
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center ">
      <div className="bg-base-300 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-500 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Admith"
              value={formData.fullName}
              required
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              value={formData.email}
              required
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500  transition"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500  transition"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover mt-2"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-purple-500 text-white font-semibold rounded-sm hover:opacity-90 transition-all"
          >
            <div className="flex items-center justify-center">
              {isCreatingAccount ? (
                <Loader2 className="animate-spin h-6 w-6" />
              ) : (
                "Create Account"
              )}
            </div>
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
