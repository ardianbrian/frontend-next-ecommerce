"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false); // State untuk kontrol visibilitas menu mobile

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUsername(decodedToken.username);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    setUsername(null);
    router.push("/");
  };

  const isActive = (path: string) =>
    pathname === path ? "text-blue-500" : "text-gray-700";

  return (
    <header className="bg-white shadow-sm border-b py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Hamburger Icon for mobile */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <h1
            className="text-2xl font-semibold text-gray-800 cursor-pointer"
            onClick={() => router.push("/")}
          >
            E-Commerce
          </h1>
        </div>

        {/* Navigation Links */}
        <nav
          className={`md:flex ${
            menuOpen ? "block" : "hidden"
          } absolute md:static bg-white w-full md:w-auto z-10`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
            <li>
              <a
                href="/"
                className={`hover:text-blue-500 transition duration-300 ease-in-out ${isActive(
                  "/"
                )}`}
                onClick={() => setMenuOpen(false)} // Close menu on link click
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className={`hover:text-blue-500 transition duration-300 ease-in-out ${isActive(
                  "/products"
                )}`}
                onClick={() => setMenuOpen(false)}
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/cart"
                className={`hover:text-blue-500 transition duration-300 ease-in-out ${isActive(
                  "/cart"
                )}`}
                onClick={() => setMenuOpen(false)}
              >
                Cart
              </a>
            </li>
            <li>
              <a
                href="/order-history"
                className={`hover:text-blue-500 transition duration-300 ease-in-out ${isActive(
                  "/order-history"
                )}`}
                onClick={() => setMenuOpen(false)}
              >
                Order History
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-gray-700">Hello, {username}</span>
              <Button variant="default" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="default"
                onClick={() => router.push("/register")}
              >
                Register
              </Button>
              <Button variant="outline" onClick={() => router.push("/login")}>
                Login
              </Button>
            </>
          )}
        </div>
      </div>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden bg-white absolute top-16 left-0 right-0 shadow-md z-20">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <a
                href="/"
                className={`hover:text-blue-500 transition duration-300 ease-in-out ${isActive(
                  "/"
                )}`}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className={`hover:text-blue-500 transition duration-300 ease-in-out ${isActive(
                  "/products"
                )}`}
                onClick={() => setMenuOpen(false)}
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/cart"
                className={`hover:text-blue-500 transition duration-300 ease-in-out ${isActive(
                  "/cart"
                )}`}
                onClick={() => setMenuOpen(false)}
              >
                Cart
              </a>
            </li>
            <li>
              <a
                href="/order-history"
                className={`hover:text-blue-500 transition duration-300 ease-in-out ${isActive(
                  "/order-history"
                )}`}
                onClick={() => setMenuOpen(false)}
              >
                Order History
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
