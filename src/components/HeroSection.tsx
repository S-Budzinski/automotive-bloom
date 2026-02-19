import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Automotive parts background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Decorative lines */}
      <div className="absolute top-1/4 left-0 right-0 cyber-line opacity-30" />
      <div className="absolute top-3/4 left-0 right-0 cyber-line opacity-20" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-4">
            <span className="text-primary glow-text">AUTO</span>
            <span className="text-foreground">PARTS</span>
          </h1>
          <div className="cyber-line w-48 mx-auto my-6" />
          <p className="text-lg md:text-xl text-foreground/70 max-w-xl mx-auto mb-8 tracking-wide">
            Części samochodowe najwyższej jakości. Wydajność. Styl. Precyzja.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/produkty"
            className="px-8 py-3 rounded-lg gradient-primary text-primary-foreground font-heading text-sm tracking-widest uppercase hover-glow hover:opacity-90 transition-all"
          >
            Zobacz produkty
          </Link>
          <Link
            to="/kontakt"
            className="px-8 py-3 rounded-lg border border-primary/50 text-primary font-heading text-sm tracking-widest uppercase hover-glow hover:bg-primary/10 transition-all"
          >
            Kontakt
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
