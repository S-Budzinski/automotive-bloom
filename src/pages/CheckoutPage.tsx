import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import Footer from "@/components/Footer";

const SHIPPING_COST = 20;

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Imię jest wymagane").max(50),
  surname: z.string().trim().min(2, "Nazwisko jest wymagane").max(50),
  email: z.string().trim().email("Nieprawidłowy adres email").max(255),
  phone: z.string().trim().min(9, "Nieprawidłowy numer telefonu").max(15),
  address: z.string().trim().min(5, "Adres jest wymagany").max(200),
  postalCode: z.string().trim().regex(/^\d{2}-\d{3}$/, "Format: 00-000"),
  city: z.string().trim().min(2, "Miasto jest wymagane").max(100),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const { items, totalPrice, removeItem, updateQuantity } = useCart();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (_data: CheckoutForm) => {
    setFormSubmitted(true);
  };

  const grandTotal = totalPrice + SHIPPING_COST;

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-3xl md:text-4xl tracking-wider mb-2">
            <span className="text-primary glow-text">ZAMÓWIENIE</span>
          </h1>
          <div className="cyber-line w-32 mx-auto mt-4" />
        </motion.div>

        {items.length === 0 && !formSubmitted ? (
          <p className="text-center text-muted-foreground">Twój koszyk jest pusty</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {!formSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <h2 className="font-heading text-lg tracking-wider text-primary mb-4">DANE DOSTAWY</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Imię" error={errors.name?.message}>
                      <input {...register("name")} className="form-input" placeholder="Jan" />
                    </Field>
                    <Field label="Nazwisko" error={errors.surname?.message}>
                      <input {...register("surname")} className="form-input" placeholder="Kowalski" />
                    </Field>
                  </div>

                  <Field label="Email" error={errors.email?.message}>
                    <input {...register("email")} type="email" className="form-input" placeholder="jan@email.com" />
                  </Field>

                  <Field label="Telefon" error={errors.phone?.message}>
                    <input {...register("phone")} className="form-input" placeholder="123456789" />
                  </Field>

                  <Field label="Adres" error={errors.address?.message}>
                    <input {...register("address")} className="form-input" placeholder="ul. Przykładowa 1/2" />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Kod pocztowy" error={errors.postalCode?.message}>
                      <input {...register("postalCode")} className="form-input" placeholder="00-000" />
                    </Field>
                    <Field label="Miasto" error={errors.city?.message}>
                      <input {...register("city")} className="form-input" placeholder="Warszawa" />
                    </Field>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg gradient-primary text-primary-foreground font-heading text-sm tracking-widest uppercase hover-glow mt-6"
                  >
                    Przejdź do płatności
                  </button>
                </form>
              ) : (
                <div className="bg-card rounded-lg border border-border p-8 glow-border">
                  <h2 className="font-heading text-lg tracking-wider text-primary mb-4">PŁATNOŚĆ</h2>
                  <div className="bg-muted rounded-lg p-12 flex items-center justify-center border border-dashed border-border">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Stripe Payment Embed</p>
                      <p className="text-xs text-muted-foreground/60">Tutaj zostanie zintegrowany Stripe</p>
                      <p className="font-heading text-2xl text-primary glow-text mt-4">{grandTotal.toFixed(2)} zł</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right - Cart Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-card rounded-lg border border-border p-6 glow-border sticky top-24">
                <h2 className="font-heading text-lg tracking-wider text-primary mb-4">PODSUMOWANIE</h2>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3 bg-secondary/30 rounded-lg p-3">
                      <div className="w-14 h-14 bg-muted rounded flex-shrink-0 flex items-center justify-center">
                        <span className="text-[10px] text-muted-foreground">IMG</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading text-xs tracking-wider truncate">{item.product.name}</h4>
                        <p className="text-primary text-sm font-bold">{(item.product.price * item.quantity).toFixed(2)} zł</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                          {!formSubmitted && (
                            <button onClick={() => removeItem(item.product.id)} className="ml-auto">
                              <Trash2 className="w-3 h-3 text-destructive" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cyber-line my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Produkty:</span>
                    <span>{totalPrice.toFixed(2)} zł</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Wysyłka:</span>
                    <span>{SHIPPING_COST.toFixed(2)} zł</span>
                  </div>
                  <div className="cyber-line my-2" />
                  <div className="flex justify-between items-center">
                    <span className="font-heading tracking-wider">RAZEM:</span>
                    <span className="font-heading text-xl text-primary glow-text">{grandTotal.toFixed(2)} zł</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label className="block font-heading text-xs tracking-wider text-foreground/70 mb-1">{label}</label>
    {children}
    {error && <p className="text-destructive text-xs mt-1">{error}</p>}
  </div>
);

export default CheckoutPage;
