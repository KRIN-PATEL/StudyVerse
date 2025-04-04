// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";
// import { Facebook, Twitter, Mail, ArrowUp } from "lucide-react";

// const ContactUs = () => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     toast.success("Message sent successfully!");
//     e.target.reset(); // optional: clears the form
//   };

//   return (
//     <div className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 min-h-screen mt-20 relative">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
//         {/* Contact Form */}
//         <div>
//           <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-blue-500 inline-block pb-2">
//             Contact Us
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
//                 Your Name
//               </label>
//               <Input
//                 type="text"
//                 placeholder="Enter your name"
//                 className="w-full"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
//                 Your Email
//               </label>
//               <Input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
//                 Your Message
//               </label>
//               <Textarea
//                 placeholder="Type your message here..."
//                 className="w-full resize-none"
//                 rows={6}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
//             >
//               Send Message
//             </button>
//           </form>

//           {/* Contact Info */}
//           <div className="mt-10 text-gray-600 dark:text-gray-300 space-y-1">
//             <p><strong>Phone:</strong> +1 (123) 456-7890</p>
//             <p><strong>Email:</strong> contact@studyverse.com</p>
//             <p><strong>Address:</strong> 108 University Ave E, Waterloo, ON</p>
//           </div>

         
//         </div>

//         {/* Embedded Google Map */}
//         <div className="rounded-lg shadow-lg overflow-hidden mt-6">
//           <iframe
//             className="w-full h-[400px]"
//             title="Google Map"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.097798683985!2d-80.52031452491521!3d43.47942936365418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf38c7b27cd51%3A0xdf61b0a0d679e698!2s108%20University%20Ave%20E%2C%20Waterloo%2C%20ON%20N2J%202W2!5e0!3m2!1sen!2sca!4v1743480522963!5m2!1sen!2sca"
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           ></iframe>
//         </div>
//       </div>

//       {/* Back to Top Button */}
//       <button
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700"
//       >
//         <ArrowUp />
//       </button>
//     </div>
//   );
// };

// export default ContactUs;
import { useState } from "react";
import { useSendContactMessageMutation } from "@/features/api/contactApi"; // Adjust path if needed
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowUp } from "lucide-react";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendContactMessage(form).unwrap();
      toast.success(res.message, {
        style: {
          background: "#d1fae5",
          color: "green",
          border: "1px solid #10b981",
        },
      });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err?.data?.error || "Failed to send message.", {
        style: {
          background: "#fee2e2",
          color: "red",
          border: "1px solid #ef4444",
        },
      });
    }
  };
  

  return (
    <div className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 min-h-screen mt-20 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-blue-500 inline-block pb-2">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                Your Name
              </label>
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                Your Email
              </label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                Your Message
              </label>
              <Textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                className="w-full resize-none"
                rows={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-10 text-gray-600 dark:text-gray-300 space-y-1">
            <p><strong>Phone:</strong> +1 (123) 456-7890</p>
            <p><strong>Email:</strong> contact@studyverse.com</p>
            <p><strong>Address:</strong> 108 University Ave E, Waterloo, ON</p>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="rounded-lg shadow-lg overflow-hidden mt-6">
          <iframe
            className="w-full h-[400px]"
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.097798683985!2d-80.52031452491521!3d43.47942936365418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf38c7b27cd51%3A0xdf61b0a0d679e698!2s108%20University%20Ave%20E%2C%20Waterloo%2C%20ON%20N2J%202W2!5e0!3m2!1sen!2sca!4v1743480522963!5m2!1sen!2sca"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700"
      >
        <ArrowUp />
      </button>
    </div>
  );
};

export default ContactUs;
