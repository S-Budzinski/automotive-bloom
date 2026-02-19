import { motion } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

const CartSidebar = () => {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50"
        onClick={() => setIsCartOpen(false)}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 glass border-l border-border flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading text-lg tracking-wider text-primary">KOSZYK</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-secondary rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center mt-8">Twój koszyk jest pusty</p>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 bg-secondary/50 rounded-lg p-3 glow-border">
                <div className="w-16 h-16 bg-muted rounded-md flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">IMG</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-xs tracking-wider truncate">{item.product.name}</h4>
                  <p className="text-primary font-bold text-sm mt-1">{item.product.price.toFixed(2)} zł</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:bg-muted rounded">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:bg-muted rounded">
                      <Plus className="w-3 h-3" />
                    </button>
                    <button onClick={() => removeItem(item.product.id)} className="p-1 hover:bg-destructive/20 rounded ml-auto">
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Suma:</span>
              <span className="font-heading text-xl text-primary glow-text">{totalPrice.toFixed(2)} zł</span>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate("/checkout");
              }}
              className="w-full py-3 rounded-lg gradient-primary text-primary-foreground font-heading text-sm tracking-widest uppercase hover-glow hover:opacity-90 transition-all"
            >
              Przejdź do kasy
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CartSidebar;
