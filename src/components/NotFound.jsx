import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Keep consistent navbar and footer */}
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
      </main>

      <Footer />
    </div>
  );
}
