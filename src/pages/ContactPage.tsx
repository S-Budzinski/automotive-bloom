import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Footer from "@/components/Footer";

const contactInfo = [
  { icon: Mail, label: "Email", value: "kontakt.beemtech@gmail.com" },
  { icon: Phone, label: "Telefon", value: "+48 123 456 789" },
  { icon: MapPin, label: "Adres", value: "ul. Szkolna, Rzeszów" },
  { icon: Clock, label: "Godziny otwarcia", value: "Pon-Pt: 8:00-18:00, Sob: 9:00-14:00" },
];

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-3xl md:text-4xl tracking-wider mb-2">
            <span className="text-primary glow-text">KONTAKT</span>
          </h1>
          <div className="cyber-line w-32 mx-auto mt-4" />
          <p className="text-muted-foreground mt-4">Skontaktuj się z nami</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-lg border border-border p-6 glow-border hover-glow transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm tracking-wider text-foreground mb-1">{item.label}</h3>
                  <p className="text-muted-foreground text-sm">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
