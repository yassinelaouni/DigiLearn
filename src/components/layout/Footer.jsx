import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo & Info */}
          <div className="space-y-4 pr-20">
            <Link to="/" className="flex items-center gap-2">
              <img width={165} src='/logo.png' alt="Logo DigiLearn" />
            </Link>
            <p className="text-muted-foreground">
              Votre porte d'entrée vers la littératie numérique. Nous donnons aux étudiants universitaires les connaissances et les compétences nécessaires pour l'ère numérique.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Tous les Cours
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Certificats
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Tableau de bord
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Course Categories */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg">Catégories de Cours</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses/web-development" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Développement Web
                </Link>
              </li>
              <li>
                <Link to="/courses/digital-marketing" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Marketing Digital
                </Link>
              </li>
              <li>
                <Link to="/courses/data-science" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Science des Données
                </Link>
              </li>
              <li>
                <Link to="/courses/ux-ui-design" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Design UX/UI
                </Link>
              </li>
              <li>
                <Link to="/courses/blockchain" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Blockchain
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DigiLearn. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;