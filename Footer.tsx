import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-[1440px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">TicketFlow</h3>
            <p className="text-gray-300 leading-relaxed">
              Streamline your ticket management with ease and efficiency.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-100">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/auth/signup" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-100">Contact</h4>
            <p className="text-gray-300">Email: support@ticketflow.com</p>
            <p className="text-gray-300">Phone: +234 800 123 4567</p>
          </div>
        </div>
        <div className="border-t border-gray-700 py-5 text-center">
          <p className="text-gray-400">&copy; 2025 TicketFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;