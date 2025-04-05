import { Card, CardContent } from "@/components/ui/card";
import CountUp from "react-countup";

// Importing images from src/assets
import harshImg from "@/assets/harsh.jpg";
import yashImg from "@/assets/yash.jpg";
import krinImg from "@/assets/krin.jpg";

const teamMembers = [
  {
    name: "Harsh Natvarlal Patel",
    role: "Frontend Developer",
    image: harshImg,
    bio: "Specializes in creating responsive user interfaces using React.js and Tailwind CSS.",
  },
  {
    name: "Yashkumar Jagani",
    role: "Project Coordinator",
    image: yashImg,
    bio: "Manages project flow and ensures feature alignment with user needs and learning goals.",
  },
  {
    name: "Krin Shaileshkumar Patel",
    role: "Full Stack Developer",
    image: krinImg,
    bio: "Focused on backend architecture and database management using Node.js and MongoDB.",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-20 px-4 sm:px-6 lg:px-8 mt-16">
      {/* Company Intro */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
          Welcome to <span className="text-blue-600">StudyVerse</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          StudyVerse is an innovative, user-friendly, and scalable Learning Management System built using the MERN stack. We bridge the gap between instructors and students with features like secure authentication, dynamic dashboards, course enrollment, and integrated payment processing.
        </p>
        <p className="mt-4 text-md text-gray-500 dark:text-gray-400">
          Our platform empowers learners and educators through seamless experiences, modern design, and robust backend capabilities — all while nurturing collaboration and portfolio development.
        </p>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
          Meet the Team
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We're a team of passionate developers dedicated to crafting impactful tech solutions for modern education.
        </p>
      </div>

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 text-center gap-8 mb-16">
        <div className="p-6 rounded-xl bg-blue-50 dark:bg-gray-800 shadow-md">
          <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            <CountUp end={3} duration={2} />
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Team Members</p>
        </div>
        <div className="p-6 rounded-xl bg-blue-50 dark:bg-gray-800 shadow-md">
          <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            <CountUp end={10} duration={2.5} />+
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Technologies Used</p>
        </div>
        <div className="p-6 rounded-xl bg-blue-50 dark:bg-gray-800 shadow-md">
          <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            <CountUp end={12} duration={2.5} />+
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Core Features</p>
        </div>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl animate-fadeIn"
            style={{ animationDelay: `${idx * 150}ms`, animationFillMode: "both" }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {member.bio}
              </p>
            </CardContent>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
