import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  // dark theme implementation
  return (
    <footer className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white py-8">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h1 className="text-3xl font-extrabold mb-4 tracking-wide text-gray-800 dark:text-white">
          StudyVerse
        </h1>

        <div className="flex justify-center gap-6 mb-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition"
          >
            <Facebook className="h-6 w-6" />
          </a>
          <a
            href="mailto:info@studyverse.com"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition"
          >
            <Mail className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>

        <p className="text-sm tracking-wide text-gray-800 dark:text-gray-400">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-medium">StudyVerse_Capstone_Group7</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
