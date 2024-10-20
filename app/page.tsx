import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Import Card components
import { Truck, ShieldCheck, CreditCard } from "lucide-react"; // Import ikon dari Lucide
import Link from "next/link";

export default function Home() {
  // Contoh data produk
  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "Description for Product 1",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/150", // Ganti dengan URL gambar produk yang sebenarnya
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
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Perkenalan Section */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Welcome to the Best E-Commerce in Indonesia!
        </h1>
        <p className="mt-2 text-gray-700">
          Discover amazing products at unbeatable prices. Enjoy a seamless
          shopping experience with us.
        </p>
      </div>

      {/* Keuntungan Belanja Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="border p-4 rounded-lg text-center shadow">
          <Truck className="mx-auto h-12 w-12 text-blue-500" />
          <h3 className="text-lg font-semibold mt-2">Fast Delivery</h3>
          <p className="text-gray-600">
            Get your products delivered quickly to your doorstep.
          </p>
        </div>
        <div className="border p-4 rounded-lg text-center shadow">
          <ShieldCheck className="mx-auto h-12 w-12 text-blue-500" />
          <h3 className="text-lg font-semibold mt-2">Secure Payments</h3>
          <p className="text-gray-600">
            Your payment information is safe with us.
          </p>
        </div>
        <div className="border p-4 rounded-lg text-center shadow">
          <CreditCard className="mx-auto h-12 w-12 text-blue-500" />
          <h3 className="text-lg font-semibold mt-2">
            Flexible Payment Options
          </h3>
          <p className="text-gray-600">
            Choose from various payment methods that suit you best.
          </p>
        </div>
      </div>

      {/* Banner Section */}
      <div className="border rounded-lg text-center p-6 mb-6 shadow">
        <h2 className="text-2xl font-bold text-blue-500">
          Limited Time Offer!
        </h2>
        <p className="mt-2 text-gray-700">
          Get 20% off on your first purchase. Use code: WELCOME20
        </p>
        <Button className="mt-4">Shop Now</Button>
      </div>

      {/* Products Section */}
      <h1 className="text-2xl font-bold mb-4">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
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
      {/* Explore More Products Section */}
      <div className="text-center mt-6">
        <Link href="/products">
          <Button>Explore More Products</Button>
        </Link>
      </div>
    </div>
  );
}
