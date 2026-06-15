import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/send/mail",
        { name, email, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setName("");
      setEmail("");
      setMessage("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform transition-all duration-300 hover:scale-[1.01]">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-2 leading-tight">
          Get In Touch 💌
        </h1>
        <p className="text-center text-gray-500 mb-10 text-lg">
          We'd love to hear from you.
        </p>
        <form onSubmit={sendEmail} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              required
              className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-300 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
              className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-300 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message
            </label>
            <textarea
              placeholder="Tell us what's on your mind..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoComplete="off"
              required
              rows="5"
              className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-300 placeholder-gray-400 resize-none"
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg"
            >
              {loading && <ClipLoader size={20} color="white" />}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;