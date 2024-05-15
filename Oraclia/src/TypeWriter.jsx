import useTypewriter from "./useTypeWriter";

const Typewriter = () => {
  const text = "Ceci est un texte écrit à la manière d'un ordinateur.";
  const typingSpeed = 150; // Vitesse de dactylographie en millisecondes
  const displayedText = useTypewriter(text, typingSpeed);

  return (
    <div>
      <p>{displayedText}</p>
    </div>
  );
};

export default Typewriter;
