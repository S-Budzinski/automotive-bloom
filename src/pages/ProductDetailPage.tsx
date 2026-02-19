import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Zap } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [currentImage, setCurrentImage] = useState(0);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Produkt nie znaleziony</p>
      </div>
    );
  }

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 pb-20">
        <button
          onClick={() => navigate(-1)}
          className="text-muted-foreground hover:text-primary transition-colors mb-8 font-heading text-sm tracking-wider flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Wróć
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square bg-card rounded-lg border border-border glow-border overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading text-2xl text-muted-foreground/30 tracking-wider">
                  {product.category}
                </span>
              </div>

              {/* Carousel dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentImage ? "bg-primary w-6" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              {product.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass hover:bg-primary/20 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass hover:bg-primary/20 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <span className="font-heading text-xs tracking-widest text-primary uppercase">{product.category}</span>
            <h1 className="font-heading text-2xl md:text-3xl tracking-wider mt-2 mb-4">{product.name}</h1>
            <div className="cyber-line w-full my-4" />
            <p className="text-3xl font-heading text-primary glow-text mb-6">{product.price.toFixed(2)} zł</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                onClick={() => addItem(product)}
                className="flex-1 py-3 px-6 rounded-lg border border-primary/50 text-primary font-heading text-sm tracking-widest uppercase hover-glow hover:bg-primary/10 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Dodaj do koszyka
              </button>
              <button
                onClick={() => {
                  addItem(product);
                  navigate("/checkout");
                }}
                className="flex-1 py-3 px-6 rounded-lg gradient-primary text-primary-foreground font-heading text-sm tracking-widest uppercase hover-glow hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Kup teraz
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
