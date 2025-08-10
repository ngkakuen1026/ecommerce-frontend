import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactEmail: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`https://formsubmit.co/${import.meta.env.VITE_MY_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact-email" className="max-w-screen-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-semibold text-center mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-4">
        Please provide your full name, email address, and any thoughts or
        inquiries you may have. Our dedicated staff will review your message and
        reach out to you promptly to address your concerns and provide
        assistance. We value your feedback and look forward to connecting with
        you soon.
      </p>
      <p className="text-lg text-gray-600 mb-8">
        For more information, Please visit our <Link to="/faq" className="font-semibold underline hover:opacity-50">FAQ</Link> page.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="bg-white p-6 rounded-lg shadow-lg flex-1"
        >
          <div className="mb-4">
            <label className="block mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Your Message/Thoughts</label>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className={`w-full p-3 rounded bg-blue-500 text-white font-semibold transition-all duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        <div className="flex-1">
          <img
            src="https://static.vecteezy.com/system/resources/previews/051/166/491/non_2x/communication-concept-with-email-message-box-and-contacts-icons-e-mail-marketing-customer-support-counseling-and-support-hotline-connection-with-modern-network-technology-contact-us-free-photo.jpg"
            className="shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactEmail;
