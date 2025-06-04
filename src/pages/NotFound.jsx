import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "Erreur 404 : L'utilisateur a tenté d'accéder à une route inexistante :",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4">
      <div className="space-y-6">
          <h1 className="text-9xl font-bold text-brand-purple drop-shadow-lg mb-8 animate-fade-in">
            404
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oups ! La page que vous recherchez n'existe pas.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-brand-purple rounded-lg shadow-lg hover:bg-brand-yellow hover:text-black transition-colors duration-300"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;