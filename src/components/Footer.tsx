import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-lg tracking-wider text-primary glow-text mb-4">
              Beem<span className="text-foreground">Tech</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Profesjonalne części samochodowe dla wymagających. Jakość i wydajność na najwyższym poziomie.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-sm tracking-widest uppercase text-foreground mb-4">Nawigacja</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Strona Główna</Link>
              <Link to="/produkty" className="text-sm text-muted-foreground hover:text-primary transition-colors">Produkty</Link>
              <Link to="/kontakt" className="text-sm text-muted-foreground hover:text-primary transition-colors">Kontakt</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-sm tracking-widest uppercase text-foreground mb-4">Kontakt</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>kontakt.beemtech@gmail.com</span>
              <span>+48 123 456 789</span>
              <span>ul.Szkolna Rzeszów</span>
            </div>
          </div>
        </div>
        <div className="cyber-line mt-8 mb-4" />
        <p className="text-center text-xs text-muted-foreground">
          © 2026 BeemTech. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
