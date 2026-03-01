import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { Link } from "react-router-dom";

const Index = () => {
  const featured = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-2xl md:text-3xl tracking-wider text-foreground mb-2">
              <span className="text-primary glow-text">WYRÓŻNIONE</span> PRODUKTY
            </h2>
            <div className="cyber-line w-32 mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="cyber-line absolute top-0" />
        <div className="cyber-line absolute bottom-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-xl md:text-2xl tracking-wider mb-4">
              GOTOWY NA <span className="text-primary glow-text">UPGRADE</span>?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Odkryj pełną gamę części do Twojego samochodu
            </p>
            <Link
                to="/produkty"
                className="inline-block px-8 py-3 rounded-lg gradient-primary text-primary-foreground font-heading text-sm tracking-widest uppercase hover-glow"
                >
              Wszystkie produkty
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
