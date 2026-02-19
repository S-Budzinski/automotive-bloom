import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/produkt/${product.id}`}
        className="group block bg-card rounded-lg overflow-hidden border border-border hover-glow transition-all duration-300 hover:border-primary/50"
      >
        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-muted-foreground text-sm tracking-wider">{product.category}</span>
          </div>
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-heading text-sm tracking-wider text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{product.shortDescription}</p>
          <div className="flex items-center justify-between pt-2">
            <span className="font-heading text-lg text-primary glow-text">{product.price.toFixed(2)} zł</span>
            <span className="text-xs text-primary/70 font-heading tracking-widest uppercase group-hover:text-primary transition-colors">
              Zobacz →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
