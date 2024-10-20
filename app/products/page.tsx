"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Import ikon dari Lucide

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Contoh data produk
  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "Description for Product 1",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for Product 2",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description for Product 3",
      price: 49.99,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Product 4",
      description: "Description for Product 4",
      price: 19.99,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Product 5",
      description: "Description for Product 5",
      price: 59.99,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Product 6",
      description: "Description for Product 6",
      price: 99.99,
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  // Filter produk berdasarkan nama
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative">
      <h1 className="text-3xl font-semibold text-gray-900 text-center mb-4">
        Products
      </h1>

      {/* Search Bar di kanan atas */}
      <div className="absolute top-4 right-4">
        <div className="flex">
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="ml-2 rounded-r-md">Search</Button>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {currentProducts.map((product) => (
          <Card key={product.id} className="shadow">
            <CardHeader>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 object-cover rounded"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>
                <div className="flex flex-col">
                  <h1>{product.description}</h1>
                  <h1 className="text-gray-800 font-semibold">
                    {"Rp"}
                    {product.price.toFixed(2)}
                  </h1>
                </div>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-6">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          <ArrowLeft />
        </Button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {index + 1}
          </Button>
        ))}

        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
