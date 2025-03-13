import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 dark:bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">StudyVerse</h1>

        <div className="flex justify-center gap-6 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="h-6 w-6 hover:text-gray-200 transition duration-300" />
          </a>
          <a href="mailto:info@studyverse.com">
            <Mail className="h-6 w-6 hover:text-gray-200 transition duration-300" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-6 w-6 hover:text-gray-200 transition duration-300" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-6 w-6 hover:text-gray-200 transition duration-300" />
          </a>
        </div>

        <p className="text-xs">
          &copy; {new Date().getFullYear()} StudyVerse_Capstone_Group7. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
