import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

const SuccessPage = () => {
  // Jeśli masz w CartContext funkcję clearCart() do czyszczenia koszyka,
  // możesz jej tutaj użyć, aby opróżnić koszyk po udanej płatności:
 const { clearCart } = useCart();
  useEffect(() => { clearCart?.(); }, []);

  return (
    <div className="min-h-screen bg-background pt-32 flex flex-col">
      <div className="container mx-auto px-4 flex-grow flex items-center justify-center pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-card rounded-2xl border border-border p-8 md:p-12 text-center glow-border relative overflow-hidden shadow-2xl"
        >
          {/* Poświata w tle karty */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />

          {/* Ikonka sukcesu z animacją */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30 relative z-10"
          >
            <CheckCircle className="w-10 h-10 text-primary glow-text" />
          </motion.div>

          <h1 className="font-heading text-3xl tracking-wider mb-2 text-foreground relative z-10">
            DZIĘKUJEMY!
          </h1>
          <div className="cyber-line w-16 mx-auto my-4 relative z-10" />
          <h2 className="text-xl text-primary glow-text font-heading tracking-widest mb-6 relative z-10">
            PŁATNOŚĆ ZAKOŃCZONA
          </h2>

          <p className="text-muted-foreground mb-8 text-sm leading-relaxed relative z-10">
            Twoje zamówienie zostało pomyślnie opłacone i przekazane do realizacji. Na podany adres email przesłaliśmy potwierdzenie oraz szczegóły zamówienia.
          </p>

          {/* Przyciski nawigacyjne */}
          <div className="space-y-4 relative z-10">
            <Link
              to="/"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg gradient-primary text-primary-foreground font-heading text-sm tracking-widest uppercase hover-glow transition-all"
            >
              Wróć na stronę główną <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/produkty"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-secondary/30 text-foreground border border-border hover:bg-secondary/60 transition-all font-heading text-sm tracking-widest uppercase"
            >
              <ShoppingBag className="w-4 h-4" /> Kontynuuj zakupy
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;