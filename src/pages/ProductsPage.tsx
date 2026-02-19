import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-3xl md:text-4xl tracking-wider mb-2">
            <span className="text-primary glow-text">NASZE</span> PRODUKTY
          </h1>
          <div className="cyber-line w-32 mx-auto mt-4" />
          <p className="text-muted-foreground mt-4">Pełna oferta części samochodowych</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
