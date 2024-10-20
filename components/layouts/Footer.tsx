import { Facebook, Twitter, Instagram } from "lucide-react"; // Import ikon dari Lucide

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold">About Us</h2>
            <p className="text-gray-400 mt-2">
              We are committed to providing the best e-commerce experience in
              Indonesia. Our mission is to bring quality products at unbeatable
              prices.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <h2 className="text-lg font-bold">Quick Links</h2>
            <ul className="mt-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-blue-500">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-gray-400 hover:text-blue-500"
                >
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-blue-500">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-blue-500"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-4 md:mt-0">
            <h2 className="text-lg font-bold">Follow Us</h2>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
